import { createElement, Fragment, ReactNode, useMemo } from 'react'
import { SvgWrapper, Container, useDimensions, CartesianMarkers } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { useScatterPlot } from './hooks'
import { svgDefaultProps } from './props'
import { ScatterPlotAnnotations } from './ScatterPlotAnnotations'
import { Nodes } from './Nodes'
import { Mesh } from './Mesh'
import { ScatterPlotDatum, ScatterPlotLayerId, ScatterPlotSvgProps } from './types'

type InnerScatterPlotProps<RawDatum extends ScatterPlotDatum> = Omit<
    ScatterPlotSvgProps<RawDatum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerScatterPlot = <RawDatum extends ScatterPlotDatum>({
    data,
    xScale: xScaleSpec = svgDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = svgDefaultProps.yScale,
    yFormat,
    width,
    height,
    margin: partialMargin,
    layers = svgDefaultProps.layers,
    colors = svgDefaultProps.colors,
    blendMode = svgDefaultProps.blendMode,
    nodeId = svgDefaultProps.nodeId,
    nodeSize = svgDefaultProps.nodeSize,
    nodeComponent = svgDefaultProps.nodeComponent,
    enableGridX = svgDefaultProps.enableGridX,
    enableGridY = svgDefaultProps.enableGridY,
    gridXValues,
    gridYValues,
    axisTop,
    axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,
    annotations = svgDefaultProps.annotations,
    isInteractive = svgDefaultProps.isInteractive,
    useMesh = svgDefaultProps.useMesh,
    debugMesh = svgDefaultProps.debugMesh,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = svgDefaultProps.tooltip,
    markers = svgDefaultProps.markers,
    legends = svgDefaultProps.legends,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerScatterPlotProps<RawDatum>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { xScale, yScale, nodes, legendData } = useScatterPlot<RawDatum>({
        data,
        xScaleSpec,
        xFormat,
        yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        nodeId,
        nodeSize,
        colors,
    })

    const customLayerProps = useMemo(
        () => ({
            xScale,
            yScale,
            nodes,
            margin,
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
        }),
        [xScale, yScale, nodes, margin, innerWidth, innerHeight, outerWidth, outerHeight]
    )

    const layerById: Record<ScatterPlotLayerId, ReactNode> = {
        grid: null,
        axes: null,
        nodes: null,
        markers: null,
        mesh: null,
        annotations: null,
        legends: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? (xScale as any) : null}
                yScale={enableGridY ? (yScale as any) : null}
                xValues={gridXValues}
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
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('nodes')) {
        layerById.nodes = (
            <Nodes<RawDatum>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                isInteractive={isInteractive}
                tooltip={tooltip}
                blendMode={blendMode}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
        )
    }

    if (layers.includes('markers')) {
        layerById.markers = (
            <CartesianMarkers<RawDatum['x'], RawDatum['y']>
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale as (value: RawDatum['x']) => number}
                yScale={yScale as (value: RawDatum['y']) => number}
            />
        )
    }

    if (layers.includes('mesh') && isInteractive && useMesh) {
        layerById.mesh = (
            <Mesh<RawDatum>
                key="mesh"
                nodes={nodes}
                width={innerWidth}
                height={innerHeight}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
                debug={debugMesh}
            />
        )
    }

    if (layers.includes('annotations')) {
        layerById.annotations = (
            <ScatterPlotAnnotations<RawDatum>
                key="annotations"
                nodes={nodes}
                annotations={annotations}
            />
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = legends.map((legend, i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={innerWidth}
                containerHeight={innerHeight}
                data={legendData}
            />
        ))
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'string' && layerById[layer] !== undefined) {
                    return layerById[layer]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                throw new Error(`Unknown layer (${layer})`)
            })}
        </SvgWrapper>
    )
}

export const ScatterPlot = <RawDatum extends ScatterPlotDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: ScatterPlotSvgProps<RawDatum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerScatterPlot<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
