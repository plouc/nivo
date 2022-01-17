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
        spacing: {
            controlPaddingX: number
            controlGapX: number
            controlPaddingY: number
            controlGapY: number
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
