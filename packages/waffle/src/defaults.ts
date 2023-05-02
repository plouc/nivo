import { CommonProps, DefaultRawDatum, HtmlLayer, SvgLayer } from './types'
import { WaffleCell } from './WaffleCell'
import { WaffleCellHtml } from './WaffleCellHtml'
import { WaffleTooltip } from './WaffleTooltip'

export const commonDefaultProps: Omit<
    CommonProps<DefaultRawDatum>,
    | 'valueFormat'
    | 'margin'
    | 'theme'
    | 'labelFormat'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> = {
    fillDirection: 'bottom',
    padding: 1,

    colors: { scheme: 'nivo' },
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] },

    isInteractive: true,
    tooltip: WaffleTooltip,

    role: 'img',

    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    layers: ['cells', 'areas', 'legends'] as SvgLayer<DefaultRawDatum>[],
    cellComponent: WaffleCell,
    defs: [],
    fill: [],
    legends: [],
}

export const htmlDefaultProps = {
    ...commonDefaultProps,
    layers: ['cells', 'areas'] as HtmlLayer<DefaultRawDatum>[],
    cellComponent: WaffleCellHtml,
    defs: [],
    fill: [],
    legends: [],
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
