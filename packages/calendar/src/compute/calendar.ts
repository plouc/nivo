import isDate from 'lodash/isDate'
import memoize from 'lodash/memoize'
import range from 'lodash/range'
import { alignBox } from '@nivo/core'
import { timeFormat } from 'd3-time-format'
import { timeDays, timeWeek, timeWeeks, timeMonths, timeYear } from 'd3-time'
import { ScaleQuantize } from 'd3-scale'
import { BBox, CalendarSvgProps, ColorScale, Datum, Year } from '../types'

/**
 * Compute min/max values.
 */
export const computeDomain = (
    data: CalendarSvgProps['data'],
    minSpec: NonNullable<CalendarSvgProps['minValue']>,
    maxSpec: NonNullable<CalendarSvgProps['maxValue']>
) => {
    const allValues = data.map(d => d.value)
    const minValue = minSpec === 'auto' ? Math.min(...allValues) : minSpec
    const maxValue = maxSpec === 'auto' ? Math.max(...allValues) : maxSpec

    return [minValue, maxValue] as const
}

/**
 * Compute day cell size according to current context.
 */
const computeCellSize = ({
    width,
    height,
    direction,
    yearRange,
    yearSpacing,
    monthSpacing,
    daySpacing,
    maxWeeks,
}: Pick<
    Required<CalendarSvgProps>,
    'direction' | 'width' | 'height' | 'yearSpacing' | 'monthSpacing' | 'daySpacing'
> & {
    maxWeeks: number
    yearRange: number[]
}) => {
    let hCellSize
    let vCellSize

    if (direction === 'horizontal') {
        hCellSize = (width - monthSpacing * 12 - daySpacing * maxWeeks) / maxWeeks
        vCellSize =
            (height - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) /
            (yearRange.length * 7)
    } else {
        hCellSize =
            (width - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) /
            (yearRange.length * 7)
        vCellSize = (height - monthSpacing * 12 - daySpacing * maxWeeks) / maxWeeks
    }

    return Math.min(hCellSize, vCellSize)
}

/**
 * Computes month path and bounding box.
 */
const monthPathAndBBox = ({
    date,
    cellSize,
    yearIndex,
    yearSpacing,
    monthSpacing,
    daySpacing,
    direction,
    originX,
    originY,
}: Record<'cellSize' | 'originX' | 'originY' | 'yearIndex', number> &
    Pick<
        Required<CalendarSvgProps>,
        'direction' | 'yearSpacing' | 'monthSpacing' | 'daySpacing'
    > & {
        date: Date
    }) => {
    // first day of next month
    const t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    // ranges
    const firstWeek = timeWeek.count(timeYear(date), date)
    const lastWeek = timeWeek.count(timeYear(t1), t1)
    const firstDay = date.getDay()
    const lastDay = t1.getDay()

    // offset according to year index and month
    let xO = originX
    let yO = originY
    const yearOffset = yearIndex * (7 * (cellSize + daySpacing) + yearSpacing)
    const monthOffset = date.getMonth() * monthSpacing
    if (direction === 'horizontal') {
        yO += yearOffset
        xO += monthOffset
    } else {
        yO += monthOffset
        xO += yearOffset
    }

    let path
    const bbox = { x: xO, y: yO, width: 0, height: 0 }
    if (direction === 'horizontal') {
        path = [
            `M${xO + (firstWeek + 1) * (cellSize + daySpacing)},${
                yO + firstDay * (cellSize + daySpacing)
            }`,
            `H${xO + firstWeek * (cellSize + daySpacing)}V${yO + 7 * (cellSize + daySpacing)}`,
            `H${xO + lastWeek * (cellSize + daySpacing)}V${
                yO + (lastDay + 1) * (cellSize + daySpacing)
            }`,
            `H${xO + (lastWeek + 1) * (cellSize + daySpacing)}V${yO}`,
            `H${xO + (firstWeek + 1) * (cellSize + daySpacing)}Z`,
        ].join('')

        bbox.x = xO + firstWeek * (cellSize + daySpacing)
        bbox.width = xO + (lastWeek + 1) * (cellSize + daySpacing) - bbox.x
        bbox.height = 7 * (cellSize + daySpacing)
    } else {
        path = [
            `M${xO + firstDay * (cellSize + daySpacing)},${
                yO + (firstWeek + 1) * (cellSize + daySpacing)
            }`,
            `H${xO}V${yO + (lastWeek + 1) * (cellSize + daySpacing)}`,
            `H${xO + (lastDay + 1) * (cellSize + daySpacing)}V${
                yO + lastWeek * (cellSize + daySpacing)
            }`,
            `H${xO + 7 * (cellSize + daySpacing)}V${yO + firstWeek * (cellSize + daySpacing)}`,
            `H${xO + firstDay * (cellSize + daySpacing)}Z`,
        ].join('')

        bbox.y = yO + firstWeek * (cellSize + daySpacing)
        bbox.width = 7 * (cellSize + daySpacing)
        bbox.height = yO + (lastWeek + 1) * (cellSize + daySpacing) - bbox.y
    }

    return { path, bbox }
}

