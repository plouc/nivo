import { createElement, MouseEvent, useCallback, useMemo } from 'react'
import { animated, SpringValue, to } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import { BoxPlotDatum, BoxPlotItemProps, BoxPlotSummary } from './types'

const BoxPlotItemWhiskers = ({
    bandwidth,
    coordinates,
    layout,
    whiskerColor,
    whiskerWidth,
    whiskerEndWidth,
}: {
    bandwidth: number
    coordinates: Pick<BoxPlotSummary, 'values'>
    layout: 'vertical' | 'horizontal'
    whiskerWidth: number
    whiskerColor: string | SpringValue<string>
    whiskerEndWidth: number
}) => {
    const whiskerEndGap = ((1 - whiskerEndWidth) * bandwidth) / 2
    if (layout === 'vertical') {
        const y = coordinates.values[3]
        return (
            <>
                <animated.line
                    x1={to(bandwidth / 2, value => Math.max(value, 0))}
                    x2={to(bandwidth / 2, value => Math.max(value, 0))}
                    y1={to(0, v => v)}
                    y2={to(coordinates.values[4] - y, value => value)}
                    strokeWidth={whiskerWidth}
                    stroke={whiskerColor}
                />
                <animated.line
                    x1={to(bandwidth / 2, value => Math.max(value, 0))}
                    x2={to(bandwidth / 2, value => Math.max(value, 0))}
                    y1={to(coordinates.values[1] - y, v => v)}
                    y2={to(coordinates.values[0] - y, v => v)}
                    strokeWidth={whiskerWidth}
                    stroke={whiskerColor}
                />
                {whiskerEndWidth > 0 ? (
                    <>
                        <animated.line
                            x1={to(whiskerEndGap, value => Math.max(value, 0))}
                            x2={to(bandwidth - whiskerEndGap, value => Math.max(value, 0))}
                            y1={to(coordinates.values[0] - y, v => v)}
                            y2={to(coordinates.values[0] - y, v => v)}
                            strokeWidth={whiskerWidth}
                            stroke={whiskerColor}
                        />
                        <animated.line
                            x1={to(whiskerEndGap, value => Math.max(value, 0))}
                            x2={to(bandwidth - whiskerEndGap, value => Math.max(value, 0))}
                            y1={to(coordinates.values[4] - y, v => v)}
                            y2={to(coordinates.values[4] - y, v => v)}
                            strokeWidth={whiskerWidth}
                            stroke={whiskerColor}
                        />
                    </>
                ) : null}
            </>
        )
    } else {
        const x = coordinates.values[1]
        return (
            <>
                <animated.line
                    y1={to(bandwidth / 2, value => Math.max(value, 0))}
                    y2={to(bandwidth / 2, value => Math.max(value, 0))}
                    x1={to(0, v => v)}
                    x2={to(coordinates.values[0] - x, value => value)}
                    strokeWidth={whiskerWidth}
                    stroke={whiskerColor}
                />
                <animated.line
                    y1={to(bandwidth / 2, value => Math.max(value, 0))}
                    y2={to(bandwidth / 2, value => Math.max(value, 0))}
                    x1={to(coordinates.values[3] - x, v => v)}
                    x2={to(coordinates.values[4] - x, v => v)}
                    strokeWidth={whiskerWidth}
                    stroke={whiskerColor}
                />
                {whiskerEndWidth > 0 ? (
                    <>
                        <animated.line
                            y1={to(whiskerEndGap, value => Math.max(value, 0))}
                            y2={to(bandwidth - whiskerEndGap, value => Math.max(value, 0))}
                            x1={to(coordinates.values[0] - x, v => v)}
                            x2={to(coordinates.values[0] - x, v => v)}
                            strokeWidth={whiskerWidth}
                            stroke={whiskerColor}
                        />
                        <animated.line
                            y1={to(whiskerEndGap, value => Math.max(value, 0))}
                            y2={to(bandwidth - whiskerEndGap, value => Math.max(value, 0))}
                            x1={to(coordinates.values[4] - x, v => v)}
                            x2={to(coordinates.values[4] - x, v => v)}
                            strokeWidth={whiskerWidth}
                            stroke={whiskerColor}
                        />
                    </>
                ) : null}
            </>
        )
    }
}

