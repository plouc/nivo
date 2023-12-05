import { createElement, useCallback, MouseEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { LineDatum, SliceDatum, SliceTooltipComponent } from './types'

interface SlicesItemProps<Datum extends LineDatum> {
    slice: SliceDatum<Datum>
    axis: 'x' | 'y'
    debug: boolean
    height: number
    tooltip: SliceTooltipComponent<Datum>
    isCurrent: boolean
    setCurrent: (slice: SliceDatum<Datum> | null) => void
    onMouseEnter?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
    onMouseMove?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
    onMouseLeave?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
    onClick?: (slice: SliceDatum<Datum>, event: MouseEvent) => void
}

export const SlicesItem = <Datum extends LineDatum>({
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
}: SlicesItemProps<Datum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
            onMouseEnter && onMouseEnter(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, axis, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
            onMouseMove && onMouseMove(slice, event)
        },
        [showTooltipFromEvent, tooltip, slice, axis, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(slice, event)
        },
        [hideTooltip, setCurrent, slice, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent) => {
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
