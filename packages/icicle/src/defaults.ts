import { RectNodeSvg, RectNodeHtml, RectLabelSvg, RectLabelHtml } from '@nivo/rects'
import {
    IcicleCommonProps,
    IcicleSvgPropsWithDefaults,
    IcicleHtmlPropsWithDefaults,
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
    sort: 'input',
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
    labelAlign: 'auto',
    labelBaseline: 'auto',
    labelSkipWidth: 0,
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
    context: {},
}

export const svgDefaultProps: Omit<
    IcicleSvgPropsWithDefaults<DefaultIcicleDatum>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    nodeComponent: RectNodeSvg,
    labelComponent: RectLabelSvg,
    defs: [],
    fill: [],
    animate: true,
    motionConfig: 'default',
    animateOnMount: false,
    rectsTransitionMode: 'flow-down',
    labelsTransitionMode: 'center',
    role: 'tree',
    nodeRole: 'treeitem',
    isFocusable: false,
}

export const htmlDefaultProps: Omit<
    IcicleHtmlPropsWithDefaults<DefaultIcicleDatum>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    nodeComponent: RectNodeHtml,
    labelComponent: RectLabelHtml,
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    animateOnMount: svgDefaultProps.animateOnMount,
    rectsTransitionMode: svgDefaultProps.rectsTransitionMode,
    labelsTransitionMode: svgDefaultProps.labelsTransitionMode,
    role: svgDefaultProps.role,
    nodeRole: svgDefaultProps.nodeRole,
    isFocusable: svgDefaultProps.isFocusable,
}
