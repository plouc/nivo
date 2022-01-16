import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            text: string
            textLight: string

            background: string
            panelBackground: string
            inputBackground: string

            border: string
            borderLight: string

            accent: string
        }
        shadows: {
            panel: string
        }
        borderRadius: {
            panel: number
            input: number
        }
    }
}
