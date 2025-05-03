import {
    IcicleCommonProps,
    IcicleSvgPropsWithDefaults,
    IcicleLayerId,
    DefaultIcicleDatum,
} from './types'
import { IcicleTooltip } from './IcicleTooltip'

export const commonDefaultProps: Omit<
    IcicleCommonProps<DefaultIcicleDatum>,
    'data' | 'valueFormat' | 'layers' | 'width' | 'height' | 'margin' | 'theme'
> & {
    layers: IcicleLayerId[]
} = {
    identity: 'id',
    value: 'value',
    orientation: 'bottom',
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
    isInteractive: true,
    tooltip: IcicleTooltip,
    rectLabelsSkipWidth: 0,
    rectLabelsSkipHeight: 0,
    rectLabelsOffsetX: 0,
    rectLabelsOffsetY: 0,
    renderWrapper: true,
}

export const svgDefaultProps: Omit<
    IcicleSvgPropsWithDefaults<DefaultIcicleDatum>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    defs: [],
    fill: [],
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
}
