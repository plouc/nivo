import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridSvgProps } from './types'
import { WaffleGridBlankCells } from './WaffleGridBlankCells'
import { WaffleGridValueCells } from './WaffleGridValueCells'

export const WaffleGridCells = ({
    blankCells,
    blankCellComponent,
    blankCellsMotionConfig,
    blankCellsStaggeredDelay,
    valueCells,
    valueCellComponent,
    valueCellsMotionConfig,
    valueCellsStaggeredDelay,
}: {
    blankCells: WaffleGridCellData[]
    blankCellComponent: WaffleGridCellComponent
    blankCellsMotionConfig: WaffleGridSvgProps['blankCellsMotionConfig']
    blankCellsStaggeredDelay: number
    valueCells: WaffleGridCellData[]
    valueCellComponent: WaffleGridCellComponent
    valueCellsMotionConfig: WaffleGridSvgProps['valueCellsMotionConfig']
    valueCellsStaggeredDelay: number
}) => {
    return (
        <g>
            <WaffleGridBlankCells
                cells={blankCells}
                cellComponent={blankCellComponent}
                motionConfig={blankCellsMotionConfig}
                staggeredDelay={blankCellsStaggeredDelay}
            />
            <WaffleGridValueCells
                cells={valueCells}
                cellComponent={valueCellComponent}
                motionConfig={valueCellsMotionConfig}
                staggeredDelay={valueCellsStaggeredDelay}
            />
        </g>
    )
}
