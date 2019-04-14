/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

const SwarmPlotNode = memo(
    ({
        node,
        x,
        y,
        size,
        scale,
        color,
        borderWidth,
        borderColor,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    }) => {
        const handleMouseEnter = useCallback(event => onMouseEnter && onMouseEnter(node, event), [
            node,
            onMouseEnter,
        ])
        const handleMouseMove = useCallback(event => onMouseMove && onMouseEnter(node, event), [
            node,
            onMouseMove,
        ])
        const handleMouseLeave = useCallback(event => onMouseLeave && onMouseLeave(node, event), [
            node,
            onMouseLeave,
        ])
        const handleClick = useCallback(event => onClick && onClick(node, event), [node, onClick])

        return (
            <circle
                transform={`translate(${x},${y}) scale(${scale})`}
                r={size / 2}
                fill={color}
                strokeWidth={borderWidth}
                stroke={borderColor}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)

SwarmPlotNode.displayName = 'SwarmPlotNode'
SwarmPlotNode.propTypes = {
    node: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}
SwarmPlotNode.defaultProps = {
    scale: 1,
}

export default SwarmPlotNode
