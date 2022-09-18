/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createElement, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTooltip } from '@nivo/tooltip'

const SlicesItem = ({
    slice,
    axis,
    debug,
    tooltip,
    isCurrent,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
            onMouseEnter && onMouseEnter(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            onMouseMove && onMouseMove(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(slice, event)
        },
        [hideTooltip, slice, onMouseLeave]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(slice, event)
        },
        [slice, onClick]
    )

    return (
        <rect
            x={slice.x0}
            y={slice.y0}
            width={slice.width}
            height={slice.height}
            stroke="red"
            strokeWidth={debug ? 1 : 0}
            strokeOpacity={0.75}
            fill="red"
            fillOpacity={isCurrent && debug ? 0.35 : 0}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            data-testid={`slice-${slice.id}`}
        />
    )
}

SlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    debug: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isCurrent: PropTypes.bool.isRequired,
    setCurrent: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default memo(SlicesItem)
