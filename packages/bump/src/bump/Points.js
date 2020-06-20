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

const Points = ({ pointComponent, points }) => {
    return points.map(point => {
        return React.createElement(pointComponent, {
            key: point.id,
            data: point.data,
            x: point.x,
            y: point.y,
            isActive: point.isActive,
            isInactive: point.isInactive,
            size: point.style.size,
            color: point.color,
            borderColor: point.borderColor,
            borderWidth: point.style.borderWidth,
        })
    })
}

Points.propTypes = {
    pointComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.object.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
            isInactive: PropTypes.bool.isRequired,
            color: PropTypes.string.isRequired,
            borderColor: PropTypes.string.isRequired,
            style: PropTypes.shape({
                size: PropTypes.number.isRequired,
                borderWidth: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
}

export default memo(Points)
