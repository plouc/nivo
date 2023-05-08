import { useMemo, useRef, useEffect } from 'react'
import { line } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import { curveFromProp } from '@nivo/core'
import { OrdinalColorScaleConfig, useOrdinalColorScale } from '@nivo/colors'
import { castPointScale, castLinearScale } from '@nivo/scales'
import {
    VariableSpec,
    CommonProps,
    ComputedDatum,
    BaseDatum,
    LegendDatum,
    CustomLayerProps,
} from './types'
import { commonDefaultProps } from './defaults'

const computeParallelCoordinatesLayout = <D extends BaseDatum>({
    width,
    height,
    data,
    variables,
    layout,
    getColor,
}: {
    width: number
    height: number
    data: readonly D[]
    variables: readonly VariableSpec<D>[]
    layout: CommonProps<D>['layout']
    getColor: (datum: D) => string
}) => {
    const variableIds = variables.map(({ id }) => id)

    const variablesScale = castPointScale(
        scalePoint()
            .range(layout === 'horizontal' ? [0, width] : [height, 0])
            .domain(variableIds)
    )

    const range = layout === 'horizontal' ? [height, 0] : [0, width]
    const variablesWithScale = variables.map(variable => {
        const allValues = data.map(datum => datum[variable.value] as number)

        const min =
            variable.min !== undefined && variable.min !== 'auto'
                ? variable.min
                : Math.min(...allValues)
        const max =
            variable.max !== undefined && variable.max !== 'auto'
                ? variable.max
                : Math.max(...allValues)

        const scale = castLinearScale(scaleLinear().rangeRound(range).domain([min, max]))

        return {
            ...variable,
            scale,
            values: allValues,
        }
    })

    const computedData: ComputedDatum<D>[] = data.map((datum, index) => {
        const points: [number, number][] = variablesWithScale.map(variable => [
            layout === 'horizontal'
                ? variablesScale(variable.id)!
                : variable.scale(datum[variable.value] as number),
            layout === 'horizontal'
                ? variable.scale(datum[variable.value] as number)
                : variablesScale(variable.id)!,
        ])

        return {
            id: datum.id,
            index,
            points,
            data: datum,
            color: getColor(datum),
        }
    })

    return {
        variablesScale,
        variablesWithScale,
        computedData,
    }
}

export const useParallelCoordinates = <D extends BaseDatum>({
    width,
    height,
    data,
    variables,
    layout = commonDefaultProps.layout,
    curve = commonDefaultProps.curve,
    colors = commonDefaultProps.colors as OrdinalColorScaleConfig<D>,
    forwardLegendData,
}: {
    width: number
    height: number
    data: readonly D[]
    variables: readonly VariableSpec<D>[]
    layout: CommonProps<D>['layout']
    curve: CommonProps<D>['curve']
    colors: CommonProps<D>['colors']
    forwardLegendData?: CommonProps<D>['forwardLegendData']
}) => {
    const getColor = useOrdinalColorScale(colors, 'id')

    const lineGenerator = useMemo(
        () => line<[number, number]>().curve(curveFromProp(curve)),
        [curve]
    )

    const { variablesScale, variablesWithScale, computedData } = useMemo(
        () =>
            computeParallelCoordinatesLayout<D>({
                width,
                height,
                data,
                variables,
                layout,
                getColor,
            }),
        [width, height, data, variables, layout, getColor]
    )

    const legendData: LegendDatum<D>[] = useMemo(
        () =>
            computedData.map(datum => ({
                id: datum.id,
                label: datum.id,
                color: datum.color,
                data: datum,
            })),
        [computedData]
    )

    // Forward the legends data if `forwardLegendData` is defined.
    const forwardLegendDataRef = useRef(forwardLegendData)
    useEffect(() => {
        if (typeof forwardLegendDataRef.current !== 'function') return
        forwardLegendDataRef.current(legendData)
    }, [forwardLegendDataRef, legendData])

    const customLayerContext: CustomLayerProps<D> = useMemo(
        () => ({
            computedData,
            variables,
            lineGenerator,
        }),
        [computedData, variables, lineGenerator]
    )

    return {
        variablesScale,
        variablesWithScale,
        computedData,
        lineGenerator,
        legendData,
        customLayerContext,
    }
}
