import { BoxAnchor } from '@nivo/core'
import { SvgTextAnchor, SvgTextDominantBaseline } from './types'

const svgTextAnchorByBoxAnchor: Record<BoxAnchor, SvgTextAnchor> = {
    center: 'middle',
    'top-left': 'start',
    top: 'middle',
    'top-right': 'end',
    right: 'end',
    'bottom-right': 'end',
    bottom: 'middle',
    'bottom-left': 'start',
    left: 'start',
}

const svgTextDominantBaselineByBoxAnchor: Record<BoxAnchor, SvgTextDominantBaseline> = {
    center: 'middle',
    'top-left': 'text-before-edge',
    top: 'text-before-edge',
    'top-right': 'text-before-edge',
    right: 'middle',
    'bottom-right': 'text-after-edge',
    bottom: 'text-after-edge',
    'bottom-left': 'text-after-edge',
    left: 'middle',
}

export const getSvgTextAnchorFromBoxAnchor = (anchor: BoxAnchor) => svgTextAnchorByBoxAnchor[anchor]

export const getSvgTextDominantBaselineFromBoxAnchor = (anchor: BoxAnchor) =>
    svgTextDominantBaselineByBoxAnchor[anchor]
