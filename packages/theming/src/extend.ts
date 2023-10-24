import merge from 'lodash/merge'
import get from 'lodash/get'
import set from 'lodash/set'
import { ThemeWithoutInheritance, PartialTheme, Theme, TextStyle } from './types'

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

export const inheritRootThemeText = (
    partialStyle: Partial<TextStyle>,
    rootStyle: TextStyle
): TextStyle => ({
    ...rootStyle,
    ...partialStyle,
})

export const extendDefaultTheme = (
    defaultTheme: ThemeWithoutInheritance,
    customTheme: PartialTheme
) => {
    const theme = merge({}, defaultTheme, customTheme) as Theme

    textPropsWithInheritance.forEach(prop => {
        set(theme, prop, inheritRootThemeText(get(theme, prop), theme.text))
    })

    return theme
}
