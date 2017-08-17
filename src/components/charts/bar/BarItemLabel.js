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

const safeSize = 20

const labelStyle = {
    pointerEvents: 'none',
}

export default class BarItemLabel extends Component {
    static propTypes = {
        data: PropTypes.shape({
            value: PropTypes.number.isRequired,
        }).isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        linkColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
    }

    static defaultProps = {}

    render() {
        const { x: _x, y: _y, width, height, linkColor, textColor, data } = this.props

        let x = _x
        let y = _y
        let textX
        let line
        let textAnchor
        if (height < safeSize) {
            textX = -13
            textAnchor = 'end'
            y = _y + height / 2
            line = <line style={{ stroke: linkColor }} x1={0} x2={-10} y1={0} y2={0} />
        } else {
            textX = 0
            textAnchor = 'middle'
            x = _x + width / 2
            y = _y + height / 2
        }

        return (
            <g transform={`translate(${x},${y})`} className="nivo_bar_legend" style={labelStyle}>
                {line}
                <text x={textX} textAnchor={textAnchor} dy="0.5em" style={{ fill: textColor }}>
                    {data.value}
                </text>
            </g>
        )
    }
}
