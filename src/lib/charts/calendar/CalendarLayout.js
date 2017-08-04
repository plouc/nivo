/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import _ from 'lodash'
import { DIRECTION_HORIZONTAL } from '../../../constants/directions'
import { timeFormat } from 'd3-time-format'
import { timeDays, timeWeek, timeWeeks, timeMonths, timeYear } from 'd3-time'

/**
 * Compute day cell size according to current context.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} direction
 * @param {array}  yearRange
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @param {number} maxWeeks
 * @returns {number}
 */
const computeCellSize = ({
    width,
    height,
    direction,
    yearRange,
    yearSpacing,
    daySpacing,
    maxWeeks,
}) => {
    let hCellSize
    let vCellSize

    if (direction === DIRECTION_HORIZONTAL) {
        hCellSize = (width - daySpacing * maxWeeks) / maxWeeks
        vCellSize =
            (height - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) /
            (yearRange.length * 7)
    } else {
        hCellSize =
            (width - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) /
            (yearRange.length * 7)
        vCellSize = (height - daySpacing * maxWeeks) / maxWeeks
    }

    return Math.min(hCellSize, vCellSize)
}

/**
 * Computes month path and bounding box.
 *
 * @param {Date}   date
 * @param {number} cellSize
 * @param {number} yearIndex
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @param {string} direction
 * @returns { { path: string, bbox: { x: number, y: number, width: number, height: number } } }
 */
const monthPathAndBBox = ({ date, cellSize, yearIndex, yearSpacing, daySpacing, direction }) => {
    const t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0) // first day of next month
    const d0 = date.getDay() // first day of month
    const w0 = timeWeek.count(timeYear(date), date) // first week of month
    const d1 = t1.getDay() // last day of month
    const w1 = timeWeek.count(timeYear(t1), t1) // last week of month

    // offset according to year index
    let xO = 0
    let yO = 0
    const yearOffset = yearIndex * (7 * (cellSize + daySpacing) + yearSpacing)
    if (direction === DIRECTION_HORIZONTAL) {
        yO = yearOffset
    } else {
        xO = yearOffset
    }

    let path
    let bbox = { x: xO, y: yO, width: 0, height: 0 }
    if (direction === DIRECTION_HORIZONTAL) {
        path = [
            `M${xO + (w0 + 1) * (cellSize + daySpacing)},${yO + d0 * (cellSize + daySpacing)}`,
            `H${xO + w0 * (cellSize + daySpacing)}V${yO + 7 * (cellSize + daySpacing)}`,
            `H${xO + w1 * (cellSize + daySpacing)}V${yO + (d1 + 1) * (cellSize + daySpacing)}`,
            `H${xO + (w1 + 1) * (cellSize + daySpacing)}V${yO}`,
            `H${xO + (w0 + 1) * (cellSize + daySpacing)}Z`,
        ].join('')

        bbox.x = xO + w0 * (cellSize + daySpacing)
        bbox.width = (w1 + 1) * (cellSize + daySpacing) - bbox.x
        bbox.height = 7 * (cellSize + daySpacing)
    } else {
        path = [
            `M${xO + d0 * (cellSize + daySpacing)},${yO + (w0 + 1) * (cellSize + daySpacing)}`,
            `H${xO}V${yO + (w1 + 1) * (cellSize + daySpacing)}`,
            `H${xO + (d1 + 1) * (cellSize + daySpacing)}V${yO + w1 * (cellSize + daySpacing)}`,
            `H${xO + 7 * (cellSize + daySpacing)}V${yO + w0 * (cellSize + daySpacing)}`,
            `H${xO + d0 * (cellSize + daySpacing)}Z`,
        ].join('')

        bbox.y = yO + w0 * (cellSize + daySpacing)
        bbox.width = 7 * (cellSize + daySpacing)
        bbox.height = (w1 + 1) * (cellSize + daySpacing) - bbox.y
    }

    return { path, bbox }
}

/**
 * Creates a memoized version of monthPathAndBBox function.
 */
const memoMonthPathAndBBox = _.memoize(
    monthPathAndBBox,
    ({ date, cellSize, yearIndex, yearSpacing, daySpacing, direction }) => {
        return `${date.toString()}.${cellSize}.${yearIndex}.${yearSpacing}.${daySpacing}.${direction}`
    }
)

