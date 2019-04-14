/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import get from 'lodash.get'
import isPlainObject from 'lodash.isplainobject'
import { rgb } from 'd3-color'

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
export const getInheritedColorGenerator = (inheritedColor, theme) => {
    // user provided function
    if (typeof inheritedColor === 'function') return node => inheritedColor(node)

    if (isPlainObject(inheritedColor)) {
        // use color from theme
        if (inheritedColor.theme !== undefined) {
            if (theme === undefined) {
                throw new Error(`Unable to use color from theme as no theme was provided`)
            }

            const themeColor = get(theme, inheritedColor.theme)
            if (themeColor === undefined) {
                throw new Error(`Color from theme is undefined at path: '${inheritedColor.theme}'`)
            }

            return () => themeColor
        }

        // use color from parent with optional color modifiers
        if (inheritedColor.from !== undefined) {
            const getColor = datum => get(datum, inheritedColor.from)

            if (Array.isArray(inheritedColor.modifiers)) {
                const modifiers = []
                for (const modifier of inheritedColor.modifiers) {
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

                return datum =>
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
    return () => inheritedColor
}

export const useInheritedColor = (parentColor, theme) =>
    useMemo(() => getInheritedColorGenerator(parentColor, theme), [parentColor, theme])