/**
 * Creates a memoized version of monthPathAndBBox function.
 */
const memoMonthPathAndBBox = memoize(
    monthPathAndBBox,
    ({
        date,
        cellSize,
        yearIndex,
        yearSpacing,
        monthSpacing,
        daySpacing,
        direction,
        originX,
        originY,
    }) => {
        return `${date.toString()}.${cellSize}.${yearIndex}.${yearSpacing}.${monthSpacing}.${daySpacing}.${direction}.${originX}.${originY}`
    }
)

/**
 * Returns a function to Compute day cell position for horizontal layout.
 */
const cellPositionHorizontal = (
    cellSize: number,
    yearSpacing: number,
    monthSpacing: number,
    daySpacing: number
) => {
    return (originX: number, originY: number, d: Date, yearIndex: number) => {
        const weekOfYear = timeWeek.count(timeYear(d), d)

        return {
            x:
                originX +
                weekOfYear * (cellSize + daySpacing) +
                daySpacing / 2 +
                d.getMonth() * monthSpacing,
            y:
                originY +
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
        }
    }
}

/**
 * Returns a function to Compute day cell position for vertical layout.
 */
const cellPositionVertical = (
    cellSize: number,
    yearSpacing: number,
    monthSpacing: number,
    daySpacing: number
) => {
    return (originX: number, originY: number, d: Date, yearIndex: number) => {
        const weekOfYear = timeWeek.count(timeYear(d), d)

        return {
            x:
                originX +
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
            y:
                originY +
                weekOfYear * (cellSize + daySpacing) +
                daySpacing / 2 +
                d.getMonth() * monthSpacing,
        }
    }
}

// used for days range and data matching
const dayFormat = timeFormat('%Y-%m-%d')

/**
 * Compute base layout, without caring about the current data.
 */
export const computeLayout = ({
    width,
    height,
    from,
    to,
    direction,
    yearSpacing,
    monthSpacing,
    daySpacing,
    align,
}: Pick<
    Required<CalendarSvgProps>,
    | 'align'
    | 'direction'
    | 'from'
    | 'to'
    | 'width'
    | 'height'
    | 'yearSpacing'
    | 'monthSpacing'
    | 'daySpacing'
>) => {
    const fromDate = isDate(from) ? from : new Date(from)
    const toDate = isDate(to) ? to : new Date(to)

    const yearRange = range(fromDate.getFullYear(), toDate.getFullYear() + 1)
    const maxWeeks =
        Math.max(
            ...yearRange.map(
                year => timeWeeks(new Date(year, 0, 1), new Date(year + 1, 0, 1)).length
            )
        ) + 1

    const cellSize = computeCellSize({
        width,
        height,
        direction,
        yearRange,
        yearSpacing,
        monthSpacing,
        daySpacing,
        maxWeeks,
    })

    const monthsSize = cellSize * maxWeeks + daySpacing * maxWeeks + monthSpacing * 12
    const yearsSize =
        (cellSize + daySpacing) * 7 * yearRange.length + yearSpacing * (yearRange.length - 1)

    const calendarWidth = direction === 'horizontal' ? monthsSize : yearsSize
    const calendarHeight = direction === 'horizontal' ? yearsSize : monthsSize
    const [originX, originY] = alignBox(
        {
            x: 0,
            y: 0,
            width: calendarWidth,
            height: calendarHeight,
        },
        {
            x: 0,
            y: 0,
            width,
            height,
        },
        align
    )

    let cellPosition: ReturnType<typeof cellPositionHorizontal>
    if (direction === 'horizontal') {
        cellPosition = cellPositionHorizontal(cellSize, yearSpacing, monthSpacing, daySpacing)
    } else {
        cellPosition = cellPositionVertical(cellSize, yearSpacing, monthSpacing, daySpacing)
    }

    const years: Array<{
        year: number
        bbox: BBox
    }> = []

    let months: Array<{
        path: string
        bbox: {
            x: number
            y: number
            width: number
            height: number
        }
        date: Date
        year: number
        month: number
    }> = []

    let days: Array<Omit<Datum, 'color' | 'data' | 'value'>> = []

    yearRange.forEach((year, i) => {
        const yearStart = new Date(year, 0, 1)
        const yearEnd = new Date(year + 1, 0, 1)

        days = days.concat(
            timeDays(yearStart, yearEnd).map(dayDate => {
                return {
                    date: dayDate,
                    day: dayFormat(dayDate),
                    size: cellSize,
                    ...cellPosition(originX, originY, dayDate, i),
                }
            })
        )

        const yearMonths = timeMonths(yearStart, yearEnd).map(monthDate => ({
            date: monthDate,
            year: monthDate.getFullYear(),
            month: monthDate.getMonth(),
            ...memoMonthPathAndBBox({
                originX,
                originY,
                date: monthDate,
                direction,
                yearIndex: i,
                yearSpacing,
                monthSpacing,
                daySpacing,
                cellSize,
            }),
        }))

        months = months.concat(yearMonths)

        years.push({
            year,
            bbox: {
                x: yearMonths[0].bbox.x,
                y: yearMonths[0].bbox.y,
                width: yearMonths[11].bbox.x - yearMonths[0].bbox.x + yearMonths[11].bbox.width,
                height: yearMonths[11].bbox.y - yearMonths[0].bbox.y + yearMonths[11].bbox.height,
            },
        })
    })

    return { years, months, days, cellSize, calendarWidth, calendarHeight, originX, originY }
}

