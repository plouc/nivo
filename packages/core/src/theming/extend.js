/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import merge from 'lodash/merge'
import get from 'lodash/get'
import set from 'lodash/set'

const textProps = [
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
 * @param {ThemeWithoutInheritance} defaultTheme
 * @param {Theme} customTheme
 * @returns {CompleteTheme}
 */
export const extendDefaultTheme = (defaultTheme, customTheme) => {
    const theme = merge({}, defaultTheme, customTheme)

    textProps.forEach(prop => {
        if (get(theme, `${prop}.fontFamily`) === undefined) {
            set(theme, `${prop}.fontFamily`, theme.text.fontFamily)
        }
        if (get(theme, `${prop}.fontSize`) === undefined) {
            set(theme, `${prop}.fontSize`, theme.text.fontSize)
        }
        if (get(theme, `${prop}.fill`) === undefined) {
            set(theme, `${prop}.fill`, theme.text.fill)
        }
        if (get(theme, `${prop}.outlineWidth`) === undefined) {
            set(theme, `${prop}.outlineWidth`, theme.text.outlineWidth)
        }
        if (get(theme, `${prop}.outlineColor`) === undefined) {
            set(theme, `${prop}.outlineColor`, theme.text.outlineColor)
        }
    })

    return theme
}
