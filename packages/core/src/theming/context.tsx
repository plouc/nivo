/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { createContext, PropsWithChildren, useContext } from 'react'
import { usePartialTheme } from '../hooks'
import { PartialTheme, Theme } from './typings'

export const ThemeContext = createContext<Theme>({} as any)

// required to preserve equality
const defaultPartialTheme = {}

export const ThemeProvider = ({
    theme: partialTheme = defaultPartialTheme,
    children,
}: PropsWithChildren<{
    theme?: PartialTheme
}>) => {
    const theme = usePartialTheme(partialTheme)

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
