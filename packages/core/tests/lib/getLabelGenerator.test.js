import { getLabelGenerator } from '../../src/lib/propertiesConverters'

describe('getLabelGenerator()', () => {
    it(`should handle simple value access`, () => {
        const getLabel = getLabelGenerator('value')
        expect(getLabel({ value: 12 })).toBe(12)
    })

    it(`should handle nested property access`, () => {
        const getLabel = getLabelGenerator('node.value')
        expect(getLabel({ node: { value: 13 } })).toBe(13)
    })

    it(`should handle simple access with d3 formatting`, () => {
        const getLabel = getLabelGenerator('value', '.1f')
        expect(getLabel({ value: 14 })).toBe('14.0')
    })

    it(`should handle simple access with d3 formatting`, () => {
        const getLabel = getLabelGenerator('value', '.1f')
        expect(getLabel({ value: 14 })).toBe('14.0')
    })

    it(`should handle custom access function`, () => {
        const getLabel = getLabelGenerator(d => d.value[0])
        expect(getLabel({ value: [15, 16] })).toBe(15)
    })

    it(`should handle custom formatting function`, () => {
        const getLabel = getLabelGenerator('value', v => v + 10)
        expect(getLabel({ value: 17 })).toBe(27)
    })

    it(`should handle custom access & formatting functions`, () => {
        const getLabel = getLabelGenerator(
            d => d.value[1],
            v => v + 10
        )
        expect(getLabel({ value: [18, 19] })).toBe(29)
    })
})
