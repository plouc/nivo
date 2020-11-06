import { OrdinalColorsInstruction } from '@nivo/colors'
import { PieTooltip } from './PieTooltip'

export const defaultProps = {
    id: 'id',
    value: 'value',
    sortByValue: false,
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    layers: ['slices', 'radialLabels', 'sliceLabels', 'legends'],

    // layout
    startAngle: 0,
    endAngle: 360,
    fit: true,

    // border
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    // radial labels
    radialLabel: 'id',
    enableRadialLabels: true,
    radialLabelsSkipAngle: 0,
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: { theme: 'labels.text.fill' },
    radialLabelsLinkColor: { theme: 'axis.ticks.line.stroke' },

    // slices labels
    enableSliceLabels: true,
    sliceLabel: 'formattedValue',
    sliceLabelsSkipAngle: 0,
    sliceLabelsRadiusOffset: 0.5,
    sliceLabelsTextColor: { theme: 'labels.text.fill' },

    // styling
    colors: ({ scheme: 'nivo' } as unknown) as OrdinalColorsInstruction,
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,

    // tooltip
    tooltip: PieTooltip,

    // legends
    legends: [],

    role: 'img',

    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
