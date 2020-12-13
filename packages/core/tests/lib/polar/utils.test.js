import { absoluteAngleDegrees, midAngle } from '../../../src/lib/polar/utils'

test('midAngle() should compute center of given angles', () => {
    expect(midAngle({ startAngle: 0, endAngle: 90 })).toBe(45)
})

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

for (let absAngleDegUseCase of absAngleDegUseCases) {
    const { input, expected } = absAngleDegUseCase

    test(`absoluteAngleDegrees() should convert ${input}° to ${expected}°`, () => {
        expect(absoluteAngleDegrees(input)).toBe(expected)
    })
}
