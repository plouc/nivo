/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import pure from 'recompose/pure'
import PropTypes from 'prop-types'

const CalendarMonthPath = ({ path, borderWidth, borderColor }) => (
    <path
        d={path}
        style={{
            fill: 'none',
            strokeWidth: borderWidth,
            stroke: borderColor,
            pointerEvents: 'none',
        }}
    />
)

CalendarMonthPath.propTypes = {
    path: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
}

export default pure(CalendarMonthPath)
