import { BoxAnchor } from '@nivo/core'
import { getTextAlignFromBoxAnchor, getTextBaselineFromBoxAnchor } from '@nivo/text'
import { Rect } from '../types'
import { RectLabelsProps } from './types'

export type AnchorGetter = (rect: Rect) => { x: number; y: number }
export interface AnchorGetterOptions {
    isOutside: boolean
    paddingX: number
    paddingY: number
    offsetX: number
    offsetY: number
}
type AnchorGetterFactory = (options: AnchorGetterOptions) => AnchorGetter

export const anchorCenterFactory: AnchorGetterFactory = () => (rect: Rect) => ({
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
})
export const anchorTopLeftFactory: AnchorGetterFactory =
    ({ isOutside, paddingX, paddingY, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + (isOutside ? -paddingX : paddingX) + offsetX,
        y: rect.y + (isOutside ? -paddingY : paddingY) + offsetY,
    })
export const anchorTopFactory: AnchorGetterFactory =
    ({ isOutside, paddingY, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + rect.width / 2 + offsetX,
        y: rect.y + (isOutside ? -paddingY : paddingY) + offsetY,
    })
export const anchorTopRightFactory: AnchorGetterFactory =
    ({ isOutside, paddingX, paddingY, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + rect.width + (isOutside ? paddingX : -paddingX) + offsetX,
        y: rect.y + (isOutside ? -paddingY : paddingY) + offsetY,
    })
export const anchorRightFactory: AnchorGetterFactory =
    ({ isOutside, paddingX, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + rect.width + (isOutside ? paddingX : -paddingX) + offsetX,
        y: rect.y + rect.height / 2 + offsetY,
    })
export const anchorBottomRightFactory: AnchorGetterFactory =
    ({ isOutside, paddingX, paddingY, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + rect.width + (isOutside ? paddingX : -paddingX) + offsetX,
        y: rect.y + rect.height + (isOutside ? paddingY : -paddingY) + offsetY,
    })
export const anchorBottomFactory: AnchorGetterFactory =
    ({ isOutside, paddingY, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + rect.width / 2 + offsetX,
        y: rect.y + rect.height + (isOutside ? paddingY : -paddingY) + offsetY,
    })
export const anchorBottomLeftFactory: AnchorGetterFactory =
    ({ isOutside, paddingX, paddingY, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + (isOutside ? -paddingX : paddingX) + offsetX,
        y: rect.y + rect.height + (isOutside ? paddingY : -paddingY) + offsetY,
    })
export const anchorLeftFactory: AnchorGetterFactory =
    ({ isOutside, paddingX, offsetX, offsetY }) =>
    (rect: Rect) => ({
        x: rect.x + (isOutside ? -paddingX : paddingX) + offsetX,
        y: rect.y + rect.height / 2 + offsetY,
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

export const anchorGetter = (anchor: BoxAnchor, options: AnchorGetterOptions) =>
    anchorFactoriesMap[anchor](options)

export const getTextLayout = (
    boxAnchor: BoxAnchor,
    isOutside: boolean,
    align: RectLabelsProps<any>['labelAlign'],
    baseline: RectLabelsProps<any>['labelBaseline']
) => ({
    align: align === 'auto' ? getTextAlignFromBoxAnchor(boxAnchor, isOutside) : align,
    baseline: baseline === 'auto' ? getTextBaselineFromBoxAnchor(boxAnchor, isOutside) : baseline,
})
