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
    slices,
    axis,
    debug,
    tooltip,
    isCurrent,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
            onMouseEnter && onMouseEnter(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, axis, setCurrent, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            onMouseMove && onMouseMove(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, axis, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(slice, event)
        },
        [hideTooltip, setCurrent, onMouseLeave, slice]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(slice, event)
        },
        [slice, onClick]
    )

    const handeOnTouchStart = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
            onTouchStart && onTouchStart(slice, event)
        },
        [axis, onTouchStart, setCurrent, showTooltipFromEvent, slice, tooltip]
    )

    const handeOnTouchMove = useCallback(
        event => {
            // This event will be locked to the element that was touched originally
            // We find the element that is currently being "hovered over" by getting the element at the touch point
            const touchPoint = event.touches[0]
            const touchingElement = document.elementFromPoint(
                touchPoint.clientX,
                touchPoint.clientY
            )
            // Is this a nivo ref?
            const touchingSliceId = touchingElement?.getAttribute('data-ref')
            if (touchingSliceId) {
                // Is this a slice for this graph?
                const slice = slices.find(slice => slice.id === touchingSliceId)
                if (slice) {
                    showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
                    setCurrent(slice)
                }
            }

            // Note here, this will pass the original slice, not the one we found
            // But this can be found with document.elementFromPoint()
            onTouchMove && onTouchMove(slice, event)
        },
        [axis, onTouchMove, setCurrent, showTooltipFromEvent, slice, slices, tooltip]
    )

    const handleOnTouchEnd = useCallback(
        event => {
            hideTooltip()
            setCurrent(null)
            onTouchEnd && onTouchEnd(slice, event)
        },
        [hideTooltip, setCurrent, onTouchEnd, slice]
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
            onTouchStart={handeOnTouchStart}
            onTouchMove={handeOnTouchMove}
            onTouchEnd={handleOnTouchEnd}
            data-ref={slice.id}
        />
    )
}

SlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    slices: PropTypes.arrayOf(PropTypes.object).isRequired,
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
