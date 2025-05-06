import { BoxAnchor } from '@nivo/core'
import { TextAlign, TextBaseline } from '@nivo/theming'

const textAlignByBoxAnchor: Record<BoxAnchor, TextAlign> = {
    center: 'center',
    'top-left': 'start',
    top: 'center',
    'top-right': 'end',
    right: 'end',
    'bottom-right': 'end',
    bottom: 'center',
    'bottom-left': 'start',
    left: 'start',
}

const textBaselineByBoxAnchor: Record<BoxAnchor, TextBaseline> = {
    center: 'center',
    'top-left': 'top',
    top: 'top',
    'top-right': 'top',
    right: 'center',
    'bottom-right': 'bottom',
    bottom: 'bottom',
    'bottom-left': 'bottom',
    left: 'center',
}

export const getTextAlignFromBoxAnchor = (anchor: BoxAnchor) => textAlignByBoxAnchor[anchor]

export const getTextBaselineFromBoxAnchor = (anchor: BoxAnchor) => textBaselineByBoxAnchor[anchor]
