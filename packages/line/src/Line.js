/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, useState } from 'react'
import { withContainer, useDimensions, useTheme, SvgWrapper, CartesianMarkers } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { Crosshair } from '@nivo/tooltip'
import { useLine, useLinePoints } from './hooks'
import { LinePropTypes, LineDefaultProps } from './props'
import LineAreas from './LineAreas'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LinePoints from './LinePoints'
import LineMesh from './LineMesh'

const Line = props => {
    const {
        data,
        xScale: xScaleSpec,
        xFormat,
        yScale: yScaleSpec,
        yFormat,
        layers,
        curve,
        areaBaselineValue,

        colors,

        margin: partialMargin,
        width,
        height,

        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        enableGridX,
        enableGridY,
        gridXValues,
        gridYValues,

        lineWidth,
        enableArea,
        areaOpacity,
        areaBlendMode,

        enablePoints,
        pointSymbol,
        pointSize,
        pointColor,
        pointBorderWidth,
        pointBorderColor,
        enablePointLabel,
        pointLabel,
        pointLabelFormat,
        pointLabelYOffset,

        markers,

        legends,

        isInteractive,
        useMesh,
        debugMesh,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
        tooltipFormat,
        enableStackTooltip,
        stackTooltip,

        enableCrosshair,
        crosshairType,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { lineGenerator, areaGenerator, series, xScale, yScale, slices } = useLine({
        data,
        xScale: xScaleSpec,
        yScale: yScaleSpec,
        width: innerWidth,
        height: innerHeight,
        colors,
        curve,
        areaBaselineValue,
    })

    const points = useLinePoints({
        isEnabled:
            enablePoints === true ||
            (isInteractive === true && useMesh === true && enableStackTooltip !== true),
        series,
        xFormat,
        yFormat,
        color: pointColor,
        borderColor: pointBorderColor,
    })

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const [currentPoint, setCurrentPoint] = useState(null)

    const legendData = series
        .map(line => ({
            id: line.id,
            label: line.id,
            color: line.color,
        }))
        .reverse()

    const layerById = {
        grid: (
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
                theme={theme}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        ),
        areas: null,
        lines: (
            <LineLines
                key="lines"
                lines={series}
                lineGenerator={lineGenerator}
                lineWidth={lineWidth}
            />
        ),
        slices: null,
        points: null,
        crosshair: null,
        mesh: null,
        legends: legends.map((legend, i) => (
            <BoxLegendSvg
                key={`legend.${i}`}
                {...legend}
                containerWidth={innerWidth}
                containerHeight={innerHeight}
                data={legend.data || legendData}
                theme={theme}
            />
        )),
    }

    if (enableArea) {
        layerById.areas = (
            <LineAreas
                key="areas"
                areaGenerator={areaGenerator}
                areaOpacity={areaOpacity}
                areaBlendMode={areaBlendMode}
                lines={series}
            />
        )
    }

    if (isInteractive && enableStackTooltip) {
        layerById.slices = (
            <LineSlices
                key="slices"
                slices={slices}
                height={innerHeight}
                tooltip={stackTooltip}
                tooltipFormat={tooltipFormat}
            />
        )
    }

    if (enablePoints) {
        layerById.points = (
            <LinePoints
                key="points"
                points={points}
                symbol={pointSymbol}
                size={pointSize}
                color={getPointColor}
                borderWidth={pointBorderWidth}
                borderColor={getPointBorderColor}
                enableLabel={enablePointLabel}
                label={pointLabel}
                labelFormat={pointLabelFormat}
                labelYOffset={pointLabelYOffset}
            />
        )
    }

    if (isInteractive && enableCrosshair && currentPoint) {
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

    if (isInteractive && useMesh && !enableStackTooltip) {
        layerById.mesh = (
            <LineMesh
                key="mesh"
                points={points}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                current={currentPoint}
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
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
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
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Line.propTypes = LinePropTypes
Line.defaultProps = LineDefaultProps

export default withContainer(Line)
