import { generateGrid, GridFillDirection } from '../src'

describe('grid', () => {
    it('should generate a grid', () => {
        const grid = generateGrid({
            width: 90,
            height: 90,
            columns: 3,
            rows: 3,
            square: false,
        })

        expect(grid.cells).toHaveLength(9)
        grid.cells.forEach(cell => {
            expect(cell.width).toEqual(30)
            expect(cell.height).toEqual(30)
        })
    })

    it('should support square cells', () => {
        const grid = generateGrid({
            width: 110,
            height: 90,
            columns: 3,
            rows: 3,
            square: true,
        })

        expect(grid.cells).toHaveLength(9)
        grid.cells.forEach(cell => {
            expect(cell.width).toEqual(30)
            expect(cell.height).toEqual(30)
        })
    })

    describe('fillDirection', () => {
        // Please remember that a cell key = `${row}.${column}`.
        const useCases: [GridFillDirection, string[]] = [
            ['bottom', ['0.0', '0.1', '0.2', '1.0', '1.1', '1.2']],
            ['left', ['1.2', '0.2', '1.1', '0.1', '1.0', '0.0']],
            ['top', ['1.2', '1.1', '1.0', '0.2', '0.1', '0.0']],
            ['right', ['0.0', '1.0', '0.1', '1.1', '0.2', '1.2']],
        ]

        useCases.forEach(([fillDirection, expectedKeys]) => {
            it(`should support ${fillDirection} fillDirection`, () => {
                const grid = generateGrid({
                    width: 30,
                    height: 20,
                    rows: 2,
                    columns: 3,
                    fillDirection: fillDirection as GridFillDirection,
                })

                const keys = grid.cells.map(cell => cell.key)
                expect(keys).toEqual(expectedKeys)
            })
        })
    })
})
