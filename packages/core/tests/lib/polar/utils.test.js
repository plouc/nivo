import { normalizeAngle, midAngle } from '../../../src/lib/polar/utils'

const absAngleDegUseCases = [
    {
        input: 0,
        expected: 0,
    },
    {
        input: 370,
        expected: 10,
    },
    {
        input: 730,
        expected: 10,
    },
    {
        input: -10,
        expected: 350,
    },
    {
        input: -380,
        expected: 340,
    },
]

describe('polar coordinates', () => {
    test('midAngle() should compute center of given angles', () => {
        expect(midAngle({ startAngle: 0, endAngle: 90 })).toBe(45)
    })

    it('should normalize angle into [0, 360] range', () => {
        absAngleDegUseCases.forEach(d => {
            const { input, expected } = d
            expect(normalizeAngle(input)).toBe(expected)
        })
    })
})
