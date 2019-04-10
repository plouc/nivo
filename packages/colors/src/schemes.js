/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {
    // categorical
    schemeCategory10,
    schemeAccent,
    schemeDark2,
    schemePaired,
    schemePastel1,
    schemePastel2,
    schemeSet1,
    schemeSet2,
    schemeSet3,
    // diverging
    interpolateBrBG,
    schemeBrBG,
    interpolatePRGn,
    schemePRGn,
    interpolatePiYG,
    schemePiYG,
    interpolatePuOr,
    schemePuOr,
    interpolateRdBu,
    schemeRdBu,
    interpolateRdGy,
    schemeRdGy,
    interpolateRdYlBu,
    schemeRdYlBu,
    interpolateRdYlGn,
    schemeRdYlGn,
    interpolateSpectral,
    schemeSpectral,
    // sequential single hue
    interpolateBlues,
    schemeBlues,
    interpolateGreens,
    schemeGreens,
    interpolateGreys,
    schemeGreys,
    interpolateOranges,
    schemeOranges,
    interpolatePurples,
    schemePurples,
    interpolateReds,
    schemeReds,
    // sequential multi hue
    interpolateViridis,
    interpolateInferno,
    interpolateMagma,
    interpolatePlasma,
    interpolateWarm,
    interpolateCool,
    interpolateCubehelixDefault,
    interpolateBuGn,
    schemeBuGn,
    interpolateBuPu,
    schemeBuPu,
    interpolateGnBu,
    schemeGnBu,
    interpolateOrRd,
    schemeOrRd,
    interpolatePuBuGn,
    schemePuBuGn,
    interpolatePuBu,
    schemePuBu,
    interpolatePuRd,
    schemePuRd,
    interpolateRdPu,
    schemeRdPu,
    interpolateYlGnBu,
    schemeYlGnBu,
    interpolateYlGn,
    schemeYlGn,
    interpolateYlOrBr,
    schemeYlOrBr,
    interpolateYlOrRd,
    schemeYlOrRd,
    // cyclical
    interpolateRainbow,
    interpolateSinebow,
} from 'd3-scale-chromatic'

// Categorical color schemes
export const categoricalColorSchemes = {
    nivo: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'],
    category10: schemeCategory10,
    accent: schemeAccent,
    dark2: schemeDark2,
    paired: schemePaired,
    pastel1: schemePastel1,
    pastel2: schemePastel2,
    set1: schemeSet1,
    set2: schemeSet2,
    set3: schemeSet3,
}
export const categoricalColorSchemeIds = Object.keys(categoricalColorSchemes)
export const isCategoricalColorScheme = scheme => categoricalColorSchemeIds.includes(scheme)

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
export const divergingColorSchemeIds = Object.keys(divergingColorSchemes)
export const isDivergingColorScheme = scheme => divergingColorSchemeIds.includes(scheme)

// Sequential, single-hue color schemes support a size k ranging from 3 to 9
// Sequential, multi-hue color schemes support a size k ranging from 3 to 9
export const sequentialColorSchemes = {
    // single hue
    blues: schemeBlues,
    greens: schemeGreens,
    greys: schemeGreys,
    oranges: schemeOranges,
    purples: schemePurples,
    reds: schemeReds,
    // multi hue
    blue_green: schemeBuGn,
    blue_purple: schemeBuPu,
    green_blue: schemeGnBu,
    orange_red: schemeOrRd,
    purple_blue_green: schemePuBuGn,
    purple_blue: schemePuBu,
    purple_red: schemePuRd,
    red_purple: schemeRdPu,
    yellow_green_blue: schemeYlGnBu,
    yellow_green: schemeYlGn,
    yellow_orange_brown: schemeYlOrBr,
    yellow_orange_red: schemeYlOrRd,
}
export const sequentialColorSchemeIds = Object.keys(sequentialColorSchemes)
export const isSequentialColorScheme = scheme => sequentialColorSchemeIds.includes(scheme)

export const colorSchemes = {
    ...categoricalColorSchemes,
    ...divergingColorSchemes,
    ...sequentialColorSchemes,
}
export const colorSchemeIds = Object.keys(colorSchemes)

export const colorInterpolators = {
    // diverging
    brown_blueGreen: interpolateBrBG,
    purpleRed_green: interpolatePRGn,
    pink_yellowGreen: interpolatePiYG,
    purple_orange: interpolatePuOr,
    red_blue: interpolateRdBu,
    red_grey: interpolateRdGy,
    red_yellow_blue: interpolateRdYlBu,
    red_yellow_green: interpolateRdYlGn,
    spectral: interpolateSpectral,
    // sequential single hue
    blues: interpolateBlues,
    greens: interpolateGreens,
    greys: interpolateGreys,
    oranges: interpolateOranges,
    purples: interpolatePurples,
    reds: interpolateReds,
    // sequential multi hue
    viridis: interpolateViridis,
    inferno: interpolateInferno,
    magma: interpolateMagma,
    plasma: interpolatePlasma,
    warm: interpolateWarm,
    cool: interpolateCool,
    cubehelixDefault: interpolateCubehelixDefault,
    blue_green: interpolateBuGn,
    blue_purple: interpolateBuPu,
    green_blue: interpolateGnBu,
    orange_red: interpolateOrRd,
    purple_blue_green: interpolatePuBuGn,
    purple_blue: interpolatePuBu,
    purple_red: interpolatePuRd,
    red_purple: interpolateRdPu,
    yellow_green_blue: interpolateYlGnBu,
    yellow_green: interpolateYlGn,
    yellow_orange_brown: interpolateYlOrBr,
    yellow_orange_red: interpolateYlOrRd,
    // cyclical
    rainbow: interpolateRainbow,
    sinebow: interpolateSinebow,
}

export const colorInterpolatorIds = Object.keys(colorInterpolators)
