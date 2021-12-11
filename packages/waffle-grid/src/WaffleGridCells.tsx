import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridSvgProps } from './types'
import { WaffleGridBlankCells } from './WaffleGridBlankCells'
import { WaffleGridValueCells } from './WaffleGridValueCells'

export const WaffleGridCells = ({
    blankCells,
    blankCellComponent,
    blankCellsMotionConfig,
    valueCells,
    valueCellComponent,
    valueCellsMotionConfig,
}: {
    blankCells: WaffleGridCellData[]
    blankCellComponent: WaffleGridCellComponent
    blankCellsMotionConfig: WaffleGridSvgProps['blankCellsMotionConfig']
    valueCells: WaffleGridCellData[]
    valueCellComponent: WaffleGridCellComponent
    valueCellsMotionConfig: WaffleGridSvgProps['valueCellsMotionConfig']
}) => {
    return (
        <g>
            <WaffleGridBlankCells
                cells={blankCells}
                cellComponent={blankCellComponent}
                motionConfig={blankCellsMotionConfig}
            />
            <WaffleGridValueCells
                cells={valueCells}
                cellComponent={valueCellComponent}
                motionConfig={valueCellsMotionConfig}
            />
        </g>
    )
}
