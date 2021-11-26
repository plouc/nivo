import { RadarGridLabel } from './RadarGridLabel'
import { RadarSliceTooltip } from './RadarSliceTooltip'
import { RadarLayerId } from './types'

export const svgDefaultProps = {
    layers: ['grid', 'layers', 'slices', 'dots', 'legends'] as RadarLayerId[],

    maxValue: 'auto' as const,

    curve: 'linearClosed' as const,

    borderWidth: 2,
    borderColor: { from: 'color' },

    gridLevels: 5,
    gridShape: 'circular' as const,
    gridLabelOffset: 16,
    gridLabel: RadarGridLabel,

    enableDots: true,
    dotSize: 6,
    dotColor: { from: 'color' },
    dotBorderWidth: 0,
    dotBorderColor: { from: 'color' },
    enableDotLabel: false,
    dotLabel: 'formattedValue',
    dotLabelYOffset: -12,

    colors: { scheme: 'nivo' as const },
    fillOpacity: 0.25,
    blendMode: 'normal' as const,

    isInteractive: true,
    sliceTooltip: RadarSliceTooltip,

    legends: [],
    role: 'img',

    animate: true,
    motionConfig: 'gentle' as const,

    defs: [],
    fill: [],
}
