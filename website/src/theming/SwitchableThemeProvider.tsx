import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import themes from './theme'

type ThemeId = keyof typeof themes

interface ThemeIdContextValue {
    themeId: ThemeId
    setThemeId: (themeId: ThemeId) => void
}

const ThemeIdContext = createContext<ThemeIdContextValue>({} as any)

export const useSetTheme = () => {
    const { setThemeId } = useContext(ThemeIdContext)

    return setThemeId
}

export const SwitchableThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeId, setThemeId] = useState<ThemeId>('light')
    const contextValue = useMemo(
        () => ({
            themeId,
            setThemeId,
        }),
        [themeId, setThemeId]
    )

    const theme = themes[themeId]

    return (
        <ThemeIdContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeIdContext.Provider>
    )
}
