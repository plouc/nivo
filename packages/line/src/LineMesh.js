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
import { useTooltip } from '@nivo/tooltip'
import { Mesh } from '@nivo/voronoi'

const LineMesh = memo(
    ({
        points,
        width,
        height,
        margin,
        current,
        setCurrent,
        onMouseEnter,
        onMouseMove,
        onClick,
        tooltip,
        debug,
    }) => {
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

        const handleMouseLeave = useCallback(() => {
            hideTooltip()
            setCurrent(null)
        }, [hideTooltip, setCurrent])

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
)

LineMesh.displayName = 'LineMesh'
LineMesh.propTypes = {
    current: PropTypes.object,
    setCurrent: PropTypes.func.isRequired,
}

export default LineMesh
