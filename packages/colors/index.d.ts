import * as React from 'react'

declare module '@nivo/colors' {
    export type CategoricalColorSchemeId =
        | 'nivo'
        | 'category10'
        | 'accent'
        | 'dark2'
        | 'paired'
        | 'pastel1'
        | 'pastel2'
        | 'set1'
        | 'set2'
        | 'set3'

    export type DivergingColorSchemeId =
        | 'brown_blueGreen'
        | 'purpleRed_green'
        | 'pink_yellowGreen'
        | 'purple_orange'
        | 'red_blue'
        | 'red_grey'
        | 'red_yellow_blue'
        | 'red_yellow_green'
        | 'spectral'

    export type SequentialColorSchemeId =
        // single hue
        | 'blues'
        | 'greens'
        | 'greys'
        | 'oranges'
        | 'purples'
        | 'reds'
        // multi hue
        | 'blue_green'
        | 'blue_purple'
        | 'green_blue'
        | 'orange_red'
        | 'purple_blue_green'
        | 'purple_blue'
        | 'purple_red'
        | 'red_purple'
        | 'yellow_green_blue'
        | 'yellow_green'
        | 'yellow_orange_brown'
        | 'yellow_orange_red'

    export type DatumIdentityFunction<D = any> = (datum: D) => string | number
    export type DatumIdentity<D = any> = string | DatumIdentityFunction<D>

    export type ColorSchemeId =
        | CategoricalColorSchemeId
        | DivergingColorSchemeId
        | SequentialColorSchemeId

    export interface DatumColorInstruction {
        datum: string
    }
    export interface SchemeColorInstruction {
        scheme: ColorSchemeId
        // size is useful for diverging & sequential colors,
        // as they are array of array, whereas categorical colors
        // are simple arrays, if the size isn't specified,
        // the bigger array will be selected, this means the 11th
        // for diverging colors and 9th for sequential ones.
        size?: number
    }
    export type CustomColorFunction<D = any> = (datum: D) => string

    export type OrdinalColorsInstruction<D = any> =
        | DatumColorInstruction
        | SchemeColorInstruction
        | CustomColorFunction<D>
        | string[]
        | string

    export type OrdinalColorScale<D = any> = (datum: D) => string

    export type ColorIdentityFunction<D = any> = (datum: D) => string | number

    export function getOrdinalColorScale<D = any>(
        instruction: OrdinalColorsInstruction,
        identity: string | ColorIdentityFunction<D>
    ): OrdinalColorScale<D>

    export type ColorModifierType = 'brighter' | 'darker' | 'opacity'
    export type ColorModifier = [ColorModifierType, number]
    export type InheritedColorFunction<D = any> = (datum: D) => string
    export type InheritedColorProp<D = any> =
        | string
        | { theme: string }
        | { from: string; modifiers?: ColorModifier[] }
        | InheritedColorFunction<D>
}
