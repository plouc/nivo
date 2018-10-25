import React, { Component, Fragment } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import '../styles/index.scss'
import theme from '../styles/theme'
import Header from '../components/Header'

const GlobalStyle = createGlobalStyle`
    html,
    body {
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
    }
`

export default class GlobalLayout extends Component {
    state = {
        themeId: 'dark',
    }

    updateTheme = themeId => {
        this.setState({ themeId })
    }

    render() {
        const { children } = this.props
        const { themeId } = this.state

        const currentTheme = theme[themeId]

        return (
            <ThemeProvider theme={currentTheme}>
                <Fragment>
                    <GlobalStyle />
                    <Header onThemeChange={this.updateTheme} />
                    <div className="content">{children({ theme: currentTheme })}</div>
                </Fragment>
            </ThemeProvider>
        )
    }
}
