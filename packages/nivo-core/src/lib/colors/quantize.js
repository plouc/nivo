/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import last from 'lodash/last'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import { scaleQuantize } from 'd3-scale'
import {
    // Diverging
    schemeBrBG,
    schemePRGn,
    schemePiYG,
    schemePuOr,
    schemeRdBu,
    schemeRdGy,
    schemeRdYlBu,
    schemeRdYlGn,
    schemeSpectral,

    // Sequential (Single Hue)
    schemeBlues,
    schemeGreens,
    schemeGreys,
    schemeOranges,
    schemePurples,
    schemeReds,

    // Sequential (Multi-Hue)
    schemeBuGn,
    schemeBuPu,
    schemeGnBu,
    schemeOrRd,
    schemePuBuGn,
    schemePuBu,
    schemePuRd,
    schemeRdPu,
    schemeYlGnBu,
    schemeYlGn,
    schemeYlOrBr,
    schemeYlOrRd,
} from 'd3-scale-chromatic'

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
