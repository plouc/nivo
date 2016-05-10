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


const monthPathGenerator = (date, cellSize, daySpacing, direction) => {
    const t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0); // first day of next month
    const d0 = date.getDay();            // first day of month
    const w0 = d3.time.weekOfYear(date); // first week of month
    const d1 = t1.getDay();              // last day of month
    const w1 = d3.time.weekOfYear(t1);   // last week of month

    if (direction === DIRECTION_HORIZONTAL) {
        return [
            `M${(w0 + 1) * (cellSize + daySpacing)},${d0 * (cellSize + daySpacing)}`,
            `H${w0 * (cellSize + daySpacing)}V${7 * (cellSize + daySpacing)}`,
            `H${w1 * (cellSize + daySpacing)}V${(d1 + 1) * (cellSize + daySpacing)}`,
            `H${(w1 + 1) * (cellSize + daySpacing)}V0`,
            `H${(w0 + 1) * (cellSize + daySpacing)}Z`
        ].join('');
    }

    return [
        `M${d0 * (cellSize + daySpacing)},${(w0 + 1) * (cellSize + daySpacing)}`,
        `H0V${(w1 + 1) * (cellSize + daySpacing)}`,
        `H${(d1 + 1) * (cellSize + daySpacing)}V${w1 * (cellSize + daySpacing)}`,
        `H${7 * (cellSize + daySpacing)}V${w0 * (cellSize + daySpacing)}`,
        `H${d0 * (cellSize + daySpacing)}Z`
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
                const hCellSize = (width - daySpacing * (maxWeeks + 1)) / maxWeeks;
                const vCellSize = (height - (years.length - 1) * yearSpacing - years.length * (8 * daySpacing)) / (years.length * 7);
                cellSize = Math.min(hCellSize, vCellSize);
            } else {
                cellSize = (height - daySpacing * (maxWeeks + 1)) / maxWeeks;
            }

            let cellPosition;
            if (direction === DIRECTION_HORIZONTAL) {
                cellPosition = (d, yearIndex) => ({
                    x: d3.time.weekOfYear(d) * (cellSize + daySpacing) + daySpacing / 2,
                    y: d.getDay() * (cellSize + daySpacing) + daySpacing / 2 + yearIndex * (yearSpacing + 7 * cellSize + 8 * daySpacing),
                });
            } else {
                cellPosition = (d, yearIndex) => ({
                    x: d.getDay() * (cellSize + daySpacing) + daySpacing / 2 + yearIndex * (yearSpacing + 7 * cellSize + 8 * daySpacing),
                    y: d3.time.weekOfYear(d) * (cellSize + daySpacing) + daySpacing / 2,
                });
            }

            let dayNodes   = [];
            let monthNodes = [];
            
            years = years.forEach((year, i) => {
                const yearStart = new Date(year, 0, 1);
                const yearEnd   = new Date(year + 1, 0, 1);

                dayNodes = dayNodes.concat(d3.time.days(yearStart, yearEnd)
                    .map(dayDate => {
                        return _.assign({
                            date: dayDate,
                            size: cellSize,
                        }, cellPosition(dayDate, i));
                    })
                );

                monthNodes = monthNodes.concat(d3.time.months(yearStart, yearEnd)
                    .map(monthDate => {
                        return {
                            date: monthDate,
                            path: monthPathGenerator(monthDate, cellSize, daySpacing, direction),
                        };
                    })
                );
            });

            return {
                days:   dayNodes,
                months: monthNodes,
            };
        }
    }
};


export default CalendarLayout;
