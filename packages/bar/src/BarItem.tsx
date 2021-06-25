import { BarDatum, BarItemProps } from './types'
import { animated } from '@react-spring/web'
import { createElement, useCallback } from 'react'
import { useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'

export const BarItem = <RawDatum extends BarDatum>({
    bar: { data, ...bar },

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
