import { BaseThemedCssFunction, css } from 'styled-components'

const sizes = {
    desktopLarge: { min: 1260 },
    desktop: { min: 1000, max: 1260 },
    tablet: { min: 760, max: 1000 },
    mobile: { max: 760 },
} as const

type SizeId = keyof typeof sizes

const media: Record<SizeId, BaseThemedCssFunction<any>> = {
    desktopLarge: (...args: any[]) => css`
        @media only screen and (min-width: ${sizes.desktopLarge.min}px) {
            ${css(...args)}
        }
    `,
    desktop: (...args: any[]) => css`
        @media only screen and (min-width: ${sizes.desktop.min}px) and (max-width: ${sizes.desktop
                .max}px) {
            ${css(...args)}
        }
    `,
    tablet: (...args: any[]) => css`
        @media only screen and (min-width: ${sizes.tablet.min}px) and (max-width: ${sizes.tablet
                .max}px) {
            ${css(...args)}
        }
    `,
    mobile: (...args: any[]) => css`
        @media only screen and (max-width: ${sizes.mobile.max}px) {
            ${css(...args)}
        }
    `,
}

export default media
