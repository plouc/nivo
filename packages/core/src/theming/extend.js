/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import merge from 'lodash/merge.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'

const textPropsWithInheritance = [
    'axis.ticks.text',
    'axis.legend.text',
    'legends.title.text',
    'legends.text',
    'legends.ticks.text',
    'legends.title.text',
    'labels.text',
    'dots.text',
    'markers.text',
    'annotations.text',
]

/**
 * @param {Partial<TextStyle>} partialStyle
 * @param {TextStyle} rootStyle
 * @returns {TextStyle}
 */
export const inheritRootThemeText = (partialStyle, rootStyle) => ({
    ...rootStyle,
    ...partialStyle,
})

/**
 * @param {ThemeWithoutInheritance} defaultTheme
 * @param {Theme} customTheme
 * @returns {CompleteTheme}
 */
export const extendDefaultTheme = (defaultTheme, customTheme) => {
    const theme = merge({}, defaultTheme, customTheme)

    textPropsWithInheritance.forEach(prop => {
        set(theme, prop, inheritRootThemeText(get(theme, prop), theme.text))
    })

    return theme
}
