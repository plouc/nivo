/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ComponentProps, FunctionComponent, MouseEvent, ReactNode, useCallback } from 'react'
import { partial } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import { Container, withContainer, useDimensions, useMotionConfig } from '@nivo/core'
import { InheritedColor, OrdinalColorScale } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { isWaffleDataCell, mergeCellsData, WaffleCell, WaffleDataCell } from './compute'
import { useWaffle, WaffleDatum, WaffleFillDirection } from './hooks'
import { WaffleCellHtml as WaffleCellComponent } from './WaffleCellHtml'
import { waffleDefaults } from './Waffle'
import { WaffleCellTooltip } from './WaffleCellTooltip'

export interface WaffleHtmlProps extends ComponentProps<typeof Container> {
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    data: WaffleDatum[]
    total: number
    rows: number
    columns: number
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<WaffleDatum>
    emptyColor?: string
    emptyOpacity: number
    borderWidth?: number
    borderColor?: InheritedColor
    // tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // tooltip: PropTypes.func,
    cellComponent?: FunctionComponent<any>
    hiddenIds?: Array<string | number>
}

const WaffleHtml = ({
    width,
    height,
    margin: partialMargin,
    data,
    total,
    hiddenIds = [],
    rows,
    columns,
    fillDirection,
    padding,
    colors,
    emptyColor,
    emptyOpacity = waffleDefaults.emptyOpacity,
    borderWidth = waffleDefaults.borderWidth,
    borderColor,
    cellComponent = WaffleCellComponent,
}: WaffleHtmlProps) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const { animate, springConfig } = useMotionConfig()

    const { grid, computedData, getBorderColor, setCurrentCell } = useWaffle({
        width: innerWidth,
        height: innerHeight,
        data,
        total,
        hiddenIds,
        rows,
        columns,
        fillDirection,
        padding,
        colors,
        emptyColor,
        borderColor,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleCellHover = useCallback(
        (cell: WaffleCell | WaffleDataCell, event: MouseEvent) => {
            setCurrentCell(cell)

            if (isWaffleDataCell(cell)) {
                showTooltipFromEvent(
                    <WaffleCellTooltip
                        position={cell.position}
                        row={cell.row}
                        column={cell.column}
                        color={cell.color}
                        data={cell.data}
                        // tooltipFormat={tooltipFormat}
                        // tooltip={tooltip}
                    />,
                    event
                )
            }
        },
        [setCurrentCell]
    )

    const handleCellLeave = useCallback(
        (cell: WaffleCell | WaffleDataCell, event: MouseEvent) => {
            setCurrentCell(null)
            hideTooltip()
        },
        [setCurrentCell, hideTooltip]
    )

    let renderedCells: ReactNode

    if (!animate) {
        const computedCells = mergeCellsData(grid.cells, computedData)

        renderedCells = computedCells.map(cell => {
            return React.createElement(cellComponent, {
                key: cell.position,
                position: cell.position,
                size: grid.cellSize,
                x: cell.x,
                y: cell.y,
                color: cell.color,
                fill: isWaffleDataCell(cell) ? cell.data.fill : undefined,
                opacity: isWaffleDataCell(cell) ? 1 : emptyOpacity,
                borderWidth,
                borderColor: getBorderColor(cell),
                data: isWaffleDataCell(cell) ? cell.data : undefined,
                onHover: partial(handleCellHover, cell),
                onLeave: partial(handleCellLeave, cell),
                // onClick,
            })
        })
    } else {
        renderedCells = (
            <TransitionMotion
                styles={
                    computedData.map(datum => ({
                        key: datum.id,
                        data: datum,
                        style: {
                            startAt: spring(datum.startAt, springConfig),
                            endAt: spring(datum.endAt, springConfig),
                        },
                    })) as any
                }
            >
                {(interpolatedStyles: any) => {
                    const animatedComputedCells = mergeCellsData(
                        grid.cells,
                        interpolatedStyles.map((s: any) => ({
                            ...s.data,
                            startAt: Math.round(s.style.startAt),
                            endAt: Math.round(s.style.endAt),
                        }))
                    )

                    return (
                        <>
                            {animatedComputedCells.map(cell => {
                                return React.createElement(cellComponent, {
                                    key: cell.position,
                                    position: cell.position,
                                    size: grid.cellSize,
                                    x: cell.x,
                                    y: cell.y,
                                    color: cell.color,
                                    fill: isWaffleDataCell(cell) ? cell.data.fill : undefined,
                                    opacity: isWaffleDataCell(cell) ? 1 : emptyOpacity,
                                    borderWidth,
                                    borderColor: getBorderColor(cell),
                                    data: isWaffleDataCell(cell) ? cell.data : undefined,
                                    onHover: partial(handleCellHover, cell),
                                    onLeave: partial(handleCellLeave, cell),
                                    // onClick,
                                })
                            })}
                        </>
                    )
                }}
            </TransitionMotion>
        )
    }

    return (
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
                    top: margin.top + grid.origin.y,
                    left: margin.left + grid.origin.x,
                }}
            >
                {renderedCells}
            </div>
        </div>
    )
}

export default withContainer(WaffleHtml)
