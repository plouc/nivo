import { createContext, useContext } from 'react'
import { DefaultTheme } from 'styled-components'

export const themeContext = createContext<DefaultTheme>({} as any)

export const useTheme = (): DefaultTheme => useContext(themeContext)
