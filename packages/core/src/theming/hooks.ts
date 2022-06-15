import { CompleteTheme } from './types'
import { useContext } from 'react'
import { themeContext } from './context'

export const useTheme = (): CompleteTheme => useContext(themeContext)
