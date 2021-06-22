import { CalendarDayProps } from './types'
import { useTooltip } from '@nivo/tooltip'
import { memo, useCallback } from 'react'
import * as React from 'react'

export const CalendarDay = memo(
    ({
        data,
        x,
        y,
        size,
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
    }: CalendarDayProps) => {
        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        const handleMouseEnter = useCallback(
            (event: React.MouseEvent<SVGRectElement>) => {
                if (!('value' in data)) {
                    return
                }

                const formatedData = {
                    ...data,
                    value: formatValue(data.value),
                    data: { ...data.data },
                }
                showTooltipFromEvent(React.createElement(tooltip, { ...formatedData }), event)
                onMouseEnter?.(data, event)
            },
            [showTooltipFromEvent, tooltip, data, onMouseEnter, formatValue]
        )
        const handleMouseMove = useCallback(
            (event: React.MouseEvent<SVGRectElement>) => {
                if (!('value' in data)) {
                    return
                }

                const formatedData = {
                    ...data,
                    value: formatValue(data.value),
                    data: { ...data.data },
                }
                showTooltipFromEvent(React.createElement(tooltip, { ...formatedData }), event)
                onMouseMove && onMouseMove(data, event)
            },
            [showTooltipFromEvent, tooltip, data, onMouseMove, formatValue]
        )
        const handleMouseLeave = useCallback(
            (event: React.MouseEvent<SVGRectElement>) => {
                if (!('value' in data)) {
                    return
                }

                hideTooltip()
                onMouseLeave?.(data, event)
            },
            [hideTooltip, data, onMouseLeave]
        )
        const handleClick = useCallback(
            (event: React.MouseEvent<SVGRectElement>) => onClick?.(data, event),
            [data, onClick]
        )

        return (
            <rect
                x={x}
                y={y}
                width={size}
                height={size}
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
