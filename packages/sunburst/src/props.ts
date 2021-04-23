import { ArcTransitionMode } from '@nivo/arcs'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { SunburstTooltip } from './SunburstTooltip'
import { SunburstLayerId } from './types'

export const defaultProps = {
    id: 'id',
    value: 'value',

    cornerRadius: 0,

    layers: ['arcs', 'arcLabels'] as SunburstLayerId[],

    colors: ({ scheme: 'nivo' } as unknown) as OrdinalColorScaleConfig,
    borderWidth: 1,
    borderColor: 'white',

    childColor: { from: 'color' },
    role: 'img',

    // arc labels
    enableArcLabels: false,
    arcLabel: 'formattedValue',
    arcLabelsRadiusOffset: 0.5,
    arcLabelsSkipAngle: 0,
    arcLabelsTextColor: { theme: 'labels.text.fill' },

    animate: true,
    motionConfig: 'gentle',
    transitionMode: 'innerRadius' as ArcTransitionMode,

    isInteractive: true,

    defs: [],
    fill: [],

    tooltip: SunburstTooltip,
}
