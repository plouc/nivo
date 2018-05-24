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

const WaffleNode = ({
    position,
    size,
    x,
    y,
    color,
    opacity,
    borderWidth,
    borderColor,
    data,
    onClick,
}) => {
    return (
        <rect
            width={size}
            height={size}
            x={x}
            y={y}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            opacity={opacity}
            onClick={() => {
                console.table({ position, color, ...data })
            }}
        />
    )
}

WaffleNode.propTypes = {
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}
WaffleNode.defaultProps = {
    data: {},
}
WaffleNode.displayName = 'WaffleNode'

export default WaffleNode
