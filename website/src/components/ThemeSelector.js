/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useTheme } from '../theming/context'
import { useGlobalDispatch, useGlobalState } from './state'
import Switch from './controls/Switch'
// import useLocalStorage from '../lib/useLocalStorage'

const ThemeSelector = () => {
    // const [themeId, saveThemeId] = useLocalStorage('theme')
    const dispatch = useGlobalDispatch()
    const state = useGlobalState()
    const toggleTheme = useCallback(() => {
        const theme = state.theme === 'light' ? 'dark' : 'light'
        // saveThemeId(theme)
        dispatch({ type: 'setTheme', theme })
    }, [dispatch, state.theme])
    const setTheme = useCallback(
        theme => {
            // saveThemeId(theme)
            dispatch({ type: 'setTheme', theme })
        },
        [dispatch]
    )
    const theme = useTheme()
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
                isActive={state.theme === 'light'}
                onClick={() => setTheme('light')}
            >
                light
            </ToggleItem>
            <Switch
                id="themeToggle"
                value={state.theme === 'dark'}
                onChange={toggleTheme}
                colors={colors}
            />
            <ToggleItem
                id="darkTheme"
                isActive={state.theme === 'dark'}
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

const ToggleItem = styled.label`
    font-size: 0.9rem;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
    opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
`
