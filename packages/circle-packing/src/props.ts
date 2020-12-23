import { OrdinalColorScaleConfig } from '@nivo/colors'
import { CirclePackingLayerId } from './types'
import { CirclePackingTooltip } from './CirclePackingTooltip'

export const defaultProps = {
    id: 'id',
    value: 'value',
    padding: 0,
    leavesOnly: false,
    layers: ['circles', 'labels'] as CirclePackingLayerId[],
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfig,
    colorBy: 'depth' as const,
    childColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    enableLabels: true,
    label: 'id',
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    labelsSkipRadius: 8,
    isInteractive: true,
    tooltip: CirclePackingTooltip,
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
