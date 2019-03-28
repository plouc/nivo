/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { css } from 'styled-components'

const sizes = {
    desktopLarge: { min: 1260 },
    desktop: { min: 1000, max: 1260 },
    tablet: { min: 760, max: 1000 },
    mobile: { max: 760 },
}

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => {
        const config = sizes[label]
        const instructions = []
        if (config.min !== undefined) {
            instructions.push(`(min-width: ${config.min}px)`)
        }
        if (config.max !== undefined) {
            instructions.push(`(max-width: ${config.max}px)`)
        }

        return css`
            @media only screen and ${instructions.join(' and ')} {
                ${css(...args)}
            }
        `
    }

    return acc
}, {})

export default media
