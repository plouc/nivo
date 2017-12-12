/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { sortBy } from 'lodash'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import setDisplayName from 'recompose/setDisplayName'
import { getInheritedColorGenerator } from '@nivo/core'
import { withTheme, withColors, withDimensions, withMotion } from '@nivo/core'
import { Container, SvgWrapper } from '@nivo/core'
import { getScales, getStackedScales, generateLines, generateStackedLines } from '../compute'
import { CartesianMarkers } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import LineSvg from './LineSvg'
import LineAreaSvg from './LineAreaSvg'
import LineDotsSvg from './LineDotsSvg'
/*
import LineSlices from './LineSlices'
*/
import { LinePropTypes, LineDefaultProps } from '../props'

const LineChartSvg = ({
    lines,
    xScale,
    yScale,
    slices,

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

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    <Grid
                        theme={theme}
                        width={width}
                        height={height}
                        xScale={enableGridX ? xScale : null}
                        yScale={enableGridY ? yScale : null}
                        {...motionProps}
                    />
                    <CartesianMarkers
                        markers={markers}
                        width={width}
                        height={height}
                        xScale={xScale}
                        yScale={yScale}
                        theme={theme}
                    />
                    <Axes
                        xScale={xScale}
                        yScale={yScale}
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
                                data={line.points}
                                xScale={xScale}
                                yScale={yScale}
                                height={height}
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
                            data={line.points}
                            xScale={xScale}
                            yScale={yScale}
                            size={lineWidth}
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
                                xScale={xScale}
                                yScale={yScale}
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
                    {legends.map((legend, i) => {
                        const legendData = lines.map(line => ({
                            label: line.id,
                            fill: line.color,
                        }))

                        return (
                            <BoxLegendSvg
                                key={i}
                                {...legend}
                                containerWidth={width}
                                containerHeight={height}
                                data={legendData}
                            />
                        )
                    })}
                </SvgWrapper>
            )}
        </Container>
    )
}

LineChartSvg.propTypes = LinePropTypes

const enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(
        ['data', 'stacked', 'width', 'height', 'minY', 'maxY'],
        ({ data, stacked, width, height, margin, minY, maxY }) => {
            let scales
            const args = { data, width, height, minY, maxY }
            if (stacked === true) {
                scales = getStackedScales(args)
            } else {
                scales = getScales(args)
            }

            return {
                margin,
                width,
                height,
                ...scales,
            }
        }
    ),
    withPropsOnChange(
        ['getColor', 'xScale', 'yScale'],
        ({ data, stacked, xScale, yScale, getColor }) => {
            let lines
            if (stacked === true) {
                lines = generateStackedLines(data, xScale, yScale, getColor)
            } else {
                lines = generateLines(data, xScale, yScale, getColor)
            }

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

            return { lines, slices }
        }
    ),
    pure
)

export default setDisplayName('LineChartSvg')(enhance(LineChartSvg))
