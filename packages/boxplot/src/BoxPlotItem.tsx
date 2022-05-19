import { createElement, MouseEvent, useCallback, useMemo } from 'react'
import { animated, SpringValue } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import { BoxPlotDatum, BoxPlotItemProps } from './types'

const BoxPlotItemWhisker = ({
    distStart,
    distEnd,
    whiskerEndSize,
    whiskerColor,
    whiskerWidth,
}: {
    distStart: SpringValue<number>
    distEnd: SpringValue<number>
    whiskerEndSize: number
    whiskerColor: SpringValue<string>
    whiskerWidth: number
}) => {
    return (
        <>
            <animated.line
                x1={0}
                x2={0}
                y1={distStart}
                y2={distEnd}
                strokeWidth={whiskerWidth}
                stroke={whiskerColor}
            />
            {whiskerEndSize > 0 ? (
                <animated.line
                    x1={-whiskerEndSize}
                    x2={whiskerEndSize}
                    y1={distEnd}
                    y2={distEnd}
                    strokeWidth={whiskerWidth}
                    stroke={whiskerColor}
                />
            ) : null}
        </>
    )
}

export const BoxPlotItem = <RawDatum extends BoxPlotDatum>({
    boxPlot,
    layout,
    animatedProps: {
        borderColor,
        medianColor,
        whiskerColor,
        color,
        opacity,
        transform,
        valueInterval,
        valueDistance0,
        valueDistance1,
        valueDistance3,
        valueDistance4,
    },
    borderRadius,
    borderWidth,
    medianWidth,
    whiskerWidth,
    whiskerEndSize,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    setActiveItem,
    tooltip,
    isFocusable,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: BoxPlotItemProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const vertical = layout === 'vertical'
    const bandwidth = vertical ? boxPlot.width : boxPlot.height

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
            setActiveItem(boxPlot)
        },
        [boxPlot, onMouseEnter, showTooltipFromEvent, renderTooltip, setActiveItem]
    )
    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseLeave?.(boxPlot, event)
            hideTooltip()
            setActiveItem(null)
        },
        [boxPlot, hideTooltip, onMouseLeave, setActiveItem]
    )
    const handleBlur = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    return (
        <animated.g
            data-key={`boxplot.${boxPlot.key}`}
            transform={transform}
            opacity={opacity}
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
                x={-bandwidth / 2}
                y={vertical ? valueDistance3 : valueDistance1}
                width={bandwidth}
                height={valueInterval}
                rx={borderRadius}
                ry={borderRadius}
                fill={boxPlot.fill ?? color}
                strokeWidth={borderWidth}
                stroke={borderColor}
            />
            <animated.line
                x1={-bandwidth / 2}
                x2={bandwidth / 2}
                y1={0}
                y2={0}
                strokeWidth={medianWidth}
                stroke={medianColor}
            />
            <BoxPlotItemWhisker
                distStart={valueDistance1}
                distEnd={valueDistance0}
                whiskerEndSize={(whiskerEndSize * bandwidth) / 2}
                whiskerColor={whiskerColor}
                whiskerWidth={whiskerWidth}
            />
            <BoxPlotItemWhisker
                distStart={valueDistance3}
                distEnd={valueDistance4}
                whiskerEndSize={(whiskerEndSize * bandwidth) / 2}
                whiskerColor={whiskerColor}
                whiskerWidth={whiskerWidth}
            />
        </animated.g>
    )
}
