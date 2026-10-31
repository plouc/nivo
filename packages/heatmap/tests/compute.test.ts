import { computeCells } from '../src/compute'

describe('computeCells', () => {
    it('should support a large number of cells', () => {
        // 146k cells, spreading the values into `Math.min` used to overflow the call stack.
        const data = Array.from({ length: 400 }, (_, row) => ({
            id: `row.${row}`,
            data: Array.from({ length: 365 }, (_, column) => ({ x: column, y: row + column })),
        }))

        const result = computeCells({
            data,
            width: 800,
            height: 600,
            xOuterPadding: 0,
            xInnerPadding: 0,
            yOuterPadding: 0,
            yInnerPadding: 0,
            forceSquare: false,
        })

        expect(result.cells).toHaveLength(400 * 365)
        expect(result.minValue).toBe(0)
        expect(result.maxValue).toBe(399 + 364)
    })
})
