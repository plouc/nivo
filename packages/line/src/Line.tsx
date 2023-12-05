import { Fragment, ReactNode, useState } from 'react'
import {
    Container,
    useDimensions,
    SvgWrapper,
    CartesianMarkers,
    // @ts-ignore
    bindDefs,
} from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Crosshair } from '@nivo/tooltip'
import { LayerId, LineSvgProps, LineSeries, SliceDatum, PointDatum } from './types'
import { svgDefaultProps } from './props'
import { useLine } from './hooks'
import { Areas } from './Areas'
import { Lines } from './Lines'
import { Slices } from './Slices'
import { Points } from './Points'
import { Mesh } from './Mesh'

type InnerLineProps<Series extends LineSeries> = Omit<
    LineSvgProps<Series>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerLine = <Series extends LineSeries>({
    data,
    xScale: xScaleSpec = svgDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = svgDefaultProps.yScale,
    yFormat,
    layers = svgDefaultProps.layers,
    curve = svgDefaultProps.curve,
    lineWidth = svgDefaultProps.lineWidth,

    colors = svgDefaultProps.colors,

    margin: partialMargin,
    width,
    height,

    axisTop,
    axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,
    enableGridX = svgDefaultProps.enableGridX,
    gridXValues,
    enableGridY = svgDefaultProps.enableGridY,
    gridYValues,

    enablePoints = svgDefaultProps.enablePoints,
    pointSymbol,
    pointSize = svgDefaultProps.pointSize,
    pointColor = svgDefaultProps.pointColor,
    pointBorderWidth = svgDefaultProps.pointBorderWidth,
    pointBorderColor = svgDefaultProps.pointBorderColor,
    enablePointLabel = svgDefaultProps.enablePointLabel,
    pointLabel = svgDefaultProps.pointLabel,
    pointLabelYOffset,

    enableArea = svgDefaultProps.enableArea,
    areaBaselineValue = svgDefaultProps.areaBaselineValue as Exclude<
        Series['data'][0]['y'],
        null | undefined
    >,
    areaOpacity = svgDefaultProps.areaOpacity,
    areaBlendMode = svgDefaultProps.areaBlendMode,

    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    markers = svgDefaultProps.markers,
    legends = svgDefaultProps.legends,

    isInteractive = svgDefaultProps.isInteractive,
    useMesh = svgDefaultProps.useMesh,
    debugMesh = svgDefaultProps.debugMesh,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = svgDefaultProps.tooltip,

    enableSlices = svgDefaultProps.enableSlices,
    debugSlices = svgDefaultProps.debugSlices,
    sliceTooltip = svgDefaultProps.sliceTooltip,
    enableCrosshair = svgDefaultProps.enableCrosshair,
    crosshairType = svgDefaultProps.crosshairType,

    role = svgDefaultProps.role,
}: InnerLineProps<Series>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        legendData,
        toggleSerie,
        lineGenerator,
        areaGenerator,
        series,
        xScale,
        yScale,
        slices,
        points,
    } = useLine<Series>({
        data,
        xScale: xScaleSpec,
        xFormat,
        yScale: yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        colors,
        curve,
        areaBaselineValue,
        pointColor,
        pointBorderColor,
        enableSlices,
    })

    const [currentPoint, setCurrentPoint] = useState<PointDatum<Series['data'][0]> | null>(null)
    const [currentSlice, setCurrentSlice] = useState<SliceDatum<Series['data'][0]> | null>(null)

    const layerById: Record<LayerId, ReactNode> = {
        grid: null,
        markers: null,
        axes: null,
        areas: null,
        lines: null,
        slices: null,
        points: null,
        crosshair: null,
        mesh: null,
        legends: null,
    }

    const boundDefs = bindDefs(defs, series, fill)

    if (layers.includes('grid') && (enableGridX || enableGridY)) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        )
    }

    if (layers.includes('markers')) {
        layerById.markers = (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale}
                yScale={yScale}
            />
        )
    }

    if (layers.includes('axes')) {
        layerById.axes = (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (enableArea && layers.includes('areas')) {
        layerById.areas = (
            <Areas<Series>
                key="areas"
                areaGenerator={areaGenerator}
                areaOpacity={areaOpacity}
                areaBlendMode={areaBlendMode}
                lines={series}
            />
        )
    }

    if (layers.includes('lines')) {
        layerById.lines = (
            <Lines<Series>
                key="lines"
                lines={series}
                lineGenerator={lineGenerator}
                lineWidth={lineWidth}
            />
        )
    }

    if (isInteractive && enableSlices !== false && layers.includes('slices')) {
        layerById.slices = (
            <Slices<Series['data'][0]>
                key="slices"
                slices={slices}
                axis={enableSlices}
                debug={debugSlices}
                height={innerHeight}
                tooltip={sliceTooltip}
                current={currentSlice}
                setCurrent={setCurrentSlice}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
        )
    }

    if (enablePoints && layers.includes('points')) {
        layerById.points = (
            <Points<Series['data'][0]>
                key="points"
                points={points}
                symbol={pointSymbol}
                size={pointSize}
                borderWidth={pointBorderWidth}
                enableLabel={enablePointLabel}
                label={pointLabel}
                labelYOffset={pointLabelYOffset}
            />
        )
    }

    if (isInteractive && enableCrosshair && layers.includes('crosshair')) {
        if (currentPoint !== null) {
            layerById.crosshair = (
                <Crosshair
                    key="crosshair"
                    width={innerWidth}
                    height={innerHeight}
                    x={currentPoint.x}
                    y={currentPoint.y}
                    type={crosshairType}
                />
            )
        }
        if (enableSlices !== false && currentSlice !== null) {
            layerById.crosshair = (
                <Crosshair
                    key="crosshair"
                    width={innerWidth}
                    height={innerHeight}
                    x={currentSlice.x}
                    y={currentSlice.y}
                    type={enableSlices}
                />
            )
        }
    }

    if (isInteractive && useMesh && enableSlices === false && layers.includes('mesh')) {
        layerById.mesh = (
            <Mesh<Series['data'][0]>
                key="mesh"
                points={points}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                setCurrent={setCurrentPoint}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
                debug={debugMesh}
            />
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={`legend.${i}`}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legend.data || legendData}
                        toggleSerie={
                            legend.toggleSerie
                                ? (toggleSerie as (id: string | number) => void)
                                : undefined
                        }
                    />
                ))}
            </Fragment>
        )
    }

    return (
        <SvgWrapper
            defs={boundDefs}
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                innerWidth,
                                innerHeight,
                                series,
                                // slices,
                                points,
                                xScale,
                                yScale,
                                lineGenerator,
                                lineWidth,
                                areaGenerator,
                                // currentPoint,
                                // setCurrentPoint,
                                // currentSlice,
                                // setCurrentSlice,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

export const Line = <Series extends LineSeries>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...innerProps
}: LineSvgProps<Series>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerLine<Series> isInteractive={isInteractive} {...innerProps} />
    </Container>
)
