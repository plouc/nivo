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

class CalendarDay extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { onClick, data } = this.props
        onClick(data)
    }

    render() {
        const { x, y, size, color, borderWidth, borderColor } = this.props

        return (
            <rect
                onClick={this.handleClick}
                className="nivo_calendar_day"
                x={x}
                y={y}
                width={size}
                height={size}
                style={{
                    fill: color,
                    strokeWidth: borderWidth,
                    stroke: borderColor,
                }}
            />
        )
    }
}

const { number, string, object, func } = PropTypes

CalendarDay.propTypes = {
    onClick: func.isRequired,
    data: object.isRequired,
    x: number.isRequired,
    y: number.isRequired,
    size: number.isRequired,
    color: string.isRequired,
    borderWidth: number.isRequired,
    borderColor: string.isRequired,
}

export default CalendarDay
