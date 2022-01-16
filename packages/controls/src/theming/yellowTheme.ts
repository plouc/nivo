import { DefaultTheme } from 'styled-components'

export const yellowTheme: DefaultTheme = {
    colors: {
        background: '#000000',
        panelBackground: '#ecb016',
        inputBackground: '#d59f15',

        text: '#000000',
        textLight: '#574512',

        border: '#c59313',
        borderLight: '#d59f15',

        accent: '#ffffff',
    },
    shadows: {
        panel: '0 1px 1px 1px rgba(0, 0, 0, .03), 0 6px 9px rgba(0, 0, 0, .03)',
    },
    borderRadius: {
        panel: 2,
        input: 2,
    },
}