const BoxPlotItemMedian = ({
    bandwidth,
    coordinates,
    layout,
    medianWidth,
    medianColor,
}: {
    bandwidth: number
    coordinates: Pick<BoxPlotSummary, 'values'>
    layout: 'vertical' | 'horizontal'
    medianWidth: number
    medianColor: string | SpringValue<string>
}) => {
    const median = coordinates.values[2]
    if (layout === 'vertical') {
        return (
            <animated.line
                x1={to(0, value => Math.max(value, 0))}
                x2={to(bandwidth, value => Math.max(value, 0))}
                y1={to(median - coordinates.values[3], value => value)}
                y2={to(median - coordinates.values[3], value => value)}
                strokeWidth={medianWidth}
                stroke={medianColor}
            />
        )
    } else {
        return (
            <animated.line
                y1={to(0, value => Math.max(value, 0))}
                y2={to(bandwidth, value => Math.max(value, 0))}
                x1={to(coordinates.values[3] - median, value => value)}
                x2={to(coordinates.values[3] - median, value => value)}
                strokeWidth={medianWidth}
                stroke={medianColor}
            />
        )
    }
}

export const BoxPlotItem = <RawDatum extends BoxPlotDatum>({
    boxPlot,
    layout,
    style: { borderColor, medianColor, whiskerColor, color, height, transform, width },
    borderRadius,
    borderWidth,
    medianWidth,
    whiskerWidth,
    whiskerEndWidth,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    tooltip,
    isFocusable,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: BoxPlotItemProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const renderTooltip = useMemo(() => () => createElement(tooltip, boxPlot), [tooltip, boxPlot])

    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onClick?.(boxPlot, event)
        },
        [boxPlot, onClick]
    )
    const handleTooltip = useCallback(
        (event: MouseEvent<SVGRectElement>) => showTooltipFromEvent(renderTooltip(), event),
        [showTooltipFromEvent, renderTooltip]
    )
    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseEnter?.(boxPlot, event)
            showTooltipFromEvent(renderTooltip(), event)
        },
        [boxPlot, onMouseEnter, showTooltipFromEvent, renderTooltip]
    )
    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseLeave?.(boxPlot, event)
            hideTooltip()
        },
        [boxPlot, hideTooltip, onMouseLeave]
    )
    const handleBlur = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const bandwidth = layout === 'vertical' ? boxPlot.width : boxPlot.height

    // draw two whiskers, the box, and median line
    return (
        <animated.g
            transform={transform}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleTooltip : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
            onBlur={isInteractive && isFocusable ? handleBlur : undefined}
            focusable={isFocusable}
            tabIndex={isFocusable ? 0 : undefined}
            aria-label={ariaLabel ? ariaLabel(boxPlot) : undefined}
            aria-labelledby={ariaLabelledBy ? ariaLabelledBy(boxPlot) : undefined}
            aria-describedby={ariaDescribedBy ? ariaDescribedBy(boxPlot) : undefined}
        >
            <BoxPlotItemWhiskers
                bandwidth={bandwidth}
                coordinates={boxPlot.coordinates}
                layout={layout}
                whiskerWidth={whiskerWidth}
                whiskerColor={whiskerColor}
                whiskerEndWidth={whiskerEndWidth}
            />
            <animated.rect
                width={to(width, value => Math.max(value, 0))}
                height={to(height, value => Math.max(value, 0))}
                rx={borderRadius}
                ry={borderRadius}
                fill={boxPlot.fill ?? color}
                strokeWidth={borderWidth}
                stroke={borderColor}
            />
            <BoxPlotItemMedian
                bandwidth={bandwidth}
                layout={layout}
                coordinates={boxPlot.coordinates}
                medianWidth={medianWidth}
                medianColor={medianColor}
            />
        </animated.g>
    )
}
