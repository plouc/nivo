import React from 'react'
import {
    WaffleCellComponent,
    WaffleCellProps,
    isWaffleDataCell,
    WaffleCell,
    WaffleBaseDatum,
} from './props'

export interface WaffleCellsProps<Datum extends WaffleBaseDatum> {
    cells: Array<WaffleCell<Datum>>
    cellComponent: WaffleCellComponent
    cellSize: number
    emptyOpacity: number
    borderWidth: number
    getBorderColor: (...args: any[]) => string
    onMouseHover?: WaffleCellProps<Datum>['onMouseHover']
    onMouseLeave?: WaffleCellProps<Datum>['onMouseLeave']
    onClick?: WaffleCellProps<Datum>['onClick']
}

export function WaffleCells<Datum extends WaffleBaseDatum>({
    cells,
    cellComponent,
    cellSize,
    emptyOpacity,
    borderWidth,
    getBorderColor,
    onMouseHover,
    onMouseLeave,
    onClick,
}: WaffleCellsProps<Datum>) {
    return (
        <>
            {cells.map(cell =>
                React.createElement(cellComponent, {
                    key: cell.position,
                    position: cell.position,
                    size: cellSize,
                    x: cell.x,
                    y: cell.y,
                    color: cell.color,
                    fill: isWaffleDataCell(cell) ? cell.data.fill : undefined,
                    opacity: isWaffleDataCell(cell) ? 1 : emptyOpacity,
                    borderWidth,
                    borderColor: getBorderColor(cell),
                    data: isWaffleDataCell(cell) ? cell.data : undefined,
                    onMouseHover,
                    onMouseLeave,
                    onClick,
                })
            )}
        </>
    )
}
