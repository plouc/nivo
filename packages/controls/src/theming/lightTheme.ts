import { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
    colors: {
        background: '#f7fafb',
        panelBackground: '#ffffff',
        inputBackground: '#f7fafb',

        text: '#000000',
        textLight: '#666666',

        border: '#d6dbdc',
        borderLight: '#eeeeee',

        accent: '#e25d47',
    },
    spacing: {
        controlPaddingX: 12,
        controlGapX: 9,
        controlPaddingY: 9,
        controlGapY: 12,
    },
    shadows: {
        panel: '0 1px 1px 1px rgba(0, 0, 0, .03), 0 6px 9px rgba(0, 0, 0, .03)',
    },
    borderRadius: {
        panel: 3,
        input: 3,
    },
}
