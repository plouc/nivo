import { CommonProps, DefaultRawDatum } from './types'
import { WaffleCell } from './WaffleCell'
import { WaffleCellHtml } from './WaffleCellHtml'
import { WaffleCellTooltip } from './WaffleCellTooltip'

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
    tooltip: WaffleCellTooltip,

    role: 'img',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    layers: ['cells' as const, 'legends' as const],
    cellComponent: WaffleCell,
    defs: [],
    fill: [],
    legends: [],
    animate: true,
    motionConfig: 'gentle',
}

export const htmlDefaultProps = {
    ...commonDefaultProps,
    layers: ['cells' as const],
    cellComponent: WaffleCellHtml,
    defs: [],
    fill: [],
    legends: [],
    animate: true,
    motionConfig: 'gentle',
}

// pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
