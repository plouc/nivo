import { colorSchemes } from '@nivo/colors'
import { WaffleGridLayerId } from './types'
import { WaffleGridCell } from './WaffleGridCell'

export const commonDefaultProps = {
    spacing: 6,
    enableBlankCells: true,

    blankCellColor: { theme: 'grid.line.stroke' },
    valueCellColor: colorSchemes.nivo[1],

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
