import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            text: string
            textLight: string
            accent: string
            border: string
            borderLight: string
            inputBackground: string
        }
        spacing: [
            string, // 0
            string, // 1
            string, // 2
            string, // 3
            string, // 4
            string, // 5
            string, // 6
            string, // 7
            string, // 8
            string, // 9
            string, // 10
        ]
    }
}
