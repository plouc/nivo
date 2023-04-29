import { memo, useRef, useState, useEffect, useCallback, MouseEvent } from 'react'
import * as React from 'react'
import {
    Box,
    Container,
    isCursorInRect,
    getRelativeCursor,
    degreesToRadians,
    useDimensions,
    useTheme,
    useValueFormatter,
} from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import { calendarCanvasDefaultProps } from './props'
import { useCalendarLayout, useColorScale, useMonthLegends, useYearLegends, useDays } from './hooks'
import { useTooltip } from '@nivo/tooltip'
import { CalendarCanvasProps } from './types'

const findDayUnderCursor = (
    event: React.MouseEvent,
    canvasEl: HTMLCanvasElement,
    days: ReturnType<typeof useDays>,
    size: number,
    dayBorderWidth: number,
    margin: Required<Box>
) => {
    const [x, y] = getRelativeCursor(canvasEl, event)
    return days.find(day => {
        return (
            'value' in day &&
            isCursorInRect(
                day.x + margin.left - dayBorderWidth / 2,
                day.y + margin.top - dayBorderWidth / 2,
                size + dayBorderWidth,
                size + dayBorderWidth,
                x,
                y
            )
        )
    })
}

const InnerCalendarCanvas = memo(
    ({
        margin: partialMargin,
        width,
        height,
        pixelRatio = calendarCanvasDefaultProps.pixelRatio,

        align = calendarCanvasDefaultProps.align,
        colors = calendarCanvasDefaultProps.colors,
        colorScale,
        data,
        direction = calendarCanvasDefaultProps.direction,
        emptyColor = calendarCanvasDefaultProps.emptyColor,
        from,
        to,
        minValue = calendarCanvasDefaultProps.minValue,
        maxValue = calendarCanvasDefaultProps.maxValue,
        valueFormat,
        legendFormat,

        yearLegend = calendarCanvasDefaultProps.yearLegend,
        yearLegendOffset = calendarCanvasDefaultProps.yearLegendOffset,
        yearLegendPosition = calendarCanvasDefaultProps.yearLegendPosition,
        yearSpacing = calendarCanvasDefaultProps.yearSpacing,

        monthLegend = calendarCanvasDefaultProps.monthLegend,
        monthLegendOffset = calendarCanvasDefaultProps.monthLegendOffset,
        monthLegendPosition = calendarCanvasDefaultProps.monthLegendPosition,
        monthSpacing = calendarCanvasDefaultProps.monthSpacing,

        dayBorderColor = calendarCanvasDefaultProps.dayBorderColor,
        dayBorderWidth = calendarCanvasDefaultProps.dayBorderWidth,
        daySpacing = calendarCanvasDefaultProps.daySpacing,

        isInteractive = calendarCanvasDefaultProps.isInteractive,
        tooltip = calendarCanvasDefaultProps.tooltip,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,

        legends = calendarCanvasDefaultProps.legends,
    }: CalendarCanvasProps) => {
        const canvasEl = useRef<HTMLCanvasElement | null>(null)
        const { innerWidth, innerHeight, outerWidth, outerHeight, margin } = useDimensions(
            width,
            height,
            partialMargin
        )
        const { months, years, ...rest } = useCalendarLayout({
            width: innerWidth,
            height: innerHeight,
            from,
            to,
            direction,
            yearSpacing,
            monthSpacing,
            daySpacing,
            align,
        })
        const colorScaleFn = useColorScale({ data, minValue, maxValue, colors, colorScale })
        const monthLegends = useMonthLegends({
            months,
            direction,
            monthLegendPosition,
            monthLegendOffset,
        })
        const yearLegends = useYearLegends({
            years,
            direction,
            yearLegendPosition,
            yearLegendOffset,
        })
        const days = useDays({ days: rest.days, data, colorScale: colorScaleFn, emptyColor })
        const [currentDay, setCurrentDay] = useState<ReturnType<typeof useDays>[number] | null>(
            null
        )
        const theme = useTheme()
        const formatValue = useValueFormatter(valueFormat)
        const formatLegend = useValueFormatter(legendFormat)

        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        useEffect(() => {
            if (!canvasEl.current) return

            canvasEl.current.width = outerWidth * pixelRatio
            canvasEl.current.height = outerHeight * pixelRatio

            const ctx = canvasEl.current.getContext('2d')

            if (!ctx) return

            ctx.scale(pixelRatio, pixelRatio)

            ctx.fillStyle = theme.background
            ctx.fillRect(0, 0, outerWidth, outerHeight)
            ctx.translate(margin.left, margin.top)

            days.forEach(day => {
                ctx.fillStyle = day.color
                if (dayBorderWidth > 0) {
                    ctx.strokeStyle = dayBorderColor
                    ctx.lineWidth = dayBorderWidth
                }

                ctx.beginPath()
                ctx.rect(day.x, day.y, day.size, day.size)
                ctx.fill()

                if (dayBorderWidth > 0) {
                    ctx.stroke()
                }
            })

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = theme.labels.text.fill ?? ''
            ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

            monthLegends.forEach(month => {
                ctx.save()
                ctx.translate(month.x, month.y)
                ctx.rotate(degreesToRadians(month.rotation))
                ctx.fillText(String(monthLegend(month.year, month.month, month.date)), 0, 0)
                ctx.restore()
            })

            yearLegends.forEach(year => {
                ctx.save()
                ctx.translate(year.x, year.y)
                ctx.rotate(degreesToRadians(year.rotation))
                ctx.fillText(String(yearLegend(year.year)), 0, 0)
                ctx.restore()
            })

            legends.forEach(legend => {
                const legendData = colorScaleFn.ticks(legend.itemCount).map(value => ({
                    id: value,
                    label: formatLegend(value),
                    color: colorScaleFn(value),
                }))

                renderLegendToCanvas(ctx, {
                    ...legend,
                    data: legendData,
                    containerWidth: innerWidth,
                    containerHeight: innerHeight,
                    theme,
                })
            })
        }, [
            canvasEl,
            innerHeight,
            innerWidth,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,
            days,
            dayBorderColor,
            dayBorderWidth,
            colorScale,
            yearLegend,
            yearLegends,
            monthLegend,
            monthLegends,
            legends,
            theme,
            formatLegend,
            colorScaleFn,
        ])

        const handleMouseHover = useCallback(
            (event: MouseEvent<HTMLCanvasElement>) => {
                if (!canvasEl.current) return

                const data = findDayUnderCursor(
                    event,
                    canvasEl.current,
                    days,
                    days[0].size,
                    dayBorderWidth,
                    margin
                )

                if (data) {
                    setCurrentDay(data)

                    if (!('value' in data)) {
                        return
                    }

                    const formatedData = {
                        ...data,
                        value: formatValue(data.value),
                        data: { ...data.data },
                    }
                    showTooltipFromEvent(React.createElement(tooltip, { ...formatedData }), event)
                    !currentDay && onMouseEnter?.(data, event)
                    onMouseMove?.(data, event)
                    currentDay && onMouseLeave?.(data, event)
                } else {
                    hideTooltip()
                    data && onMouseLeave?.(data, event)
                }
            },
            [
                canvasEl,
                currentDay,
                margin,
                days,
                setCurrentDay,
                formatValue,
                dayBorderWidth,
                showTooltipFromEvent,
                hideTooltip,
                onMouseEnter,
                onMouseMove,
                onMouseLeave,
                tooltip,
            ]
        )

        const handleMouseLeave = useCallback(() => {
            setCurrentDay(null)
            hideTooltip()
        }, [setCurrentDay, hideTooltip])

        const handleClick = useCallback(
            (event: MouseEvent<HTMLCanvasElement>) => {
                if (!onClick || !canvasEl.current) return

                const data = findDayUnderCursor(
                    event,
                    canvasEl.current,
                    days,
                    days[0].size,
                    daySpacing,
                    margin
                )

                data && onClick(data, event)
            },
            [canvasEl, daySpacing, margin, days, onClick]
        )

        return (
            <canvas
                ref={canvasEl}
                width={outerWidth * pixelRatio}
                height={outerHeight * pixelRatio}
                style={{
                    width: outerWidth,
                    height: outerHeight,
                }}
                onMouseEnter={isInteractive ? handleMouseHover : undefined}
                onMouseMove={isInteractive ? handleMouseHover : undefined}
                onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                onClick={isInteractive ? handleClick : undefined}
            />
        )
    }
)

export const CalendarCanvas = ({
    isInteractive = calendarCanvasDefaultProps.isInteractive,
    renderWrapper,
    theme,
    ...props
}: CalendarCanvasProps) => (
    <Container {...{ isInteractive, renderWrapper, theme }}>
        <InnerCalendarCanvas isInteractive={isInteractive} {...props} />
    </Container>
)
