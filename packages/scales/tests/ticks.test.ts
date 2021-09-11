import { scaleLinear, scaleTime, scaleUtc } from 'd3-scale'
// @ts-ignore
import { getScaleTicks } from '../src'

describe('linear scale', () => {
    const linearScale = scaleLinear().domain([0, 500])

    it('should return default ticks', () => {
        expect(getScaleTicks(linearScale)).toEqual([
            0,
            50,
            100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
        ])
    })

    it('should support using a count', () => {
        expect(getScaleTicks(linearScale, 6)).toEqual([0, 100, 200, 300, 400, 500])
    })

    it('should support using specific values', () => {
        expect(getScaleTicks(linearScale, [0, 200, 400])).toEqual([0, 200, 400])
    })
})

describe('time scale', () => {
    const timeScale = scaleUtc().domain([
        new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
        new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
    ])

    it('should return default ticks', () => {
        expect(getScaleTicks(timeScale)).toEqual([
            new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 2, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 3, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 4, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 5, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 6, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 7, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 8, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 9, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 10, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 11, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
        ])
    })

    it('should support using a count', () => {
        expect(getScaleTicks(timeScale, 4)).toEqual([
            new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 3, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 6, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2000, 9, 1, 0, 0, 0, 0)),
            new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
        ])
    })

    it('should support non-UTC dates', () => {
        const noUtcTimeScale = scaleTime().domain([
            new Date(2000, 0, 1, 0, 0, 0, 0),
            new Date(2001, 0, 1, 0, 0, 0, 0),
        ])

        expect(getScaleTicks(noUtcTimeScale)).toEqual([
            new Date(2000, 0, 1, 0, 0, 0, 0),
            new Date(2000, 1, 1, 0, 0, 0, 0),
            new Date(2000, 2, 1, 0, 0, 0, 0),
            new Date(2000, 3, 1, 0, 0, 0, 0),
            new Date(2000, 4, 1, 0, 0, 0, 0),
            new Date(2000, 5, 1, 0, 0, 0, 0),
            new Date(2000, 6, 1, 0, 0, 0, 0),
            new Date(2000, 7, 1, 0, 0, 0, 0),
            new Date(2000, 8, 1, 0, 0, 0, 0),
            new Date(2000, 9, 1, 0, 0, 0, 0),
            new Date(2000, 10, 1, 0, 0, 0, 0),
            new Date(2000, 11, 1, 0, 0, 0, 0),
            new Date(2001, 0, 1, 0, 0, 0, 0),
        ])
    })

    const intervals = [
        {
            interval: '5 years',
            domain: [
                new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
            ],
            expect: [
                new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2005, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
            ],
        },
        {
            interval: 'year',
            domain: [
                new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2004, 0, 1, 0, 0, 0, 0)),
            ],
            expect: [
                new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2002, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2003, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2004, 0, 1, 0, 0, 0, 0)),
            ],
        },
        {
            interval: '3 months',
            domain: [
                new Date(Date.UTC(2009, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
            ],
            expect: [
                new Date(Date.UTC(2009, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2009, 3, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2009, 6, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2009, 9, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
            ],
        },
        {
            interval: '2 days',
            domain: [
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 7, 0, 0, 0, 0)),
            ],
            expect: [
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 3, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 5, 0, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 7, 0, 0, 0, 0)),
            ],
        },
        {
            interval: 'wednesday',
            domain: [
                new Date(Date.UTC(2010, 0, 1, 0, 0, 0)),
                new Date(Date.UTC(2010, 1, 1, 0, 0, 0)),
            ],
            expect: [
                new Date(Date.UTC(2010, 0, 6, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 13, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 20, 0, 0, 0)),
                new Date(Date.UTC(2010, 0, 27, 0, 0, 0)),
            ],
        },
        {
            interval: '30 minutes',
            domain: [
                new Date(Date.UTC(2010, 0, 1, 6, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 9, 0, 0)),
            ],
            expect: [
                new Date(Date.UTC(2010, 0, 1, 6, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 6, 30, 0)),
                new Date(Date.UTC(2010, 0, 1, 7, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 7, 30, 0)),
                new Date(Date.UTC(2010, 0, 1, 8, 0, 0)),
                new Date(Date.UTC(2010, 0, 1, 8, 30, 0)),
                new Date(Date.UTC(2010, 0, 1, 9, 0, 0)),
            ],
        },
    ]

    intervals.forEach(interval => {
        it(`should support ${interval.interval} interval`, () => {
            const intervalTimeScale = scaleUtc().domain(interval.domain)

            // set utc flag on our scale
            ;(intervalTimeScale as any).useUTC = true

            expect(getScaleTicks(intervalTimeScale, `every ${interval.interval}`)).toEqual(
                interval.expect
            )
        })
    })
})
