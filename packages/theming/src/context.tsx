import { createContext, useContext, PropsWithChildren } from 'react'
import { usePartialTheme } from './hooks'
import { PartialTheme, Theme } from './types'

export const ThemeContext = createContext<Theme | null>(null)

// required to preserve equality
const defaultPartialTheme = {}

export const ThemeProvider = ({
    theme: partialTheme = defaultPartialTheme,
    children,
}: PropsWithChildren<{
    theme: PartialTheme
}>) => {
    const theme = usePartialTheme(partialTheme)

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const theme = useContext(ThemeContext)
    if (theme === null) {
        throw new Error(
            'Unable to find the theme, did you forget to wrap your component with ThemeProvider?'
        )
    }

    return theme
}
