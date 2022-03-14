import { Fragment, ReactNode, useState } from 'react'
import {
    Container,
    useDimensions,
    useTheme,
    // @ts-ignore
    bindDefs,
    SvgWrapper,
    CartesianMarkers,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Crosshair } from '@nivo/tooltip'
import { DefaultLineDatum, LineDatum, LineLayerId, LineSvgProps } from './types'
import { svgDefaultProps } from './defaults'
import { useLine } from './hooks'
import { Areas } from './Areas'
import { Lines } from './Lines'
import { Slices } from './Slices'
import { Points } from './Points'
import { Mesh } from './Mesh'

type InnerLineProps<Datum extends LineDatum, ExtraProps extends object> = Omit<
    LineSvgProps<Datum, ExtraProps>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerLine = <Datum extends LineDatum, ExtraProps extends object>(
    props: InnerLineProps<Datum, ExtraProps>
) => {
    const {
        data,
        xScale: xScaleSpec = svgDefaultProps.xScale,
        xFormat,
        yScale: yScaleSpec = svgDefaultProps.yScale,
        yFormat,
        layers = svgDefaultProps.layers,

        colors = svgDefaultProps.colors,

        margin: partialMargin,
        width,
        height,

        enableGridX = svgDefaultProps.enableGridX,
        gridXValues,
        enableGridY = svgDefaultProps.enableGridY,
        gridYValues,
        axisTop = svgDefaultProps.axisTop,
        axisRight = svgDefaultProps.axisRight,
        axisBottom = svgDefaultProps.axisBottom,
        axisLeft = svgDefaultProps.axisLeft,

        curve = svgDefaultProps.curve,
        lineWidth = svgDefaultProps.lineWidth,
        enableArea = svgDefaultProps.enableArea,
        areaBaselineValue = svgDefaultProps.areaBaselineValue,
        areaOpacity = svgDefaultProps.areaOpacity,
        areaBlendMode = svgDefaultProps.areaBlendMode,

        enablePoints = svgDefaultProps.enablePoints,
        pointSymbol,
        pointSize = svgDefaultProps.pointSize,
        pointColor,
        pointBorderWidth = svgDefaultProps.pointBorderWidth,
        pointBorderColor,
        enablePointLabel = svgDefaultProps.enablePointLabel,
        pointLabel,
        pointLabelYOffset,

        defs = svgDefaultProps.defs,
        fill = svgDefaultProps.fill,

        markers = svgDefaultProps.markers,

        legends = svgDefaultProps.legends,

        isInteractive = svgDefaultProps.isInteractive,
        useMesh = svgDefaultProps.useMesh,
        debugMesh = svgDefaultProps.debugMesh,
        enableSlices = svgDefaultProps.enableSlices,
        debugSlices = svgDefaultProps.debugSlices,
        sliceTooltip = svgDefaultProps.sliceTooltip,
        enableCrosshair = svgDefaultProps.enableCrosshair,
        crosshairType = svgDefaultProps.crosshairType,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip = svgDefaultProps.tooltip,

        role,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
    } = props

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
        currentSlice,
        setCurrentSlice,
        points,
        currentPoint,
        setCurrentPoint,
    } = useLine<Datum>({
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

    series.forEach(serie => {
        console.log(serie)
        serie.data.forEach(datum => {
            console.log(datum)
        })
    })

    const theme = useTheme()
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const layerById: Record<LineLayerId, ReactNode> = {
        grid: null,
        markers: null,
        axes: null,
        areas: null,
        crosshair: null,
        lines: null,
        slices: null,
        points: null,
        mesh: null,
        legends: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <Grid
                key="grid"
                theme={theme}
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        )
    }

    if (markers.length > 0 && layers.includes('markers')) {
        layerById.markers = (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale}
                yScale={yScale}
                theme={theme}
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
                theme={theme}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        )
    }

    if (layers.includes('areas') && enableArea) {
        layerById.areas = (
            <Areas<Datum>
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
            <Lines<Datum>
                key="lines"
                lines={series}
                lineGenerator={lineGenerator}
                lineWidth={lineWidth}
            />
        )
    }

    if (isInteractive && enableSlices && layers.includes('slices')) {
        layerById.slices = (
            <Slices
                key="slices"
                slices={slices!}
                axis={enableSlices}
                debug={debugSlices}
                tooltip={sliceTooltip}
                current={currentSlice}
                setCurrent={setCurrentSlice}
            />
        )
    }

    if (enablePoints && layers.includes('points')) {
        layerById.points = (
            <Points<Datum>
                key="points"
                points={points}
                symbol={pointSymbol}
                size={pointSize}
                borderWidth={pointBorderWidth}
                borderColor={getPointBorderColor}
                enableLabel={enablePointLabel}
                label={pointLabel}
                labelYOffset={pointLabelYOffset}
            />
        )
    }

    if (isInteractive && useMesh && !enableSlices && layers.includes('mesh')) {
        layerById.mesh = (
            <Mesh<Datum>
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

    if (layers.includes('legends') && legends.length > 0) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, legendIndex) => (
                    <BoxLegendSvg
                        key={`legend.${legendIndex}`}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legend.data || legendData}
                        theme={theme}
                        toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
                    />
                ))}
            </Fragment>
        )
    }

    const ___layerById = {}

    const boundDefs = bindDefs(defs, series, fill)

    if (isInteractive && enableCrosshair) {
        if (currentPoint !== null) {
            ___layerById.crosshair = (
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
        if (currentSlice !== null) {
            ___layerById.crosshair = (
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
        >
            {layers.map((layer, layerIndex) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={layerIndex}>
                            {layer({
                                ...props,
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
                            })}
                        </Fragment>
                    )
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Line = <
    Datum extends LineDatum = DefaultLineDatum,
    ExtraProps extends object = Record<string, never>
>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: LineSvgProps<Datum, ExtraProps>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerLine<Datum, ExtraProps> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
