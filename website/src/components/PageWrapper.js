/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import '../styles/index.css'
import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import globalStyle from '../theming/GlobalStyle'
import theme from '../theming/theme'
import { themeContext } from '../theming/context'
import { globalDispatchContext, globalStateContext, globalStateReducer } from './state'
// import useLocalStorage from '../lib/useLocalStorage'

const PageWrapper = ({ children }) => {
    // const [themeId] = useLocalStorage('theme', 'light')
    const [state, dispatch] = useReducer(globalStateReducer, {
        theme: 'light',
    })
    const currentTheme = theme[state.theme]

    const isCapturing =
        children.props &&
        children.props.location &&
        children.props.location.search.indexOf('capture=1') !== -1
    const GlobalStyle = globalStyle(isCapturing)

    return (
        <globalDispatchContext.Provider value={dispatch}>
            <globalStateContext.Provider value={state}>
                <themeContext.Provider value={currentTheme}>
                    <ThemeProvider theme={currentTheme}>
                        <div className={isCapturing ? 'isCapturing' : ''}>
                            <GlobalStyle />
                            {children}
                        </div>
                    </ThemeProvider>
                </themeContext.Provider>
            </globalStateContext.Provider>
        </globalDispatchContext.Provider>
    )
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PageWrapper
