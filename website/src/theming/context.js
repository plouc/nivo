import { createContext, useContext } from 'react'

export const themeContext = createContext()

export const useTheme = () => {
    const theme = useContext(themeContext)

    return theme
}
