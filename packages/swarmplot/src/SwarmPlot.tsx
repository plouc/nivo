import React, { ReactNode } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { Mesh } from '@nivo/voronoi'
import { ComputedDatum, SwarmPlotLayerId, SwarmPlotSvgProps } from './types'
import { defaultProps } from './props'
import { useSwarmPlot } from './hooks'
import { Circles } from './Circles'
import { CircleSvg } from './CircleSvg'
// import SwarmPlotAnnotations from './SwarmPlotAnnotations'

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
    enableGridX,
    gridXValues,
    enableGridY,
    gridYValues,
    axisTop = defaultProps.axisTop,
    axisRight = defaultProps.axisRight,
    axisBottom = defaultProps.axisBottom,
    axisLeft = defaultProps.axisLeft,
    isInteractive,
    // onMouseEnter,
    // onMouseMove,
    // onMouseLeave,
    // onClick,
    tooltip = defaultProps.tooltip,
    role = defaultProps.role,
}: InnerSwarmPlotProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, xScale, yScale } = useSwarmPlot<RawDatum>({
        width: innerWidth,
        height: innerHeight,
        data,
        id,
        value,
        valueFormat,
        valueScale: defaultProps.valueScale,
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

    const layerById: Record<SwarmPlotLayerId, ReactNode> = {
        grid: null,
        axes: null,
        nodes: null,
        mesh: null,
        annotations: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? (xScale as any) : null}
                xValues={gridXValues}
                yScale={enableGridY ? (yScale as any) : null}
                yValues={gridYValues}
            />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale as any}
                yScale={yScale as any}
                width={innerWidth}
                height={innerHeight}
                top={axisTop ?? undefined}
                right={axisRight ?? undefined}
                bottom={axisBottom ?? undefined}
                left={axisLeft ?? undefined}
            />
        )
    }

    if (layers.includes('nodes')) {
        layerById.nodes = (
            <Circles<RawDatum>
                key="nodes"
                nodes={nodes}
                borderWidth={0}
                borderColor={borderColor}
                isInteractive={isInteractive}
                tooltip={tooltip}
                component={circleComponent}
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
                // onMouseEnter={handlers.onMouseEnter}
                // onMouseMove={handlers.onMouseMove}
                // onMouseLeave={handlers.onMouseLeave}
                // onClick={handlers.onClick}
                debug={debugMesh}
            />
        )
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            //defs={boundDefs}
            role={role}
        >
            {layers.map(layer => {
                if (layerById[layer as SwarmPlotLayerId] !== undefined) {
                    return layerById[layer as SwarmPlotLayerId]
                }

                if (typeof layer === 'function') {
                    // return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
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
    ...otherProps
}: Partial<Omit<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>> &
    Pick<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>) => (
    <Container
        isInteractive={isInteractive}
        animate={animate}
        motionConfig={motionConfig}
        theme={theme}
    >
        <InnerSwarmPlot<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)

/*
const getBorderWidth = useBorderWidth(borderWidth)
const getBorderColor = useInheritedColor(borderColor, theme)

const layerById = {
    annotations: (
        <SwarmPlotAnnotations
            key="annotations"
            nodes={nodes}
            annotations={annotations}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            animate={animate}
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
        />
    ),
}

const enableNodeInteractivity = isInteractive && !useMesh
const handlers = useNodeMouseHandlers({
    isEnabled: isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
})

if (animate) {
    layerById.nodes = (
        <AnimatedSwarmPlotNodes
            key="nodes"
            nodes={nodes}
            renderNode={renderNode}
            getBorderWidth={getBorderWidth}
            getBorderColor={getBorderColor}
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
            isInteractive={enableNodeInteractivity}
            onMouseEnter={!useMesh ? handlers.onMouseEnter : undefined}
            onMouseMove={!useMesh ? handlers.onMouseMove : undefined}
            onMouseLeave={!useMesh ? handlers.onMouseLeave : undefined}
            onClick={!useMesh ? handlers.onClick : undefined}
        />
    )
} else {
    layerById.nodes = (
        <StaticSwarmPlotNodes
            key="nodes"
            nodes={nodes}
            renderNode={renderNode}
            getBorderWidth={getBorderWidth}
            getBorderColor={getBorderColor}
            isInteractive={enableNodeInteractivity}
            onMouseEnter={!useMesh ? handlers.onMouseEnter : undefined}
            onMouseMove={!useMesh ? handlers.onMouseMove : undefined}
            onMouseLeave={!useMesh ? handlers.onMouseLeave : undefined}
            onClick={!useMesh ? handlers.onClick : undefined}
        />
    )
}

const layerContext = {
    nodes,
    xScale,
    yScale,
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
    margin,
    getBorderColor,
    getBorderWidth,
    animate,
    motionStiffness,
    motionDamping,
}
*/
