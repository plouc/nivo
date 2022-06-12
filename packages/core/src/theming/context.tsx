/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext, useContext } from 'react'
import { usePartialTheme } from '../hooks'
import { defaultTheme } from './defaultTheme'
import { Theme, CompleteTheme } from './types'

export const themeContext = createContext(defaultTheme)

export const ThemeProvider = ({
    theme: partialTheme = defaultTheme,
    children,
}: {
    theme: Theme
    children: JSX.Element
}) => {
    const theme = usePartialTheme(partialTheme)

    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}

export const useTheme = (): CompleteTheme => useContext(themeContext)
