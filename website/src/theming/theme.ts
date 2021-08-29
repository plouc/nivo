import highlight from './highlight'
import { DefaultTheme } from 'styled-components'

const dimensions = {
    headerHeight: 60,
    contentMargin: 30,
    contentMarginSmall: 20,
    miniNavWidth: 80,
    miniNavItemSize: 56,
}

const lightTheme: DefaultTheme = {
    id: 'light',
    colors: {
        background: '#f7fafb',

        text: '#000000',
        textLight: '#666666',

        codeText: '#222222',
        titleText: '#e25d47',
        link: '#e25d47',

        border: '#dddddd',
        borderLight: '#eeeeee',

        accent: '#e25d47',
        accentLight: '#f88d81',
        accentDark: '#b44230',

        cardBackground: '#ffffff',
        cardAltBackground: '#f7fafb',

        inputBackground: '#f7fafb',
        inputBorder: '#cccccc',

        gradientColor0: '#dc5a32',
        gradientColor1: '#c44a67',

        neutralRange: ['#e2e2e2', '#cbcbcb', '#9a9a9a', '#838383', '#767676'],
        coloredRange: ['#ffc6c6', '#ff8c80', '#ff6a51', '#f25038', '#e64027'],
    },
    dimensions,

    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    fontFamilyMono: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,

    cardShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    topCardShadow: '0 16px 30px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.06)',

    nivo: {
        background: '#ffffff',
        axis: {
            domain: {
                line: {
                    strokeWidth: 0,
                    stroke: '#889eae',
                },
            },
            ticks: {
                line: {
                    strokeWidth: 1,
                    stroke: '#889eae',
                },
                text: {
                    fill: '#6a7c89',
                    fontSize: 11,
                },
            },
            legend: {
                text: {
                    fill: '#6f6f6f',
                    fontSize: 13,
                    fontWeight: 600,
                },
            },
        },
        legends: {
            text: {
                fontSize: 12,
            },
        },
        tooltip: {
            container: {
                fontSize: '13px',
            },
        },
        labels: {
            text: {
                fill: '#555555',
                fontWeight: 600,
            },
        },
        annotations: {
            text: {
                fill: '#333333',
                outlineWidth: 3,
                outlineColor: '#ffffff',
            },
            link: {
                stroke: '#333333',
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
            outline: {
                stroke: '#333333',
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
            symbol: {
                fill: '#333333',
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
        },
    },
    highlight: highlight.light,
}

const darkTheme: DefaultTheme = {
    id: 'dark',
    colors: {
        background: '#1d262b',

        text: '#dee5ec',
        textLight: '#8d9cab',

        codeText: '#cccccc',
        titleText: '#6ba7e4',
        link: '#3c91e8',

        border: '#0b1015',
        borderLight: '#0e1419',

        accent: '#3c91e8',
        accentLight: '#73b7fd',
        accentDark: '#b44230',

        cardBackground: '#151b20',
        cardAltBackground: '#11171b',

        inputBackground: '#222d33',

        gradientColor0: '#1b4a79',
        gradientColor1: '#2e5f92',

        neutralRange: ['#888888', '#777777', '#666666', '#555555', '#444444'],
        coloredRange: ['#77b5f5', '#3b9cff', '#0e81f7', '#0770dc', '#005bb7'],
    },
    dimensions,

    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    fontFamilyMono: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,

    cardShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
    topCardShadow: '0 16px 30px rgba(0, 0, 0, 0.3)',

    nivo: {
        background: '#0e1317',
        axis: {
            domain: {
                line: {
                    strokeWidth: 0,
                    stroke: '#526271',
                },
            },
            ticks: {
                line: {
                    strokeWidth: 1,
                    stroke: '#526271',
                },
                text: {
                    fill: '#8d9cab',
                    fontSize: 11,
                },
            },
            legend: {
                text: {
                    fill: '#ccd7e2',
                    fontSize: 13,
                    fontWeight: 500,
                },
            },
        },
        grid: {
            line: {
                stroke: '#444',
            },
        },
        legends: {
            text: {
                fontSize: 12,
                fill: '#8d9cab',
            },
        },
        tooltip: {
            container: {
                fontSize: '13px',
                background: '#000',
                color: '#ddd',
            },
        },
        labels: {
            text: {
                fill: '#ddd',
                fontSize: 12,
                fontWeight: 500,
            },
        },
        dots: {
            text: {
                fill: '#bbb',
                fontSize: 12,
            },
        },
        annotations: {
            text: {
                fill: '#dddddd',
                outlineWidth: 3,
                outlineColor: '#0e1317',
            },
            link: {
                stroke: '#ffffff',
                outlineWidth: 2,
                outlineColor: '#0e1317',
            },
            outline: {
                stroke: '#ffffff',
                outlineWidth: 2,
                outlineColor: '#0e1317',
            },
            symbol: {
                fill: '#ffffff',
                outlineWidth: 2,
                outlineColor: '#0e1317',
            },
        },
    },
    highlight: highlight.dark,
}

export default {
    light: lightTheme,
    dark: darkTheme,
}
