import { BarDatum, BarItemProps } from './types'
import { animated, to } from '@react-spring/web'
import { createElement, FocusEvent, MouseEvent, useCallback, useMemo } from 'react'
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

    isFocusable,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: BarItemProps<RawDatum>) => {
    const theme = useTheme()
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip()

    const renderTooltip = useMemo(() => () => createElement(tooltip, { ...bar, ...data }), [
        tooltip,
        bar,
        data,
    ])

    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onClick?.({ color: bar.color, ...data }, event)
        },
        [bar, data, onClick]
    )
    const handleTooltip = useCallback(
        (event: MouseEvent<SVGRectElement>) => showTooltipFromEvent(renderTooltip(), event),
        [showTooltipFromEvent, renderTooltip]
    )
    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseEnter?.(data, event)
            showTooltipFromEvent(renderTooltip(), event)
        },
        [data, onMouseEnter, showTooltipFromEvent, renderTooltip]
    )
    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseLeave?.(data, event)
            hideTooltip()
        },
        [data, hideTooltip, onMouseLeave]
    )

    // extra handlers to allow keyboard navigation
    const handleFocus = useCallback(
        (event: FocusEvent<SVGRectElement>) => {
            console.log(bar)
            showTooltipAt(renderTooltip(), [bar.x, bar.y])
        },
        [showTooltipAt, renderTooltip, bar]
    )
    const handleBlur = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

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
                focusable={isFocusable}
                tabIndex={isFocusable ? 0 : undefined}
                aria-label={ariaLabel ? ariaLabel() : undefined}
                aria-labelledby={ariaLabelledBy ? ariaLabelledBy() : undefined}
                aria-describedby={ariaDescribedBy ? ariaDescribedBy() : undefined}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleTooltip : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
                onFocus={isInteractive && isFocusable ? handleFocus : undefined}
                onBlur={isInteractive && isFocusable ? handleBlur : undefined}
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
