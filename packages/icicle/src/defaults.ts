import { RectNodeSvg } from '@nivo/rects'
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
    gapX: 1,
    gapY: 1,
    layers: ['rects', 'labels'],
    colors: { scheme: 'nivo' },
    colorBy: 'id',
    inheritColorFromParent: true,
    childColor: { from: 'color' },
    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 0.6]] },
    enableLabels: false,
    label: 'id',
    labelBoxAnchor: 'center',
    labelAnchor: 'auto',
    labelBaseline: 'auto',
    labelSkipWidth: 32,
    labelSkipHeight: 0,
    labelPaddingX: 0,
    labelPaddingY: 0,
    labelRotation: 0,
    labelTextColor: { theme: 'labels.text.fill' },
    isInteractive: true,
    enableZooming: true,
    zoomMode: 'lateral',
    tooltip: IcicleTooltip,
    renderWrapper: true,
}

export const svgDefaultProps: Omit<
    IcicleSvgPropsWithDefaults<DefaultIcicleDatum>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    nodeComponent: RectNodeSvg,
    defs: [],
    fill: [],
    animate: true,
    motionConfig: 'default',
    rectsTransitionMode: 'flow-down',
    labelsTransitionMode: 'center',
    role: 'img',
}
