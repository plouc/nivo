/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes } from 'react';


class CalendarDay extends Component {
    render() {
        const { x, y, size, color, borderWidth, borderColor } = this.props;

        return (
            <rect
                className="nivo_calendar_day"
                x={x} y={y}
                width={size} height={size}
                style={{
                    fill:        color,
                    strokeWidth: borderWidth,
                    stroke:      borderColor,
                }}
            />
        );
    }
}

const { number, string } = PropTypes;

CalendarDay.propTypes = {
    x:           number.isRequired,
    y:           number.isRequired,
    size:        number.isRequired,
    color:       string.isRequired,
    borderWidth: number.isRequired,
    borderColor: string.isRequired,
};


export default CalendarDay;
