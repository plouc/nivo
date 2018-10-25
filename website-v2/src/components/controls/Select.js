import React, { Component } from 'react'
import ReactSelect from 'react-select'
import { withTheme } from 'styled-components'

class Select extends Component {
    render() {
        const { theme, ...rest } = this.props

        const styles = {
            option: (base, state) => ({
                ...base,
            }),
            control: base => ({
                ...base,
                height: 28,
                minHeight: 28,
                borderRadius: 2,
                background: theme.colors.inputBackground,
                borderColor: theme.colors.inputBorder,
            }),
            menu: base => ({
                ...base,
                zIndex: 2,
                background: theme.colors.cardBackground,
                borderColor: theme.colors.border,
            }),
        }

        return <ReactSelect styles={styles} {...rest} />
    }
}

export default withTheme(Select)
