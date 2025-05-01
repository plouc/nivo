import {
    getContinuousColorScale,
    colorSchemes,
    divergingColorSchemeIds,
    sequentialColorSchemeIds,
} from '../src'
import { color } from 'd3-color'

const unitInterval = { min: 0, max: 1 }

const toHex = (x: string) => color(x).formatHex()

describe('continuous scales from named schemes', () => {
    sequentialColorSchemeIds.forEach(scheme => {
        it(`generates a scale from sequential colors (${scheme})`, () => {
            const colorScale = getContinuousColorScale({ type: 'sequential', scheme }, unitInterval)
            // d3 sequential schemes have 9 colors predefined
            const schemeColors = colorSchemes[scheme][9]
            // compare the computed colors and scheme colors at the extrema of the unit interval
            expect(toHex(colorScale(0))).toBe(schemeColors[0])
            expect(toHex(colorScale(1))).toBe(schemeColors[8])
        })
    })

    divergingColorSchemeIds.forEach(scheme => {
        it(`generates a scale from diverging colors (${scheme})`, () => {
            const colorScale = getContinuousColorScale({ type: 'diverging', scheme }, unitInterval)
            // d3 divergent scales have predefined 11 distinct colors
            const schemeColors = colorSchemes[scheme][11]
            // compare the computed colors and scheme colors at the extrema of the unit interval
            expect(toHex(colorScale(0))).toBe(schemeColors[0])
            expect(toHex(colorScale(1))).toBe(schemeColors[10])
        })
    })
})

describe('continuous scales from custom colors', () => {
    it(`generates a sequential scale from custom colors`, () => {
        // custom colors in rgb are (68, 0, 0) and (170, 0, 0)
        const customColors = ['#440000', '#aa0000']
        const colorScale = getContinuousColorScale(
            {
                type: 'sequential',
                colors: customColors,
            },
            unitInterval
        )
        expect(toHex(colorScale(0))).toBe(customColors[0])
        expect(toHex(colorScale(1))).toBe(customColors[1])
        expect(toHex(colorScale(0.5))).toBe('#770000')
    })

    it(`accepts a sequential scale with custom interpolator`, () => {
        const customColors = ['#440000', '#aa0000']
        // this interpolator is actually a threshold-like scale
        const customInterpolator = (t: number) => {
            if (t < 0.4) return customColors[0]
            return customColors[1]
        }
        const colorScale = getContinuousColorScale(
            {
                type: 'sequential',
                interpolator: customInterpolator,
            },
            unitInterval
        )
        expect(toHex(colorScale(0))).toBe(customColors[0])
        expect(toHex(colorScale(1))).toBe(customColors[1])
        expect(toHex(colorScale(0.39))).toBe(customColors[0])
        expect(toHex(colorScale(0.41))).toBe(customColors[1])
    })

    it(`generates a divergent scale from custom colors`, () => {
        // custom colors in rgb are (68, 0, 0) and (170, 0, 0)
        const customColors = ['#440000', '#ffffff', '#004400']
        const colorScale = getContinuousColorScale(
            {
                type: 'diverging',
                colors: customColors,
            },
            unitInterval
        )
        expect(toHex(colorScale(0))).toBe(customColors[0])
        expect(toHex(colorScale(1))).toBe(customColors[2])
        expect(toHex(colorScale(0.5))).toBe(customColors[1])
    })

    it(`accepts a divergent scale with custom interpolator`, () => {
        const customColors = ['#440000', '#ffffff', '#004400']
        // this interpolator is actually a threshold-like scale
        const customInterpolator = (t: number) => {
            if (t < 0.2) return customColors[0]
            if (t > 0.8) return customColors[2]
            return customColors[1]
        }
        const colorScale = getContinuousColorScale(
            {
                type: 'diverging',
                interpolator: customInterpolator,
            },
            unitInterval
        )
        expect(toHex(colorScale(0))).toBe(customColors[0])
        expect(toHex(colorScale(1))).toBe(customColors[2])
        expect(toHex(colorScale(0.25))).toBe(customColors[1])
        expect(toHex(colorScale(0.75))).toBe(customColors[1])
    })
})
