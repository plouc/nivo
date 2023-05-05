import { perpendicularPolygon } from '../src'

describe('perpendicularPolygon', () => {
    it('should add vertices to the appropriate side', () => {
        const polygon = perpendicularPolygon()

        polygon.addLeft([0, 0])
        polygon.addLeft([0, 10])
        polygon.addLeft([0, 30], [0, 20])

        polygon.addRight([10, 0])
        polygon.addRight([10, 10])
        polygon.addRight([10, 20], [10, 30])

        expect(polygon.debug().left).toEqual([
            [0, 30],
            [0, 20],
            [0, 10],
            [0, 0],
        ])

        expect(polygon.debug().right).toEqual([
            [10, 0],
            [10, 10],
            [10, 20],
            [10, 30],
        ])
    })

    it('should return the list of vertices ordered clockwise', () => {
        const polygon = perpendicularPolygon()

        polygon.addLeft([0, 0])
        polygon.addLeft([0, 10])
        polygon.addLeft([0, 20])

        polygon.addRight([10, 0])
        polygon.addRight([10, 10])
        polygon.addRight([10, 20])

        expect(polygon()).toEqual([
            [10, 0],
            [10, 10],
            [10, 20],
            [0, 20],
            [0, 10],
            [0, 0],
        ])
    })
})
