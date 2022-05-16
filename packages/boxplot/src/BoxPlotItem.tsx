import { createElement, MouseEvent, useCallback, useMemo } from 'react'
import { animated, SpringValue, to } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import { BoxPlotDatum, BoxPlotItemProps, ComputedBoxPlotSummary } from './types'

type LineCoordinates = {
    x1: number
    y1: number
    x2: number
    y2: number
}

const computeLineCoordinates = <RawDatum extends BoxPlotDatum>({
    boxPlot,
    layout,
    whiskerEndSize,
}: {
    boxPlot: ComputedBoxPlotSummary
    layout: BoxPlotItemProps<RawDatum>['layout']
    whiskerEndSize: BoxPlotItemProps<RawDatum>['whiskerEndSize']
}) => {
    const vertical = layout === 'vertical'
    const bandwidth = vertical ? boxPlot.width : boxPlot.height
    const hb = bandwidth / 2
    const coords = boxPlot.coordinates.values
    const end1 = ((1 - whiskerEndSize) * bandwidth) / 2
    const end2 = bandwidth - end1

    // median
    const medianCoordinates = vertical
        ? { x1: 0, x2: bandwidth, y1: coords[2] - coords[3], y2: coords[2] - coords[3] }
        : { x1: coords[3] - coords[2], x2: coords[3] - coords[2], y1: 0, y2: bandwidth }
    // main whiskers orthogonal to the box
    const topWhiskerCoordinates = vertical
        ? { x1: hb, x2: hb, y1: 0, y2: coords[4] - coords[3] }
        : { x1: coords[3] - coords[1], x2: coords[4] - coords[1], y1: hb, y2: hb }
    const bottomWhiskerCoordinates = vertical
        ? { x1: hb, x2: hb, y1: coords[1] - coords[3], y2: coords[0] - coords[3] }
        : { x1: 0, x2: coords[0] - coords[1], y1: hb, y2: hb }
    // caps at the end of the main whiskers
    const topWhiskerEndCoordinates = vertical
        ? whiskerEndSize > 0
            ? { x1: end1, x2: end2, y1: coords[4] - coords[3], y2: coords[4] - coords[3] }
            : null
        : whiskerEndSize > 0
        ? { x1: coords[4] - coords[1], x2: coords[4] - coords[1], y1: end1, y2: end2 }
        : null
    const bottomWhiskerEndCoordinates = vertical
        ? whiskerEndSize > 0
            ? { x1: end1, x2: end2, y1: coords[0] - coords[3], y2: coords[0] - coords[3] }
            : null
        : whiskerEndSize > 0
        ? { x1: coords[0] - coords[1], x2: coords[0] - coords[1], y1: end1, y2: end2 }
        : null

    return {
        medianCoordinates,
        topWhiskerCoordinates,
        topWhiskerEndCoordinates,
        bottomWhiskerCoordinates,
        bottomWhiskerEndCoordinates,
    }
}

const BoxPlotItemWhisker = ({
    whiskerCoordinates,
    whiskerEndCoordinates,
    thickness,
    color,
}: {
    whiskerCoordinates: LineCoordinates
    whiskerEndCoordinates: LineCoordinates | null
    thickness: number
    color: string | SpringValue<string>
}) => {
    const interpolator = (v: number) => v
    return (
        <>
            <animated.line
                x1={to(whiskerCoordinates.x1, interpolator)}
                x2={to(whiskerCoordinates.x2, interpolator)}
                y1={to(whiskerCoordinates.y1, interpolator)}
                y2={to(whiskerCoordinates.y2, interpolator)}
                strokeWidth={thickness}
                stroke={color}
            />
            {whiskerEndCoordinates ? (
                <animated.line
                    x1={to(whiskerEndCoordinates.x1, interpolator)}
                    x2={to(whiskerEndCoordinates.x2, interpolator)}
                    y1={to(whiskerEndCoordinates.y1, interpolator)}
                    y2={to(whiskerEndCoordinates.y2, interpolator)}
                    strokeWidth={thickness}
                    stroke={color}
                />
            ) : null}
        </>
    )
}

export const BoxPlotItem = <RawDatum extends BoxPlotDatum>({
    boxPlot,
    layout,
    style: { borderColor, medianColor, whiskerColor, color, height, transform, width },
    borderRadius,
    borderWidth,
    medianWidth,
    whiskerWidth,
    whiskerEndSize,
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

    const {
        medianCoordinates,
        topWhiskerCoordinates,
        topWhiskerEndCoordinates,
        bottomWhiskerCoordinates,
        bottomWhiskerEndCoordinates,
    } = computeLineCoordinates({ boxPlot, layout, whiskerEndSize })

    // draw the box, two whiskers with end lines, and median line
    const interpolator = (v: number) => v
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
            <animated.rect
                width={to(width, interpolator)}
                height={to(height, interpolator)}
                rx={borderRadius}
                ry={borderRadius}
                fill={boxPlot.fill ?? color}
                strokeWidth={borderWidth}
                stroke={borderColor}
            />
            <BoxPlotItemWhisker
                whiskerCoordinates={topWhiskerCoordinates}
                whiskerEndCoordinates={topWhiskerEndCoordinates}
                color={whiskerColor}
                thickness={whiskerWidth}
            />
            <BoxPlotItemWhisker
                whiskerCoordinates={bottomWhiskerCoordinates}
                whiskerEndCoordinates={bottomWhiskerEndCoordinates}
                color={whiskerColor}
                thickness={whiskerWidth}
            />
            <animated.line
                x1={to(medianCoordinates.x1, interpolator)}
                x2={to(medianCoordinates.x2, interpolator)}
                y1={to(medianCoordinates.y1, interpolator)}
                y2={to(medianCoordinates.y2, interpolator)}
                strokeWidth={medianWidth}
                stroke={medianColor}
            />
        </animated.g>
    )
}
