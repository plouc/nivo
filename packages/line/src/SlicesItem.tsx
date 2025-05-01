import { createElement, memo, useCallback, MouseEvent, TouchEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { LineSeries, SliceData, CommonLineProps, LineSvgProps } from './types'

export const NonMemoizedSlicesItem = <Series extends LineSeries>({
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
}: {
    slice: SliceData<Series>
    slices: readonly SliceData<Series>[]
    axis: Exclude<LineSvgProps<Series>['enableSlices'], undefined | false>
    debug: boolean
    tooltip: CommonLineProps<Series>['sliceTooltip']
    isCurrent: boolean
    setCurrent: (slice: SliceData<Series> | null) => void
    onMouseEnter?: CommonLineProps<Series>['onMouseEnter']
    onMouseMove?: CommonLineProps<Series>['onMouseMove']
    onMouseLeave?: CommonLineProps<Series>['onMouseLeave']
    onMouseDown?: CommonLineProps<Series>['onMouseDown']
    onMouseUp?: CommonLineProps<Series>['onMouseUp']
    onClick?: CommonLineProps<Series>['onClick']
    onDoubleClick?: CommonLineProps<Series>['onDoubleClick']
    onTouchStart?: CommonLineProps<Series>['onTouchStart']
    onTouchMove?: CommonLineProps<Series>['onTouchMove']
    onTouchEnd?: CommonLineProps<Series>['onTouchEnd']
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
            onMouseEnter?.(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, axis, setCurrent, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            onMouseMove?.(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, axis, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave?.(slice, event)
        },
        [hideTooltip, setCurrent, onMouseLeave, slice]
    )

    const handleMouseDown = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseDown?.(slice, event)
        },
        [slice, onMouseDown]
    )

    const handleMouseUp = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseUp?.(slice, event)
        },
        [slice, onMouseUp]
    )

    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onClick?.(slice, event)
        },
        [slice, onClick]
    )

    const handleDoubleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onDoubleClick?.(slice, event)
        },
        [slice, onDoubleClick]
    )

    const handeOnTouchStart = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
            onTouchStart?.(slice, event)
        },
        [axis, onTouchStart, setCurrent, showTooltipFromEvent, slice, tooltip]
    )

    const handeOnTouchMove = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
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
            onTouchMove?.(slice, event)
        },
        [axis, onTouchMove, setCurrent, showTooltipFromEvent, slice, slices, tooltip]
    )

    const handleOnTouchEnd = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            hideTooltip()
            setCurrent(null)
            onTouchEnd?.(slice, event)
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

export const SlicesItem = memo(NonMemoizedSlicesItem) as typeof NonMemoizedSlicesItem
