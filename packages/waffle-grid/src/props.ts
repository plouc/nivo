import { WaffleGridLayerId } from './types'
import { WaffleGridCell } from './WaffleGridCell'

export const commonDefaultProps = {
    layers: ['grid', 'axes', 'cells', 'legends'] as WaffleGridLayerId[],

    spacing: 6,

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle' as const,

    renderWrapper: true,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    blankCellComponent: WaffleGridCell,
    valueCellComponent: WaffleGridCell,
}
