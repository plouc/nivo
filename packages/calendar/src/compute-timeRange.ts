import { timeWeek } from 'd3-time'

export enum Direction {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export const defaultProps = {
    daysInRange: 7,
    direction: Direction.HORIZONTAL,
    daySpacing: 10,
    offset: 65,
}

// Interfaces
export interface ComputeBaseProps {
    daysInRange?: number
    direction?: Direction
}

export interface ComputeBaseSpaceProps {
    daySpacing?: number
    offset?: number
}

export interface ComputeBaseDimensionProps {
    cellWidth: number
    cellHeight: number
}

export interface ComputeCellSize extends ComputeBaseProps, ComputeBaseSpaceProps {
    totalDays: number
    width: number
    height: number
}

export interface ComputeCellPositions
    extends ComputeBaseProps,
        ComputeBaseSpaceProps,
        ComputeBaseDimensionProps {
    data: {
        date: Date
        day: string
        value: number
    }[]
    colorScale: (value: number) => string
}

export interface ComputeWeekdays
    extends ComputeBaseProps,
        ComputeBaseSpaceProps,
        ComputeBaseDimensionProps {
    ticks?: number[]
    arrayOfWeekdays?: string[]
}

export interface Day {
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
    value: number
}

export interface Month {
    date: Date
    bbox: {
        x: number
        y: number
        width: number
        height: number
    }
    firstWeek: number
}
export interface ComputeMonths
    extends ComputeBaseProps,
        ComputeBaseSpaceProps,
        ComputeBaseDimensionProps {
    days: Day[]
}

/**
 * Compute day cell size according to
 * current context.
 */
export const computeCellSize = ({
    direction = defaultProps.direction,
    daysInRange = defaultProps.daysInRange,
    daySpacing = defaultProps.daySpacing,
    offset = defaultProps.offset,
    totalDays,
    width,
    height,
}: ComputeCellSize) => {
    let rows
    let columns
    let widthRest = width
    let heightRest = height
    if (direction === Direction.HORIZONTAL) {
        widthRest -= offset
        rows = daysInRange
        columns = Math.ceil(totalDays / daysInRange)
    } else {
        heightRest -= offset
        columns = daysInRange
        rows = Math.ceil(totalDays / daysInRange)
    }
    // + 1 since we have to apply spacing to the rigth and left
    return {
        columns,
        rows,
        cellHeight: (heightRest - daySpacing * (rows + 1)) / rows,
        cellWidth: (widthRest - daySpacing * (columns + 1)) / columns,
    }
}

function computeGrid({
    startDate,
    date,
    direction,
}: {
    startDate: Date
    date: Date
    direction: Direction
}) {
    const firstWeek = timeWeek.count(startDate, date)
    const month = date.getMonth()
    const year = date.getFullYear()

    let currentColumn = 0
    let currentRow = 0
    if (direction === Direction.HORIZONTAL) {
        currentColumn = firstWeek
        currentRow = date.getDay()
    } else {
        currentColumn = date.getDay()
        currentRow = firstWeek
    }

    return { currentColumn, year, currentRow, firstWeek, month, date }
}

export const computeCellPositions = ({
    direction = defaultProps.direction,
    colorScale,
    data,
    cellWidth,
    cellHeight,
    daySpacing = defaultProps.daySpacing,
    offset = defaultProps.offset,
}: ComputeCellPositions) => {
    let x = daySpacing
    let y = daySpacing

    if (direction === Direction.HORIZONTAL) {
        x += offset
    } else {
        y += offset
    }

    // we need to determine whether we need to add days to move to correct position
    const startDate = data[0].date
    const dataWithCellPosition = data.map(dateValue => {
        const { currentColumn, currentRow, firstWeek, year, month, date } = computeGrid({
            startDate,
            date: dateValue.date,
            direction,
        })

        const coordinates = {
            x: x + daySpacing * currentColumn + cellWidth * currentColumn,
            y: y + daySpacing * currentRow + cellHeight * currentRow,
        }

        return {
            ...dateValue,
            coordinates,
            firstWeek,
            month,
            year,
            date,
            color: colorScale(dateValue.value),
        }
    })

    return dataWithCellPosition
}

export const computeWeekdays = ({
    cellHeight,
    cellWidth,
    direction = defaultProps.direction,
    daySpacing = defaultProps.daySpacing,
    ticks = [1, 3, 5],
    arrayOfWeekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
}: ComputeWeekdays) => {
    const sizes = {
        width: cellWidth + daySpacing,
        height: cellHeight + daySpacing,
    }
    return ticks.map(day => ({
        value: arrayOfWeekdays[day],
        rotation: direction === Direction.HORIZONTAL ? 0 : -90,
        y: direction === Direction.HORIZONTAL ? sizes.height * (day + 1) - daySpacing / 2 : 0,
        x: direction === Direction.HORIZONTAL ? 0 : sizes.width * (day + 1) - daySpacing / 2,
    }))
}

export const computeMonthLegends = ({
    direction = defaultProps.direction,
    daySpacing = defaultProps.daySpacing,
    daysInRange = defaultProps.daysInRange,
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
        if (acc.weeks.length === day.firstWeek) {
            acc.weeks.push(day)
            if (!Object.keys(acc.months).includes(`${day.year}-${day.month}`)) {
                const bbox = { x: 0, y: 0, width: 0, height: 0 }
                if (direction === Direction.HORIZONTAL) {
                    bbox.x = day.coordinates.x - daySpacing
                    bbox.height = daysInRange * cellHeight + daySpacing
                    bbox.width = cellWidth + daySpacing * 2
                } else {
                    bbox.y = day.coordinates.y - daySpacing
                    bbox.height = cellHeight + daySpacing * 2
                    bbox.width = daysInRange * cellWidth + daySpacing * 2
                }
                acc.months[`${day.year}-${day.month}`] = {
                    date: day.date,
                    bbox,
                    firstWeek: day.firstWeek,
                }
            } else {
                // enhance width/height
                if (direction === Direction.HORIZONTAL) {
                    acc.months[`${day.year}-${day.month}`].bbox.width =
                        (day.firstWeek - acc.months[`${day.year}-${day.month}`].firstWeek) *
                        (cellWidth + daySpacing)
                } else {
                    acc.months[`${day.year}-${day.month}`].bbox.height =
                        (day.firstWeek - acc.months[`${day.year}-${day.month}`].firstWeek) *
                        (cellHeight + daySpacing)
                }
            }
        }
        return acc
    }, accumulator)
}
