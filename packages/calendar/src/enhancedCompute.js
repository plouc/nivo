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
import { timeDays, timeWeek, timeWeeks, timeMonths } from 'd3-time'

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
 * Compute day cell size according to current context.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} direction
 * @param {number} blocks
 * @param {number} blockSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @param {number} maxRowsMonth
 * * @param {number} maxColumnsGroup
 * @param {number} monthsPerGroup
 * @returns {number}
 */
const computeCellSize = ({
    width,
    height,
    direction,
    blocks,
    blockSpacing,
    monthSpacing,
    daySpacing,
    maxRowsMonth,
    maxColumnsGroup,
    monthsPerGroup,
}) => {
    let hCellSize
    let vCellSize

    if (direction === 'horizontal') {
        hCellSize =
            (width - monthSpacing * monthsPerGroup - daySpacing * maxColumnsGroup) / maxColumnsGroup
        vCellSize =
            (height - (blocks - 1) * blockSpacing - blocks * (maxRowsMonth * daySpacing)) /
            (blocks * maxRowsMonth)
    } else {
        hCellSize =
            (width - (blocks - 1) * blockSpacing - blocks * (maxRowsMonth * daySpacing)) /
            (blocks * maxRowsMonth)
        vCellSize =
            (height - monthSpacing * monthsPerGroup - daySpacing * maxColumnsGroup) /
            maxColumnsGroup
    }

    return Math.min(hCellSize, vCellSize)
}

/**
 * Computes month path and bounding box.
 *
 * @param {Date}   date
 * @param {number} cellSize
 * @param {number} blockIndex
 * @param {number} blockSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @param {string} direction
 * @param {number} originX
 * @param {number} originY
 * @param {Date} startDate
 * @param {number} maxRowsMonth
 * @param {string} weekDirection
 * @returns { { path: string, bbox: { x: number, y: number, width: number, height: number } } }
 */
