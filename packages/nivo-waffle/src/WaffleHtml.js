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
import { Container } from '@nivo/core'
import enhance from './enhance'
import { WafflePropTypes } from './props'
import { computeGrid } from './compute'

const WaffleHtml = ({
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

    const { cells, cellSize, origin } = computeGrid(width, height, rows, columns, padding)
    cells.forEach(cell => {
        cell.color = emptyColor
    })

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
        <Container theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <div
                    style={{
                        position: 'relative',
                        width: outerWidth,
                        height: outerHeight,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: margin.top + origin.y,
                            left: margin.left + origin.x,
                        }}
                    >
                        {cells.map(cell => {
                            //console.log(cell)
                            return (
                                <div
                                    key={cell.position}
                                    style={{
                                        position: 'absolute',
                                        top: cell.y,
                                        left: cell.x,
                                        width: cellSize,
                                        height: cellSize,
                                        background: cell.color,
                                        opacity: cell.data ? 1 : emptyOpacity,
                                        borderWidth,
                                        borderColor: getBorderColor(cell),
                                    }}
                                    onClick={() => {
                                        console.table(cell)
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            )}
        </Container>
    )
}

WaffleHtml.propTypes = WafflePropTypes
WaffleHtml.displayName = 'WaffleHtml'

export default enhance(WaffleHtml)
