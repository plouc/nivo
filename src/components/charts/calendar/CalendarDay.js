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
        const { x, y, size, borderWidth, borderColor } = this.props;

        return (
            <rect
                className="nivo_calendar_day"
                x={x} y={y}
                width={size} height={size}
                style={{
                    fill:        'rgba(0, 0, 0, .15)',
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
    borderWidth: number.isRequired,
    borderColor: string.isRequired,
};


export default CalendarDay;
