/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear, scaleOrdinal, scalePoint, scaleBand, scaleTime, scaleUtc } from 'd3-scale'
import { getScaleTicks, computeCartesianTicks } from '../src/compute'

describe('getTicks', () => {
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

                intervalTimeScale.useUTC = true

                expect(getScaleTicks(intervalTimeScale, `every ${interval.interval}`)).toEqual(
                    interval.expect
                )
            })
        })
    })
})

describe('computeCartesianTicks()', () => {
    const ordinalScale = scaleOrdinal([0, 10, 20, 30]).domain(['A', 'B', 'C', 'D'])
    const pointScale = scalePoint().domain(['E', 'F', 'G', 'H']).range([0, 300])
    const bandScale = scaleBand().domain(['I', 'J', 'K', 'L']).rangeRound([0, 400])
    const linearScale = scaleLinear().domain([0, 500]).range([0, 100])

    describe('from linear scale', () => {
        it('should compute ticks for x axis', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'x',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                })
            ).toMatchSnapshot()
        })

        it('should allow to customize tick values', () => {
            const tickValues = [10, 20, 30]
            const axis = computeCartesianTicks({
                scale: linearScale,
                tickValues,
                axis: 'x',
            })
            expect(axis.ticks.map(({ value }) => value)).toEqual(tickValues)
        })

        it('should allow to customize tick count', () => {
            const axis = computeCartesianTicks({
                scale: linearScale,
                tickValues: 1,
                axis: 'y',
            })
            expect(axis.ticks.length).toBe(2)
        })
    })

    describe('from ordinal scale', () => {
        it('should compute ticks for x axis', () => {
            expect(
                computeCartesianTicks({
                    scale: ordinalScale,
                    axis: 'x',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: ordinalScale,
                    axis: 'y',
                })
            ).toMatchSnapshot()
        })
    })

    describe('from point scale', () => {
        it('should compute ticks for x axis', () => {
            expect(
                computeCartesianTicks({
                    scale: pointScale,
                    axis: 'x',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: pointScale,
                    axis: 'y',
                })
            ).toMatchSnapshot()
        })
    })

    describe('from band scale', () => {
        it('ticks should be centered', () => {
            const ticks = computeCartesianTicks({
                scale: bandScale,
                axis: 'x',
            })
            expect(ticks.ticks[0].x).toBe(50)
        })

        it('should compute ticks for x axis', () => {
            expect(
                computeCartesianTicks({
                    scale: bandScale,
                    axis: 'x',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: bandScale,
                    axis: 'y',
                })
            ).toMatchSnapshot()
        })
    })

    describe('using canvas engine', () => {
        it('should correctly map textAlign property', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                    engine: 'canvas',
                }).textAlign
            ).toBe('right')
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                    ticksPosition: 'after',
                    engine: 'canvas',
                }).textAlign
            ).toBe('left')
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'x',
                    engine: 'canvas',
                }).textAlign
            ).toBe('center')
        })

        it('should correctly map textBaseline property', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'x',
                    engine: 'canvas',
                }).textBaseline
            ).toBe('bottom')
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                    engine: 'canvas',
                }).textBaseline
            ).toBe('middle')
        })
    })
})
