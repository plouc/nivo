/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import range from 'lodash/range'
import { TransitionMotion, spring } from 'react-motion'
import { Container, SvgWrapper } from '@nivo/core'
import { WafflePropTypes } from './props'
import enhance from './enhance'

const Waffle = ({
    // data
    total,
    data,

    // layout
    rows,
    columns,
    padding,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // styling
    getColor,
    emptyColor,
    emptyOpacity,
    borderWidth,
    getBorderColor,
    theme,
    defs,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    onClick,
}) => {
    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    const cellCount = rows * columns
    const unit = total / cellCount

    let cells = []
    range(rows).forEach(row => {
        range(columns).forEach(column => {
            cells.push({
                position: row * columns + column,
                row,
                column,
                color: emptyColor,
            })
        })
    })

    const sizeX = (width - (columns - 1) * padding) / columns
    const sizeY = (height - (rows - 1) * padding) / rows
    const size = Math.min(sizeX, sizeY)
    const originX = (width - (size * columns + padding * (columns - 1))) / 2
    const originY = (height - (size * rows + padding * (rows - 1))) / 2

    let previous = 0
    data.forEach((datum, groupIndex) => {
        const startAt = previous
        const endAt = startAt + Math.round(datum.value / unit)
        range(startAt, endAt).forEach(position => {
            const cell = cells[position]
            if (cell !== undefined) {
                cell.data = datum
                cell.groupIndex = groupIndex
                cell.color = getColor(datum)
            }
        })
        previous = endAt
    })

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} defs={defs}>
                    <g transform={`translate(${originX}, ${originY})`}>
                        {cells.map(cell => {
                            //console.log(cell)
                            return (
                                <rect
                                    key={cell.position}
                                    width={size}
                                    height={size}
                                    x={cell.column * (size + padding)}
                                    y={cell.row * (size + padding)}
                                    fill={cell.color}
                                    strokeWidth={borderWidth}
                                    stroke={getBorderColor(cell)}
                                    opacity={cell.data ? 1 : emptyOpacity}
                                    onClick={() => {
                                        console.table(cell)
                                    }}
                                />
                            )
                        })}
                    </g>
                </SvgWrapper>
            )}
        </Container>
    )
}

Waffle.propTypes = WafflePropTypes
Waffle.displayName = 'Waffle'

export default enhance(Waffle)
