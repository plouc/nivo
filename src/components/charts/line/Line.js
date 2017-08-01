/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { line } from 'd3'
import Nivo, { defaultTheme } from '../../../Nivo'
import { margin as marginPropType, motion as motionPropTypes } from '../../../PropTypes'
import { getColorRange, getColorGenerator } from '../../../ColorUtils'
import SvgWrapper from '../SvgWrapper'
import { generateLines, generateStackedLines } from '../../../lib/charts/line'
import { curvePropMapping, curvePropType } from '../../../properties/curve'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import LineMarkers from './LineMarkers'

export default class Line extends Component {
    static propTypes = {
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

        // dimensions
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,

        // axes
        axes: PropTypes.object.isRequired,
        enableGridX: PropTypes.bool.isRequired,
        enableGridY: PropTypes.bool.isRequired,

        // markers
        enableMarkers: PropTypes.bool.isRequired,
        markersSize: PropTypes.number.isRequired,
        markersColor: PropTypes.any.isRequired,
        markersBorderWidth: PropTypes.number.isRequired,
        markersBorderColor: PropTypes.any.isRequired,

        // theming
        theme: PropTypes.object.isRequired,
        colors: PropTypes.any.isRequired,

        // motion
        ...motionPropTypes,
    }

    static defaultProps = {
        stacked: false,
        curve: 'linear',

        // dimensions
        margin: Nivo.defaults.margin,

        // axes
        axes: {
            left: {
                enabled: true,
            },
            bottom: {
                enabled: true,
            },
        },
        enableGridX: true,
        enableGridY: true,

        // markers
        enableMarkers: true,
        markersSize: 6,
        markersColor: 'inherit',
        markersBorderWidth: 0,
        markersBorderColor: 'inherit',

        // theming
        colors: Nivo.defaults.colorRange,
        theme: {},

        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            data,
            stacked,
            curve,

            // dimensions
            margin: _margin,
            width: _width,
            height: _height,

            // axes
            axes,
            enableGridX,
            enableGridY,

            // markers
            enableMarkers,
            markersSize,
            markersColor,
            markersBorderWidth,
            markersBorderColor,

            // theming
            theme: _theme,
            colors,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const theme = merge({}, defaultTheme, _theme)
        const color = getColorRange(colors)

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        let result
        if (stacked === true) {
            result = generateStackedLines(data, width, height, color)
        } else {
            result = generateLines(data, width, height, color)
        }

        const lineGenerator = line().x(d => d.x).y(d => d.y).curve(curvePropMapping[curve])

        const { xScale, yScale, lines } = result

        let markers = null
        if (enableMarkers === true) {
            markers = (
                <LineMarkers
                    lines={lines}
                    size={markersSize}
                    color={getColorGenerator(markersColor)}
                    borderWidth={markersBorderWidth}
                    borderColor={getColorGenerator(markersBorderColor)}
                    {...motionProps}
                />
            )
        }

        return (
            <SvgWrapper width={_width} height={_height} margin={margin}>
                <Grid
                    theme={theme}
                    width={width}
                    height={height}
                    xScale={enableGridX ? xScale : null}
                    yScale={enableGridY ? yScale : null}
                    {...motionProps}
                />
                <Axes
                    axes={axes}
                    xScale={xScale}
                    yScale={yScale}
                    width={width}
                    height={height}
                    theme={theme}
                />
                {lines.map(({ id, color: lineColor, points }) =>
                    <path
                        key={id}
                        d={lineGenerator(points)}
                        fill="none"
                        strokeWidth={2}
                        stroke={lineColor}
                    />
                )}
                {markers}
            </SvgWrapper>
        )
    }
}
