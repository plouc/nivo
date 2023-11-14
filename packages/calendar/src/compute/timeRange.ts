import {
    timeDays,
    timeDay,
    timeMonday,
    timeTuesday,
    timeWednesday,
    timeThursday,
    timeFriday,
    timeSaturday,
    timeSunday,
} from 'd3-time'
import { timeFormat } from 'd3-time-format'
import { DateOrString, Weekday } from '../types'
import isDate from 'lodash/isDate'

// Interfaces
interface ComputeBaseProps {
    direction: 'horizontal' | 'vertical'
}

interface ComputeBaseSpaceProps {
    daySpacing: number
    offset: number
}

interface ComputeBaseDimensionProps {
    cellWidth: number
    cellHeight: number
}

interface ComputeCellSize extends ComputeBaseProps, ComputeBaseSpaceProps {
    totalDays: number
    width: number
    height: number
    square: boolean
}

interface ComputeCellPositions
    extends ComputeBaseProps,
        ComputeBaseSpaceProps,
        ComputeBaseDimensionProps {
    from?: DateOrString
    to?: DateOrString
    data: {
        date: Date
        day: string
        value: number
    }[]
    colorScale: (value: number) => string
    emptyColor: string
    firstWeekday: Weekday
}

interface ComputeWeekdays
    extends Omit<ComputeBaseProps, 'daysInRange'>,
        Omit<ComputeBaseSpaceProps, 'offset'>,
        ComputeBaseDimensionProps {
    ticks?: number[]
    arrayOfWeekdays?: string[]
    firstWeekday: Weekday
}

interface Day {
    coordinates: {
        x: number
        y: number
    }
    firstWeek: number
    month: number
    year: number
    date: Date
    color: string
    day: string
    value?: number
}

interface Month {
    date: Date
    bbox: {
        x: number
        y: number
        width: number
        height: number
    }
    firstWeek: number
    month: number
    year: number
}

interface ComputeMonths
    extends ComputeBaseProps,
        Omit<ComputeBaseSpaceProps, 'offset'>,
        ComputeBaseDimensionProps {
    days: Day[]
}

interface ComputeTotalDays {
    from?: DateOrString
    to?: DateOrString
    data: {
        date: Date
        day: string
        value: number
    }[]
}

// used for days range and data matching
const dayFormat = timeFormat('%Y-%m-%d')

/**
 * Compute day cell size according to
 * current context.
 */
export const computeCellSize = ({
    direction,
    daySpacing,
    offset,
    square,
    totalDays,
    width,
    height,
}: ComputeCellSize) => {
    const daysInRange = 7
    let rows
    let columns
    let widthRest = width
    let heightRest = height
    if (direction === 'horizontal') {
        widthRest -= offset
        rows = daysInRange
        columns = Math.ceil(totalDays / daysInRange)
    } else {
        heightRest -= offset
        columns = daysInRange
        rows = Math.ceil(totalDays / daysInRange)
    }
    // + 1 since we have to apply spacing to the rigth and left
    const cellHeight = (heightRest - daySpacing * (rows + 1)) / rows
    const cellWidth = (widthRest - daySpacing * (columns + 1)) / columns
    // do we want square?
    const size = Math.min(cellHeight, cellWidth)
    return {
        columns,
        rows,
        cellHeight: square ? size : cellHeight,
        cellWidth: square ? size : cellWidth,
    }
}

export const ARRAY_OF_WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export function getFirstWeekdayIndex(weekday: Weekday) {
    return ARRAY_OF_WEEKDAYS.findIndex(item => item.toLowerCase() === weekday)
}

export const getDayIndex = (date: Date, firstWeekday: Weekday) => {
    const days = [0, 1, 2, 3, 4, 5, 6]
    const day = date.getDay()
    const offsetDay = day - getFirstWeekdayIndex(firstWeekday)
    const [dayIndex] = days.slice(offsetDay)
    return dayIndex
}

const getTimeInterval = (firstWeekday: Weekday) => {
    return [
        timeSunday,
        timeMonday,
        timeTuesday,
        timeWednesday,
        timeThursday,
        timeFriday,
        timeSaturday,
    ][getFirstWeekdayIndex(firstWeekday)]
}

function shiftArray<T>(arr: T[], x: number): T[] {
    if (!arr.length || !x) return arr

    x = x % arr.length
    return arr.slice(x, arr.length).concat(arr.slice(0, x))
}

function computeGrid({
    startDate,
    date,
    direction,
    firstWeekday,
}: {
    startDate: Date
    date: Date
    direction: 'horizontal' | 'vertical'
    firstWeekday: Weekday
}) {
    const timeInterval = getTimeInterval(firstWeekday)
    const firstWeek = timeInterval.count(startDate, date)
    const month = date.getMonth()
    const year = date.getFullYear()

    let currentColumn = 0
    let currentRow = 0
    if (direction === 'horizontal') {
        currentColumn = firstWeek
        currentRow = getDayIndex(date, firstWeekday)
    } else {
        currentColumn = getDayIndex(date, firstWeekday)
        currentRow = firstWeek
    }

    return { currentColumn, year, currentRow, firstWeek, month, date }
}

