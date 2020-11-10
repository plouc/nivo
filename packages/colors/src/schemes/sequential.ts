import {
    // single hue
    schemeBlues,
    interpolateBlues,
    schemeGreens,
    interpolateGreens,
    schemeGreys,
    interpolateGreys,
    schemeOranges,
    interpolateOranges,
    schemePurples,
    interpolatePurples,
    schemeReds,
    interpolateReds,
    // multi hue
    schemeBuGn,
    interpolateBuGn,
    schemeBuPu,
    interpolateBuPu,
    schemeGnBu,
    interpolateGnBu,
    schemeOrRd,
    interpolateOrRd,
    schemePuBuGn,
    interpolatePuBuGn,
    schemePuBu,
    interpolatePuBu,
    schemePuRd,
    interpolatePuRd,
    schemeRdPu,
    interpolateRdPu,
    schemeYlGnBu,
    interpolateYlGnBu,
    schemeYlGn,
    interpolateYlGn,
    schemeYlOrBr,
    interpolateYlOrBr,
    schemeYlOrRd,
    interpolateYlOrRd,
    interpolateTurbo,
    interpolateViridis,
    interpolateInferno,
    interpolateMagma,
    interpolatePlasma,
    interpolateCividis,
    interpolateWarm,
    interpolateCool,
    interpolateCubehelixDefault,
} from 'd3-scale-chromatic'

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

export type SequentialColorSchemeId = keyof typeof sequentialColorSchemes

export const sequentialColorSchemeIds = Object.keys(
    sequentialColorSchemes
) as SequentialColorSchemeId[]

export const sequentialColorInterpolators = {
    // single hue
    blues: interpolateBlues,
    greens: interpolateGreens,
    greys: interpolateGreys,
    oranges: interpolateOranges,
    purples: interpolatePurples,
    reds: interpolateReds,
    // multi hue
    turbo: interpolateTurbo,
    viridis: interpolateViridis,
    inferno: interpolateInferno,
    magma: interpolateMagma,
    plasma: interpolatePlasma,
    cividis: interpolateCividis,
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
}

export type SequentialColorInterpolatorId = keyof typeof sequentialColorInterpolators