/**
 * Returns a function to Compute day cell position for horizontal layout.
 *
 * @param {number} cellSize
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionHorizontal = (cellSize, yearSpacing, daySpacing) => {
    return (d, yearIndex) => {
        const weekOfYear = timeWeek.count(timeYear(d), d)

        return {
            x: weekOfYear * (cellSize + daySpacing) + daySpacing / 2,
            y:
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
        }
    }
}

/**
 * Returns a function to Compute day cell position for vertical layout.
 *
 * @param {number} cellSize
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
const cellPositionVertical = (cellSize, yearSpacing, daySpacing) => {
    return (d, yearIndex) => {
        const weekOfYear = timeWeek.count(timeYear(d), d)

        return {
            x:
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
            y: weekOfYear * (cellSize + daySpacing) + daySpacing / 2,
        }
    }
}

// used for days range and data matching
const dayFormat = timeFormat('%Y-%m-%d')

/**
 * This layout is responsible for computing Calendar chart data/positions….
 * It's used for all Calendar related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const CalendarLayout = () => {
    return {
        /**
         * @param {number}      width
         * @param {number}      height
         * @param {string|Date} from
         * @param {string|Date} to
         * @param {array}       data
         * @param {string}      direction
         * @param {object}      colorScale
         * @param {string}      emptyColor
         * @param {number}      yearSpacing
         * @param {number}      daySpacing
         * @returns {object}
         */
        compute({
            width,
            height,
            from,
            to,
            data,
            direction,
            colorScale,
            emptyColor,
            yearSpacing,
            daySpacing,
        }) {
            // time related data
            const fromDate = _.isDate(from) ? from : new Date(from)
            const toDate = _.isDate(to) ? to : new Date(to)
            let yearRange = _.range(fromDate.getFullYear(), toDate.getFullYear() + 1)
            const maxWeeks =
                _.max(
                    yearRange,
                    year => timeWeeks(new Date(year, 0, 1), new Date(year + 1, 0, 1)).length
                ) + 1

            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            // Computes years/months/days
            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            // compute cellSize
            const cellSize = computeCellSize({
                width,
                height,
                direction,
                yearRange,
                yearSpacing,
                daySpacing,
                maxWeeks,
            })

            // determine day cells positioning function according to layout direction
            let cellPosition
            if (direction === DIRECTION_HORIZONTAL) {
                cellPosition = cellPositionHorizontal(cellSize, yearSpacing, daySpacing)
            } else {
                cellPosition = cellPositionVertical(cellSize, yearSpacing, daySpacing)
            }

            let years = []
            let months = []
            let days = []

            yearRange.forEach((year, i) => {
                const yearStart = new Date(year, 0, 1)
                const yearEnd = new Date(year + 1, 0, 1)

                days = days.concat(
                    timeDays(yearStart, yearEnd).map(dayDate =>
                        _.assign(
                            {
                                date: dayDate,
                                day: dayFormat(dayDate),
                                size: cellSize,
                            },
                            cellPosition(dayDate, i)
                        )
                    )
                )

                const yearMonths = timeMonths(yearStart, yearEnd).map(monthDate =>
                    _.assign(
                        { date: monthDate },
                        memoMonthPathAndBBox({
                            date: monthDate,
                            direction,
                            yearIndex: i,
                            yearSpacing,
                            daySpacing,
                            cellSize,
                        })
                    )
                )

                months = months.concat(yearMonths)

                years.push({
                    year,
                    bbox: {
                        x: yearMonths[0].bbox.x,
                        y: yearMonths[0].bbox.y,
                        width:
                            yearMonths[11].bbox.x -
                            yearMonths[0].bbox.x +
                            yearMonths[11].bbox.width,
                        height:
                            yearMonths[11].bbox.y -
                            yearMonths[0].bbox.y +
                            yearMonths[11].bbox.height,
                    },
                })
            })

            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            // Computes days/data intersection
            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            //const color = scalePropToD3Scale(colorScale)

            days.forEach(day => {
                day.color = emptyColor
                data.forEach(dataDay => {
                    if (dataDay.day === day.day) {
                        //day.color = color(dataDay.value)
                    }
                })
            })

            return { years, months, days, cellSize }
        },
    }
}

export default CalendarLayout
