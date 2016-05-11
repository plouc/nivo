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


class CalendarMonthPath extends Component {
    render() {
        const { path, borderWidth, borderColor } = this.props;

        return (
            <path
                className="nivo_calendar_month"
                d={path}
                style={{
                    fill:        'none',
                    strokeWidth: borderWidth,
                    stroke:      borderColor,
                }}
            />
        );
    }
}

const { number, string } = PropTypes;

CalendarMonthPath.propTypes = {
    path:        string.isRequired,
    borderWidth: number.isRequired,
    borderColor: string.isRequired,
};


export default CalendarMonthPath;
