import { Fragment, ReactNode, useState, forwardRef, Ref, ReactElement } from 'react'
import {
    // @ts-expect-error no types
    bindDefs,
    useDimensions,
    SvgWrapper,
    CartesianMarkers,
    Container,
    LineCurveFactoryId,
    WithChartRef,
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
    PointColorContext,
    SliceData,
    LineCustomSvgLayerProps,
    PointTooltipComponent,
    SliceTooltipComponent,
    LineSvgPropsWithDefaults,
} from './types'
import { svgDefaultProps } from './defaults'

function InnerLine<Series extends LineSeries>(
    props: LineSvgProps<Series> & { forwardedRef: Ref<SVGSVGElement> }
) {
    const {
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
        pointColor = svgDefaultProps.pointColor as InheritedColorConfig<PointColorContext<Series>>,
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
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        isFocusable = svgDefaultProps.isFocusable,
        pointAriaLabel,
        pointAriaLabelledBy,
        pointAriaDescribedBy,
        pointAriaHidden,
        pointAriaDisabled,
        initialHiddenIds = svgDefaultProps.initialHiddenIds as InferSeriesId<Series>[],
        forwardedRef,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

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
        height: innerHeight,
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
                yScale={yScale as AnyScale}
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
                isFocusable={isFocusable}
                setCurrentPoint={setCurrentPoint}
                tooltip={tooltip}
                margin={margin}
                ariaLabel={pointAriaLabel}
                ariaLabelledBy={pointAriaLabelledBy}
                ariaDescribedBy={pointAriaDescribedBy}
                ariaHidden={pointAriaHidden}
                ariaDisabled={pointAriaDisabled}
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

    const customLayerProps: LineCustomSvgLayerProps<Series> = {
        ...(props as LineSvgPropsWithDefaults<Series>),
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
    }

    return (
        <SvgWrapper
            defs={boundDefs}
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
            isFocusable={isFocusable}
            ref={forwardedRef}
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

export const Line = forwardRef(
    <Series extends LineSeries>(
        {
            isInteractive = svgDefaultProps.isInteractive,
            animate = svgDefaultProps.animate,
            motionConfig = svgDefaultProps.motionConfig,
            theme,
            renderWrapper,
            ...otherProps
        }: LineSvgProps<Series>,
        ref: Ref<SVGSVGElement>
    ) => (
        <Container
            animate={animate}
            isInteractive={isInteractive}
            motionConfig={motionConfig}
            renderWrapper={renderWrapper}
            theme={theme}
        >
            <InnerLine<Series> isInteractive={isInteractive} {...otherProps} forwardedRef={ref} />
        </Container>
    )
) as <Series extends LineSeries>(
    props: WithChartRef<LineSvgProps<Series>, SVGSVGElement>
) => ReactElement
