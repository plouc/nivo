import { OrdinalColorScaleConfig } from '@nivo/colors'
import { IciclesTooltip } from './IciclesTooltip'
import { IciclesDirection, IciclesLayerId } from './types'

export const defaultProps = {
    id: 'id',
    value: 'value',
    layers: ['rect', 'rectLabels'] as IciclesLayerId[],
    colors: { scheme: 'nivo' } as unknown as OrdinalColorScaleConfig,
    colorBy: 'id' as const,
    inheritColorFromParent: true,
    childColor: { from: 'color' },
    borderWidth: 1,
    borderColor: 'white',
    enableRectLabels: false,
    rectLabel: 'formattedValue',
    rectLabelsTextColor: { theme: 'labels.text.fill' },
    animate: true,
    motionConfig: 'gentle',
    isInteractive: true,
    defs: [],
    fill: [],
    tooltip: IciclesTooltip,
    role: 'img',
    direction: 'bottom' as IciclesDirection,
}
