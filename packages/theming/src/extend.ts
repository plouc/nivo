import merge from 'lodash/merge.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
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

// We support various types of axes, top, right, bottom, polar...
// Adding new entries for each axis type is not necessarily ideal to
// allow the customization of the theme for a specific axis.
// We might even support multiple axes of the same type in the future.
// We can use this helper to extend the theme for a specific axis type,
// the overrides being provided as a property of the axis type.
// This helper assumes that we're extending a complete theme,
// because it's going to be used deeper in the component tree.
export const extendAxisTheme = (
    axisTheme: Theme['axis'],
    overrides: PartialTheme['axis']
): Theme['axis'] => {
    if (!overrides) return axisTheme
    return merge({}, axisTheme, overrides)
}
