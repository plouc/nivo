/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { get, isPlainObject } from 'lodash'
import { rgb, RGBColor } from 'd3-color'

export type ColorModifierBrightness = ['brighter', number]

export type ColorModifierDarkness = ['darker', number]

export type ColorModifierOpacity = ['opacity', number]

export type ColorModifier = ColorModifierBrightness | ColorModifierDarkness | ColorModifierOpacity

export type InheritedColorPlain = string

export type InheritedColorFunction = (d: any) => string

export interface InheritedColorFromTheme {
    theme: string
}

const isInheritedColorFromTheme = (
    instruction: InheritedColor
): instruction is InheritedColorFromTheme => {
    return (instruction as InheritedColorFromTheme).theme !== undefined
}

export interface InheritedColorFromContext {
    from: string
    modifiers?: ColorModifier[]
}

const isInheritedColorFromContext = (
    instruction: InheritedColor
): instruction is InheritedColorFromContext => {
    return (instruction as InheritedColorFromContext).from !== undefined
}

export type InheritedColor =
    | InheritedColorPlain
    | InheritedColorFunction
    | InheritedColorFromTheme
    | InheritedColorFromContext

export type InheritedColorGenerator<Datum> = (d: Datum) => string

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
    instruction: InheritedColor,
    theme?: any
): InheritedColorGenerator<Datum> => {
    // user provided function
    if (typeof instruction === 'function') {
        return (d: Datum) => instruction(d)
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
                const modifiers: Array<(color: RGBColor) => RGBColor> = []
                for (const modifier of instruction.modifiers) {
                    const [modifierType, amount] = modifier
                    if (modifierType === 'brighter') {
                        modifiers.push((color: RGBColor) => color.brighter(amount))
                    } else if (modifierType === 'darker') {
                        modifiers.push((color: RGBColor) => color.darker(amount))
                    } else if (modifierType === 'opacity') {
                        modifiers.push((color: RGBColor) => {
                            color.opacity = amount

                            return color
                        })
                    } else {
                        throw new Error(
                            `Invalid color modifier: '${modifierType}', must be one of: 'brighter', 'darker', 'opacity'`
                        )
                    }
                }

                if (modifiers.length === 0) {
                    return getColor
                }

                return (d: Datum) => {
                    // apply all color modifiers to the generated color
                    return modifiers
                        .reduce((color, modify) => modify(color), rgb(getColor(d)))
                        .toString()
                }
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

export const useInheritedColor = <Datum = any>(instruction: InheritedColor, theme?: any) => {
    return useMemo(() => {
        return getInheritedColorGenerator<Datum>(instruction, theme)
    }, [instruction, theme])
}
