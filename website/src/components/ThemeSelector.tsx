import React, { useCallback, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { useSetTheme } from '../theming/SwitchableThemeProvider'
import { Switch } from './controls/ui'

const ThemeSelector = () => {
    const theme = useTheme()
    const themeId = theme.id
    const setThemeId = useSetTheme()

    const toggleTheme = useCallback(() => {
        setThemeId(themeId === 'light' ? 'dark' : 'light')
    }, [theme, themeId])

    const setTheme = useCallback(
        theme => {
            setThemeId(theme)
        },
        [setThemeId]
    )
    const colors = useMemo(
        () => ({
            on: theme.colors.cardBackground,
            off: theme.colors.cardBackground,
            dot: theme.colors.gradientColor0,
        }),
        [theme]
    )

    return (
        <ToggleContainer>
            <ToggleItem
                id="lightTheme"
                isActive={themeId === 'light'}
                onClick={() => setTheme('light')}
            >
                light
            </ToggleItem>
            <Switch
                id="themeToggle"
                value={themeId === 'dark'}
                onChange={toggleTheme}
                colors={colors}
            />
            <ToggleItem
                id="darkTheme"
                isActive={themeId === 'dark'}
                onClick={() => setTheme('dark')}
            >
                dark
            </ToggleItem>
        </ToggleContainer>
    )
}

export default ThemeSelector

const ToggleContainer = styled.div`
    display: grid;
    grid-template-columns: 32px 36px 32px;
    grid-column-gap: 6px;
    align-items: center;
    color: white;
    margin-left: 20px;
`

const ToggleItem = styled.label<{
    isActive: boolean
}>`
    font-size: 0.9rem;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
    opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
`
