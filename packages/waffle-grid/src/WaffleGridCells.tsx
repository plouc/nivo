import { WaffleGridCellData, WaffleGridCellComponent } from './types'
import { WaffleGridBlankCells } from './WaffleGridBlankCells'
import { WaffleGridValueCells } from './WaffleGridValueCells'

export const WaffleGridCells = ({
    blankCells,
    blankCellComponent,
    valueCells,
    valueCellComponent,
}: {
    blankCells: WaffleGridCellData[]
    blankCellComponent: WaffleGridCellComponent
    valueCells: WaffleGridCellData[]
    valueCellComponent: WaffleGridCellComponent
}) => {
    return (
        <g>
            <WaffleGridBlankCells cells={blankCells} cellComponent={blankCellComponent} />
            <WaffleGridValueCells cells={valueCells} cellComponent={valueCellComponent} />
        </g>
    )
}
