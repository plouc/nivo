import { createElement, memo, useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { LineCommonProps, LineDatum, SliceAxis, SliceDatum } from './types'

const NonMemoizedSlicesItem = <Datum extends LineDatum>({
    slice,
    axis,
    debug,
    tooltip,
    isCurrent,
    setCurrent,
}: {
    slice: SliceDatum<Datum>
    axis: SliceAxis
    debug: boolean
    tooltip: LineCommonProps<Datum>['sliceTooltip']
    isCurrent: boolean
    setCurrent: (slice: SliceDatum<Datum> | null) => void
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
        },
        [showTooltipFromEvent, tooltip, slice]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
        },
        [showTooltipFromEvent, tooltip, slice]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrent(null)
    }, [hideTooltip])

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
        />
    )
}

export const SlicesItem = memo(NonMemoizedSlicesItem) as typeof NonMemoizedSlicesItem
