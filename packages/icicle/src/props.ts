import { IciclesTooltip } from './IciclesTooltip'
import { IciclesSvgProps } from './types'

const _defaultProps: Partial<IciclesSvgProps<unknown>> = {
    id: 'id',
    value: 'value',
    layers: ['rects', 'rectLabels'],
    colors: { scheme: 'nivo' },
    colorBy: 'id',
    inheritColorFromParent: true,
    childColor: { from: 'color' },
    borderWidth: 1,
    borderColor: { from: 'color', modifiers: [['darker', 0.6]] },
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
    direction: 'bottom',
    rectLabelsSkipLength: 0,
    rectLabelsSkipPercentage: 0,
    rectLabelsOffset: 1,
}

export const defaultProps = _defaultProps as IciclesSvgProps<unknown>
