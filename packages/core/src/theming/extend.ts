/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { merge, get, set } from 'lodash'
import { PartialTheme, Theme } from './typings'

const fontProps = [
    'axis.ticks.text',
    'axis.legend.text',
    'legends.text',
    'labels.text',
    'dots.text',
    'markers.text',
    'annotations.text',
]

export const extendDefaultTheme = (defaultTheme: Theme, customTheme: PartialTheme) => {
    const theme: Theme = merge({}, defaultTheme, customTheme)

    fontProps.forEach(prop => {
        if (get(theme, `${prop}.fontFamily`) === undefined) {
            set(theme, `${prop}.fontFamily`, theme.fontFamily)
        }
        if (get(theme, `${prop}.fontSize`) === undefined) {
            set(theme, `${prop}.fontSize`, theme.fontSize)
        }
        if (get(theme, `${prop}.fill`) === undefined) {
            set(theme, `${prop}.fill`, theme.textColor)
        }
    })

    return theme
}
