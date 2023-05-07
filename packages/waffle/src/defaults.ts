import { CommonProps, Datum, WaffleHtmlLayer, WaffleSvgLayer } from './types'
import { WaffleCell } from './WaffleCell'
import { WaffleCellHtml } from './WaffleCellHtml'
import { WaffleTooltip } from './WaffleTooltip'

export const commonDefaultProps: Omit<
    CommonProps<Datum>,
    | 'valueFormat'
    | 'margin'
    | 'theme'
    | 'labelFormat'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'forwardLegendData'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> = {
    hiddenIds: [],

    fillDirection: 'top',
    padding: 0,

    colors: { scheme: 'nivo' },
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderRadius: 0,
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
    layers: ['cells', 'areas', 'legends'] as WaffleSvgLayer<Datum>[],
    cellComponent: WaffleCell,
    defs: [],
    fill: [],
    legends: [],
    motionStagger: 0,
}

export const htmlDefaultProps = {
    ...commonDefaultProps,
    layers: ['cells', 'areas'] as WaffleHtmlLayer<Datum>[],
    cellComponent: WaffleCellHtml,
    defs: [],
    fill: [],
    legends: [],
    motionStagger: 0,
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    legends: [],
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
