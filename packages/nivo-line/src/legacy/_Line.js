/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { min, max, maxBy } from 'lodash'
import React from 'react'
import { sortBy } from 'lodash'
import { area, line } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import { curveFromProp } from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/core'
import { withTheme, withColors, withDimensions, withMotion } from '@nivo/core'
import { Container, SvgWrapper } from '@nivo/core'
import { getScales, getStackedScales, generateLines, generateStackedLines } from './compute'
import { CartesianMarkers } from '@nivo/core'
import { Axes, Axis, Grid } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import LineAreas from './LineAreas'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LineDots from './LineDots'
import { LinePropTypes, LineDefaultProps } from './props'
import { scaleLinear, scaleLog } from 'd3-scale'

const Line = ({
    data,

    //lines,
    lineGenerator,
    areaGenerator,
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
    getDotColor,
    dotBorderWidth,
    getDotBorderColor,
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

    scales,
    dataScales,
    getColor,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const numericScales = ['linear', 'log']

    const scs = scales.map(scale => {
        const scaleSeries =
            scale.selector === '*' ? data : data.filter(serie => scale.selector.includes(serie.id))
        let [minValue, maxValue] = scale.domain

        if (numericScales.includes(scale.type)) {
            if (minValue === 'auto') {
                minValue = min(scaleSeries.map(serie => min(serie.data.map(d => d[scale.axis]))))
            }
            if (maxValue === 'auto') {
                maxValue = max(scaleSeries.map(serie => max(serie.data.map(d => d[scale.axis]))))
            }
        }

        let s
        if (scale.type === 'linear') {
            s = scaleLinear().domain([minValue, maxValue])
        } else if (scale.type === 'log') {
            s = scaleLog().domain([minValue, maxValue])
        }
        s.id = scale.id

        if (scale.axis === 'x') {
            s.range([0, width])
        } else if (scale.axis === 'y') {
            s.range([height, 0])
        }

        return s
    })

    const lines = []
    Object.keys(dataScales).forEach(serieId => {
        const serieScales = dataScales[serieId]
        const serie = data.find(({ id }) => id === serieId)
        const xs = scs.find(({ id }) => id === serieScales.x)
        const ys = scs.find(({ id }) => id === serieScales.y)

        lines.push({
            id: serieId,
            color: getColor(serie),
            data: serie,
            points: serie.data.map(d =>
                Object.assign({}, d, {
                    value: d.y,
                    x: xs(d.x),
                    y: ys(d.y),
                })
            ),
        })
    })

    console.log(lines)

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    {/*
                    <Grid
                        theme={theme}
                        width={width}
                        height={height}
                        xScale={enableGridX ? xScale : null}
                        yScale={enableGridY ? yScale : null}
                        {...motionProps}
                    />
                    */}
                    <CartesianMarkers
                        markers={markers}
                        width={width}
                        height={height}
                        xScale={xScale}
                        yScale={yScale}
                        theme={theme}
                    />
                    {axisLeft && (
                        <Axis
                            width={width}
                            height={height}
                            position="left"
                            theme={theme}
                            {...axisLeft}
                            scale={scs.find(({ id }) => id === axisLeft.scale)}
                        />
                    )}
                    {axisRight && (
                        <Axis
                            width={width}
                            height={height}
                            position="right"
                            theme={theme}
                            {...axisRight}
                            scale={scs.find(({ id }) => id === axisRight.scale)}
                        />
                    )}
                    {/*
                    <Axes
                        xScale={scs.find(({ id }) => id === 'x')}
                        yScale={scs.find(({ id }) => id === 'y')}
                        width={width}
                        height={height}
                        theme={theme}
                        top={axisTop}
                        right={axisRight}
                        bottom={axisBottom}
                        left={axisLeft}
                        {...motionProps}
                    />
                    */}
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
                    {/*isInteractive &&
                        enableStackTooltip && (
                            <LineSlices
                                slices={slices}
                                height={height}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                theme={theme}
                                tooltipFormat={tooltipFormat}
                            />
                        )*/}
                    {enableDots && (
                        <LineDots
                            lines={lines}
                            symbol={dotSymbol}
                            size={dotSize}
                            color={getDotColor}
                            borderWidth={dotBorderWidth}
                            borderColor={getDotBorderColor}
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
                                label: line.id,
                                fill: line.color,
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
            .defined(d => d && d.value !== null)
            .x(d => d.x)
            .y0(height)
            .y1(d => d.y)
            .curve(curveFromProp(curve)),
        lineGenerator: line()
            .defined(d => d && d.value !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    /*
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
    */
    withPropsOnChange(['dotColor'], ({ dotColor }) => ({
        getDotColor: getInheritedColorGenerator(dotColor),
    })),
    withPropsOnChange(['dotBorderColor'], ({ dotBorderColor }) => ({
        getDotBorderColor: getInheritedColorGenerator(dotBorderColor),
    })),
    pure
)

export default setDisplayName('Line')(enhance(Line))
