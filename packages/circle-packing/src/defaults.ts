import {
    CirclePackingCommonProps,
    CirclePackingLayerId,
    CirclePackingSvgPropsWithDefaults,
    CirclePackingHtmlPropsWithDefaults,
    CirclePackingCanvasPropsWithDefaults,
} from './types'
import { CirclePackingTooltip } from './CirclePackingTooltip'
import { CircleSvg } from './CircleSvg'
import { LabelSvg } from './LabelSvg'
import { CircleHtml } from './CircleHtml'
import { LabelHtml } from './LabelHtml'

export const commonDefaultProps: Omit<
    CirclePackingCommonProps<any>,
    'layers' | 'margin' | 'theme' | 'circleComponent' | 'labelComponent'
> & {
    layers: CirclePackingLayerId[]
} = {
    id: 'id',
    value: 'value',
    padding: 0,
    leavesOnly: false,
    layers: ['circles', 'labels'],
    colors: { scheme: 'nivo' },
    colorBy: 'depth' as const,
    inheritColorFromParent: false,
    childColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    enableLabels: false,
    label: 'id',
    labelTextColor: {
        theme: 'labels.text.fill',
    },
    labelsSkipRadius: 8,
    isInteractive: true,
    tooltip: CirclePackingTooltip,
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
    renderWrapper: true,
}

export const svgDefaultProps: Omit<
    CirclePackingSvgPropsWithDefaults<any>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    circleComponent: CircleSvg,
    labelComponent: LabelSvg,
    defs: [],
    fill: [],
}

export const htmlDefaultProps: Omit<
    CirclePackingHtmlPropsWithDefaults<any>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    circleComponent: CircleHtml,
    labelComponent: LabelHtml,
}

export const canvasDefaultProps: Omit<
    CirclePackingCanvasPropsWithDefaults<any>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? (window.devicePixelRatio ?? 1) : 1,
}
