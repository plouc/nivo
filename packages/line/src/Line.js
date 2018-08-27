/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import sortBy from 'lodash/sortBy'
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
    Axes,
    Grid,
} from '@nivo/core'
import { computeXYScalesForSeries } from '@nivo/scales'
import { BoxLegendSvg } from '@nivo/legends'
import { generateLines } from './compute'
import LineAreas from './LineAreas'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LineDots from './LineDots'
import { LinePropTypes, LineDefaultProps } from './props'

const Line = ({
    lines,
    lineGenerator,
    areaGenerator,
    xy,
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
    gridXValues,
    gridYValues,

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
    tooltip,

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
                        xScale={enableGridX ? xy.x.scale : null}
                        yScale={enableGridY ? xy.y.scale : null}
                        xValues={gridXValues}
                        yValues={gridYValues}
                        {...motionProps}
                    />
                    <CartesianMarkers
                        markers={markers}
                        width={width}
                        height={height}
                        xScale={xy.x.scale}
                        yScale={xy.y.scale}
                        theme={theme}
                    />
                    <Axes
                        xScale={xy.x.scale}
                        yScale={xy.y.scale}
                        width={width}
                        height={height}
                        theme={theme}
                        top={axisTop}
                        right={axisRight}
                        bottom={axisBottom}
                        left={axisLeft}
                        {...motionProps}
                    />
                    {enableArea && (
                        <LineAreas
                            areaGenerator={areaGenerator}
                            areaOpacity={areaOpacity}
                            lines={lines}
                            {...motionProps}
                        />
                    )}
                    <LineLines
                        lines={lines}
                        lineGenerator={lineGenerator}
                        lineWidth={lineWidth}
                        {...motionProps}
                    />
                    {isInteractive &&
                        enableStackTooltip && (
                            <LineSlices
                                slices={slices}
                                height={height}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                theme={theme}
                                tooltipFormat={tooltipFormat}
                                tooltip={tooltip}
                            />
                        )}
                    {enableDots && (
                        <LineDots
                            lines={lines}
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
                    )}
                    {legends.map((legend, i) => {
                        const legendData = lines
                            .map(line => ({
                                id: line.id,
                                label: line.id,
                                color: line.color,
                            }))
                            .reverse()

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

Line.propTypes = LinePropTypes

const enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['curve', 'height'], ({ curve, height }) => ({
        areaGenerator: area()
            .x(d => d.x)
            .y0(height)
            .y1(d => d.y)
            .curve(curveFromProp(curve)),
        lineGenerator: line()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    withPropsOnChange(
        ['data', 'xScale', 'yScale', 'width', 'height'],
        ({ data, xScale, yScale, width, height }) => ({
            xy: computeXYScalesForSeries(data, xScale, yScale, width, height),
        })
    ),
    withPropsOnChange(['getColor', 'xy'], ({ getColor, xy }) => {
        const lines = generateLines(xy, getColor)

        const slices = xy.x.sorted.map(x => {
            let points = []
            lines.forEach(line => {
                const datum = line.data.find(datum => datum.data.x === x)
                if (datum !== undefined && datum.x !== null && datum.y !== null) {
                    points.push({
                        id: line.id,
                        x,
                        y: datum.y,
                        color: line.color,
                        data: datum.data,
                    })
                }
            })
            points = sortBy(points, 'y')

            return {
                id: x,
                x: xy.x.scale(x),
                points,
            }
        })

        return { lines, slices }
    }),
    pure
)

const enhancedLine = enhance(Line)
enhancedLine.displayName = 'Line'

export default enhancedLine
