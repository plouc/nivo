import { BarDatum, BarItemProps } from './types'
import { animated, to } from '@react-spring/web'
import { createElement, useCallback } from 'react'
import { useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'

export const BarItem = <RawDatum extends BarDatum>({
    bar: { data, ...bar },

    style: {
        borderColor,
        color,
        height,
        labelColor,
        labelOpacity,
        labelX,
        labelY,
        transform,
        width,
    },

    borderRadius,
    borderWidth,

    label,
    shouldRenderLabel,

    isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,

    tooltip,
}: BarItemProps<RawDatum>) => {
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onClick?.({ color: bar.color, ...data }, event)
        },
        [bar, data, onClick]
    )
    const handleTooltip = useCallback(
        (event: React.MouseEvent<SVGRectElement>) =>
            showTooltipFromEvent(createElement(tooltip, { ...bar, ...data }), event),
        [bar, data, showTooltipFromEvent, tooltip]
    )
    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onMouseEnter?.(data, event)
            showTooltipFromEvent(createElement(tooltip, { ...bar, ...data }), event)
        },
        [bar, data, onMouseEnter, showTooltipFromEvent, tooltip]
    )
    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onMouseLeave?.(data, event)
            hideTooltip()
        },
        [data, hideTooltip, onMouseLeave]
    )

    return (
        <animated.g transform={transform}>
            <animated.rect
                width={to(width, value => Math.max(value, 0))}
                height={to(height, value => Math.max(value, 0))}
                rx={borderRadius}
                ry={borderRadius}
                fill={data.fill ?? color}
                strokeWidth={borderWidth}
                stroke={borderColor}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleTooltip : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
            />
            {shouldRenderLabel && (
                <animated.text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fillOpacity={labelOpacity}
                    style={{
                        ...theme.labels.text,
                        pointerEvents: 'none',
                        fill: labelColor,
                    }}
                >
                    {label}
                </animated.text>
            )}
        </animated.g>
    )
}
