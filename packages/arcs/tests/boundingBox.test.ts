import { computeArcBoundingBox } from '../src/boundingBox'

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

for (const boundingBoxCase of boundingBoxCases) {
    const { args, expected } = boundingBoxCase

    test(`computeArcBoundingBox() for position ${args[0]}, ${args[1]} with radius ${args[2]}, starting at ${args[3]}°, ending at ${args[4]}°`, () => {
        const box = computeArcBoundingBox(...args)

        for (const prop in expected) {
            expect(box).toHaveProperty(prop, expected[prop])
        }
    })
}
