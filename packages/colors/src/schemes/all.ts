import {
    categoricalColorSchemes,
    categoricalColorSchemeIds,
    CategoricalColorSchemeId,
} from './categorical'
import { divergingColorSchemes, divergingColorSchemeIds, DivergingColorSchemeId } from './diverging'
import {
    sequentialColorSchemes,
    sequentialColorSchemeIds,
    SequentialColorSchemeId,
} from './sequential'

export const colorSchemes = {
    ...categoricalColorSchemes,
    ...divergingColorSchemes,
    ...sequentialColorSchemes,
}

export type ColorSchemeId =
    | CategoricalColorSchemeId
    | DivergingColorSchemeId
    | SequentialColorSchemeId

export const colorSchemeIds = Object.keys(colorSchemes) as ColorSchemeId[]

export const isCategoricalColorScheme = (
    scheme: ColorSchemeId
): scheme is CategoricalColorSchemeId =>
    categoricalColorSchemeIds.includes(scheme as CategoricalColorSchemeId)

export const isDivergingColorScheme = (scheme: ColorSchemeId): scheme is DivergingColorSchemeId =>
    divergingColorSchemeIds.includes(scheme as DivergingColorSchemeId)

export const isSequentialColorScheme = (scheme: ColorSchemeId): scheme is SequentialColorSchemeId =>
    sequentialColorSchemeIds.includes(scheme as SequentialColorSchemeId)
