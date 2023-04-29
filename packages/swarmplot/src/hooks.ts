import { useCallback, useMemo, MouseEvent } from 'react'
import { ScaleOrdinal } from 'd3-scale'
import { usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { AnnotationMatcher, useAnnotations } from '@nivo/annotations'
import { useTooltip } from '@nivo/tooltip'
import { ScaleLinear, ScaleLinearSpec, ScaleTime, ScaleTimeSpec } from '@nivo/scales'
import {
    computeValueScale,
    computeOrdinalScale,
    getSizeGenerator,
    computeForces,
    computeNodes,
} from './compute'
import {
    SwarmPlotCommonProps,
    ComputedDatum,
    SizeSpec,
    SwarmPlotCustomLayerProps,
    MouseHandlers,
} from './types'

export const useValueScale = <RawDatum>({
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
}) =>
    useMemo(
        () =>
            computeValueScale<RawDatum>({
                width,
                height,
                axis,
                getValue,
                scale,
                data,
            }),
        [width, height, axis, getValue, scale, data]
    )

export const useOrdinalScale = ({
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
}) =>
    useMemo(
        () => computeOrdinalScale({ width, height, axis, groups, gap }),
        [width, height, axis, groups, gap]
    )

const useSize = <RawDatum>(size: SizeSpec<RawDatum>) =>
    useMemo(() => getSizeGenerator<RawDatum>(size), [size])

export const useForces = <RawDatum>({
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
}) =>
    useMemo(
        () =>
            computeForces<RawDatum>({
                axis,
                valueScale,
                ordinalScale,
                spacing,
                forceStrength,
            }),
        [axis, valueScale, ordinalScale, spacing, forceStrength]
    )

export const useSwarmPlot = <RawDatum>({
    data,
    width,
    height,
    id,
    value,
    valueFormat,
    valueScale: valueScaleConfig,
    groups,
    groupBy,
    size,
    spacing,
    layout,
    gap,
    forceStrength,
    simulationIterations,
    colors,
    colorBy,
}: {
    data: RawDatum[]
    width: number
    height: number
    id: SwarmPlotCommonProps<RawDatum>['id']
    value: SwarmPlotCommonProps<RawDatum>['value']
    valueScale: SwarmPlotCommonProps<RawDatum>['valueScale']
    valueFormat?: SwarmPlotCommonProps<RawDatum>['valueFormat']
    groups: SwarmPlotCommonProps<RawDatum>['groups']
    groupBy: SwarmPlotCommonProps<RawDatum>['groupBy']
    size: SwarmPlotCommonProps<RawDatum>['size']
    spacing: SwarmPlotCommonProps<RawDatum>['spacing']
    layout: SwarmPlotCommonProps<RawDatum>['layout']
    gap: SwarmPlotCommonProps<RawDatum>['gap']
    forceStrength: SwarmPlotCommonProps<RawDatum>['forceStrength']
    simulationIterations: SwarmPlotCommonProps<RawDatum>['simulationIterations']
    colors: SwarmPlotCommonProps<RawDatum>['colors']
    colorBy: SwarmPlotCommonProps<RawDatum>['colorBy']
}) => {
    const axis = layout === 'horizontal' ? 'x' : 'y'

    const getId = usePropertyAccessor<RawDatum, string>(id)
    const getValue = usePropertyAccessor(value)
    const formatValue = useValueFormatter(valueFormat)
    const getGroup = usePropertyAccessor<RawDatum, string>(groupBy)
    const getSize = useSize<RawDatum>(size)
    const getColorId = usePropertyAccessor<Omit<ComputedDatum<RawDatum>, 'color'>, string>(colorBy)
    const getColor = useOrdinalColorScale<Omit<ComputedDatum<RawDatum>, 'color'>>(
        colors,
        getColorId
    )

    const valueScale = useValueScale({
        width,
        height,
        axis,
        getValue,
        scale: valueScaleConfig,
        data,
    })

    const ordinalScale = useOrdinalScale({
        width,
        height,
        axis,
        groups,
        gap,
    })

    const forces = useForces<RawDatum>({
        axis,
        valueScale,
        ordinalScale,
        spacing,
        forceStrength,
    })

    const { nodes, xScale, yScale } = useMemo(
        () =>
            computeNodes<RawDatum>({
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
            }),
        [
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
        ]
    )

    const augmentedNodes: ComputedDatum<RawDatum>[] = useMemo(
        () =>
            nodes.map(node => ({
                ...node,
                formattedValue: formatValue(node.value),
                color: getColor(node),
            })),
        [nodes, formatValue, getColor]
    )

    return {
        nodes: augmentedNodes,
        xScale,
        yScale,
        getColor,
    }
}

export const useBorderWidth = <RawDatum>(
    borderWidth: SwarmPlotCommonProps<RawDatum>['borderWidth']
) =>
    useMemo(() => {
        if (typeof borderWidth === 'function') return borderWidth
        return () => borderWidth
    }, [borderWidth])

export const useNodeMouseHandlers = <RawDatum>({
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    tooltip,
}: Pick<SwarmPlotCommonProps<RawDatum>, 'isInteractive' | 'tooltip'> & MouseHandlers<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const mouseEnterHandler = useCallback(
        (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            if (!isInteractive) return

            showTooltipFromEvent(tooltip(node), event)
            onMouseEnter?.(node, event)
        },
        [isInteractive, onMouseEnter, showTooltipFromEvent, tooltip]
    )

    const mouseMoveHandler = useCallback(
        (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            if (!isInteractive) return

            showTooltipFromEvent(tooltip(node), event)
            onMouseMove?.(node, event)
        },
        [isInteractive, onMouseMove, showTooltipFromEvent, tooltip]
    )

    const mouseLeaveHandler = useCallback(
        (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            if (!isInteractive) return

            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [isInteractive, hideTooltip, onMouseLeave]
    )

    const clickHandler = useCallback(
        (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            if (!isInteractive) return

            onClick?.(node, event)
        },
        [isInteractive, onClick]
    )

    return {
        onMouseEnter: mouseEnterHandler,
        onMouseMove: mouseMoveHandler,
        onMouseLeave: mouseLeaveHandler,
        onClick: clickHandler,
    }
}

const getNodeAnnotationPosition = (node: ComputedDatum<unknown>) => ({
    x: node.x,
    y: node.y,
})

const getNodeAnnotationDimensions = (node: ComputedDatum<unknown>) => ({
    size: node.size,
    width: node.size,
    height: node.size,
})

export const useSwarmPlotAnnotations = <RawDatum>(
    nodes: ComputedDatum<RawDatum>[],
    annotations: AnnotationMatcher<ComputedDatum<RawDatum>>[]
) =>
    useAnnotations<ComputedDatum<RawDatum>>({
        data: nodes,
        annotations,
        getPosition: getNodeAnnotationPosition,
        getDimensions: getNodeAnnotationDimensions,
    })

export const useSwarmPlotLayerContext = <
    RawDatum,
    Scale extends
        | ScaleLinear<number>
        | ScaleTime<string | Date>
        | ScaleOrdinal<string, number, never>
>({
    nodes,
    xScale,
    yScale,
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
    margin,
}: SwarmPlotCustomLayerProps<RawDatum, Scale>): SwarmPlotCustomLayerProps<RawDatum, Scale> =>
    useMemo(
        () => ({
            nodes,
            xScale,
            yScale,
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
            margin,
        }),
        [nodes, xScale, yScale, innerWidth, innerHeight, outerWidth, outerHeight, margin]
    )
