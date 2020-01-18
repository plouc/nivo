import React from 'react'
import {
    WaffleCellComponent,
    WaffleCellProps,
    isWaffleDataCell,
    WaffleCell,
    WaffleDataCell,
} from './props'

export interface WaffleCellsProps {
    cells: Array<WaffleCell | WaffleDataCell>
    cellComponent: WaffleCellComponent
    cellSize: number
    emptyOpacity: number
    borderWidth: number
    getBorderColor: (...args: any[]) => string
    onMouseHover?: WaffleCellProps['onMouseHover']
    onMouseLeave?: WaffleCellProps['onMouseLeave']
    onClick?: WaffleCellProps['onClick']
}

export const WaffleCells = ({
    cells,
    cellComponent,
    cellSize,
    emptyOpacity,
    borderWidth,
    getBorderColor,
    onMouseHover,
    onMouseLeave,
    onClick,
}: WaffleCellsProps) => {
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
