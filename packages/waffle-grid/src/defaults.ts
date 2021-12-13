import { colorSchemes } from '@nivo/colors'
import { WaffleGridLayerId } from './types'
import { WaffleGridCell } from './WaffleGridCell'

export const commonDefaultProps = {
    maxValue: 'auto' as const,
    spacing: 6,
    cellSpacing: 1,
    enableBlankCells: true,

    blankCellColor: { theme: 'grid.line.stroke' },
    valueCellColor: colorSchemes.nivo[1],

    enableGridX: true,
    enableGridY: true,
    axisTop: null,
    axisRight: null,
    axisBottom: {},
    axisLeft: {},

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
    cellsMotionStaggeredDelay: 2,
    cellsMotionPositionOffsetIn: [0, 0] as [number, number],
    cellsMotionRandomizePositionOffsetIn: false,
    cellsMotionPositionOffsetOut: [0, 0] as [number, number],
    cellsMotionRandomizePositionOffsetOut: false,
}
