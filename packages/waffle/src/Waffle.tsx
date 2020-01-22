/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ReactNode, useCallback, MouseEvent } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import {
    withContainer,
    SvgWrapper,
    useDimensions,
    useMotionConfig,
    DefSpec,
    useBindDefs,
} from '@nivo/core'
import { BoxLegendSvg, LegendProp } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import {
    WaffleCellComponent,
    BaseWaffleProps,
    waffleDefaults,
    isWaffleDataCell,
    WaffleCell,
    WaffleDatum,
} from './props'
import { mergeCellsData } from './compute'
import { useWaffle } from './hooks'
import { WaffleCells } from './WaffleCells'
import { WaffleCell as WaffleCellSvg } from './WaffleCell'
import { WaffleCellTooltip } from './WaffleCellTooltip'

export interface WaffleProps<Datum extends WaffleDatum> extends BaseWaffleProps<Datum> {
    cellComponent?: WaffleCellComponent<Datum>
    defs?: DefSpec[]
    fill?: any[]
    legends?: LegendProp[]
}

function Waffle<Datum extends WaffleDatum = WaffleDatum>({
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
    cellComponent = WaffleCellSvg,
    legends = waffleDefaults.legends,
    defs = [],
    fill = [],
}: WaffleProps<Datum>) {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const { animate, springConfig } = useMotionConfig()

    const { grid, computedData, legendData, getBorderColor, setCurrentCell } = useWaffle({
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

    const { nodes: computedDataWithDefs, boundDefs } = useBindDefs(defs, computedData, fill)

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleCellHover = useCallback(
        (cell: WaffleCell, event: MouseEvent) => {
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
        (cell: WaffleCell, event: MouseEvent) => {
            setCurrentCell(null)
            hideTooltip()
        },
        [setCurrentCell, hideTooltip]
    )

    let renderedCells: ReactNode

    if (!animate) {
        const computedCells = mergeCellsData(grid.cells, computedDataWithDefs)

        renderedCells = (
            <WaffleCells<Datum>
                cells={computedCells}
                cellComponent={cellComponent}
                cellSize={grid.cellSize}
                borderWidth={borderWidth}
                getBorderColor={getBorderColor}
                emptyOpacity={emptyOpacity}
                onMouseHover={handleCellHover}
                onMouseLeave={handleCellLeave}
                // onClick,
            />
        )
    } else {
        renderedCells = (
            <TransitionMotion
                styles={
                    computedDataWithDefs.map(datum => ({
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
                        <WaffleCells<Datum>
                            cells={animatedComputedCells}
                            cellComponent={cellComponent}
                            cellSize={grid.cellSize}
                            emptyOpacity={emptyOpacity}
                            borderWidth={borderWidth}
                            getBorderColor={getBorderColor}
                            onMouseHover={handleCellHover}
                            onMouseLeave={handleCellLeave}
                            // onClick={onClick}
                        />
                    )
                }}
            </TransitionMotion>
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} defs={boundDefs}>
            <g transform={`translate(${grid.origin.x}, ${grid.origin.y})`}>{renderedCells}</g>
            {legends.map((legend, i) => (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={width}
                    containerHeight={height}
                    data={legendData}
                />
            ))}
        </SvgWrapper>
    )
}

export default withContainer(Waffle)
