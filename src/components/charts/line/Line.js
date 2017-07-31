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
import _ from 'lodash'
import { curvePropMapping, curvePropType } from '../../../properties/curve'
import { line } from 'd3'

export default class Line extends Component {
    static propTypes = {
        scales: PropTypes.object.isRequired,
        curve: curvePropType.isRequired,
        color: PropTypes.string.isRequired,
    }

    static defaultProps = {
        scales: {},
        curve: 'linear',
        color: '#000',
    }

    render() {
        const {
            data,
            scales,
            xScale: _xScale,
            yScale: _yScale,
            x,
            y,
            curve,
            color,
        } = this.props

        const xScale = scales[_xScale]
        const yScale = scales[_yScale]

        const getX = _.isFunction(x) ? x : d => d[x]
        const getY = _.isFunction(y) ? y : d => d[y]

        const points = data.map(d => ({
            x: xScale(getX(d)),
            y: yScale(getY(d)),
        }))

        const lineGenerator = line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curvePropMapping[curve])

        return (
            <path
                d={lineGenerator(points)}
                fill="none"
                strokeWidth={2}
                stroke={color}
            />
        )
    }
}
