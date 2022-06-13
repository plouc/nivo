/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/** This content moved from @nivo/core **/
/** To do - this should be replaced by content from @nivo/colors **/

import last from 'lodash/last'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import { scaleQuantize, scaleOrdinal, scaleSequential } from 'd3-scale'
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

// used for ordinal color scales
const colorSchemes = {
    nivo: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'],
    // categorical
    category10: schemeCategory10,
    accent: schemeAccent,
    dark2: schemeDark2,
    paired: schemePaired,
    pastel1: schemePastel1,
    pastel2: schemePastel2,
    set1: schemeSet1,
    set2: schemeSet2,
    set3: schemeSet3,
    // diverging
    brown_blueGreen: last(schemeBrBG),
    purpleRed_green: last(schemePRGn),
    pink_yellowGreen: last(schemePiYG),
    purple_orange: last(schemePuOr),
    red_blue: last(schemeRdBu),
    red_grey: last(schemeRdGy),
    red_yellow_blue: last(schemeRdYlBu),
    red_yellow_green: last(schemeRdYlGn),
    spectral: last(schemeSpectral),
    // sequential single hue
    blues: last(schemeBlues),
    greens: last(schemeGreens),
    greys: last(schemeGreys),
    oranges: last(schemeOranges),
    purples: last(schemePurples),
    reds: last(schemeReds),
    // sequential multi hue
    blue_green: last(schemeBuGn),
    blue_purple: last(schemeBuPu),
    green_blue: last(schemeGnBu),
    orange_red: last(schemeOrRd),
    purple_blue_green: last(schemePuBuGn),
    purple_blue: last(schemePuBu),
    purple_red: last(schemePuRd),
    red_purple: last(schemeRdPu),
    yellow_green_blue: last(schemeYlGnBu),
    yellow_green: last(schemeYlGn),
    yellow_orange_brown: last(schemeYlOrBr),
    yellow_orange_red: last(schemeYlOrRd),
}

export const colorSchemeIds = [
    'nivo',
    // categorical
    'category10',
    'accent',
    'dark2',
    'paired',
    'pastel1',
    'pastel2',
    'set1',
    'set2',
    'set3',
    // diverging
    'brown_blueGreen',
    'purpleRed_green',
    'pink_yellowGreen',
    'purple_orange',
    'red_blue',
    'red_grey',
    'red_yellow_blue',
    'red_yellow_green',
    'spectral',
    // sequential single hue
    'blues',
    'greens',
    'greys',
    'oranges',
    'purples',
    'reds',
    // sequential multi hue
    'blue_green',
    'blue_purple',
    'green_blue',
    'orange_red',
    'purple_blue_green',
    'purple_blue',
    'purple_red',
    'red_purple',
    'yellow_green_blue',
    'yellow_green',
    'yellow_orange_brown',
    'yellow_orange_red',
]

// used for sequential color scales
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

export const colorInterpolatorIds = [
    // diverging
    'brown_blueGreen',
    'purpleRed_green',
    'pink_yellowGreen',
    'purple_orange',
    'red_blue',
    'red_grey',
    'red_yellow_blue',
    'red_yellow_green',
    'spectral',
    // sequential single hue
    'blues',
    'greens',
    'greys',
    'oranges',
    'purples',
    'reds',
    // sequential multi hue
    'viridis',
    'inferno',
    'magma',
    'plasma',
    'warm',
    'cool',
    'cubehelixDefault',
    'blue_green',
    'blue_purple',
    'green_blue',
    'orange_red',
    'purple_blue_green',
    'purple_blue',
    'purple_red',
    'red_purple',
    'yellow_green_blue',
    'yellow_green',
    'yellow_orange_brown',
    'yellow_orange_red',
    // cyclical
    'rainbow',
    'sinebow',
]

export const nivoCategoricalColors = () =>
    scaleOrdinal(['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'])

export const getColorScale = (colors, dataScale) => {
    if (isString(colors)) {
        const scheme = colorSchemes[colors]
        if (scheme !== undefined) {
            const scale = scaleOrdinal(scheme)
            scale.type = 'ordinal'

            return scale
        }

        if (dataScale !== undefined && colors.indexOf('seq:') === 0) {
            const interpolator = colorInterpolators[colors.slice(4)]
            if (interpolator !== undefined) {
                const scale = scaleSequential(interpolator).domain(dataScale.domain())
                scale.type = 'sequential'

                return scale
            }
        }
    }

    if (isArray(colors)) {
        const scale = scaleOrdinal(colors)
        scale.type = 'ordinal'

        return scale
    }

    // just use provided value,
    // all elements will have identical color
    return () => colors
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/** This content moved from @nivo/core. **/

export const quantizeColorScales = {
    nivo: ['#d76445', '#f47560', '#e8c1a0', '#97e3d5', '#61cdbb', '#00b0a7'],

    // Diverging
    BrBG: last(schemeBrBG),
    PRGn: last(schemePRGn),
    PiYG: last(schemePiYG),
    PuOr: last(schemePuOr),
    RdBu: last(schemeRdBu),
    RdGy: last(schemeRdGy),
    RdYlBu: last(schemeRdYlBu),
    RdYlGn: last(schemeRdYlGn),
    spectral: last(schemeSpectral),

    // Sequential (Single Hue)
    blues: last(schemeBlues),
    greens: last(schemeGreens),
    greys: last(schemeGreys),
    oranges: last(schemeOranges),
    purples: last(schemePurples),
    reds: last(schemeReds),

    // Sequential (Multi-Hue)
    BuGn: last(schemeBuGn),
    BuPu: last(schemeBuPu),
    GnBu: last(schemeGnBu),
    OrRd: last(schemeOrRd),
    PuBuGn: last(schemePuBuGn),
    PuBu: last(schemePuBu),
    PuRd: last(schemePuRd),
    RdPu: last(schemeRdPu),
    YlGnBu: last(schemeYlGnBu),
    YlGn: last(schemeYlGn),
    YlOrBr: last(schemeYlOrBr),
    YlOrRd: last(schemeYlOrRd),
}

export const quantizeColorScalesKeys = Object.keys(quantizeColorScales)

export const guessQuantizeColorScale = colors => {
    // colors is already a valid scale
    if (isFunction(colors)) {
        if (!isFunction(colors.domain)) {
            throw new Error(
                `Provided colors should be a valid quantize scale providing a 'domain()' function`
            )
        }

        return colors
    }

    if (quantizeColorScales[colors]) {
        // use predefined d3 quantize color scale
        return scaleQuantize().range(quantizeColorScales[colors])
    }

    // user defined colors
    if (isArray(colors)) return scaleQuantize().range(colors)

    throw new Error(
        `Unable to guess quantize color scale from '${colors}',\nmust be a function or one of:\n'${quantizeColorScalesKeys.join(
            `', '`
        )}'`
    )
}
