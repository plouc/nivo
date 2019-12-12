/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

const pointStyle = { pointerEvents: 'none' }

const Point = ({ x, y, size, color, borderColor, borderWidth }) => {
    return (
        <circle
            cx={x}
            cy={y}
            r={size / 2}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            style={pointStyle}
        />
    )
}

Point.propTypes = {
    data: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    isInactive: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
}

export default memo(Point)
