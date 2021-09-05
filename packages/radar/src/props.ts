import { RadarGridLabel } from './RadarGridLabel'
import { RadarLayerId } from './types'

export const svgDefaultProps = {
    layers: ['grid', 'shapes', 'dots', 'legends'] as RadarLayerId[],

    maxValue: 'auto' as const,

    curve: 'linearClosed' as const,

    borderWidth: 2,
    borderColor: { from: 'color' },

    gridLevels: 5,
    gridShape: 'circular' as const,
    gridLabelOffset: 16,
    gridLabel: RadarGridLabel,

    enableDots: true,

    colors: { scheme: 'nivo' as const },
    fillOpacity: 0.25,
    blendMode: 'normal' as const,

    isInteractive: true,

    legends: [],
    role: 'img',

    animate: true,
    motionConfig: 'gentle' as const,
}
