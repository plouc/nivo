/*
 * This file is part of the nivo library.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'


class AxisTick extends Component {
    render() {
        const {
            value,
            x, y,
            opacity,
            tickLine,
            textXY,
            textDY,
            textAnchor,
        } = this.props

        return (
            <g
                className="nivo_tick"
                transform={`translate(${x},${y})`}
                style={{ opacity }}
            >
                <line
                    {...tickLine}
                    className="nivo_tick_line"
                    stroke="#000"
                />
                <text
                    {...textXY}
                    dy={textDY}
                    className="nivo_tick_text"
                    textAnchor={textAnchor}
                    style={{ fill: '#000' }}
                >
                    {value}
                </text>
            </g>
        )
    }
}

AxisTick.propTypes = {
}

AxisTick.defaultProps = {
}



export default AxisTick
