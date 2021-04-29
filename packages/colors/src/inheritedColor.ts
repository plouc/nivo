import { useMemo } from 'react'
import { get, isPlainObject } from 'lodash'
import { rgb, RGBColor } from 'd3-color'
import { Theme } from '@nivo/core'

export type ColorModifierBrightness = ['brighter', number]

export type ColorModifierDarkness = ['darker', number]

export type ColorModifierOpacity = ['opacity', number]

export type ColorModifier = ColorModifierBrightness | ColorModifierDarkness | ColorModifierOpacity

export type ColorModifierFunction = (color: RGBColor) => RGBColor

export type InheritedColorConfigStaticColor = string

export type InheritedColorConfigCustomFunction<Datum> = (d: Datum) => string

export interface InheritedColorConfigFromTheme {
    theme: string
}

export interface InheritedColorConfigFromContext {
    from: string
    modifiers?: ColorModifier[]
}

export type InheritedColorConfig<Datum> =
    | InheritedColorConfigStaticColor
    | InheritedColorConfigCustomFunction<Datum>
    | InheritedColorConfigFromTheme
    | InheritedColorConfigFromContext

const isInheritedColorConfigFromTheme = <Datum>(
    config: InheritedColorConfig<Datum>
): config is InheritedColorConfigFromTheme => {
    return (config as InheritedColorConfigFromTheme).theme !== undefined
}

const isInheritedColorConfigFromContext = <Datum>(
    config: InheritedColorConfig<Datum>
): config is InheritedColorConfigFromContext => {
    return (config as InheritedColorConfigFromContext).from !== undefined
}

/**
 * Create a color generator for items which
 * might inherit from parent context,
 * for example labels, outlines…
 *
 * Support the following strategies:
 * - custom function
 * - color from theme
 * - color from parent, with optional color modifiers
 * - static color
 */
export const getInheritedColorGenerator = <Datum = any>(
    config: InheritedColorConfig<Datum>,
    theme?: Theme
) => {
    // user provided function
    if (typeof config === 'function') {
        return (datum: Datum) => config(datum)
    }

    if (isPlainObject(config)) {
        // use color from theme
        if (isInheritedColorConfigFromTheme(config)) {
            if (theme === undefined) {
                throw new Error(`Unable to use color from theme as no theme was provided`)
            }

            const themeColor = get(theme, config.theme)
            if (themeColor === undefined) {
                throw new Error(`Color from theme is undefined at path: '${config.theme}'`)
            }

            return () => themeColor
        }

        // use color from parent with optional color modifiers
        if (isInheritedColorConfigFromContext(config)) {
            const getColor = (d: Datum) => get(d, config.from)

            if (Array.isArray(config.modifiers)) {
                const modifiers: ColorModifierFunction[] = []
                for (const modifier of config.modifiers) {
                    const [modifierType, amount] = modifier
                    if (modifierType === 'brighter') {
                        modifiers.push(color => color.brighter(amount))
                    } else if (modifierType === 'darker') {
                        modifiers.push(color => color.darker(amount))
                    } else if (modifierType === 'opacity') {
                        modifiers.push(color => {
                            color.opacity = amount

                            return color
                        })
                    } else {
                        throw new Error(
                            `Invalid color modifier: '${modifierType}', must be one of: 'brighter', 'darker', 'opacity'`
                        )
                    }
                }

                if (modifiers.length === 0) return getColor

                return (datum: Datum) =>
                    modifiers
                        .reduce((color, modify) => modify(color), rgb(getColor(datum)))
                        .toString()
            }

            // no modifier
            return getColor
        }

        throw new Error(
            `Invalid color spec, you should either specify 'theme' or 'from' when using a config object`
        )
    }

    // use provided color statically
    return () => config as string
}

export const useInheritedColor = <Datum = any>(
    config: InheritedColorConfig<Datum>,
    theme?: Theme
) => useMemo(() => getInheritedColorGenerator<Datum>(config, theme), [config, theme])
