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

const fontProps = [
    'axis.ticks.text',
    'axis.legend.text',
    'legends.text',
    'labels.text',
    'dots.text',
    'markers.text',
    'annotations.text',
]

export const extendDefaultTheme = (defaultTheme, customTheme) => {
    const theme = merge({}, defaultTheme, customTheme)

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
