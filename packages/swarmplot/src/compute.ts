import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'
import { scaleLinear, ScaleOrdinal, scaleOrdinal } from 'd3-scale'
import { forceSimulation, forceX, forceY, forceCollide, ForceX, ForceY } from 'd3-force'
import {
    computeScale,
    createDateNormalizer,
    generateSeriesAxis,
    ScaleLinear,
    ScaleLinearSpec,
    ScaleTime,
    ScaleTimeSpec,
} from '@nivo/scales'
import {
    ComputedDatum,
    PreSimulationDatum,
    SizeSpec,
    SimulationForces,
    SwarmPlotLegendData,
} from './types'

const getParsedValue = (scaleSpec: ScaleLinearSpec | ScaleTimeSpec) => {
    if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
        return createDateNormalizer(scaleSpec) as <T>(value: T) => T
    }

    return <T>(value: T) => value
}

export const computeOrdinalScale = ({
    width,
    height,
    axis,
    groups,
    gap,
}: {
    width: number
    height: number
    axis: 'x' | 'y'
    groups: string[]
    gap: number
}) => {
    if (!Array.isArray(groups) || groups.length === 0) {
        throw new Error(`'groups' should be an array containing at least one item`)
    }

    const groupCount = groups.length

    let groupSize: number
    if (axis === 'x') {
        groupSize = (height - gap * (groupCount - 1)) / groupCount
    } else if (axis === 'y') {
        groupSize = (width - gap * (groupCount - 1)) / groupCount
    }

    const range = groups.map((_, i) => i * (groupSize + gap) + groupSize / 2)

    return scaleOrdinal(range).domain(groups)
}

export const computeValueScale = <RawDatum>({
    width,
    height,
    axis,
    getValue,
    scale,
    data,
}: {
    width: number
    height: number
    axis: 'x' | 'y'
    getValue: (datum: RawDatum) => number | Date
    scale: ScaleLinearSpec | ScaleTimeSpec
    data: RawDatum[]
}) => {
    const values = data.map(getValue)

    if (scale.type === 'time') {
        const series = [
            { data: values.map(value => ({ data: { x: null, y: null, [axis]: value } })) },
        ]
        const axes = generateSeriesAxis(series, axis, scale)

        return computeScale(scale, axes, axis === 'x' ? width : height, axis) as ScaleTime<
            Date | string
        >
    }

    const min = Math.min(...(values as number[]))
    const max = Math.max(...(values as number[]))

    return computeScale(
        scale,
        { all: values, min, max },
        axis === 'x' ? width : height,
        axis
    ) as ScaleLinear<number>
}

export const getSizeGenerator = <RawDatum>(size: SizeSpec<RawDatum>) => {
    // user defined size function
    if (typeof size === 'function') {
        return size
    }

    // static size
    if (isNumber(size)) {
        return () => size
    }

    // dynamic size based on config
    if (isPlainObject(size)) {
        if (!isString(size.key)) {
            throw new Error(
                'Size is invalid, key should be a string pointing to the property to use to determine node size'
            )
        }
        if (!Array.isArray(size.values) || size.values.length !== 2) {
            throw new Error(
                'Size is invalid, values spec should be an array containing two values, min and max'
            )
        }
        if (!Array.isArray(size.sizes) || size.sizes.length !== 2) {
            throw new Error(
                'Size is invalid, sizes spec should be an array containing two values, min and max'
            )
        }

        const sizeScale = scaleLinear()
            .domain([size.values[0], size.values[1]])
            .range([size.sizes[0], size.sizes[1]])

        return (d: RawDatum) => sizeScale(get(d, size.key))
    }

    throw new Error('Size is invalid, it should be either a function, a number or an object')
}

export const computeForces = <RawDatum>({
    axis,
    valueScale,
    ordinalScale,
    spacing,
    forceStrength,
}: {
    axis: 'x' | 'y'
    valueScale: ScaleLinear<number> | ScaleTime<string | Date>
    ordinalScale: ScaleOrdinal<string, number>
    spacing: number
    forceStrength: number
}): SimulationForces<RawDatum> => {
    const collisionForce = forceCollide<PreSimulationDatum<RawDatum>>(d => d.size / 2 + spacing / 2)

    let xForce: ForceX<PreSimulationDatum<RawDatum>>
    let yForce: ForceY<PreSimulationDatum<RawDatum>>
    if (axis === 'x') {
        xForce = forceX<PreSimulationDatum<RawDatum>>(d => valueScale(d.value)).strength(
            forceStrength
        )
        yForce = forceY<PreSimulationDatum<RawDatum>>(d => ordinalScale(d.group))
    } else if (axis === 'y') {
        xForce = forceX<PreSimulationDatum<RawDatum>>(d => ordinalScale(d.group))
        yForce = forceY<PreSimulationDatum<RawDatum>>(d => valueScale(d.value)).strength(
            forceStrength
        )
    } else {
        throw new Error(`Invalid axis provided: ${axis}`)
    }

    return { x: xForce, y: yForce, collision: collisionForce }
}

export const computeNodes = <RawDatum>({
    data,
    getId,
    layout,
    getValue,
    valueScale,
    getGroup,
    ordinalScale,
    getSize,
    forces,
    simulationIterations,
    valueScaleConfig,
}: {
    data: RawDatum[]
    getId: (datum: RawDatum) => string
    layout: 'vertical' | 'horizontal'
    getValue: (datum: RawDatum) => number | Date
    valueScale: ScaleLinear<number> | ScaleTime<string | Date>
    getGroup: (datum: RawDatum) => string
    ordinalScale: ScaleOrdinal<string, number>
    getSize: (datum: RawDatum) => number
    forces: SimulationForces<RawDatum>
    simulationIterations: number
    valueScaleConfig: ScaleLinearSpec | ScaleTimeSpec
}) => {
    const config = {
        horizontal: ['x', 'y'],
        vertical: ['y', 'x'],
    }

    const parseValue = getParsedValue(valueScaleConfig)

    const simulatedNodes: PreSimulationDatum<RawDatum>[] = data.map(d => ({
        id: getId(d),
        group: getGroup(d),
        value: parseValue(getValue(d)),
        size: getSize(d),
        data: { ...d },
    }))

    const simulation = forceSimulation<PreSimulationDatum<RawDatum>>(simulatedNodes)
        .force('x', forces.x)
        .force('y', forces.y)
        .force('collide', forces.collision)
        .stop()

    simulation.tick(simulationIterations)

    return {
        [`${config[layout][0]}Scale`]: valueScale,
        [`${config[layout][1]}Scale`]: ordinalScale,
        nodes: simulation.nodes() as ComputedDatum<RawDatum>[],
    }
}

export const getLegendData = <RawDatum>({
    nodes,
    getLegendLabel,
}: {
    nodes: ComputedDatum<RawDatum>[]
    getLegendLabel: (datum: RawDatum) => string
}) => {
    const nodeData = nodes.map(
        node =>
            ({
                id: node.group,
                label: getLegendLabel(node.data),
                color: node?.color,
            } as SwarmPlotLegendData)
    )
    return uniqBy(nodeData, ({ id }) => id)
}
