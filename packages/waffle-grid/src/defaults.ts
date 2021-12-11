import { colorSchemes } from '@nivo/colors'
import { WaffleGridLayerId, WaffleGridCommonProps, WaffleGridSvgProps } from './types'
import { WaffleGridCell } from './WaffleGridCell'

export const commonDefaultProps = {
    maxValue: 'auto',
    spacing: 6,
    enableBlankCells: true,

    blankCellColor: { theme: 'grid.line.stroke' },
    valueCellColor: colorSchemes.nivo[1],

    layers: ['grid', 'axes', 'cells'] as WaffleGridLayerId[],

    isInteractive: true,

    renderWrapper: true,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionConfig: 'gentle' as const,
    blankCellComponent: WaffleGridCell,
    valueCellComponent: WaffleGridCell,
    blankCellsStaggeredDelay: 2,
    valueCellsStaggeredDelay: 2,
}
