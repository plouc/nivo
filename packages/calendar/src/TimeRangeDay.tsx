import { createElement, memo, useCallback, MouseEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { TimeRangeDayProps } from './types'

export const TimeRangeDay = memo(
    ({
        data,
        x,
        ry = 5,
        rx = 5,
        y,
        width,
        height,
        color,
        borderWidth,
        borderColor,
        isInteractive,
        tooltip,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        formatValue,
    }: TimeRangeDayProps) => {
        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        const handleMouseEnter = useCallback(
            (event: MouseEvent<SVGRectElement>) => {
                if (!('value' in data)) {
                    return
                }

                const formatedData = {
                    ...data,
                    value: formatValue(data.value),
                }
                showTooltipFromEvent(createElement(tooltip, { ...formatedData }), event)
                onMouseEnter?.(data, event)
            },
            [showTooltipFromEvent, tooltip, data, onMouseEnter, formatValue]
        )
        const handleMouseMove = useCallback(
            (event: MouseEvent<SVGRectElement>) => {
                if (!('value' in data)) {
                    return
                }

                const formatedData = {
                    ...data,
                    value: formatValue(data.value),
                }
                showTooltipFromEvent(createElement(tooltip, { ...formatedData }), event)
                onMouseMove?.(data, event)
            },
            [showTooltipFromEvent, tooltip, data, onMouseMove, formatValue]
        )
        const handleMouseLeave = useCallback(
            (event: MouseEvent<SVGRectElement>) => {
                if (!('value' in data)) {
                    return
                }

                hideTooltip()
                onMouseLeave?.(data, event)
            },
            [hideTooltip, data, onMouseLeave]
        )
        const handleClick = useCallback(
            (event: MouseEvent<SVGRectElement>) => onClick?.(data, event),
            [data, onClick]
        )

        return (
            <rect
                x={x}
                y={y}
                rx={rx}
                ry={ry}
                width={width}
                height={height}
                style={{
                    fill: color,
                    strokeWidth: borderWidth,
                    stroke: borderColor,
                }}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleMouseMove : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
            />
        )
    }
)
