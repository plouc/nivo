/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import range from 'lodash/range'
import partial from 'lodash/partial'
import { TransitionMotion, spring } from 'react-motion'
import { Container, SvgWrapper, BasicTooltip } from '@nivo/core'
import { WafflePropTypes } from './props'
import enhance from './enhance'
import { computeGrid } from './compute'
import WaffleNode from './WaffleNode'

export class Waffle extends Component {
    static propTypes = WafflePropTypes

    handleCellHover = (showTooltip, cell, event) => {
        const { setCurrentCell, theme, tooltipFormat, tooltip } = this.props

        setCurrentCell(cell)

        if (!cell.data) return

        showTooltip(
            <BasicTooltip
                id={cell.data.label}
                value={cell.data.value}
                enableChip={true}
                color={cell.color}
                theme={theme}
                format={tooltipFormat}
                renderContent={
                    typeof tooltip === 'function'
                        ? tooltip.bind(null, { color: cell.color, ...cell.data })
                        : null
                }
            />,
            event
        )
    }

    handleCellLeave = hideTooltip => {
        this.props.setCurrentCell(null)
        hideTooltip()
    }

    render() {
        const {
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
        } = this.props

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
                {({ showTooltip, hideTooltip }) => {
                    const onHover = partial(this.handleCellHover, showTooltip)
                    const onLeave = partial(this.handleCellLeave, hideTooltip)

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            defs={defs}
                        >
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
                                            onHover={partial(onHover, cell)}
                                            onLeave={onLeave}
                                            onClick={onClick}
                                        />
                                    )
                                })}
                            </g>
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}

Waffle.displayName = 'Waffle'

export default enhance(Waffle)
