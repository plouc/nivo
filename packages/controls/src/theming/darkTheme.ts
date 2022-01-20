import { DefaultTheme } from 'styled-components'

export const darkTheme: DefaultTheme = {
    colors: {
        background: '#202323',
        panelBackground: '#2f3333',
        inputBackground: '#1e2121',

        text: '#b6c4c4',
        textLight: '#727a7a',

        border: '#1e2121',
        borderLight: '#222525',

        accent: '#3c91e8',
    },
    spacing: {
        controlPaddingX: 12,
        controlGapX: 9,
        controlPaddingY: 9,
        controlGapY: 7,
    },
    shadows: {
        panel: '0 1px 1px 1px rgba(0, 0, 0, .25), 0 6px 9px rgba(0, 0, 0, .15)',
    },
    borderRadius: {
        panel: 2,
        input: 2,
    },
}
