import { ReactNode, Fragment, createElement } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { AnyScale } from '@nivo/scales'
import { Axes, Grid } from '@nivo/axes'
import { Mesh } from '@nivo/voronoi'
import { ComputedDatum, SwarmPlotLayerId, SwarmPlotSvgProps } from './types'
import { defaultProps } from './props'
import { useSwarmPlot, useSwarmPlotLayerContext, useNodeMouseHandlers } from './hooks'
import { Circles } from './Circles'
import { CircleSvg } from './CircleSvg'
import { SwarmPlotAnnotations } from './SwarmPlotAnnotations'

type InnerSwarmPlotProps<RawDatum> = Partial<
    Omit<
        SwarmPlotSvgProps<RawDatum>,
        'data' | 'groups' | 'width' | 'height' | 'isInteractive' | 'animate' | 'motionConfig'
    >
> &
    Pick<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height' | 'isInteractive'>

const InnerSwarmPlot = <RawDatum,>({
    data,
    width,
    height,
    margin: partialMargin,
    id = defaultProps.id,
    value = defaultProps.value,
    valueScale = defaultProps.valueScale,
    valueFormat,
    groups,
    groupBy = defaultProps.groupBy,
    size = defaultProps.size,
    forceStrength = defaultProps.forceStrength,
    simulationIterations = defaultProps.simulationIterations,
    colors = defaultProps.colors as OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color'>>,
    colorBy = defaultProps.colorBy,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    layout = defaultProps.layout,
    spacing = defaultProps.spacing,
    gap = defaultProps.gap,
    layers = defaultProps.layers,
    circleComponent = CircleSvg,
    useMesh = defaultProps.useMesh,
    debugMesh = defaultProps.debugMesh,
    enableGridX = defaultProps.enableGridX,
    gridXValues,
    enableGridY = defaultProps.enableGridY,
    gridYValues,
    axisTop = defaultProps.axisTop,
    axisRight = defaultProps.axisRight,
    axisBottom = defaultProps.axisBottom,
    axisLeft = defaultProps.axisLeft,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = defaultProps.tooltip,
    annotations = defaultProps.annotations,
    role = defaultProps.role,
}: InnerSwarmPlotProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, ...props } = useSwarmPlot<RawDatum>({
        width: innerWidth,
        height: innerHeight,
        data,
        id,
        value,
        valueFormat,
        valueScale,
        groups,
        groupBy,
        size,
        spacing,
        layout,
        gap,
        colors,
        colorBy,
        forceStrength,
        simulationIterations,
    })

    const xScale = props.xScale as Exclude<typeof props.xScale, ComputedDatum<RawDatum>[]>
    const yScale = props.yScale as Exclude<typeof props.yScale, ComputedDatum<RawDatum>[]>

    const handlers = useNodeMouseHandlers({
        isInteractive,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        tooltip,
    })

    const layerById: Record<SwarmPlotLayerId, ReactNode> = {
        grid: null,
        axes: null,
        circles: null,
        annotations: null,
        mesh: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? (xScale as AnyScale) : null}
                xValues={gridXValues}
                yScale={enableGridY ? (yScale as AnyScale) : null}
                yValues={gridYValues}
            />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale as AnyScale}
                yScale={yScale as AnyScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop ?? undefined}
                right={axisRight ?? undefined}
                bottom={axisBottom ?? undefined}
                left={axisLeft ?? undefined}
            />
        )
    }

    if (layers.includes('circles')) {
        layerById.circles = (
            <Circles<RawDatum>
                key="circles"
                nodes={nodes}
                borderWidth={0}
                borderColor={borderColor}
                isInteractive={isInteractive}
                tooltip={tooltip}
                component={circleComponent}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
        )
    }

    if (layers.includes('annotations')) {
        layerById.annotations = (
            <SwarmPlotAnnotations<RawDatum>
                key="annotations"
                nodes={nodes}
                annotations={annotations}
            />
        )
    }

    if (isInteractive && useMesh) {
        layerById.mesh = (
            <Mesh
                key="mesh"
                nodes={nodes}
                width={innerWidth}
                height={innerHeight}
                onMouseEnter={handlers.onMouseEnter}
                onMouseMove={handlers.onMouseMove}
                onMouseLeave={handlers.onMouseLeave}
                onClick={handlers.onClick}
                debug={debugMesh}
            />
        )
    }

    const layerContext = useSwarmPlotLayerContext({
        nodes,
        xScale,
        yScale,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin,
    })

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
            {layers.map((layer, i) => {
                if (layerById[layer as SwarmPlotLayerId] !== undefined) {
                    return layerById[layer as SwarmPlotLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const SwarmPlot = <RawDatum,>({
    theme,
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: Partial<Omit<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>> &
    Pick<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerSwarmPlot<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
