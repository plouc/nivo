import { OrdinalColorScaleConfig } from '@nivo/colors'
import { SunburstTooltip } from './SunburstTooltip'
import { SunburstLayerId } from './types'

export const defaultProps = {
    id: 'id',
    value: 'value',

    cornerRadius: 0,

    layers: ['slices', 'sliceLabels'] as SunburstLayerId[],

    colors: ({ scheme: 'nivo' } as unknown) as OrdinalColorScaleConfig,
    borderWidth: 1,
    borderColor: 'white',

    childColor: { from: 'color' },
    role: 'img',

    // slices labels
    enableSliceLabels: false,
    sliceLabel: 'formattedValue',
    sliceLabelsSkipAngle: 0,
    sliceLabelsTextColor: { theme: 'labels.text.fill' },

    isInteractive: true,
    animate: false,
    motionConfig: 'gentle',

    defs: [],
    fill: [],

    tooltip: SunburstTooltip,
}
