import '../styles/index.css'
import React, { useReducer } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../theming/GlobalStyle'
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

    return (
        <globalDispatchContext.Provider value={dispatch}>
            <globalStateContext.Provider value={state}>
                <themeContext.Provider value={currentTheme}>
                    <ThemeProvider theme={currentTheme}>
                        <div className={isCapturing ? 'isCapturing' : ''}>
                            <GlobalStyle isCapturing={isCapturing} />
                            {children}
                        </div>
                    </ThemeProvider>
                </themeContext.Provider>
            </globalStateContext.Provider>
        </globalDispatchContext.Provider>
    )
}

export default PageWrapper
