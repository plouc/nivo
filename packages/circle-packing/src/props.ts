import { OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingLayerId } from './types'

export const defaultProps = {
    id: 'id',
    value: 'value',
    padding: 0,
    leavesOnly: false,
    layers: ['circles', 'labels'] as CirclePackingLayerId[],
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfig,
    colorBy: 'id' as const,
    childColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    enableLabels: true,
    label: 'id',
    labelsTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    labelsSkipRadius: 8,
    isInteractive: true,
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
}
