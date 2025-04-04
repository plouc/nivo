import { createElement, memo, useCallback } from 'react'
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
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
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

    const handleMouseDown = useCallback(
        event => {
            onMouseDown && onMouseDown(slice, event)
        },
        [slice, onMouseDown]
    )

    const handleMouseUp = useCallback(
        event => {
            onMouseUp && onMouseUp(slice, event)
        },
        [slice, onMouseUp]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(slice, event)
        },
        [slice, onClick]
    )

    const handleDoubleClick = useCallback(
        event => {
            onDoubleClick && onDoubleClick(slice, event)
        },
        [slice, onDoubleClick]
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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onTouchStart={handeOnTouchStart}
            onTouchMove={handeOnTouchMove}
            onTouchEnd={handleOnTouchEnd}
            data-ref={slice.id}
        />
    )
}

export default memo(SlicesItem)
