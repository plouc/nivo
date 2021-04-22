/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import memoize from 'lodash.memoize'
import isDate from 'lodash.isdate'
import range from 'lodash.range'
import { alignBox } from '@nivo/core'
import { timeFormat } from 'd3-time-format'
import { timeDays, timeWeek, timeWeeks, timeMonths, timeYear } from 'd3-time'

/**
 * Compute min/max values.
 *
 * @param {Array<>}       data
 * @param {number|'auto'} minSpec - Define the strategy to use to compute min value, if number, it will be used, if 'auto', will use the lower value from the dataset
 * @param {number|'auto'} maxSpec - Define the strategy to use to compute max value, if number, it will be used, if 'auto', will use the higher value from the dataset
 * @return {[number, string]}
 */
export const computeDomain = (data, minSpec, maxSpec) => {
    const allValues = data.map(d => d.value)
    const minValue = minSpec === 'auto' ? Math.min(...allValues) : minSpec
    const maxValue = maxSpec === 'auto' ? Math.max(...allValues) : maxSpec

    return [minValue, maxValue]
}
/**
 * Compute date to return, if the from date is not in the same year we
 * return the calendarDate in exact mode, if not in exact mode we always
 * return the calendarDate
 *
 * @param {Date} fromDate
 * @param {Date} calendarDate
 * @param {boolean} exact
 * @returns {Date}
 */
const calculateReturnDate = (fromDate, calendarDate, exact) =>
    fromDate.getFullYear() === calendarDate.getFullYear() && exact ? fromDate : calendarDate

/**
 *  Compute which dates to use for exact calculation for year
 * @param {Date}    fromDate
 * @param {number}  year
 * @param {boolean} exact
 * @param {Date}    toDate
 * @returns [date, date]
 */

function calculateCurrentRange(fromDate, year, exact, toDate) {
    const start = calculateReturnDate(fromDate, new Date(year, 0, 1), exact)
    const end = exact && toDate.getFullYear() === year ? toDate : new Date(year + 1, 0, 1)
    return [start, end]
}

/**
 * Compute day cell size according to current context.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} direction
 * @param {array}  yearRange
 * @param {number} yearSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @param {number} maxWeeks
 * @param {number} maxMonth
 * @returns {number}
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
    maxMonth,
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
const getElapsedMonths = (from, to) => {
    return to.getMonth() - from.getMonth() + 12 * (to.getFullYear() - from.getFullYear())
}
/**
 * Computes month path and bounding box.
 *
 * @param {Date}   date
 * @param {Date}   fromDate
 * @param {Date}   toDate
 * @param {number} cellSize
 * @param {number} yearIndex
 * @param {number} yearSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @param {string} direction
 * @param {number} originX
 * @param {number} originY
 * @returns { { path: string, bbox: { x: number, y: number, width: number, height: number } } }
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
    fromDate,
    toDate,
    exact,
}) => {
    // first day of next month
    const t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const startDate = calculateReturnDate(fromDate, timeYear(date), exact)
    const elapsedMonths = getElapsedMonths(startDate, date)
    const lastDate = calculateReturnDate(fromDate, timeYear(t1), exact)
    // if the toDate is not the last of the months, we do not need to paint the path
    const lastDayOfMonth = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0)
    // ranges
    const firstWeek = timeWeek.count(startDate, date)
    const lastWeek = timeWeek.count(lastDate, t1)
    const firstDay = date.getDay()
    const lastDay = t1.getDay()

    // offset according to year index and month
    let xO = originX
    let yO = originY
    const yearOffset = yearIndex * (7 * (cellSize + daySpacing) + yearSpacing)
    const monthOffset = elapsedMonths * monthSpacing
    if (direction === 'horizontal') {
        yO += yearOffset
        xO += monthOffset
    } else {
        yO += monthOffset
        xO += yearOffset
    }

    let path
    let bbox = { x: xO, y: yO, width: 0, height: 0 }
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
    const month = { path, bbox }
    // do not print the path in case we do not have a full month
    if (
        (fromDate.getMonth() === date.getMonth() &&
            fromDate.getYear() === date.getYear() &&
            fromDate.getUTCDay() > 1 &&
            exact) ||
        (toDate.getMonth() === date.getMonth() &&
            toDate.getYear() === date.getYear() &&
            lastDayOfMonth !== toDate.getUTCDay() &&
            exact)
    ) {
        delete month.path
    }
    return month
}
/**
 * Creates a memoized version of monthPathAndBBox function.
 */
const memoMonthPathAndBBox = memoize(monthPathAndBBox, props => Object.values(props).join('.'))

