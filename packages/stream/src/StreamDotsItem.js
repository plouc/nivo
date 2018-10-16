/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'

const StreamDotsItem = ({ x, y, size, color, borderWidth, borderColor }) => {
    return (
        <circle
            cx={x}
            cy={y}
            r={size * 0.5}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
        />
    )
}

StreamDotsItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
}

export default StreamDotsItem
