/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import calendarLightNeutralImg from '../../assets/icons/calendar-light-neutral.png'
import calendarLightColoredImg from '../../assets/icons/calendar-light-colored.png'
import calendarDarkNeutralImg from '../../assets/icons/calendar-dark-neutral.png'
import calendarDarkColoredImg from '../../assets/icons/calendar-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const padding = 12
const cellSize = (ICON_SIZE - padding * 2) / 5

const generateCells = () => {
    let row = 0
    let column = 0
    const cells = []

    range(25).map(i => {
        cells.push({
            x: column,
            y: row,
        })

        if (column === 4) {
            column = 0
            row++
        } else {
            column++
        }
    })

    return cells
}

const cells = generateCells()

const CalendarIconItem = ({ type }) => (
    <Icon id={`calendar-${type}`} type={type}>
        <svg width={ICON_SIZE} height={ICON_SIZE}>
            <g transform={`translate(${padding},${padding})`}>
                <path
                    fill="none"
                    strokeWidth={8}
                    stroke={colors[type].colors[4]}
                    d={`
                        M${cells[1].x * cellSize},${cells[1].y * cellSize}
                        L${(cells[4].x + 1) * cellSize},${cells[4].y * cellSize}
                        L${(cells[19].x + 1) * cellSize},${cells[19].y * cellSize}
                        L${cells[19].x * cellSize},${cells[19].y * cellSize}
                        L${cells[24].x * cellSize},${(cells[24].y + 1) * cellSize}
                        L${cells[20].x * cellSize},${(cells[20].y + 1) * cellSize}
                        L${cells[5].x * cellSize},${cells[5].y * cellSize}
                        L${cells[6].x * cellSize},${cells[6].y * cellSize}
                        Z
                    `}
                />
                {cells.map((cell, i) => {
                    if ([0, 19, 24].includes(i)) return null

                    return (
                        <rect
                            key={i}
                            x={cell.x * cellSize}
                            y={cell.y * cellSize}
                            width={cellSize}
                            height={cellSize}
                            fill={colors[type].colors[0]}
                            stroke={colors[type].colors[4]}
                            strokeWidth={2}
                        />
                    )
                })}
            </g>
        </svg>
    </Icon>
)

const CalendarIcon = () => (
    <>
        <CalendarIconItem type="lightNeutral" />
        <IconImg url={calendarLightNeutralImg} />
        <CalendarIconItem type="lightColored" />
        <IconImg url={calendarLightColoredImg} />
        <CalendarIconItem type="darkNeutral" />
        <IconImg url={calendarDarkNeutralImg} />
        <CalendarIconItem type="darkColored" />
        <IconImg url={calendarDarkColoredImg} />
    </>
)

export default CalendarIcon