export const computeCellPositions = ({
    direction,
    colorScale,
    emptyColor,
    from,
    to,
    data,
    cellWidth,
    cellHeight,
    daySpacing,
    offset,
    firstWeekday,
}: ComputeCellPositions) => {
    let x = daySpacing
    let y = daySpacing

    if (direction === 'horizontal') {
        x += offset
    } else {
        y += offset
    }

    // we need to determine whether we need to add days to move to correct position
    const start = from ? from : data[0].date
    const end = to ? to : data[data.length - 1].date
    const startDate = isDate(start) ? start : new Date(start)
    const endDate = isDate(end) ? end : new Date(end)
    const dateRange = timeDays(startDate, endDate).map(dayDate => {
        return {
            date: dayDate,
            day: dayFormat(dayDate),
        }
    })

    const dataWithCellPosition = dateRange.map(day => {
        const dayData = data.find(item => item.day === day.day)

        const { currentColumn, currentRow, firstWeek, year, month, date } = computeGrid({
            startDate,
            date: day.date,
            direction,
            firstWeekday,
        })

        const coordinates = {
            x: x + daySpacing * currentColumn + cellWidth * currentColumn,
            y: y + daySpacing * currentRow + cellHeight * currentRow,
        }

        if (!dayData) {
            return {
                ...day,
                coordinates,
                firstWeek,
                month,
                year,
                date,
                color: emptyColor,
                width: cellWidth,
                height: cellHeight,
            }
        }

        return {
            ...dayData,
            coordinates,
            firstWeek,
            month,
            year,
            date,
            color: colorScale(dayData.value),
            width: cellWidth,
            height: cellHeight,
        }
    })

    return dataWithCellPosition
}

export const computeWeekdays = ({
    cellHeight,
    cellWidth,
    direction,
    daySpacing,
    ticks = [1, 3, 5],
    firstWeekday,
    arrayOfWeekdays = shiftArray(ARRAY_OF_WEEKDAYS, getFirstWeekdayIndex(firstWeekday)),
}: ComputeWeekdays) => {
    const sizes = {
        width: cellWidth + daySpacing,
        height: cellHeight + daySpacing,
    }
    return ticks.map(day => ({
        value: arrayOfWeekdays[day],
        rotation: direction === 'horizontal' ? 0 : -90,
        y: direction === 'horizontal' ? sizes.height * (day + 1) - sizes.height / 3 : 0,
        x: direction === 'horizontal' ? 0 : sizes.width * (day + 1) - sizes.width / 3,
    }))
}

export const computeMonthLegends = ({
    direction,
    daySpacing,
    days,
    cellHeight,
    cellWidth,
}: ComputeMonths) => {
    const accumulator: {
        months: { [key: string]: Month }
        weeks: Day[]
    } = {
        months: {},
        weeks: [],
    }

    return days.reduce((acc, day) => {
        if (acc.weeks.length === day.firstWeek || (!acc.weeks.length && day.firstWeek === 1)) {
            acc.weeks.push(day)

            const key = `${day.year}-${day.month}`

            if (!Object.keys(acc.months).includes(key)) {
                const bbox = { x: 0, y: 0, width: 0, height: 0 }

                if (direction === 'horizontal') {
                    bbox.x = day.coordinates.x - daySpacing
                    bbox.height = cellHeight + daySpacing
                    bbox.width = cellWidth + daySpacing * 2
                } else {
                    bbox.y = day.coordinates.y - daySpacing
                    bbox.height = cellHeight + daySpacing * 2
                    bbox.width = cellWidth + daySpacing * 2
                }

                acc.months[key] = {
                    date: day.date,
                    bbox,
                    firstWeek: day.firstWeek,
                    month: 0,
                    year: 0,
                }
            } else {
                // enhance width/height
                if (direction === 'horizontal') {
                    acc.months[key].bbox.width =
                        (day.firstWeek - acc.months[key].firstWeek) * (cellWidth + daySpacing)
                } else {
                    acc.months[key].bbox.height =
                        (day.firstWeek - acc.months[key].firstWeek) * (cellHeight + daySpacing)
                }
            }
        }
        return acc
    }, accumulator)
}

export const computeTotalDays = ({ from, to, data }: ComputeTotalDays) => {
    let startDate
    let endDate
    if (from) {
        startDate = isDate(from) ? from : new Date(from)
    } else {
        startDate = data[0].date
    }

    if (from && to) {
        endDate = isDate(to) ? to : new Date(to)
    } else {
        endDate = data[data.length - 1].date
    }

    return startDate.getDay() + timeDay.count(startDate, endDate)
}
