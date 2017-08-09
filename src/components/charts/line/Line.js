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
import { merge, isEqual } from 'lodash'
import { line } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import Nivo, { defaultTheme } from '../../../Nivo'
import { marginPropType, motionPropTypes, curvePropMapping, curvePropType } from '../../../props'
import { getColorsGenerator, getInheritedColorGenerator } from '../../../lib/colorUtils'
import SvgWrapper from '../SvgWrapper'
import {
    getScales,
    getStackedScales,
    generateLines,
    generateStackedLines,
} from '../../../lib/charts/line'
import SmartMotion from '../../SmartMotion'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import LineMarkers from './LineMarkers'

const Line = ({
    data,
    stacked,
    lineGenerator,
    xScale,
    yScale,

    // dimensions
    margin,
    width,
    height,
    fullWidth,
    fullHeight,

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
    color,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    let lines
    if (stacked === true) {
        lines = generateStackedLines(data, xScale, yScale, color)
    } else {
        lines = generateLines(data, xScale, yScale, color)
    }

    let markers = null
    if (enableMarkers === true) {
        markers = (
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
            />
        )
    }

    let lineNodes
    if (animate === true) {
        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        lineNodes = lines.map(({ id, color: lineColor, points }) =>
            <SmartMotion
                key={id}
                style={spring => ({
                    d: spring(lineGenerator(points), springConfig),
                    stroke: spring(lineColor, springConfig),
                })}
            >
                {style =>
                    <path key={id} d={style.d} fill="none" strokeWidth={2} stroke={style.stroke} />}
            </SmartMotion>
        )
    } else {
        lineNodes = lines.map(({ id, color: lineColor, points }) =>
            <path
                key={id}
                d={lineGenerator(points)}
                fill="none"
                strokeWidth={2}
                stroke={lineColor}
            />
        )
    }

    return (
        <SvgWrapper width={fullWidth} height={fullHeight} margin={margin}>
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
            {lineNodes}
            {markers}
        </SvgWrapper>
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
    curve: curvePropType.isRequired,
    lineGenerator: PropTypes.func.isRequired,

    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    // dimensions
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: marginPropType,

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
    theme: PropTypes.object.isRequired,
    colors: PropTypes.any.isRequired,
    colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    color: PropTypes.func.isRequired,

    // motion
    ...motionPropTypes,
}

export const LineDefaultProps = {
    stacked: false,
    curve: 'linear',

    // dimensions
    margin: Nivo.defaults.margin,

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
    theme: {},
    colors: 'nivo',
    colorBy: 'id',

    // motion
    animate: true,
    motionStiffness: Nivo.defaults.motionStiffness,
    motionDamping: Nivo.defaults.motionDamping,
}

const enhance = compose(
    defaultProps(LineDefaultProps),
    withPropsOnChange(['theme'], ({ theme }) => ({ theme: merge({}, defaultTheme, theme) })),
    withPropsOnChange(['curve'], ({ curve }) => ({
        lineGenerator: line().x(d => d.x).y(d => d.y).curve(curvePropMapping[curve]),
    })),
    withPropsOnChange(['colors', 'colorBy'], ({ colors, colorBy }) => ({
        color: getColorsGenerator(colors, colorBy),
    })),
    withPropsOnChange(
        (props, nextProps) =>
            props.data !== nextProps.data ||
            props.stacked !== nextProps.stacked ||
            props.width !== nextProps.width ||
            props.height !== nextProps.height ||
            !isEqual(props.margin, nextProps.margin),
        ({ data, stacked, width: fullWidth, height: fullHeight, margin: _margin }) => {
            const margin = Object.assign({}, Nivo.defaults.margin, _margin)
            const width = fullWidth - margin.left - margin.right
            const height = fullHeight - margin.top - margin.bottom

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
                fullWidth,
                fullHeight,
                ...scales,
            }
        }
    ),
    pure
)

export default enhance(Line)
