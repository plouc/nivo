import { Fragment, ReactNode, useMemo, useState } from 'react'
import { scaleBand } from 'd3-scale'
import {
    // @ts-ignore
    bindDefs,
    useDimensions,
    SvgWrapper,
    CartesianMarkers,
    Container,
    LineCurveFactoryId,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Crosshair, CrosshairType } from '@nivo/tooltip'
import { AnyScale } from '@nivo/scales'
import { useLine } from './hooks'
import { Areas } from './Areas'
import { Lines } from './Lines'
import { Slices } from './Slices'
import { Points } from './Points'
import { Mesh } from './Mesh'
import {
    LineSeries,
    InferSeriesId,
    InferY,
    LineLayerId,
    LineSvgProps,
    Point,
    ComputedSeries,
    SliceData,
    LineCustomSvgLayerProps,
    PointTooltipComponent,
    SliceTooltipComponent,
} from './types'
import { svgDefaultProps } from './defaults'

function InnerLineMulti<Series extends LineSeries>({
    data,
    xScale: xScaleSpec = svgDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = svgDefaultProps.yScale,
    yFormat,
    curve = svgDefaultProps.curve as LineCurveFactoryId,

    margin: partialMargin,
    width,
    height,

    colors = svgDefaultProps.colors as OrdinalColorScaleConfig<Series>,
    lineWidth = svgDefaultProps.lineWidth as number,

    layers = svgDefaultProps.layers as readonly LineLayerId[],

    enableArea = svgDefaultProps.enableArea,
    areaBaselineValue = svgDefaultProps.areaBaselineValue as InferY<Series>,
    areaOpacity = svgDefaultProps.areaOpacity,
    areaBlendMode = svgDefaultProps.areaBlendMode,

    enablePoints = svgDefaultProps.enablePoints,
    pointSymbol,
    pointSize = svgDefaultProps.pointSize,
    pointColor = svgDefaultProps.pointColor as InheritedColorConfig<ComputedSeries<Series>>,
    pointBorderWidth = svgDefaultProps.pointBorderWidth,
    pointBorderColor = svgDefaultProps.pointBorderColor as InheritedColorConfig<
        Omit<Point<Series>, 'borderColor'>
    >,
    enablePointLabel = svgDefaultProps.enablePointLabel,
    pointLabel = svgDefaultProps.pointLabel as string,
    pointLabelYOffset,

    enableGridX = svgDefaultProps.enableGridX,
    gridXValues,
    enableGridY = svgDefaultProps.enableGridY,
    gridYValues,
    axisTop,
    axisRight,
    axisBottom = svgDefaultProps.axisBottom,
    axisLeft = svgDefaultProps.axisLeft,

    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,

    markers,

    legends = svgDefaultProps.legends,

    isInteractive = svgDefaultProps.isInteractive,
    useMesh = svgDefaultProps.useMesh,
    debugMesh = svgDefaultProps.debugMesh,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    tooltip = svgDefaultProps.tooltip as PointTooltipComponent<Series>,
    enableSlices = svgDefaultProps.enableSlices,
    debugSlices = svgDefaultProps.debugSlices,
    sliceTooltip = svgDefaultProps.sliceTooltip as SliceTooltipComponent<Series>,
    enableCrosshair = svgDefaultProps.enableCrosshair,
    crosshairType = svgDefaultProps.crosshairType as CrosshairType,
    enableTouchCrosshair = svgDefaultProps.enableTouchCrosshair,

    role = svgDefaultProps.role,
    initialHiddenIds = svgDefaultProps.initialHiddenIds as InferSeriesId<Series>[],
}: LineSvgProps<Series>) {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const multiScale = scaleBand<InferY<Series>>().domain(data.map(series => series.id)).range([innerHeight, 0]).paddingInner(.1).paddingOuter(.2)
    console.log(multiScale(data[0].id))
    console.log(multiScale(data[1].id))

    const {
        legendData,
        toggleSeries,
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
        height: multiScale.bandwidth(),
        colors,
        curve,
        areaBaselineValue,
        pointColor,
        pointBorderColor,
        enableSlices,
        initialHiddenIds,
    })

    const [currentPoint, setCurrentPoint] = useState<Point<Series> | null>(null)
    const [currentSlice, setCurrentSlice] = useState<SliceData<Series> | null>(null)

    const layerById: Record<LineLayerId, ReactNode> = {
        grid: null,
        markers: null,
        axes: null,
        areas: null,
        crosshair: null,
        lines: null,
        points: null,
        slices: null,
        mesh: null,
        legends: null,
    }

    if (layers.includes('grid') && (enableGridX || enableGridY)) {
        layerById.grid = (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? (xScale as AnyScale) : null}
                yScale={enableGridY ? (yScale as AnyScale) : null}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        )
    }

    layerById.grid = (
        <Fragment key="grid">
            {data.map(series => {
                return (
                    <rect
                        key={`${series.id}`}
                        x={0}
                        y={multiScale(series.id)}
                        width={innerWidth}
                        height={multiScale.bandwidth()}
                        fill="#ff0000"
                        opacity={0.5}
                    />
                )
            })}
        </Fragment>
    )

    if (layers.includes('markers') && Array.isArray(markers) && markers.length > 0) {
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
                xScale={xScale as AnyScale}
                yScale={multiScale as AnyScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('lines')) {
        layerById.lines = (
            <Lines<Series>
                key="lines"
                series={series}
                lineGenerator={lineGenerator}
                lineWidth={lineWidth}
            />
        )
    }

    if (layers.includes('legends') && legends.length > 0) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legend.data || legendData}
                        toggleSerie={
                            legend.toggleSerie
                                ? (toggleSeries as (id: string | number) => void)
                                : undefined
                        }
                    />
                ))}
            </Fragment>
        )
    }

    const boundDefs = bindDefs(defs, series, fill)

    if (enableArea) {
        layerById.areas = (
            <Areas<Series>
                key="areas"
                areaGenerator={areaGenerator}
                areaOpacity={areaOpacity}
                areaBlendMode={areaBlendMode}
                series={series}
            />
        )
    }

    if (isInteractive && enableSlices !== false) {
        layerById.slices = (
            <Slices<Series>
                key="slices"
                slices={slices}
                axis={enableSlices}
                debug={debugSlices}
                tooltip={sliceTooltip}
                current={currentSlice}
                setCurrent={setCurrentSlice}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            />
        )
    }

    if (enablePoints) {
        layerById.points = (
            <Points<Series>
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

    if (isInteractive && enableCrosshair) {
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
        if (currentSlice !== null && enableSlices) {
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

    if (isInteractive && useMesh && enableSlices === false) {
        layerById.mesh = (
            <Mesh<Series>
                key="mesh"
                points={points}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                setCurrent={setCurrentPoint}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                tooltip={tooltip}
                enableTouchCrosshair={enableTouchCrosshair}
                debug={debugMesh}
            />
        )
    }

    const customLayerProps: LineCustomSvgLayerProps<Series> = useMemo(
        () => ({
            innerWidth,
            innerHeight,
            series,
            slices,
            points,
            xScale,
            yScale,
            lineGenerator,
            areaGenerator,
            currentPoint,
            setCurrentPoint,
            currentSlice,
            setCurrentSlice,
        }),
        [
            innerWidth,
            innerHeight,
            series,
            slices,
            points,
            xScale,
            yScale,
            lineGenerator,
            areaGenerator,
            currentPoint,
            setCurrentPoint,
            currentSlice,
            setCurrentSlice,
        ]
    )

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
                    return <Fragment key={i}>{layer(customLayerProps)}</Fragment>
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

export function LineMulti<Series extends LineSeries>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: LineSvgProps<Series>) {
    return (
        <Container
            {...{
                animate,
                isInteractive,
                motionConfig,
                renderWrapper,
                theme,
            }}
        >
            <InnerLineMulti<Series> isInteractive={isInteractive} {...otherProps} />
        </Container>
    )
}
