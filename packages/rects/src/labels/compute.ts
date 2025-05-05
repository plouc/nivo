import { BoxAnchor } from '@nivo/core'
import {
    SvgTextLayout,
    getSvgTextAnchorFromBoxAnchor,
    getSvgTextDominantBaselineFromBoxAnchor,
} from '@nivo/text'
import { Rect } from '../types'
import { RectLabelsProps } from './types'

export type AnchorGetter = (rect: Rect) => { x: number; y: number }
type AnchorGetterFactory = (paddingX?: number, paddingY?: number) => AnchorGetter

export const anchorCenterFactory: AnchorGetterFactory = () => (rect: Rect) => ({
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
})
export const anchorTopLeftFactory: AnchorGetterFactory =
    (paddingX = 0, paddingY = 0) =>
    (rect: Rect) => ({
        x: rect.x + paddingX,
        y: rect.y + paddingY,
    })
export const anchorTopFactory: AnchorGetterFactory =
    (_paddingX = 0, paddingY = 0) =>
    (rect: Rect) => ({
        x: rect.x + rect.width / 2,
        y: rect.y + paddingY,
    })
export const anchorTopRightFactory: AnchorGetterFactory =
    (paddingX = 0, paddingY = 0) =>
    (rect: Rect) => ({
        x: rect.x + rect.width - paddingX,
        y: rect.y + paddingY,
    })
export const anchorRightFactory: AnchorGetterFactory =
    (paddingX = 0) =>
    (rect: Rect) => ({
        x: rect.x + rect.width - paddingX,
        y: rect.y + rect.height / 2,
    })
export const anchorBottomRightFactory: AnchorGetterFactory =
    (paddingX = 0, paddingY = 0) =>
    (rect: Rect) => ({
        x: rect.x + rect.width - paddingX,
        y: rect.y + rect.height - paddingY,
    })
export const anchorBottomFactory: AnchorGetterFactory =
    (_paddingX = 0, paddingY = 0) =>
    (rect: Rect) => ({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height - paddingY,
    })
export const anchorBottomLeftFactory: AnchorGetterFactory =
    (paddingX = 0, paddingY = 0) =>
    (rect: Rect) => ({
        x: rect.x + paddingX,
        y: rect.y + rect.height - paddingY,
    })
export const anchorLeftFactory: AnchorGetterFactory =
    (paddingX = 0) =>
    (rect: Rect) => ({
        x: rect.x + paddingX,
        y: rect.y + rect.height / 2,
    })

const anchorFactoriesMap: Record<BoxAnchor, AnchorGetterFactory> = {
    center: anchorCenterFactory,
    'top-left': anchorTopLeftFactory,
    top: anchorTopFactory,
    'top-right': anchorTopRightFactory,
    right: anchorRightFactory,
    'bottom-right': anchorBottomRightFactory,
    bottom: anchorBottomFactory,
    'bottom-left': anchorBottomLeftFactory,
    left: anchorLeftFactory,
}

export const anchorGetter = (anchor: BoxAnchor, paddingX = 0, paddingY = 0) =>
    anchorFactoriesMap[anchor](paddingX, paddingY)

export const getSvgTextLayout = (
    boxAnchor: BoxAnchor,
    anchor: RectLabelsProps<any>['labelAnchor'],
    baseline: RectLabelsProps<any>['labelBaseline']
): SvgTextLayout => ({
    textAnchor: anchor === 'auto' ? getSvgTextAnchorFromBoxAnchor(boxAnchor) : anchor,
    dominantBaseline:
        baseline === 'auto' ? getSvgTextDominantBaselineFromBoxAnchor(boxAnchor) : baseline,
})
