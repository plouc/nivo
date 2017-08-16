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

export default class AxisTick extends Component {
    static propTypes = {
        format: PropTypes.func,
        theme: PropTypes.object.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        opacity: PropTypes.number.isRequired,
        rotate: PropTypes.number.isRequired,
    }

    static defaultProps = {
        opacity: 1,
        rotate: 0,
    }

    render() {
        const {
            value: _value,
            x,
            y,
            opacity,
            rotate,
            format,
            tickLine,
            textXY,
            textDY,
            textAnchor,
            theme,
        } = this.props

        let value = _value
        if (format !== undefined) {
            value = format(value)
        }

        return (
            <g transform={`translate(${x},${y})`} style={{ opacity }}>
                <line {...tickLine} stroke={theme.axis.tickColor} />
                <text
                    dy={textDY}
                    textAnchor={textAnchor}
                    transform={`translate(${textXY.x},${textXY.y}) rotate(${rotate})`}
                    style={{
                        fill: theme.axis.textColor,
                        fontSize: theme.axis.fontSize,
                    }}
                >
                    {value}
                </text>
            </g>
        )
    }
}
