import { WaffleGridCellData, WaffleGridCellComponent, WaffleGridSvgProps } from './types'
import { WaffleGridBlankCells } from './WaffleGridBlankCells'
import { WaffleGridValueCells } from './WaffleGridValueCells'

export const WaffleGridCells = ({
    enableBlankCells,
    blankCells,
    blankCellComponent,
    blankCellsMotionConfig,
    blankCellsStaggeredDelay,
    valueCells,
    valueCellComponent,
    valueCellsMotionConfig,
    valueCellsStaggeredDelay,
}: {
    enableBlankCells: boolean
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
            {enableBlankCells && (
                <WaffleGridBlankCells
                    cells={blankCells}
                    cellComponent={blankCellComponent}
                    motionConfig={blankCellsMotionConfig}
                    staggeredDelay={blankCellsStaggeredDelay}
                />
            )}
            <WaffleGridValueCells
                cells={valueCells}
                cellComponent={valueCellComponent}
                motionConfig={valueCellsMotionConfig}
                staggeredDelay={valueCellsStaggeredDelay}
            />
        </g>
    )
}
