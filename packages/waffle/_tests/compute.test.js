import { computeCellSize, computeGrid } from '../src/compute'

describe('computeCellSize', () => {
    it('should compute cell size according to given parameters', () => {
        const cellSize = computeCellSize(100, 100, 10, 10, 0)
        expect(cellSize).toBe(10)
    })

    it('should support padding', () => {
        const cellSize = computeCellSize(100, 100, 10, 10, 1)
        expect(cellSize).toBe(9.1)
    })
})

describe('computeGrid', () => {
    it('should create default empty grid', () => {
        const { cells, cellSize, origin } = computeGrid(100, 100, 10, 10, 'bottom', 0)
        expect(cells.length).toBe(100)
        expect(cellSize).toBe(10)
        expect(origin).toEqual({ x: 0, y: 0 })
        expect(cells).toMatchSnapshot()
    })

    it('should support padding', () => {
        const { cells, cellSize } = computeGrid(100, 100, 10, 10, 'bottom', 1)
        expect(cellSize).toBe(9.1)
        expect(cells).toMatchSnapshot()
    })

    it('should compute origin according to remaining space', () => {
        const { cells, origin } = computeGrid(200, 100, 10, 10, 'bottom', 0)
        expect(origin).toEqual({ x: 50, y: 0 })
        expect(cells).toMatchSnapshot()
    })

    const fillModes = ['top', 'right', 'bottom', 'left']
    for (const fillMode of fillModes) {
        it(`should support ${fillMode} fill mode`, () => {
            const { cells } = computeGrid(100, 100, 10, 10, fillMode, 0)
            expect(cells).toMatchSnapshot()
        })
    }
})
