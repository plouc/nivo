/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { Motion, TransitionMotion, spring } from 'react-motion'
import Nivo, { defaultTheme } from '../../../Nivo'
import { margin as marginPropType, motion as motionPropTypes } from '../../../PropTypes'
import { getColorsGenerator } from '../../../ColorUtils'
import { degreesToRadians } from '../../../ArcUtils'
import SvgWrapper from '../SvgWrapper'
import * as d3 from 'd3'

export default class Pie extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                label: PropTypes.string,
            })
        ).isRequired,

        // dimensions
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,

        innerRadius: PropTypes.number.isRequired,
        padAngle: PropTypes.number.isRequired,
        cornerRadius: PropTypes.number.isRequired,

        // theming
        theme: PropTypes.object.isRequired,
        colors: PropTypes.any.isRequired,
        colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // motion
        ...motionPropTypes,
    }

    static defaultProps = {
        // dimensions
        margin: Nivo.defaults.margin,

        innerRadius: 0,
        padAngle: 0,
        cornerRadius: 0,

        // theming
        theme: {},
        colors: Nivo.defaults.colorRange,
        colorBy: 'id',

        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            data,

            // dimensions
            margin: _margin,
            width: _width,
            height: _height,

            innerRadius: _innerRadius,
            padAngle: _padAngle,
            cornerRadius,

            // theming
            theme: _theme,
            colors,
            colorBy,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom
        const centerX = width / 2
        const centerY = height / 2

        const padAngle = degreesToRadians(_padAngle)

        const theme = merge({}, defaultTheme, _theme)
        const color = getColorsGenerator(colors, colorBy)

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        const radius = 160
        const innerRadius = radius * Math.min(_innerRadius, 1)

        const pie = d3.pie()
        pie.value(d => d.value)

        const arc = d3.arc()
        arc.outerRadius(160)

        return (
            <SvgWrapper width={_width} height={_height} margin={margin}>
                <Motion
                    style={{
                        centerX: spring(centerX, motionProps),
                        centerY: spring(centerY, motionProps),
                        innerRadius: spring(innerRadius),
                        padAngle: spring(padAngle, motionProps),
                        cornerRadius: spring(cornerRadius, motionProps),
                    }}
                >
                    {interpolatingStyle => {
                        const interpolatedPie = pie.padAngle(interpolatingStyle.padAngle)
                        const interpolatedArc = arc
                            .cornerRadius(interpolatingStyle.cornerRadius)
                            .innerRadius(interpolatingStyle.innerRadius)

                        return (
                            <g
                                transform={`translate(${interpolatingStyle.centerX}, ${interpolatingStyle.centerY})`}
                            >
                                {interpolatedPie(data).map(d => {
                                    return (
                                        <path
                                            key={d.data.id}
                                            d={interpolatedArc(d)}
                                            fill={color(d.data)}
                                        />
                                    )
                                })}
                            </g>
                        )
                    }}
                </Motion>
            </SvgWrapper>
        )
    }
}
