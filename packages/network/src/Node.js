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

const Node = ({
    node,
    x,
    y,
    radius,
    color,
    borderWidth,
    borderColor,
    scale = 1,
    handleNodeHover,
    handleNodeLeave,
}) => {
    return (
        <circle
            transform={`translate(${x},${y}) scale(${scale})`}
            r={radius}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onMouseEnter={event => handleNodeHover(node, event)}
            onMouseMove={event => handleNodeHover(node, event)}
            onMouseLeave={handleNodeLeave}
        />
    )
}

Node.propTypes = {
    node: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    scale: PropTypes.number,
    handleNodeHover: PropTypes.func.isRequired,
    handleNodeLeave: PropTypes.func.isRequired,
}

export default memo(Node)
