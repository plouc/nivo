import { SunburstTooltip } from './SunburstTooltip'

export type DefaultSunburstProps = Required<typeof defaultProps>

export const defaultProps = {
    id: 'id',
    value: 'value',

    cornerRadius: 0,

    colors: { scheme: 'nivo' },
    borderWidth: 1,
    borderColor: 'white',

    childColor: { from: 'color' },
    role: 'img',

    // slices labels
    enableSliceLabels: false,
    sliceLabel: 'formattedValue',
    sliceLabelsTextColor: { theme: 'labels.text.fill' },

    isInteractive: true,
    animate: false,
    motionConfig: 'gentle',

    tooltip: SunburstTooltip,
} as const
