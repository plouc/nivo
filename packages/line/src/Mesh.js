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
import { Mesh as BaseMesh } from '@nivo/voronoi'

const Mesh = ({
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

Mesh.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object.isRequired,
    setCurrent: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    debug: PropTypes.bool.isRequired,
}

export default memo(Mesh)
