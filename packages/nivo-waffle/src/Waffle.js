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
import { computeGrid } from './compute'
import WaffleNode from './WaffleNode'

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
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} defs={defs}>
                    <g transform={`translate(${origin.x}, ${origin.y})`}>
                        {cells.map(cell => {
                            //console.log(cell)
                            return (
                                <WaffleNode
                                    key={cell.position}
                                    position={cell.position}
                                    size={cellSize}
                                    x={cell.x}
                                    y={cell.y}
                                    color={cell.color}
                                    opacity={cell.data ? 1 : emptyOpacity}
                                    borderWidth={borderWidth}
                                    borderColor={getBorderColor(cell)}
                                    data={cell.data}
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
