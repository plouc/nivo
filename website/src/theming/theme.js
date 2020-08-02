/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import nivo from './nivo'
import highlight from './highlight'

const dimensions = {
    headerHeight: 60,
    contentMargin: 30,
    contentMarginSmall: 20,
    miniNavWidth: 80,
    miniNavItemSize: 56,
}

export default {
    light: {
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

        nivo: nivo.light,
        highlight: highlight.light,
    },
    dark: {
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

        nivo: nivo.dark,
        highlight: highlight.dark,
    },
}
