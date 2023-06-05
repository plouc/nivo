import React, { useMemo } from 'react'
import range from 'lodash/range'
import { startCase } from 'lodash'
// @ts-ignore
import { components } from 'react-select'
// @ts-ignore
import { quantizeColorScales } from '@bitbloom/nivo-core'
import {
    ColorSchemeId,
    ColorInterpolatorId,
    colorInterpolators,
    colorInterpolatorIds,
    isCategoricalColorScheme,
    isDivergingColorScheme,
    isSequentialColorScheme,
    colorSchemes,
    colorSchemeIds,
} from '@bitbloom/nivo-colors'
import { ColorsControlItem } from './ColorsControlItem'

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

export const getColorInterpolatorSwatches = (interpolator: ColorInterpolatorId) =>
    range(0, 1.1, 0.1).map(t => colorInterpolators[interpolator](t)) as string[]

export const getInterpolatorConfig = (interpolatorId: ColorInterpolatorId) => ({
    id: getColorSchemeLabel(interpolatorId),
    colors: getColorInterpolatorSwatches(interpolatorId),
})

export const ColorSchemeSelectValue = (props: any) => (
    <components.SingleValue {...props}>
        <ColorsControlItem id={props.data.label} colors={props.data.colors} />
    </components.SingleValue>
)

export const ColorSchemeSelectOption = (props: any) => (
    <components.Option {...props}>
        <ColorsControlItem id={props.data.label} colors={props.data.colors} />
    </components.Option>
)

export const useOrdinalColorSchemes = () =>
    useMemo(
        () =>
            colorSchemeIds.map(scheme => ({
                label: getColorSchemeLabel(scheme),
                value: scheme,
                colors: getColorSchemeSwatches(scheme),
            })),
        []
    )

export const useColorInterpolators = () =>
    useMemo(
        () =>
            colorInterpolatorIds.map(scheme => ({
                label: getColorSchemeLabel(scheme),
                value: scheme,
                colors: getColorInterpolatorSwatches(scheme),
            })),
        []
    )

const legacyThemesMapping: Partial<Record<ColorSchemeId, string>> = {
    brown_blueGreen: 'BrBG',
    blue_green: 'BuGn',
    blue_purple: 'BuPu',
    green_blue: 'GnBu',
    orange_red: 'OrRd',
    purpleRed_green: 'PRGn',
    pink_yellowGreen: 'PiYG',
    purple_blue: 'PuBu',
    purple_blue_green: 'PuBuGn',
    purple_orange: 'PuOr',
    purple_red: 'PuRd',
    red_blue: 'RdBu',
    red_grey: 'RdGy',
    red_purple: 'RdPu',
    red_yellow_blue: 'RdYlBu',
    red_yellow_green: 'RdYlGn',
    yellow_green: 'YlGn',
    yellow_green_blue: 'YlGnBu',
    yellow_orange_brown: 'YlOrBr',
    yellow_orange_red: 'YlOrRd',
    blues: 'blues',
    greens: 'greens',
    greys: 'greys',
    nivo: 'nivo',
    oranges: 'oranges',
    purples: 'purples',
    reds: 'reds',
    spectral: 'spectral',
}

export const useLegacyQuantizeColors = () => {
    const allSchemes = useOrdinalColorSchemes()

    return useMemo(() => {
        const filtered: {
            label: string
            value: string
            colors: string[]
        }[] = []

        allSchemes.forEach(scheme => {
            const legacyId = legacyThemesMapping[scheme.value]

            if (legacyId !== undefined) {
                filtered.push({
                    ...scheme,
                    value: legacyId,
                })
            }
        })

        return filtered
    }, [allSchemes])
}

export const useBulletColors = () => {
    const schemes = useOrdinalColorSchemes()

    const interpolators = useColorInterpolators()
    const mappedInterpolators = useMemo(
        () =>
            interpolators.map(interpolator => ({
                ...interpolator,
                value: `seq:${interpolator.value}`,
            })),
        [interpolators]
    )

    return useMemo(() => [...schemes, ...mappedInterpolators], [schemes, mappedInterpolators])
}
