/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import { useTooltip } from '@nivo/core'
import { Mesh } from '@nivo/voronoi'

const LineMesh = ({
    points,
    width,
    height,
    onMouseEnter,
    onMouseMove,
    onClick,
    tooltip,
    debug,
}) => {
    const [showTooltip, hideTooltip] = useTooltip()

    const handleMouseEnter = useCallback(
        (point, event) => {
            showTooltip(React.createElement(tooltip, { point }), event)
            onMouseEnter && onMouseEnter(point, event)
        },
        [showTooltip, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (point, event) => {
            showTooltip(React.createElement(tooltip, { point }), event)
            onMouseMove && onMouseMove(point, event)
        },
        [showTooltip, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(() => hideTooltip(), [])

    const handleClick = useCallback(
        (point, event) => {
            onClick && onClick(point, event)
        },
        [onClick]
    )

    return (
        <Mesh
            nodes={points}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            debug={debug}
        />
    )
}

export default LineMesh
