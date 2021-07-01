import {
    schemeBrBG,
    interpolateBrBG,
    schemePRGn,
    interpolatePRGn,
    schemePiYG,
    interpolatePiYG,
    schemePuOr,
    interpolatePuOr,
    schemeRdBu,
    interpolateRdBu,
    schemeRdGy,
    interpolateRdGy,
    schemeRdYlBu,
    interpolateRdYlBu,
    schemeRdYlGn,
    interpolateRdYlGn,
    schemeSpectral,
    interpolateSpectral,
} from 'd3-scale-chromatic'

// Diverging color schemes support a size k ranging from 3 to 11
export const divergingColorSchemes = {
    brown_blueGreen: schemeBrBG,
    purpleRed_green: schemePRGn,
    pink_yellowGreen: schemePiYG,
    purple_orange: schemePuOr,
    red_blue: schemeRdBu,
    red_grey: schemeRdGy,
    red_yellow_blue: schemeRdYlBu,
    red_yellow_green: schemeRdYlGn,
    spectral: schemeSpectral,
}

export type DivergingColorSchemeId = keyof typeof divergingColorSchemes

export const divergingColorSchemeIds = Object.keys(
    divergingColorSchemes
) as DivergingColorSchemeId[]

export const divergingColorInterpolators = {
    brown_blueGreen: interpolateBrBG,
    purpleRed_green: interpolatePRGn,
    pink_yellowGreen: interpolatePiYG,
    purple_orange: interpolatePuOr,
    red_blue: interpolateRdBu,
    red_grey: interpolateRdGy,
    red_yellow_blue: interpolateRdYlBu,
    red_yellow_green: interpolateRdYlGn,
    spectral: interpolateSpectral,
}

export type DivergingColorInterpolatorId = keyof typeof divergingColorInterpolators
