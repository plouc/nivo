import { StackOrder, StackOffset, AreaCurve } from '@nivo/core'
import { StreamCommonProps, StreamLayerId } from './types'
import { StreamDotsItem } from './StreamDotsItem'
import { LayerTooltip } from './LayerTooltip'
import { StackTooltip } from './StackTooltip'

export const defaultProps = {
    label: 'id',

    order: 'none' as StackOrder,
    offsetType: 'wiggle' as StackOffset,
    curve: 'catmullRom' as AreaCurve,

    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    colors: { scheme: 'nivo' } as StreamCommonProps<any>['colors'],
    fillOpacity: 1,
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    } as StreamCommonProps<any>['borderColor'],

    enableDots: false,
    dotPosition: 'center' as StreamCommonProps<any>['dotPosition'],
    dotComponent: StreamDotsItem,
    dotSize: 6,
    dotColor: { from: 'color' },
    dotBorderWidth: 0,
    dotBorderColor: { from: 'color' },

    isInteractive: true,
    tooltip: LayerTooltip,
    enableStackTooltip: true,
    stackTooltip: StackTooltip,

    legends: [],
    legendLabel: 'id',

    role: 'application',
}

export const svgDefaultProps = {
    ...defaultProps,
    layers: ['grid', 'axes', 'layers', 'dots', 'slices', 'legends'] as StreamLayerId[],

    defs: [],
    fill: [],

    animate: true,
    motionConfig: 'default',

    role: 'img',
    isFocusable: false,
}
