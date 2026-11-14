import { createDateNormalizer, createPrecisionMethod } from '../src'

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

    const utcInput = new Date(Date.UTC(2018, 9, 30, 15, 33, 47, 29))

    it.each([
        ['millisecond', utcInput.getTime()],
        ['second', Date.UTC(2018, 9, 30, 15, 33, 47, 0)],
        ['minute', Date.UTC(2018, 9, 30, 15, 33, 0, 0)],
        ['hour', Date.UTC(2018, 9, 30, 15, 0, 0, 0)],
        ['day', Date.UTC(2018, 9, 30, 0, 0, 0, 0)],
        ['month', Date.UTC(2018, 9, 1, 0, 0, 0, 0)],
        ['year', Date.UTC(2018, 0, 1, 0, 0, 0, 0)],
    ] as const)(`should support %s precision in UTC`, (precision, expected) => {
        const date = new Date(utcInput.getTime())
        createPrecisionMethod(precision, true)(date)
        expect(date.getTime()).toBe(expected)
    })

    it('should not use local time setters in UTC mode', () => {
        const localSetters = [
            'setMilliseconds',
            'setSeconds',
            'setMinutes',
            'setHours',
            'setDate',
            'setMonth',
        ] as const
        const spies = localSetters.map(setter => jest.spyOn(Date.prototype, setter))

        try {
            createPrecisionMethod('year', true)(new Date(utcInput.getTime()))
            spies.forEach(spy => expect(spy).not.toHaveBeenCalled())
        } finally {
            spies.forEach(spy => spy.mockRestore())
        }
    })
})

describe('createDateNormalizer', () => {
    it('should truncate parsed dates in UTC when useUTC is true', () => {
        const normalize = createDateNormalizer({
            format: '%Y-%m-%dT%H:%M',
            precision: 'day',
            useUTC: true,
        })

        expect(normalize('2024-03-10T07:30')?.getTime()).toBe(Date.UTC(2024, 2, 10))
    })

    it('should truncate native dates in UTC when useUTC is true', () => {
        const normalize = createDateNormalizer({ precision: 'hour', useUTC: true })

        expect(normalize(new Date(Date.UTC(2024, 2, 10, 7, 45)))?.getTime()).toBe(
            Date.UTC(2024, 2, 10, 7)
        )
    })

    it('should truncate parsed dates in local time when useUTC is false', () => {
        const normalize = createDateNormalizer({
            format: '%Y-%m-%dT%H:%M',
            precision: 'day',
            useUTC: false,
        })

        expect(normalize('2024-03-10T07:30')?.getTime()).toBe(new Date(2024, 2, 10).getTime())
    })
})
