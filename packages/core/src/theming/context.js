import { createContext, useContext } from 'react'
import { usePartialTheme } from '../hooks'

export const themeContext = createContext()

// required to preserve equality
const defaultPartialTheme = {}

export const ThemeProvider = ({ theme: partialTheme = defaultPartialTheme, children }) => {
    const theme = usePartialTheme(partialTheme)

    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}

export const useTheme = () => useContext(themeContext)
