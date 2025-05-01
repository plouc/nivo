import { createElement, MouseEvent, useCallback, useMemo } from 'react'
import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { useTooltip } from '@nivo/tooltip'
import { Text } from '@nivo/text'
import { BarDatum, BarItemProps } from './types'

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
        textAnchor,
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
    ariaDisabled,
    ariaHidden,
}: BarItemProps<RawDatum>) => {
    const theme = useTheme()
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip()

    const renderTooltip = useMemo(
        () => () => createElement(tooltip, { ...bar, ...data }),
        [tooltip, bar, data]
    )

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
    const handleFocus = useCallback(() => {
        showTooltipAt(renderTooltip(), [bar.absX + bar.width / 2, bar.absY])
    }, [showTooltipAt, renderTooltip, bar])
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
                aria-label={ariaLabel ? ariaLabel(data) : undefined}
                aria-labelledby={ariaLabelledBy ? ariaLabelledBy(data) : undefined}
                aria-describedby={ariaDescribedBy ? ariaDescribedBy(data) : undefined}
                aria-disabled={ariaDisabled ? ariaDisabled(data) : undefined}
                aria-hidden={ariaHidden ? ariaHidden(data) : undefined}
                onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                onMouseMove={isInteractive ? handleTooltip : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
                onFocus={isInteractive && isFocusable ? handleFocus : undefined}
                onBlur={isInteractive && isFocusable ? handleBlur : undefined}
                data-testid={`bar.item.${data.id}.${data.index}`}
            />
            {shouldRenderLabel && (
                <Text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    fillOpacity={labelOpacity}
                    style={{
                        ...theme.labels.text,
                        // We don't want the label to intercept mouse events
                        pointerEvents: 'none',
                        fill: labelColor,
                    }}
                >
                    {label}
                </Text>
            )}
        </animated.g>
    )
}
