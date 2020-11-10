import { useMemo } from 'react'
import { get, isPlainObject } from 'lodash'
import { rgb, RGBColor } from 'd3-color'
import { Theme } from '@nivo/core'

export type ColorModifierBrightness = ['brighter', number]

export type ColorModifierDarkness = ['darker', number]

export type ColorModifierOpacity = ['opacity', number]

export type ColorModifier = ColorModifierBrightness | ColorModifierDarkness | ColorModifierOpacity

export type ColorModifierFunction = (color: RGBColor) => RGBColor

export type InheritedColorPlain = string

export type InheritedColorFunction<Datum> = (d: Datum) => string

export interface InheritedColorFromTheme {
    theme: string
}

export interface InheritedColorFromContext {
    from: string
    modifiers?: ColorModifier[]
}

export type InheritedColor<Datum> =
    | InheritedColorPlain
    | InheritedColorFunction<Datum>
    | InheritedColorFromTheme
    | InheritedColorFromContext

const isInheritedColorFromTheme = <Datum>(
    instruction: InheritedColor<Datum>
): instruction is InheritedColorFromTheme => {
    return (instruction as InheritedColorFromTheme).theme !== undefined
}

const isInheritedColorFromContext = <Datum>(
    instruction: InheritedColor<Datum>
): instruction is InheritedColorFromContext => {
    return (instruction as InheritedColorFromContext).from !== undefined
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
    instruction: InheritedColor<Datum>,
    theme?: Theme
) => {
    // user provided function
    if (typeof instruction === 'function') {
        return (datum: Datum) => instruction(datum)
    }

    if (isPlainObject(instruction)) {
        // use color from theme
        if (isInheritedColorFromTheme(instruction)) {
            if (theme === undefined) {
                throw new Error(`Unable to use color from theme as no theme was provided`)
            }

            const themeColor = get(theme, instruction.theme)
            if (themeColor === undefined) {
                throw new Error(`Color from theme is undefined at path: '${instruction.theme}'`)
            }

            return () => themeColor
        }

        // use color from parent with optional color modifiers
        if (isInheritedColorFromContext(instruction)) {
            const getColor = (d: Datum) => get(d, instruction.from)

            if (Array.isArray(instruction.modifiers)) {
                const modifiers: ColorModifierFunction[] = []
                for (const modifier of instruction.modifiers) {
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
    return () => instruction as string
}

export const useInheritedColor = <Datum = any>(instruction: InheritedColor<Datum>, theme?: Theme) =>
    useMemo(() => getInheritedColorGenerator<Datum>(instruction, theme), [instruction, theme])
