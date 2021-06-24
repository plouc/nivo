import { BarDatum, BarItemProps } from './types'
import { animated } from '@react-spring/web'
import { createElement, useCallback } from 'react'
import { useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'

export const BarItem = <RawDatum extends BarDatum>({
    data,
    color,

    style: { height, transform, width, x, y, ...style },

    borderRadius,
    borderWidth,
    borderColor,

    label,
    shouldRenderLabel,
    labelColor,

    isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,

    getTooltipLabel,
    tooltip,
    tooltipFormat,
}: BarItemProps<RawDatum>) => {
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onClick?.({ color, ...data }, event)
        },
        [color, data, onClick]
    )

    const handleTooltip = useCallback(
        (event: React.MouseEvent<SVGRectElement>) =>
            showTooltipFromEvent(
                createElement(tooltip, { ...data, color, getTooltipLabel, tooltipFormat }),
                event
            ),
        [color, data, getTooltipLabel, showTooltipFromEvent, tooltip, tooltipFormat]
    )
    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onMouseEnter?.(data, event)
            showTooltipFromEvent(
                createElement(tooltip, { ...data, color, getTooltipLabel, tooltipFormat }),
                event
            )
        },
        [color, data, getTooltipLabel, onMouseEnter, showTooltipFromEvent, tooltip, tooltipFormat]
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
                width={width}
                height={height}
                rx={borderRadius}
                ry={borderRadius}
                fill={data.fill ?? style.color}
                strokeWidth={borderWidth}
                stroke={borderColor}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleTooltip : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
            />
            {shouldRenderLabel && (
                <animated.text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
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
