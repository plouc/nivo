/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { area, line } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import {
    curveFromProp,
    getInheritedColorGenerator,
    withTheme,
    withColors,
    withDimensions,
    withMotion,
    Container,
    SvgWrapper,
    CartesianMarkers,
    Grid,
} from '@nivo/core'
import { Axes } from '@nivo/axes'
import { computeXYScalesForSeries, computeYSlices } from '@nivo/scales'
import { BoxLegendSvg } from '@nivo/legends'
import LineAreas from './LineAreas'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LineDots from './LineDots'
import { LinePropTypes, LineDefaultProps } from './props'

const Line = props => {
    const {
        computedData,
        lineGenerator,
        areaGenerator,
        layers,

        margin,
        width,
        height,
        outerWidth,
        outerHeight,

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

        enableDots,
        dotSymbol,
        dotSize,
        dotColor,
        dotBorderWidth,
        dotBorderColor,
        enableDotLabel,
        dotLabel,
        dotLabelFormat,
        dotLabelYOffset,

        markers,

        theme,

        animate,
        motionStiffness,
        motionDamping,

        isInteractive,
        tooltipFormat,
        tooltip,
        enableStackTooltip,

        legends,
    } = props

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const legendData = computedData.series
        .map(line => ({
            id: line.id,
            label: line.id,
            color: line.color,
        }))
        .reverse()

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                const layerById = {
                    grid: (
                        <Grid
                            key="grid"
                            theme={theme}
                            width={width}
                            height={height}
                            xScale={enableGridX ? computedData.xScale : null}
                            yScale={enableGridY ? computedData.yScale : null}
                            xValues={gridXValues}
                            yValues={gridYValues}
                            {...motionProps}
                        />
                    ),
                    markers: (
                        <CartesianMarkers
                            key="markers"
                            markers={markers}
                            width={width}
                            height={height}
                            xScale={computedData.xScale}
                            yScale={computedData.yScale}
                            theme={theme}
                        />
                    ),
                    axes: (
                        <Axes
                            key="axes"
                            xScale={computedData.xScale}
                            yScale={computedData.yScale}
                            width={width}
                            height={height}
                            theme={theme}
                            top={axisTop}
                            right={axisRight}
                            bottom={axisBottom}
                            left={axisLeft}
                            {...motionProps}
                        />
                    ),
                    areas: null,
                    lines: (
                        <LineLines
                            key="lines"
                            lines={computedData.series}
                            lineGenerator={lineGenerator}
                            lineWidth={lineWidth}
                            {...motionProps}
                        />
                    ),
                    slices: null,
                    dots: null,
                    legends: legends.map((legend, i) => (
                        <BoxLegendSvg
                            key={i}
                            {...legend}
                            containerWidth={width}
                            containerHeight={height}
                            data={legendData}
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
                            lines={computedData.series}
                            {...motionProps}
                        />
                    )
                }

                if (isInteractive && enableStackTooltip) {
                    layerById.slices = (
                        <LineSlices
                            key="slices"
                            slices={computedData.slices}
                            height={height}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            theme={theme}
                            tooltipFormat={tooltipFormat}
                            tooltip={tooltip}
                        />
                    )
                }

                if (enableDots) {
                    layerById.dots = (
                        <LineDots
                            key="dots"
                            lines={computedData.series}
                            symbol={dotSymbol}
                            size={dotSize}
                            color={getInheritedColorGenerator(dotColor)}
                            borderWidth={dotBorderWidth}
                            borderColor={getInheritedColorGenerator(dotBorderColor)}
                            enableLabel={enableDotLabel}
                            label={dotLabel}
                            labelFormat={dotLabelFormat}
                            labelYOffset={dotLabelYOffset}
                            theme={theme}
                            {...motionProps}
                        />
                    )
                }
                return (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                    >
                        {layers.map((layer, i) => {
                            if (typeof layer === 'function') {
                                return (
                                    <Fragment key={i}>
                                        {layer({
                                            ...props,
                                            xScale: computedData.xScale,
                                            yScale: computedData.yScale,
                                            showTooltip,
                                            hideTooltip,
                                        })}
                                    </Fragment>
                                )
                            }
                            return layerById[layer]
                        })}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Line.propTypes = LinePropTypes

const enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['curve'], ({ curve }) => ({
        lineGenerator: line()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    withPropsOnChange(
        ['data', 'xScale', 'yScale', 'width', 'height'],
        ({ data, xScale, yScale, width, height }) => ({
            computedData: computeXYScalesForSeries(data, xScale, yScale, width, height),
        })
    ),
    withPropsOnChange(['getColor', 'computedData'], ({ getColor, computedData: _computedData }) => {
        const computedData = {
            ..._computedData,
            series: _computedData.series.map(serie => ({
                ...serie,
                color: getColor(serie),
            })),
        }

        computedData.slices = computeYSlices(computedData)

        return { computedData }
    }),
    withPropsOnChange(
        ['curve', 'computedData', 'areaBaselineValue'],
        ({ curve, computedData, areaBaselineValue }) => ({
            areaGenerator: area()
                .defined(d => d.x !== null && d.y !== null)
                .x(d => d.x)
                .y1(d => d.y)
                .curve(curveFromProp(curve))
                .y0(computedData.yScale(areaBaselineValue)),
        })
    ),
    pure
)

const enhancedLine = enhance(Line)
enhancedLine.displayName = 'Line'

export default enhancedLine
