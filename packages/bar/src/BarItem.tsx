import { BarDatum, BarItemProps } from './types'
import { createElement, useCallback } from 'react'
import { useTheme } from '@nivo/core'

export const BarItem = <RawDatum extends BarDatum>({
    data,

    x,
    y,
    width,
    height,
    borderRadius,
    color,
    borderWidth,
    borderColor,

    label,
    shouldRenderLabel,
    labelColor,

    showTooltip,
    hideTooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    getTooltipLabel,
    tooltip,
    tooltipFormat,
}: BarItemProps<RawDatum>) => {
    const theme = useTheme()

    const handleClick = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onClick?.({ color, ...data }, event)
        },
        [color, data, onClick]
    )

    const handleTooltip = useCallback(
        (event: React.MouseEvent<SVGRectElement>) =>
            showTooltip(
                createElement(tooltip, { ...data, color, getTooltipLabel, tooltipFormat }),
                event
            ),
        [color, data, getTooltipLabel, showTooltip, tooltip, tooltipFormat]
    )
    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onMouseEnter?.(data, event)
            showTooltip(
                createElement(tooltip, { ...data, color, getTooltipLabel, tooltipFormat }),
                event
            )
        },
        [color, data, getTooltipLabel, onMouseEnter, showTooltip, tooltip, tooltipFormat]
    )
    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            onMouseLeave?.(data, event)
            hideTooltip()
        },
        [data, hideTooltip, onMouseLeave]
    )

    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect
                width={width}
                height={height}
                rx={borderRadius}
                ry={borderRadius}
                fill={data.fill ?? color}
                strokeWidth={borderWidth}
                stroke={borderColor}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleTooltip}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
            {shouldRenderLabel && (
                <text
                    x={width / 2}
                    y={height / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        pointerEvents: 'none',
                        fill: labelColor,
                    }}
                >
                    {label}
                </text>
            )}
        </g>
    )
}
