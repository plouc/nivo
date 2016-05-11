/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import d3                       from 'd3';
import _                        from 'lodash';
import { DIRECTION_HORIZONTAL } from '../../../constants/directions';


const monthPathGenerator = ({ date, cellSize, yearIndex, yearSpacing, daySpacing, direction }) => {
    const t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0); // first day of next month
    const d0 = date.getDay();            // first day of month
    const w0 = d3.time.weekOfYear(date); // first week of month
    const d1 = t1.getDay();              // last day of month
    const w1 = d3.time.weekOfYear(t1);   // last week of month

    let xO = 0;
    let yO = 0;
    const yearOffset = yearIndex * (7 * (cellSize + daySpacing) + yearSpacing);
    if (direction === DIRECTION_HORIZONTAL) {
        yO = yearOffset;
    } else {
        xO = yearOffset;
    }

    if (direction === DIRECTION_HORIZONTAL) {
        return [
            `M${xO + (w0 + 1) * (cellSize + daySpacing)},${yO + d0 * (cellSize + daySpacing)}`,
            `H${xO + w0 * (cellSize + daySpacing)}V${yO + 7 * (cellSize + daySpacing)}`,
            `H${xO + w1 * (cellSize + daySpacing)}V${yO + (d1 + 1) * (cellSize + daySpacing)}`,
            `H${xO + (w1 + 1) * (cellSize + daySpacing)}V${yO}`,
            `H${xO + (w0 + 1) * (cellSize + daySpacing)}Z`
        ].join('');
    }

    return [
        `M${xO + d0 * (cellSize + daySpacing)},${yO + (w0 + 1) * (cellSize + daySpacing)}`,
        `H${xO}V${yO + (w1 + 1) * (cellSize + daySpacing)}`,
        `H${xO + (d1 + 1) * (cellSize + daySpacing)}V${yO + w1 * (cellSize + daySpacing)}`,
        `H${xO + 7 * (cellSize + daySpacing)}V${yO + w0 * (cellSize + daySpacing)}`,
        `H${xO + d0 * (cellSize + daySpacing)}Z`
    ].join('');
};


/**
 * This layout is responsible for computing Calendar chart data/positions….
 * It's used for all Calendar related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const CalendarLayout = () => {
    // room for later persistent data

    return {
        /**
         * @param {number}      width
         * @param {number}      height
         * @param {string|Date} from
         * @param {string|Date} to
         * @param {string}      direction
         * @param {number}      yearSpacing
         * @param {number}      daySpacing
         * @returns {object}
         */
        compute({
            width, height,
            from, to,
            direction,
            yearSpacing,
            daySpacing
        }) {

            // time related data
            const fromDate = _.isDate(from) ? from : new Date(from);
            const toDate   = _.isDate(to)   ? to   : new Date(to);
            let   years    = d3.range(fromDate.getFullYear(), toDate.getFullYear() + 1);
            const maxWeeks = d3.max(years, year => d3.time.weeks(new Date(year, 0, 1), new Date(year + 1, 0, 1)).length) + 1;

            // compute cellSize
            let cellSize;
            if (direction === DIRECTION_HORIZONTAL) {
                const hCellSize = (width - daySpacing * maxWeeks) / maxWeeks;
                const vCellSize = (height - (years.length - 1) * yearSpacing - years.length * (8 * daySpacing)) / (years.length * 7);
                cellSize = Math.min(hCellSize, vCellSize);
            } else {
                const hCellSize = (width - (years.length - 1) * yearSpacing - years.length * (8 * daySpacing)) / (years.length * 7);
                const vCellSize = (height - daySpacing * maxWeeks) / maxWeeks;
                cellSize = Math.min(hCellSize, vCellSize);
            }

            // determine day cells positioning function according to layout direction
            let cellPosition;
            if (direction === DIRECTION_HORIZONTAL) {
                cellPosition = (d, yearIndex) => ({
                    x: d3.time.weekOfYear(d) * (cellSize + daySpacing) + daySpacing / 2,
                    y: d.getDay() * (cellSize + daySpacing) + daySpacing / 2 + yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
                });
            } else {
                cellPosition = (d, yearIndex) => ({
                    x: d.getDay() * (cellSize + daySpacing) + daySpacing / 2 + yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
                    y: d3.time.weekOfYear(d) * (cellSize + daySpacing) + daySpacing / 2,
                });
            }

            let days   = [];
            let months = [];

            years.forEach((year, i) => {
                const yearStart = new Date(year, 0, 1);
                const yearEnd   = new Date(year + 1, 0, 1);

                days = days.concat(d3.time.days(yearStart, yearEnd)
                    .map(dayDate => {
                        return _.assign({
                            date: dayDate,
                            size: cellSize,
                        }, cellPosition(dayDate, i));
                    })
                );

                months = months.concat(d3.time.months(yearStart, yearEnd)
                    .map(monthDate => {
                        return {
                            date: monthDate,
                            path: monthPathGenerator({
                                date: monthDate,
                                direction,
                                yearIndex: i,
                                yearSpacing,
                                daySpacing,
                                cellSize
                            }),
                        };
                    })
                );
            });

            return {
                years,
                months,
                days,
                cellSize,
            };
        }
    }
};


export default CalendarLayout;
