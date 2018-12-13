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

export const BeeSwarmNode = ({
    x,
    y,
    size,
    color,
    borderWidth,
    borderColor,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => (
    <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    />
)

export const BeeSwarmNodePropTypes = {
    node: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

BeeSwarmNode.propTypes = BeeSwarmNodePropTypes
