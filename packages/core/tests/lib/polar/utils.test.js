/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { absoluteAngleDegrees, midAngle, computeArcBoundingBox } from '../../../src/lib/polar/utils'

test('midAngle() should compute center of given angles', () => {
    expect(midAngle({ startAngle: 0, endAngle: 90 })).toBe(45)
})

const boundingBoxCases = [
    {
        args: [0, 0, 100, 0, 360],
        expected: {
            x: -100,
            y: -100,
            width: 200,
            height: 200,
        },
    },
    {
        args: [0, 0, 100, 0, 90],
        expected: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        },
    },
    {
        args: [0, 0, 100, -90, 0],
        expected: {
            x: 0,
            y: -100,
            width: 100,
            height: 100,
        },
    },
    {
        args: [0, 0, 100, 90, 180],
        expected: {
            x: -100,
            y: 0,
            width: 100,
            height: 100,
        },
    },
]

for (let boundingBoxCase of boundingBoxCases) {
    const { args, expected } = boundingBoxCase

    test(`computeArcBoundingBox() for position ${args[0]}, ${args[1]} with radius ${args[2]}, starting at ${args[3]}°, ending at ${args[4]}°`, () => {
        const box = computeArcBoundingBox(...args)

        for (let prop in expected) {
            expect(box).toHaveProperty(prop, expected[prop])
        }
    })
}

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
