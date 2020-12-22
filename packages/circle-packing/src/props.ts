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
    isInteractive: true,
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
}
