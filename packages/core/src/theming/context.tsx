/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext, useMemo } from 'react'
import { defaultTheme } from './defaultTheme'
import { Theme } from './types'
import { extendDefaultTheme } from './extend'

export const themeContext = createContext(defaultTheme)

export const ThemeProvider = ({
    theme: partialTheme = {},
    children,
}: {
    theme: Theme
    children: JSX.Element
}) => {
    const theme = useMemo(() => extendDefaultTheme(defaultTheme, partialTheme), [partialTheme])

    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}
