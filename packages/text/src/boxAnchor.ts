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

const textAlignOppositeMap: Record<TextAlign, TextAlign> = {
    start: 'end',
    center: 'center',
    end: 'start',
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

const textBaselineOppositeMap: Record<TextBaseline, TextBaseline> = {
    top: 'bottom',
    center: 'center',
    bottom: 'top',
}

export const getTextAlignFromBoxAnchor = (anchor: BoxAnchor, isOutside = false) => {
    const align = textAlignByBoxAnchor[anchor]
    if (!isOutside) return align
    return textAlignOppositeMap[align]
}

export const getTextBaselineFromBoxAnchor = (anchor: BoxAnchor, isOutside = false) => {
    const baseline = textBaselineByBoxAnchor[anchor]
    if (!isOutside) return baseline
    return textBaselineOppositeMap[baseline]
}
