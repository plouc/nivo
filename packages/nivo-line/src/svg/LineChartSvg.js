/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import setDisplayName from 'recompose/setDisplayName'
import {
    lineCurvePropType,
    getInheritedColorGenerator,
    withTheme,
    withColors,
    withDimensions,
    withMotion,
    Container,
    SvgWrapper,
    CartesianMarkers,
} from '@nivo/core'
import { Scales } from '@nivo/scales'
import { Axes, Grid } from '@nivo/axes'
import { LegendPropShape, BoxLegendSvg } from '@nivo/legends'
import { generateStackedLines } from '../compute'
import LineSvg from './LineSvg'
import LineAreaSvg from './LineAreaSvg'
import LineDotsSvg from './LineDotsSvg'
/*
import LineSlices from './LineSlices'
*/

const LineChartSvg = ({
    data,

    // scales
    xScale: xScaleConfig,
    yScale: yScaleConfig,

    stacked,
    lines,
    curve,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // axes & grid
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    lineWidth,
    enableArea,
    areaOpacity,

    // dots
    enableDots,
    dotsEveryNth,
    dotSymbol,
    dotSize,
    dotColor,
    dotBorderWidth,
    dotBorderColor,
    enableDotLabel,
    dotLabel,
    dotLabelFormat,
    dotLabelYOffset,

    // markers
    markers,

    // theming
    theme,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    tooltipFormat,

    // stackTooltip
    enableStackTooltip,

    legends,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const legendData = lines.map(line => ({
        label: line.id,
        fill: line.color,
    }))

    const scalesConfig = [
        {
            ...xScaleConfig,
            id: 'x',
            property: 'x',
            range: [0, width],
            data: data.map(data => data.data),
        },
        {
            ...yScaleConfig,
            id: 'y',
            property: 'y',
            range: [height, 0],
            stacked,
            data: data.map(data => data.data),
        },
    ]

    return (
        <Scales scales={scalesConfig}>
            {scales => (
                <Container isInteractive={isInteractive} theme={theme}>
                    {({ showTooltip, hideTooltip }) => (
                        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                            <Grid
                                theme={theme}
                                width={width}
                                height={height}
                                xScale={enableGridX ? scales.x : null}
                                yScale={enableGridY ? scales.y : null}
                                {...motionProps}
                            />
                            <CartesianMarkers
                                markers={markers}
                                width={width}
                                height={height}
                                xScale={scales.x}
                                yScale={scales.y}
                                theme={theme}
                            />
                            <Axes
                                xScale={scales.x}
                                yScale={scales.y}
                                width={width}
                                height={height}
                                theme={theme}
                                top={axisTop}
                                right={axisRight}
                                bottom={axisBottom}
                                left={axisLeft}
                                {...motionProps}
                            />
                            {enableArea &&
                                lines.map(line => (
                                    <LineAreaSvg
                                        key={line.id}
                                        data={line.data}
                                        xScale={scales.x}
                                        yScale={scales.y}
                                        height={height}
                                        curve={curve}
                                        style={{
                                            fill: line.color,
                                            fillOpacity: areaOpacity,
                                        }}
                                        {...motionProps}
                                    />
                                ))}
                            {lines.map(line => (
                                <LineSvg
                                    key={line.id}
                                    data={line.data}
                                    xScale={scales.x}
                                    yScale={scales.y}
                                    curve={curve}
                                    lineWidth={lineWidth}
                                    style={{
                                        stroke: line.color,
                                    }}
                                    {...motionProps}
                                />
                            ))}
                            {/*
                    {isInteractive &&
                        enableStackTooltip && (
                            <LineSlices
                                slices={slices}
                                height={height}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                theme={theme}
                                tooltipFormat={tooltipFormat}
                            />
                        )}
                    */}
                            {enableDots &&
                                lines.map(line => (
                                    <LineDotsSvg
                                        key={line.id}
                                        data={line}
                                        everyNth={dotsEveryNth}
                                        xScale={scales.x}
                                        yScale={scales.y}
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
                                ))}
                            {legends.map((legend, i) => (
                                <BoxLegendSvg
                                    key={i}
                                    {...legend}
                                    containerWidth={width}
                                    containerHeight={height}
                                    data={legendData}
                                />
                            ))}
                        </SvgWrapper>
                    )}
                </Container>
            )}
        </Scales>
    )
}

LineChartSvg.propTypes = {
    // data
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                })
            ).isRequired,
        })
    ).isRequired,

    // scales
    xScale: PropTypes.object.isRequired,
    yScale: PropTypes.object.isRequired,

    stacked: PropTypes.bool.isRequired,
    curve: lineCurvePropType.isRequired,

    lines: PropTypes.array.isRequired,
    slices: PropTypes.array.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // dots
    enableDots: PropTypes.bool.isRequired,
    dotsEveryNth: PropTypes.number.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number.isRequired,
    dotColor: PropTypes.any.isRequired,
    dotBorderWidth: PropTypes.number.isRequired,
    dotBorderColor: PropTypes.any.isRequired,
    enableDotLabel: PropTypes.bool.isRequired,
    dotLabelColor: PropTypes.any.isRequired,
    dotLabelYOffset: PropTypes.number.isRequired,

    // markers
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    // styling
    getColor: PropTypes.func.isRequired,
    enableArea: PropTypes.bool.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    lineWidth: PropTypes.number.isRequired,
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
    enableStackTooltip: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

const enhance = compose(
    setDisplayName('LineChartSvg'),
    defaultProps({
        // scales
        xScale: {
            type: 'linear',
        },
        yScale: {
            type: 'linear',
            min: 0,
        },

        stacked: false,
        curve: 'linear',

        // grid
        enableGridX: true,
        enableGridY: true,

        // dots
        enableDots: true,
        dotsEveryNth: 1,
        dotSize: 6,
        dotColor: 'inherit',
        dotBorderWidth: 0,
        dotBorderColor: 'inherit',
        enableDotLabel: false,
        dotLabelColor: () => '#000000',
        dotLabelYOffset: -12,

        // styling
        colors: 'nivo',
        colorBy: 'id',
        enableArea: false,
        areaOpacity: 0.2,
        lineWidth: 2,
        defs: [],

        // interactivity
        isInteractive: true,
        enableStackTooltip: true,

        legends: [],
    }),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['data', 'stacked', 'getColor'], ({ data, stacked, getColor }) => {
        let lines
        if (stacked === true) {
            lines = generateStackedLines(data).map(serie => ({ ...serie, color: getColor(serie) }))
        } else {
            lines = data.map(serie => ({
                ...serie,
                color: getColor(serie),
            }))
        }

        const slices = []
        /*
            const slices = xScale.domain().map((id, i) => {
                let points = sortBy(
                    lines.map(line => ({
                        id: line.id,
                        value: line.points[i].value,
                        y: line.points[i].y,
                        color: line.color,
                    })),
                    'y'
                )

                return {
                    id,
                    x: xScale(id),
                    points,
                }
            })
            */

        return { lines, slices }
    }),
    pure
)

export default enhance(LineChartSvg)
