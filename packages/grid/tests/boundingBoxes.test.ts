import { BoundingBox, areBoundingBoxTouching } from '../src'

describe('boundingBoxes', () => {
    describe('areBoundingBoxTouching', () => {
        const touching: [string, BoundingBox, BoundingBox][] = [
            [
                'top',
                { top: 10, right: 10, bottom: 20, left: 0 },
                { top: 0, right: 10, bottom: 10, left: 0 },
            ],
            [
                'right',
                { top: 0, right: 10, bottom: 10, left: 0 },
                { top: 0, right: 20, bottom: 10, left: 10 },
            ],
            [
                'bottom',
                { top: 0, right: 10, bottom: 10, left: 0 },
                { top: 10, right: 10, bottom: 20, left: 0 },
            ],
            [
                'left',
                { top: 0, right: 20, bottom: 10, left: 10 },
                { top: 0, right: 10, bottom: 10, left: 10 },
            ],
        ]
        touching.forEach(([edge, boxA, boxB]) => {
            it(`should detect contact from the ${edge} edge`, () => {
                expect(areBoundingBoxTouching(boxA, boxB)).toBe(true)
            })
        })

        const overlapping: [string, BoundingBox, BoundingBox][] = [
            [
                'top',
                { top: 9, right: 10, bottom: 20, left: 0 },
                { top: 0, right: 10, bottom: 10, left: 0 },
            ],
            [
                'right',
                { top: 0, right: 11, bottom: 10, left: 0 },
                { top: 0, right: 20, bottom: 10, left: 10 },
            ],
            [
                'bottom',
                { top: 0, right: 10, bottom: 11, left: 0 },
                { top: 10, right: 10, bottom: 20, left: 0 },
            ],
            [
                'left',
                { top: 0, right: 20, bottom: 10, left: 9 },
                { top: 0, right: 10, bottom: 10, left: 10 },
            ],
        ]
        overlapping.forEach(([edge, boxA, boxB]) => {
            it(`should detect overlap from the ${edge} edge`, () => {
                expect(areBoundingBoxTouching(boxA, boxB)).toBe(true)
            })
        })

        const noContact: [string, BoundingBox, BoundingBox][] = [
            [
                'there is a contact on y but not on x',
                { top: 10, right: 10, bottom: 20, left: 0 },
                { top: 0, right: 20, bottom: 10, left: 11 },
            ],
            [
                'there is a contact on x but not on y',
                { top: 0, right: 10, bottom: 10, left: 0 },
                { top: 11, right: 20, bottom: 20, left: 10 },
            ],
        ]
        noContact.forEach(([useCase, boxA, boxB]) => {
            it(`should not detect contact when ${useCase}`, () => {
                expect(areBoundingBoxTouching(boxA, boxB)).toBe(false)
            })
        })
    })
})
