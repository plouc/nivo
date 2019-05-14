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
import Axis from './Axis'
import { axisPropType } from '../props'

const positions = ['top', 'right', 'bottom', 'left']

const Axes = ({ xScale, yScale, width, height, top, right, bottom, left }) => {
    const axes = { top, right, bottom, left }

    return positions.map(position => {
        const axis = axes[position]

        if (!axis) return null

        const isXAxis = position === 'top' || position === 'bottom'
        const ticksPosition = position === 'top' || position === 'left' ? 'before' : 'after'

        return (
            <Axis
                key={position}
                {...axis}
                axis={isXAxis ? 'x' : 'y'}
                x={position === 'right' ? width : 0}
                y={position === 'bottom' ? height : 0}
                scale={isXAxis ? xScale : yScale}
                length={isXAxis ? width : height}
                ticksPosition={ticksPosition}
            />
        )
    })
}

Axes.propTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: axisPropType,
    right: axisPropType,
    bottom: axisPropType,
    left: axisPropType,
}

export default memo(Axes)
