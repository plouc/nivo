/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { line } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import { curveFromProp, lineCurvePropType } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import {
    getScales,
    getStackedScales,
    generateLines,
    generateStackedLines,
} from '../../../lib/charts/line'
import CartesianMarkers from '../../cartesian/markers/CartesianMarkers'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LineDots from './LineDots'

const Line = ({
    lines,
    lineGenerator,
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

    // stackTooltip
    enableStackTooltip,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) =>
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
                    <LineLines lines={lines} lineGenerator={lineGenerator} {...motionProps} />
                    {isInteractive &&
                        enableStackTooltip &&
                        <LineSlices
                            slices={slices}
                            height={height}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            theme={theme}
                        />}
                    {enableDots &&
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
                        />}
                </SvgWrapper>}
        </Container>
    )
}

Line.propTypes = {
    // data
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    stacked: PropTypes.bool.isRequired,
    curve: lineCurvePropType.isRequired,
    lineGenerator: PropTypes.func.isRequired,

    lines: PropTypes.array.isRequired,
    slices: PropTypes.array.isRequired,

    minY: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])])
        .isRequired,
    maxY: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])])
        .isRequired,
    xScale: PropTypes.func.isRequired, // computed
    yScale: PropTypes.func.isRequired, // computed

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // dots
    enableDots: PropTypes.bool.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number.isRequired,
    dotColor: PropTypes.any.isRequired,
    dotBorderWidth: PropTypes.number.isRequired,
    dotBorderColor: PropTypes.any.isRequired,
    enableDotLabel: PropTypes.bool.isRequired,

    // markers
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    // theming
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,

    // stack tooltip
    enableStackTooltip: PropTypes.bool.isRequired,
}

export const LineDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    stacked: false,
    curve: 'linear',

    // scales
    minY: 0,
    maxY: 'auto',

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    // dots
    enableDots: true,
    dotSize: 6,
    dotColor: 'inherit',
    dotBorderWidth: 0,
    dotBorderColor: 'inherit',
    enableDotLabel: false,

    // theming
    colors: 'nivo',
    colorBy: 'id',

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,
}

const enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['curve'], ({ curve }) => ({
        lineGenerator: line().x(d => d.x).y(d => d.y).curve(curveFromProp(curve)),
    })),
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

const enhancedLine = enhance(Line)
enhancedLine.displayName = 'enhance(Line)'

export default enhancedLine
