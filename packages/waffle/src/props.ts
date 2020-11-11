// @ts-ignore
import { noop } from '@nivo/core'
import { OrdinalColorScaleConfigScheme, InheritedColorConfigFromContext } from '@nivo/colors'
import { FillDirection } from './types'
import WaffleCell from './WaffleCell'
import WaffleCellHtml from './WaffleCellHtml'

const commonDefaultProps = {
    hiddenIds: [],

    fillDirection: 'bottom',
    padding: 1,

    colors: { scheme: 'nivo' },
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] },
    defs: [],
    fill: [],

    isInteractive: true,
    onClick: noop,
}

export const WaffleDefaultProps = {
    ...commonDefaultProps,
    cellComponent: WaffleCell,
    role: 'img',
    defs: [],
    fill: [],
    legends: [],
}

export const WaffleHtmlDefaultProps = {
    ...commonDefaultProps,
    cellComponent: WaffleCellHtml,
}

export const WaffleCanvasDefaultProps = {
    ...commonDefaultProps,
    legends: [],
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}

export const defaultProps = {
    fillDirection: 'bottom' as FillDirection,
    padding: 1,
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfigScheme,
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] } as InheritedColorConfigFromContext,
    defs: [],
    fill: [],
    isInteractive: true,
    legends: [],
    role: 'img',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
