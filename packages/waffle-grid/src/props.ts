import { WaffleGridLayerId } from './types'
import { WaffleGridCell } from './WaffleGridCell'

export const commonDefaultProps = {
    spacing: 6,
    enableBlankCells: true,

    layers: ['grid', 'axes', 'cells'] as WaffleGridLayerId[],

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle' as const,

    renderWrapper: true,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    blankCellComponent: WaffleGridCell,
    valueCellComponent: WaffleGridCell,
    blankCellsStaggeredDelay: 2,
    valueCellsStaggeredDelay: 2,
}