const monthPathAndBBox = ({
    date,
    cellSize,
    blockIndex,
    blockSpacing,
    monthSpacing,
    daySpacing,
    direction,
    originX,
    originY,
    startDate,
    maxRowsMonth,
    weekDirection,
}) => {
    // first day of next month
    const t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    // ranges
    const elapsedMonths = getElapsedMonths(startDate, date)
    let firstWeek
    const lastWeek =
        direction === weekDirection ? timeWeek.count(date, t1) : timeWeek.count(startDate, t1)
    let firstDay = date.getDay()
    let lastDay = t1.getDay()

    // offset according to year index and month
    let xO = originX
    let yO = originY

    if (direction === 'vertical' && weekDirection === 'vertical') {
        yO += elapsedMonths * (maxRowsMonth * (cellSize + daySpacing) + monthSpacing)
        xO += blockIndex * (7 * (cellSize + daySpacing) + blockSpacing)
        firstWeek = 0
    } else if (direction === 'vertical' && weekDirection === 'horizontal') {
        firstWeek = timeWeek.count(startDate, date)
        yO += elapsedMonths * monthSpacing
        xO += blockIndex * (maxRowsMonth * (cellSize + daySpacing) + blockSpacing)
    } else if (direction === 'horizontal' && weekDirection === 'vertical') {
        firstWeek = timeWeek.count(startDate, date)
        xO += elapsedMonths * monthSpacing
        yO += blockIndex * (7 * (cellSize + daySpacing) + blockSpacing)
    } else {
        //Horizontal Horizontal
        firstWeek = 0
        xO += elapsedMonths * (monthSpacing + 7 * (cellSize + daySpacing))
        yO += blockIndex * (maxRowsMonth * (cellSize + daySpacing) + blockSpacing)
    }

    let path
    let bbox = { x: xO, y: yO, width: 0, height: 0 }
    if (weekDirection === 'vertical') {
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

const getElapsedMonths = (from, to) => {
    return to.getMonth() - from.getMonth() + 12 * (to.getFullYear() - from.getFullYear())
}

const getA = (d, blockIndex, blockSpacing, daySpacing, maxRowsMonth, cellSize) => {
    const weekOfMonth = getWeekOfTheMonth(d)
    return (
        weekOfMonth * (cellSize + daySpacing) +
        daySpacing / 2 +
        blockIndex * (blockSpacing + maxRowsMonth * (cellSize + daySpacing))
    )
}

const getB = (d, startDate, monthSpacing, daySpacing, cellSize) => {
    const elapsedMonths = getElapsedMonths(startDate, d)
    return (
        elapsedMonths * 7 * (cellSize + daySpacing) +
        d.getDay() * (cellSize + daySpacing) +
        daySpacing / 2 +
        elapsedMonths * monthSpacing
    )
}

const getC = (d, blockIndex, blockSpacing, daySpacing, maxRowsMonth, cellSize) => {
    return (
        d.getDay() * (cellSize + daySpacing) +
        daySpacing / 2 +
        blockIndex * (blockSpacing + maxRowsMonth * (cellSize + daySpacing))
    )
}

const getD = (d, startDate, monthSpacing, daySpacing, cellSize) => {
    const elapsedWeeks = timeWeek.count(startDate, d)
    const elapsedMonths = getElapsedMonths(startDate, d)
    return elapsedWeeks * (cellSize + daySpacing) + daySpacing / 2 + elapsedMonths * monthSpacing
}

const getWeekOfTheMonth = date => {
    const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const offsetDate = date.getDate() + firstWeekday - 1
    return Math.floor(offsetDate / 7)
}

/**
 * Creates a memoized version of monthPathAndBBox function.
 */
const memoMonthPathAndBBox = memoize(
    monthPathAndBBox,
    ({
        date,
        cellSize,
        blockIndex,
        blockSpacing,
        monthSpacing,
        daySpacing,
        direction,
        originX,
        originY,
        startDate,
        maxRowsMonth,
        weekDirection,
    }) => {
        return `${date.toString()}.${startDate.toString()}.${maxRowsMonth}.${weekDirection}.${cellSize}.${blockIndex}.${blockSpacing}.${monthSpacing}.${daySpacing}.${direction}.${originX}.${originY}`
    }
)

/**
 * Returns a function to Compute day cell position for horizontal layout and vertical week layout.
 *
 * @param {number} cellSize
 * @param {number} blockSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionHorizontalVertical = (
    cellSize,
    blockSpacing,
    monthSpacing,
    daySpacing,
    maxRowsMonth
) => {
    return (originX, originY, d, blockIndex, startDate) => {
        return {
            x: originX + getD(d, startDate, monthSpacing, daySpacing, cellSize),
            y: originY + getC(d, blockIndex, blockSpacing, daySpacing, maxRowsMonth, cellSize),
        }
    }
}

/**
 * Returns a function to Compute day cell position for vertical layout and horizontal week layout.
 *
 * @param {number} cellSize
 * @param {number} blockSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionVerticalHorizontal = (
    cellSize,
    blockSpacing,
    monthSpacing,
    daySpacing,
    maxRowsMonth
) => {
    return (originX, originY, d, blockIndex, startDate) => {
        return {
            x: originX + getC(d, blockIndex, blockSpacing, daySpacing, maxRowsMonth, cellSize),
            y: originY + getD(d, startDate, monthSpacing, daySpacing, cellSize),
        }
    }
}

/**
 * Returns a function to Compute day cell position for vertical layout and vertical week layout.
 *
 * @param {number} cellSize
 * @param {number} blockSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionVerticalVertical = (
    cellSize,
    blockSpacing,
    monthSpacing,
    daySpacing,
    maxRowsMonth
) => {
    return (originX, originY, d, blockIndex, startDate) => {
        return {
            x: originX + getA(d, blockIndex, blockSpacing, daySpacing, maxRowsMonth, cellSize),
            y: originY + getB(d, startDate, monthSpacing, daySpacing, cellSize),
        }
    }
}

/**
 * Returns a function to Compute day cell position for horizontal layout and horizontal week layout.
 *
 * @param {number} cellSize
 * @param {number} blockSpacing
 * @param {number} monthSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionHorizontalHorizontal = (
    cellSize,
    blockSpacing,
    monthSpacing,
    daySpacing,
    maxRowsMonth
) => {
    return (originX, originY, d, blockIndex, startDate) => {
        return {
            x: originX + getB(d, startDate, monthSpacing, daySpacing, cellSize),
            y: originY + getA(d, blockIndex, blockSpacing, daySpacing, maxRowsMonth, cellSize),
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
 * @param {number}      blockSpacing
 * @param {number}      monthSpacing
 * @param {number}      daySpacing
 * @param {string}      align
 * @param {string}      weekDirection
 * @param {string}      granularity
 * @param {number}      breakpoint
 * @returns {object}
 */
export const computeLayout = ({
    width,
    height,
    from,
    to,
    direction,
    blockSpacing,
    monthSpacing,
    daySpacing,
    align,
    weekDirection,
    granularity,
    breakpoint,
}) => {
    const fromDate = isDate(from) ? from : new Date(from)
    const toDate = isDate(to) ? to : new Date(to)

    if (weekDirection === 'auto') {
        weekDirection = direction === 'vertical' ? 'horizontal' : 'vertical'
    }
    if (breakpoint === 'auto') {
        if (granularity === 'year') {
            breakpoint = 1
        } else {
            breakpoint = getElapsedMonths(fromDate, toDate) + 1
        }
    }
    let monthsPerGroup
    let dates = []
    let maxRowsMonth
    let maxColumnsGroup = 0
    if (granularity === 'year') {
        // An year will always have a month with at least 6 parcial weeks
        maxRowsMonth = weekDirection === 'horizontal' ? 6 : 7
        maxColumnsGroup = 0
        let yearRange = range(fromDate.getFullYear(), toDate.getFullYear() + 1)
        monthsPerGroup = Math.min(yearRange.length, breakpoint) * 12
        while (yearRange.length) {
            const arr = yearRange.splice(0, breakpoint)
            const begin = new Date(arr[0], 0, 1)
            const end = new Date(arr[arr.length - 1] + 1, 0, 1)
            dates.push([begin, end])
            maxColumnsGroup = Math.max(maxColumnsGroup, timeWeeks(begin, end).length)
        }
        maxColumnsGroup += 1
    } else {
        //can only be month
        monthsPerGroup = Math.min(getElapsedMonths(fromDate, toDate) + 1, breakpoint)
        let date = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1)
        let aux = new Date(date.getTime())
        while (date < toDate) {
            if (weekDirection === 'horizontal' && maxRowsMonth !== 6) {
                let i = 1
                while (i <= breakpoint) {
                    let weekDay = new Date(aux.getFullYear(), aux.getMonth() + i - 1, 1).getDay()
                    let days = new Date(date.getFullYear(), date.getMonth() + i, 0).getDate()
                    if (days + weekDay >= 36) {
                        maxRowsMonth = 6
                        break
                    } else if (days + weekDay == 28) {
                        maxRowsMonth = Math.max(maxRowsMonth, 4)
                    } else {
                        maxRowsMonth = 5
                    }
                    i += 1
                }
            }
            aux.setMonth(aux.getMonth() + breakpoint)
            let pair = [date, new Date(aux.getTime() - 1)] //set this date as the last possible one from the previous month.
            dates.push(pair)
            if (direction !== weekDirection) {
                maxColumnsGroup = Math.max(timeWeeks(pair[0], pair[1]).length + 1, maxColumnsGroup)
            }
            date = new Date(aux.getTime())
        }
        if (weekDirection === 'vertical') {
            maxRowsMonth = 7
        }
    }
    if (direction === weekDirection) {
        maxColumnsGroup = 7 * monthsPerGroup
    }

    const cellSize = computeCellSize({
        width,
        height,
        direction,
        blocks: dates.length,
        blockSpacing,
        monthSpacing,
        daySpacing,
        maxRowsMonth,
        maxColumnsGroup,
        monthsPerGroup,
    })

    const monthsSize =
        cellSize * maxColumnsGroup + daySpacing * maxColumnsGroup + monthSpacing * monthsPerGroup
    const yearsSize =
        (cellSize + daySpacing) * maxRowsMonth * dates.length +
        blockSpacing * (dates.length > 1 ? dates.length : 0)

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
    let cellPosition
    if (direction === 'horizontal') {
        if (weekDirection === 'horizontal') {
            cellPosition = cellPositionHorizontalHorizontal(
                cellSize,
                blockSpacing,
                monthSpacing,
                daySpacing,
                maxRowsMonth
            )
        } else {
            cellPosition = cellPositionHorizontalVertical(
                cellSize,
                blockSpacing,
                monthSpacing,
                daySpacing,
                maxRowsMonth
            )
        }
    } else {
        if (weekDirection === 'horizontal') {
            cellPosition = cellPositionVerticalHorizontal(
                cellSize,
                blockSpacing,
                monthSpacing,
                daySpacing,
                maxRowsMonth
            )
        } else {
            cellPosition = cellPositionVerticalVertical(
                cellSize,
                blockSpacing,
                monthSpacing,
                daySpacing,
                maxRowsMonth
            )
        }
    }

    let blocks = []
    let months = []
    let days = []

    dates.forEach((date, i) => {
        days = days.concat(
            timeDays(date[0], date[1]).map(dayDate => {
                return {
                    date: dayDate,
                    day: dayFormat(dayDate),
                    size: cellSize,
                    ...cellPosition(originX, originY, dayDate, i, date[0]),
                }
            })
        )
        const blockMonths = timeMonths(date[0], date[1]).map(monthDate => ({
            date: monthDate,
            year: monthDate.getFullYear(),
            month: monthDate.getMonth(),
            ...memoMonthPathAndBBox({
                originX,
                originY,
                date: monthDate,
                direction,
                blockIndex: i,
                blockSpacing,
                monthSpacing,
                daySpacing,
                cellSize,
                startDate: date[0],
                maxRowsMonth,
                weekDirection,
            }),
        }))

        months = months.concat(blockMonths)
        blocks.push({
            firstMonth: date[0].getMonth(),
            firstYear: date[0].getFullYear(),
            lastMonth: date[1].getMonth(),
            lastYear: date[1].getFullYear(),
            bbox: {
                x: blockMonths[0].bbox.x,
                y: blockMonths[0].bbox.y,
                width:
                    blockMonths[blockMonths.length - 1].bbox.x -
                    blockMonths[0].bbox.x +
                    blockMonths[blockMonths.length - 1].bbox.width,
                height:
                    blockMonths[blockMonths.length - 1].bbox.y -
                    blockMonths[0].bbox.y +
                    blockMonths[blockMonths.length - 1].bbox.height,
            },
        })
    })
    return { blocks, months, days, cellSize, calendarWidth, calendarHeight, originX, originY }
}
