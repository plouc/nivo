/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { MouseEvent, ReactNode, useCallback } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { withContainer, useDimensions, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    BaseWaffleProps,
    WaffleCellComponent,
    waffleDefaults,
    isWaffleDataCell,
    WaffleCell,
    WaffleDataCell,
    WaffleDatum,
} from './props'
import { mergeCellsData } from './compute'
import { useWaffle } from './hooks'
import { WaffleCellHtml } from './WaffleCellHtml'
import { WaffleCells } from './WaffleCells'
import { WaffleCellTooltip } from './WaffleCellTooltip'

export interface WaffleHtmlProps<Datum extends WaffleDatum> extends BaseWaffleProps<WaffleDatum> {
    cellComponent?: WaffleCellComponent<Datum>
}

function WaffleHtml<Datum extends WaffleDatum>({
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
    cellComponent = WaffleCellHtml,
}: WaffleHtmlProps<Datum>) {
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

        renderedCells = (
            <WaffleCells
                cells={computedCells}
                cellComponent={cellComponent}
                cellSize={grid.cellSize}
                emptyOpacity={emptyOpacity}
                borderWidth={borderWidth}
                getBorderColor={getBorderColor}
                onMouseHover={handleCellHover}
                onMouseLeave={handleCellLeave}
                // onClick,
            />
        )
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
                        <WaffleCells
                            cells={animatedComputedCells}
                            cellComponent={cellComponent}
                            cellSize={grid.cellSize}
                            emptyOpacity={emptyOpacity}
                            borderWidth={borderWidth}
                            getBorderColor={getBorderColor}
                            onMouseHover={handleCellHover}
                            onMouseLeave={handleCellLeave}
                            // onClick,
                        />
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
