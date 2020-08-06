/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { Dimensions, Box } from '@nivo/core'
import { Point, PointMouseHandler } from './hooks';
import { PointTooltipProps } from './PointTooltip';

interface MeshProps extends Dimensions {
    points: Point[],
    margin: Box,
    setCurrent: React.Dispatch<React.SetStateAction<Point | null>>,
    onMouseEnter?: PointMouseHandler
    onMouseMove?: PointMouseHandler
    onMouseLeave?: PointMouseHandler
    onClick?: PointMouseHandler
    tooltip: React.ComponentClass<PointTooltipProps>,
    debug: boolean
}

export default function Mesh({
    points,
    width,
    height,
    margin,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    debug,
}: MeshProps) {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (point, event) => {
            showTooltipAt(
                React.createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            setCurrent(point)
            onMouseEnter && onMouseEnter(point, event)
        },
        [setCurrent, showTooltipAt, tooltip, onMouseEnter, margin]
    )

    const handleMouseMove = useCallback(
        (point, event) => {
            showTooltipAt(
                React.createElement(tooltip, { point }),
                [point.x + margin.left, point.y + margin.top],
                'top'
            )
            setCurrent(point)
            onMouseMove && onMouseMove(point, event)
        },
        [setCurrent, showTooltipAt, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (point, event) => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(point, event)
        },
        [hideTooltip, setCurrent, onMouseLeave]
    )

    const handleClick = useCallback(
        (point, event) => {
            onClick && onClick(point, event)
        },
        [onClick]
    )

    return (
        <BaseMesh
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
