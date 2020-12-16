import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import { usePropertyAccessor, useTheme, useValueFormatter } from '@nivo/core'
import { Arc, ArcGenerator, useArcGenerator } from '@nivo/arcs'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { partition as d3Partition, hierarchy as d3Hierarchy } from 'd3-hierarchy'
import { CommonProps, ComputedDatum, DataProps, DatumId, SunburstCustomLayerProps } from './types'

export const useSunburst = <RawDatum>({
    childColor,
    colors,
    cornerRadius,
    data,
    id,
    value,
    valueFormat,
    radius,
}: {
    childColor: CommonProps<RawDatum>['childColor']
    colors: CommonProps<RawDatum>['colors']
    cornerRadius: CommonProps<RawDatum>['cornerRadius']
    data: DataProps<RawDatum>['data']
    id: NonNullable<DataProps<RawDatum>['id']>
    radius: number
    value: NonNullable<DataProps<RawDatum>['value']>
    valueFormat: DataProps<RawDatum>['valueFormat']
}) => {
    const theme = useTheme()
    const getColor = useOrdinalColorScale<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>(
        colors,
        'id'
    )
    const getChildColor = useInheritedColor<ComputedDatum<RawDatum>>(childColor, theme)

    const getId = usePropertyAccessor<RawDatum, DatumId>(id)
    const getValue = usePropertyAccessor<RawDatum, number>(value)
    const formatValue = useValueFormatter<number>(valueFormat)

    const nodes: ComputedDatum<RawDatum>[] = useMemo(() => {
        // d3 mutates the data for performance reasons,
        // however it does not work well with reactive programming,
        // this ensures that we don't mutate the input data
        const clonedData = cloneDeep(data)

        const hierarchy = d3Hierarchy(clonedData).sum(getValue)

        const partition = d3Partition<RawDatum>().size([2 * Math.PI, radius * radius])
        const descendants = partition(hierarchy)
            .descendants()
            .filter(descendant => descendant.depth > 0)

        const total = hierarchy.value ?? 0

        // It's important to sort node by depth,
        // it ensures that we assign a parent node
        // which has already been computed, because parent nodes
        // are gonna be computed first
        const sortedNodes = sortBy(descendants, 'depth')

        return sortedNodes.reduce<ComputedDatum<RawDatum>[]>((acc, descendant) => {
            const id = getId(descendant.data)
            const value = descendant.value!
            const percentage = (100 * value) / total
            const path = descendant.ancestors().map(ancestor => getId(ancestor.data))

            const arc: Arc = {
                startAngle: descendant.x0,
                endAngle: descendant.x1,
                innerRadius: Math.sqrt(descendant.y0),
                outerRadius: Math.sqrt(descendant.y1),
            }

            let parent: ComputedDatum<RawDatum> | undefined
            if (descendant.parent) {
                parent = acc.find(node => node.id === getId(descendant.parent!.data))
            }

            const normalizedNode: ComputedDatum<RawDatum> = {
                id,
                path,
                value,
                percentage,
                formattedValue: valueFormat ? formatValue(value) : `${percentage.toFixed(2)}%`,
                color: '',
                arc,
                data: descendant.data,
                depth: descendant.depth,
                height: descendant.height,
            }

            if (childColor !== 'noinherit' && parent && descendant.depth > 1) {
                normalizedNode.color = getChildColor(parent)
            } else {
                normalizedNode.color = getColor(normalizedNode)
            }

            return [...acc, normalizedNode]
        }, [])
    }, [
        data,
        radius,
        getValue,
        getId,
        valueFormat,
        formatValue,
        childColor,
        getColor,
        getChildColor,
    ])

    const arcGenerator = useArcGenerator({
        cornerRadius,
    })

    return { arcGenerator, nodes }
}

/**
 * Memoize the context to pass to custom layers.
 */
export const useSunburstLayerContext = <RawDatum>({
    nodes,
    arcGenerator,
    centerX,
    centerY,
    radius,
}: {
    nodes: ComputedDatum<RawDatum>[]
    arcGenerator: ArcGenerator
    centerX: number
    centerY: number
    radius: number
}): SunburstCustomLayerProps<RawDatum> =>
    useMemo(
        () => ({
            nodes,
            arcGenerator,
            centerX,
            centerY,
            radius,
        }),
        [nodes, arcGenerator, centerX, centerY, radius]
    )
