import { createPrecisionMethod } from '../src'

describe('createPrecisionMethod', () => {
    const input = new Date(2018, 9, 30, 15, 33, 47, 29)

    it.each([
        ['millisecond', input],
        ['second', new Date(2018, 9, 30, 15, 33, 47, 0)],
        ['minute', new Date(2018, 9, 30, 15, 33, 0, 0)],
        ['hour', new Date(2018, 9, 30, 15, 0, 0, 0)],
        ['day', new Date(2018, 9, 30, 0, 0, 0, 0)],
        ['month', new Date(2018, 9, 1, 0, 0, 0, 0)],
        ['year', new Date(2018, 0, 1, 0, 0, 0, 0)],
    ] as const)(`should support %s precision`, (precision, expected) => {
        const date = new Date(input.getTime())
        createPrecisionMethod(precision)(date)
        expect(date.getTime()).toBe(expected.getTime())
    })
})
