/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { withContainer, useDimensions, useTheme, SvgWrapper, CartesianMarkers } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { Axes, Grid } from '@nivo/axes'
import { useLine, useLinePoints } from './hooks'
import { LinePropTypes, LineDefaultProps } from './props'
import { BoxLegendSvg } from '@nivo/legends'
import LineAreas from './LineAreas'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LinePoints from './LinePoints'
import LineMesh from './LineMesh'
import XYCapture from './XYCapture'

const Line = props => {
    const {
        data,
        xScale: xScaleSpec,
        yScale: yScaleSpec,
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

        animate,
        motionStiffness,
        motionDamping,
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
        color: pointColor,
        borderColor: pointBorderColor,
    })

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

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
                animate={animate}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
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
                animate={animate}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
            />
        ),
        areas: null,
        lines: (
            <LineLines
                key="lines"
                lines={series}
                lineGenerator={lineGenerator}
                lineWidth={lineWidth}
                animate={animate}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
            />
        ),
        slices: null,
        points: null,
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

    if (enableArea === true) {
        layerById.areas = (
            <LineAreas
                key="areas"
                areaGenerator={areaGenerator}
                areaOpacity={areaOpacity}
                areaBlendMode={areaBlendMode}
                lines={series}
                animate={animate}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
            />
        )
    }

    if (isInteractive === true && enableStackTooltip === true) {
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

    if (enablePoints === true) {
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
                animate={animate}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
            />
        )
    }

    if (isInteractive === true && useMesh === true && enableStackTooltip !== true) {
        layerById.mesh = (
            <LineMesh
                key="mesh"
                points={points}
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

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                ...props,
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
            {/*
            <XYCapture
                points={points}
                width={innerWidth}
                height={innerHeight}
                margin={margin}
                xScale={xScale}
                yScale={yScale}
            />
            */}
        </SvgWrapper>
    )
}

Line.propTypes = LinePropTypes
Line.defaultProps = LineDefaultProps

export default withContainer(Line)
