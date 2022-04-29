import { timeDay, timeDays, timeWeek } from 'd3-time'
import { timeFormat } from 'd3-time-format'
import { Month, DateOrString, TimeRangeSvgProps } from '../types'
import { isDate } from 'lodash'
import {
    ComputeBaseProps,
    ComputeBaseSpaceProps,
    ComputeBaseDimensionProps,
    computeWeekdays,
} from './common'

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
    from: Date
    to: Date
}

interface Day {
    x: number
    y: number
    firstWeek: number
    month: number
    year: number
    date: Date
    day: string
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
export const computeTimeRangeCellSize = ({
    direction,
    daySpacing,
    square,
    totalDays,
    width,
    height,
}: ComputeCellSize) => {
    const daysInRange = 7
    let rows
    let columns
    const widthRest = width
    const heightRest = height
    if (direction === 'horizontal') {
        rows = daysInRange
        columns = Math.ceil(totalDays / daysInRange)
    } else {
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

function computeGrid({
    startDate,
    date,
    direction,
}: {
    startDate: Date
    date: Date
    direction: 'horizontal' | 'vertical'
}) {
    const firstWeek = timeWeek.count(startDate, date)
    const month = date.getMonth()
    const year = date.getFullYear()

    let currentColumn = 0
    let currentRow = 0
    if (direction === 'horizontal') {
        currentColumn = firstWeek
        currentRow = date.getDay()
    } else {
        currentColumn = date.getDay()
        currentRow = firstWeek
    }

    return { currentColumn, year, currentRow, firstWeek, month, date }
}

export const computeCellPositions = ({
    direction,
    from,
    to,
    cellWidth,
    cellHeight,
    daySpacing,
}: ComputeCellPositions) => {
    const x = daySpacing
    const y = daySpacing

    const dateRange = timeDays(from, to).map(dayDate => {
        return {
            date: dayDate,
            day: dayFormat(dayDate),
        }
    })

    return dateRange.map(day => {
        const { currentColumn, currentRow, firstWeek, year, month, date } = computeGrid({
            startDate: from,
            date: day.date,
            direction,
        })
        return {
            x: x + daySpacing * currentColumn + cellWidth * currentColumn,
            y: y + daySpacing * currentRow + cellHeight * currentRow,
            date,
            firstWeek,
            year,
            month,
            day: day.day,
            width: cellWidth,
            height: cellHeight,
        }
    })
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

    // assumes data is sorted
    return days.reduce((acc, day) => {
        if (acc.weeks.length === day.firstWeek) {
            acc.weeks.push(day)

            const key = `${day.year}-${day.month}`
            const bbox = { x: 0, y: 0, width: 0, height: 0 }
            if (direction === 'horizontal') {
                bbox.x = day.x - daySpacing
                bbox.y = Math.min(daySpacing, day.y)
                bbox.height = 7 * (cellHeight + daySpacing)
                bbox.width = cellWidth + daySpacing * 2
            } else {
                bbox.x = Math.min(daySpacing, day.x)
                bbox.y = day.y - daySpacing
                bbox.height = cellHeight + daySpacing * 2
                bbox.width = 7 * (cellWidth + daySpacing)
            }

            if (!Object.keys(acc.months).includes(key)) {
                acc.months[key] = {
                    date: day.date,
                    bbox,
                    month: day.month,
                    year: day.year,
                    path: '',
                }
            } else {
                // update the existing bounding box (make wider or taller)
                const acc_bbox = acc.months[key].bbox
                acc_bbox.x = Math.min(acc_bbox.x, bbox.x)
                acc_bbox.y = Math.min(acc_bbox.y, bbox.y)
                if (direction === 'horizontal') {
                    if (bbox.x + bbox.width > acc_bbox.x + acc_bbox.width) {
                        acc_bbox.width = bbox.x + bbox.width - acc_bbox.x
                    }
                } else {
                    if (bbox.y + bbox.height > acc_bbox.y + acc_bbox.height) {
                        acc_bbox.height = bbox.y + bbox.height - acc_bbox.y
                    }
                }
            }
        }
        return acc
    }, accumulator)
}

export const computeTotalDays = ({ from, to, data }: ComputeTotalDays) => {
    let startDate = new Date()
    let endDate = new Date()
    if (from) {
        startDate = isDate(from) ? from : new Date(from)
    } else {
        if (data.length) {
            startDate = data[0].date
        }
    }

    if (from && to) {
        endDate = isDate(to) ? to : new Date(to)
    } else {
        if (data.length) {
            endDate = data[data.length - 1].date
        }
    }

    return {
        startDate,
        endDate,
        totalDays: startDate.getDay() + timeDay.count(startDate, endDate),
    }
}

export const computeTimeRangeLayout = ({
    width,
    height,
    square,
    totalDays,
    from,
    to,
    direction,
    daySpacing,
    weekdayTicks,
}: Pick<
    Required<TimeRangeSvgProps>,
    | 'square'
    | 'width'
    | 'height'
    | 'totalDays'
    | 'from'
    | 'to'
    | 'direction'
    | 'daySpacing'
    | 'weekdayTicks'
>) => {
    const { rows, columns, cellHeight, cellWidth } = computeTimeRangeCellSize({
        square,
        totalDays,
        width,
        height,
        daySpacing,
        direction,
    })
    const days = computeCellPositions({
        cellHeight,
        cellWidth,
        from,
        to,
        direction,
        daySpacing,
    })
    const months = Object.values(
        computeMonthLegends({
            daySpacing,
            direction,
            cellHeight,
            cellWidth,
            days,
        }).months
    )
    const weekdays = computeWeekdays({
        bbox: {
            x: 0,
            y: 0,
            width: columns * (cellWidth + daySpacing),
            height: rows * (cellHeight + daySpacing),
        },
        direction,
        cellHeight,
        cellWidth,
        daySpacing,
        ticks: weekdayTicks,
    })

    return {
        months,
        weekdays,
        days,
        cellWidth,
        cellHeight,
        originX: 0,
        originY: 0,
    }
}
