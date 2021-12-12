import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridSvgProps } from './types'
import { WaffleGridCells } from './WaffleGridCells'

export const WaffleGridAllCells = ({
    enableBlankCells,
    blankCells,
    blankCellComponent,
    blankCellsMotion,
    valueCells,
    valueCellComponent,
    valueCellsMotion,
}: {
    enableBlankCells: boolean
    blankCells: WaffleGridCellData[]
    blankCellComponent: WaffleGridCellComponent
    blankCellsMotion: WaffleGridSvgProps['blankCellsMotion']
    valueCells: WaffleGridCellData[]
    valueCellComponent: WaffleGridCellComponent
    valueCellsMotion: WaffleGridSvgProps['valueCellsMotion']
}) => {
    return (
        <g>
            {enableBlankCells && (
                <WaffleGridCells
                    cells={blankCells}
                    cellComponent={blankCellComponent}
                    {...blankCellsMotion}
                />
            )}
            <WaffleGridCells
                cells={valueCells}
                cellComponent={valueCellComponent}
                {...valueCellsMotion}
            />
        </g>
    )
}
