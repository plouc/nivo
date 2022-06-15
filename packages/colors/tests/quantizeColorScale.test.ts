import { getQuantizeColorScale } from '../src/scales/quantizeColorScale'

describe('QuantizeColorScale', () => {
    it('should accept d3 colors key', () => {
        const colorScale = getQuantizeColorScale(
            { type: 'quantize', scheme: 'blue_green' },
            { min: 0, max: 1 }
        )
        expect(colorScale.range().length).toBeGreaterThan(4)
    })

    it('should accept custom colors', () => {
        const colors = ['#F00', '#0F0', '#00F']
        const colorScale = getQuantizeColorScale({ type: 'quantize', colors }, { min: 0, max: 1 })
        expect(colorScale.range()).toEqual(colors)
    })

    it('should throw if config is invalid', () => {
        expect(() => {
            getQuantizeColorScale('invalid')
        }).toThrow(/undefined/)
    })

    it('should throw if scheme is invalid', () => {
        expect(() => {
            getQuantizeColorScale({ type: 'quantize', scheme: 'invalid' }, { min: 0, max: 1 })
        }).toThrow(/interpolator/)
    })
})
