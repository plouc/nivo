import { useMemo } from 'react'
import { startCase } from 'lodash'
import {
    ColorSchemeId,
    ColorInterpolatorId,
    // colorInterpolators,
    // colorInterpolatorIds,
    isCategoricalColorScheme,
    isDivergingColorScheme,
    isSequentialColorScheme,
    // colorSchemes,
    colorSchemeIds,
    colorSchemes,
} from '@nivo/colors'

export const getColorSchemeType = (scheme: ColorSchemeId | ColorInterpolatorId) => {
    let type = ''
    if (isCategoricalColorScheme(scheme as ColorSchemeId)) {
        type = 'Categorical'
    } else if (isDivergingColorScheme(scheme as ColorSchemeId)) {
        type = 'Diverging'
    } else if (isSequentialColorScheme(scheme as ColorSchemeId)) {
        type = 'Sequential'
    }

    return type
}

export const humanizeColorSchemeId = (schemeId: ColorSchemeId | ColorInterpolatorId) => {
    const parts = schemeId.split('_').map(startCase)

    return parts.join(' → ')
}

export const getColorSchemeLabel = (scheme: ColorSchemeId | ColorInterpolatorId) => {
    const type = getColorSchemeType(scheme)

    return `${type ? `${type}: ` : ''}${humanizeColorSchemeId(scheme)}`
}

export const getColorSchemeSwatches = (scheme: ColorSchemeId | ColorInterpolatorId) => {
    let colors: string[] = []
    if (isCategoricalColorScheme(scheme as ColorSchemeId)) {
        colors = colorSchemes[scheme as ColorSchemeId] as string[]
    } else if (isDivergingColorScheme(scheme as ColorSchemeId)) {
        colors = colorSchemes[scheme as ColorSchemeId][11] as string[]
    } else if (isSequentialColorScheme(scheme as ColorSchemeId)) {
        colors = colorSchemes[scheme as ColorSchemeId][9] as string[]
    }

    return colors
}

export type ColorSchemeOption = {
    label: string
    value: ColorSchemeId
    colors: string[]
}

export const useOrdinalColorSchemes = (): ColorSchemeOption[] =>
    useMemo(
        () =>
            colorSchemeIds.map(scheme => ({
                label: getColorSchemeLabel(scheme),
                value: scheme,
                colors: getColorSchemeSwatches(scheme),
            })),
        []
    )
