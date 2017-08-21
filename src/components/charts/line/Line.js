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
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LineMarkers from './LineMarkers'

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

    // markers
    enableMarkers,
    markersSize,
    markersColor,
    markersBorderWidth,
    markersBorderColor,
    enableMarkersLabel,
    markersLabel,
    markersLabelFormat,
    markersLabelYOffset,

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
                    {enableMarkers &&
                        <LineMarkers
                            lines={lines}
                            size={markersSize}
                            color={getInheritedColorGenerator(markersColor)}
                            borderWidth={markersBorderWidth}
                            borderColor={getInheritedColorGenerator(markersBorderColor)}
                            enableLabel={enableMarkersLabel}
                            label={markersLabel}
                            labelFormat={markersLabelFormat}
                            labelYOffset={markersLabelYOffset}
                            theme={theme}
                            {...motionProps}
                        />}
                </SvgWrapper>}
        </Container>
    )
}

Line.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    stacked: PropTypes.bool.isRequired,
    curve: lineCurvePropType.isRequired,
    lineGenerator: PropTypes.func.isRequired,

    lines: PropTypes.array.isRequired,
    slices: PropTypes.array.isRequired,

    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // markers
    enableMarkers: PropTypes.bool.isRequired,
    markersSize: PropTypes.number.isRequired,
    markersColor: PropTypes.any.isRequired,
    markersBorderWidth: PropTypes.number.isRequired,
    markersBorderColor: PropTypes.any.isRequired,
    enableMarkersLabel: PropTypes.bool.isRequired,

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

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    // markers
    enableMarkers: true,
    markersSize: 6,
    markersColor: 'inherit',
    markersBorderWidth: 0,
    markersBorderColor: 'inherit',
    enableMarkersLabel: false,

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
        (props, nextProps) =>
            props.data !== nextProps.data ||
            props.stacked !== nextProps.stacked ||
            props.width !== nextProps.width ||
            props.height !== nextProps.height,
        ({ data, stacked, width, height, margin }) => {
            let scales
            if (stacked === true) {
                scales = getStackedScales(data, width, height)
            } else {
                scales = getScales(data, width, height)
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