/**
 * Bind current data to computed day cells.
 */
export const bindDaysData = ({
    days,
    data,
    colorScale,
    emptyColor,
}: Pick<Required<CalendarSvgProps>, 'data' | 'emptyColor'> & {
    colorScale: ScaleQuantize<string> | ColorScale
    days: Array<Omit<Datum, 'color' | 'data' | 'value'>>
}) => {
    return days.map(day => {
        const dayData = data.find(item => item.day === day.day)

        if (!dayData) {
            return { ...day, color: emptyColor }
        }

        return {
            ...day,
            color: colorScale(dayData.value),
            data: dayData,
            value: dayData.value,
        }
    })
}

export const computeYearLegendPositions = ({
    years,
    direction,
    position,
    offset,
}: Pick<Required<CalendarSvgProps>, 'direction'> & {
    offset: number
    position: 'before' | 'after'
    years: Year[]
}) => {
    return years.map(year => {
        let x = 0
        let y = 0
        let rotation = 0
        if (direction === 'horizontal' && position === 'before') {
            x = year.bbox.x - offset
            y = year.bbox.y + year.bbox.height / 2
            rotation = -90
        } else if (direction === 'horizontal' && position === 'after') {
            x = year.bbox.x + year.bbox.width + offset
            y = year.bbox.y + year.bbox.height / 2
            rotation = -90
        } else if (direction === 'vertical' && position === 'before') {
            x = year.bbox.x + year.bbox.width / 2
            y = year.bbox.y - offset
        } else {
            x = year.bbox.x + year.bbox.width / 2
            y = year.bbox.y + year.bbox.height + offset
        }

        return {
            ...year,
            x,
            y,
            rotation,
        }
    })
}

export const computeMonthLegendPositions = <Month extends { bbox: BBox }>({
    months,
    direction,
    position,
    offset,
}: Pick<Required<CalendarSvgProps>, 'direction'> & {
    offset: number
    position: 'before' | 'after'
    months: Month[]
}) => {
    return months.map(month => {
        let x = 0
        let y = 0
        let rotation = 0
        if (direction === 'horizontal' && position === 'before') {
            x = month.bbox.x + month.bbox.width / 2
            y = month.bbox.y - offset
        } else if (direction === 'horizontal' && position === 'after') {
            x = month.bbox.x + month.bbox.width / 2
            y = month.bbox.y + month.bbox.height + offset
        } else if (direction === 'vertical' && position === 'before') {
            x = month.bbox.x - offset
            y = month.bbox.y + month.bbox.height / 2
            rotation = -90
        } else {
            x = month.bbox.x + month.bbox.width + offset
            y = month.bbox.y + month.bbox.height / 2
            rotation = -90
        }

        return {
            ...month,
            x,
            y,
            rotation,
        }
    })
}