/**
 * Returns a function to Compute day cell position for horizontal layout.
 *
 * @param {number}  cellSize
 * @param {number}  yearSpacing
 * @param {number}  monthSpacing
 * @param {number}  daySpacing
 * @param {Date}   fromDate
 * @param {boolean} exact
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionHorizontal = (
    cellSize,
    yearSpacing,
    monthSpacing,
    daySpacing,
    fromDate,
    exact
) => {
    return (originX, originY, d, yearIndex) => {
        const startDate = calculateReturnDate(fromDate, timeYear(d), exact)
        const weekOfYear = timeWeek.count(startDate, d)
        const elapsedMonths = getElapsedMonths(startDate, d)
        const coordinates = {
            x:
                originX +
                weekOfYear * (cellSize + daySpacing) +
                daySpacing / 2 +
                elapsedMonths * monthSpacing,

            y:
                originY +
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
        }
        return coordinates
    }
}

/**
 * Returns a function to Compute day cell position for vertical layout.
 *
 * @param {number} cellSize
 * @param {number} yearSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @param {Date}   fromDate
 * @param {boolean} exact
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionVertical = (cellSize, yearSpacing, monthSpacing, daySpacing, fromDate, exact) => {
    return (originX, originY, d, yearIndex) => {
        const startDate = calculateReturnDate(fromDate, timeYear(d), exact)
        const weekOfYear = timeWeek.count(startDate, d)
        const elapsedMonths = getElapsedMonths(startDate, d)
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
                elapsedMonths * monthSpacing,
        }
    }
}

// used for days range and data matching
const dayFormat = timeFormat('%Y-%m-%d')

/**
 * Compute base layout, without caring about the current data.
 *
 * @param {number}      width
 * @param {number}      height
 * @param {string|Date} from
 * @param {string|Date} to
 * @param {string}      direction
 * @param {number}      yearSpacing
 * @param {number}      monthSpacing
 * @param {number}      daySpacing
 * @param {string}      align
 * @param {boolean}     exact
 * @returns {object}
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
    exact,
}) => {
    const fromDate = isDate(from) ? from : new Date(from)
    const toDate = isDate(to) ? to : new Date(to)
    const yearRange = range(fromDate.getFullYear(), toDate.getFullYear() + 1)
    // if exact we only count the real weeks between the dates
    const maxWeeks =
        Math.max(
            ...yearRange.map(year => {
                const date = calculateCurrentRange(fromDate, year, exact, toDate)
                return timeWeeks(date[0], date[1]).length
            })
        ) + 1
    const maxMonth =
        Math.max(
            ...yearRange.map(year => {
                const date = calculateCurrentRange(fromDate, year, exact, toDate)
                return timeMonths(date[0], date[1]).length
            })
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
        maxMonth,
    })

    const inititialBox = {
        x: 0,
        y: 0,
    }
    const monthsSize = cellSize * maxWeeks + daySpacing * maxWeeks + monthSpacing * 12
    const yearsSize =
        (cellSize + daySpacing) * 7 * yearRange.length + yearSpacing * (yearRange.length - 1)

    const calendarWidth = direction === 'horizontal' ? monthsSize : yearsSize
    const calendarHeight = direction === 'horizontal' ? yearsSize : monthsSize
    const [originX, originY] = alignBox(
        {
            ...inititialBox,
            width: calendarWidth,
            height: calendarHeight,
        },
        {
            ...inititialBox,
            width,
            height,
        },
        align
    )

    let cellPosition
    if (direction === 'horizontal') {
        cellPosition = cellPositionHorizontal(
            cellSize,
            yearSpacing,
            monthSpacing,
            daySpacing,
            fromDate,
            exact
        )
    } else {
        cellPosition = cellPositionVertical(
            cellSize,
            yearSpacing,
            monthSpacing,
            daySpacing,
            fromDate,
            exact
        )
    }
    let years = []
    let months = []
    let days = []

    yearRange.forEach((year, i) => {
        const date = calculateCurrentRange(fromDate, year, exact, toDate)
        const monthsLocal = timeMonths(
            new Date(date[0].getFullYear(), date[0].getMonth(), 1),
            date[1]
        )
        const yearMonths = monthsLocal.map(monthDate => ({
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
                fromDate,
                toDate,
                exact,
            }),
        }))

        months = months.concat(yearMonths)
        days = days.concat(
            timeDays(date[0], date[1]).map(dayDate => ({
                date: dayDate,
                day: dayFormat(dayDate),
                size: cellSize,
                ...cellPosition(originX, originY, dayDate, i, date[0], exact),
            }))
        )
        const fixedX =
            years[0] && direction === 'horizontal' ? years[0].bbox.x : yearMonths[0].bbox.x
        const fixedY = years[0] && direction === 'vertical' ? years[0].bbox.y : yearMonths[0].bbox.y
        years.push({
            year,
            bbox: {
                x: fixedX,
                y: fixedY,
                width:
                    yearMonths[yearMonths.length - 1].bbox.x -
                    fixedX +
                    yearMonths[yearMonths.length - 1].bbox.width,
                height:
                    yearMonths[yearMonths.length - 1].bbox.y -
                    fixedY +
                    yearMonths[yearMonths.length - 1].bbox.height,
            },
        })
    })

    return { years, months, days, cellSize, width, height, originX, originY }
}

/**
 * Bind current data to computed day cells.
 *
 * @param {array}  days
 * @param {array}  data
 * @param {object} colorScale
 * @param {string} emptyColor
 * @returns {Array}
 */
export const bindDaysData = ({ days, data, colorScale, emptyColor }) => {
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

export const computeYearLegendPositions = ({ years, direction, position, offset }) => {
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
        const coordinates = {
            ...year,
            x,
            y,
            rotation,
        }
        return coordinates
    })
}

export const computeMonthLegendPositions = ({ months, direction, position, offset }) => {
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
