import {
    schemeCategory10,
    schemeAccent,
    schemeDark2,
    schemePaired,
    schemePastel1,
    schemePastel2,
    schemeSet1,
    schemeSet2,
    schemeSet3,
} from 'd3-scale-chromatic'

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

export type CategoricalColorSchemeId = keyof typeof categoricalColorSchemes

export const categoricalColorSchemeIds = Object.keys(
    categoricalColorSchemes
) as CategoricalColorSchemeId[]
