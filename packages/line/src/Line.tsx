/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useState, useMemo } from 'react'
import {
    Dimensions,
    bindDefs,
    withContainer,
    useDimensions,
    useTheme,
    SvgWrapper,
    CartesianMarkers,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Crosshair, TooltipProvider } from '@nivo/tooltip';
import { useLine, Point, Slice } from './hooks'
import Areas from './Areas'
import Lines from './Lines'
import Slices from './Slices'
import Points from './Points'
import Mesh from './Mesh'
import { ResponsiveLineProps } from './ResponsiveLine'
import { LineDefaultProps } from './props'

export interface LineProps extends ResponsiveLineProps, Dimensions {};

export function Line(props: LineProps) {
  const {
    width,
    height,
    margin: partialMargin,
    data,
    xScale: xScaleSpec = LineDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = LineDefaultProps.yScale,
    yFormat,
    curve = LineDefaultProps.curve,
    layers = LineDefaultProps.layers,
    colors = LineDefaultProps.colors,
    lineWidth = LineDefaultProps.lineWidth,
    enableArea = LineDefaultProps.enableArea,
    areaBaselineValue = LineDefaultProps.areaBaselineValue,
    areaOpacity = LineDefaultProps.areaOpacity,
    enablePoints = LineDefaultProps.enablePoints,
    pointSize = LineDefaultProps.pointSize,
    pointColor = LineDefaultProps.pointColor,
    pointBorderWidth = LineDefaultProps.pointBorderWidth,
    pointBorderColor = LineDefaultProps.pointBorderColor,
    axisTop = LineDefaultProps.axisTop,
    axisRight= LineDefaultProps.axisRight,
    axisBottom = LineDefaultProps.axisBottom,
    axisLeft = LineDefaultProps.axisLeft,
    legends = LineDefaultProps.legends,
    enableGridX = LineDefaultProps.enableGridX,
    gridXValues,
    enableGridY = LineDefaultProps.enableGridY,
    gridYValues,
    areaBlendMode = LineDefaultProps.areaBlendMode,
    pointSymbol,
    enablePointLabel = LineDefaultProps.enablePointLabel,
    pointLabel = LineDefaultProps.pointLabel,
    pointLabelYOffset,
    defs = LineDefaultProps.defs,
    fill = LineDefaultProps.fill,
    markers,
    isInteractive = LineDefaultProps.isInteractive,
    useMesh,
    debugMesh = LineDefaultProps.debugMesh,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = LineDefaultProps.tooltip,
    enableSlices = LineDefaultProps.enableSlices,
    debugSlices = LineDefaultProps.debugSlices,
    sliceTooltip = LineDefaultProps.sliceTooltip,
    enableCrosshair = LineDefaultProps.enableCrosshair,
    crosshairType = LineDefaultProps.crosshairType
  } = props;

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { lineGenerator, areaGenerator, series, xScale, yScale, slices, points } = useLine({
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

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const [currentPoint, setCurrentPoint] = useState<Point | null>(null)
    const [currentSlice, setCurrentSlice] = useState<Slice | null>(null)

    const legendData = useMemo(
        () =>
            series
                .map(line => ({
                    id: line.id,
                    label: line.id,
                    color: line.color,
                }))
                .reverse(),
        [series]
    )

    const layerById: {
        [layer: string]: React.ReactNode;
    } = {
        grid: (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : undefined}
                yScale={enableGridY ? yScale : undefined}
                xValues={gridXValues}
                yValues={gridYValues}
            />
        ),
        markers: (
            <CartesianMarkers
                key="markers"
                markers={markers}
                width={innerWidth}
                height={innerHeight}
                xScale={xScale}
                yScale={yScale}
                theme={theme}
            />
        ),
        axes: (
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
        ),
        areas: null,
        lines: (
            <Lines key="lines" lines={series} lineGenerator={lineGenerator} lineWidth={lineWidth} />
        ),
        slices: null,
        points: null,
        crosshair: null,
        mesh: null,
        legends: <>
            {legends.map((legend, i) => (
                <BoxLegendSvg
                    key={`legend.${i}`}
                    {...legend}
                    containerWidth={innerWidth}
                    containerHeight={innerHeight}
                    data={legend.data || legendData}
                    theme={theme}
                />
            ))}
        </>,
    }

    const boundDefs = bindDefs(defs, series, fill)

    if (enableArea) {
        layerById.areas = (
            <Areas
                key="areas"
                areaGenerator={areaGenerator}
                areaOpacity={areaOpacity}
                areaBlendMode={areaBlendMode}
                lines={series}
            />
        )
    }

    if (isInteractive && enableSlices !== false) {
        layerById.slices = (
            <Slices
                key="slices"
                slices={slices}
                axis={enableSlices}
                debug={debugSlices}
                height={innerHeight}
                tooltip={sliceTooltip}
                current={currentSlice}
                setCurrent={setCurrentSlice}
            />
        )
    }

    if (enablePoints) {
        layerById.points = (
            <Points
                key="points"
                points={points}
                symbol={pointSymbol}
                size={pointSize}
                color={getPointColor}
                borderWidth={pointBorderWidth}
                borderColor={getPointBorderColor}
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
        if (currentSlice !== null) {
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
            <Mesh
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

    return (
        <TooltipProvider>
            <SvgWrapper defs={boundDefs} width={outerWidth} height={outerHeight} margin={margin}>
                {layers.map((layer, i) => {
                    if (typeof layer === 'function') {
                        return (
                            <Fragment key={i}>
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

                    return layerById[layer]
                })}
            </SvgWrapper>
        </TooltipProvider>
    )
}

export default withContainer(Line)
