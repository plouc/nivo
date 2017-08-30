/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear, scaleOrdinal, scalePoint, scaleBand } from 'd3-scale'
import { computeAxisTicks } from '../../src/lib/axes'

describe('computeAxisTicks()', () => {
    const linearScale = scaleLinear().domain([0, 500]).range([0, 100])
    const ordinalScale = scaleOrdinal([0, 10, 20, 30]).domain(['A', 'B', 'C', 'D'])
    const pointScale = scalePoint().domain(['E', 'F', 'G', 'H']).range([0, 300])
    const bandScale = scaleBand().domain(['I', 'J', 'K', 'L']).rangeRound([0, 400])
    const width = 600
    const height = 400

    describe('from linear scale', () => {
        it('should compute ticks for top axis', () => {
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'top',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for right axis', () => {
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'right',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for bottom axis', () => {
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'bottom',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for left axis', () => {
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'left',
                })
            ).toMatchSnapshot()
        })
    })

    describe('from ordinal scale', () => {
        it('should compute ticks for top axis', () => {
            expect(
                computeAxisTicks({
                    scale: ordinalScale,
                    width,
                    height,
                    position: 'top',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for right axis', () => {
            expect(
                computeAxisTicks({
                    scale: ordinalScale,
                    width,
                    height,
                    position: 'right',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for bottom axis', () => {
            expect(
                computeAxisTicks({
                    scale: ordinalScale,
                    width,
                    height,
                    position: 'bottom',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for left axis', () => {
            expect(
                computeAxisTicks({
                    scale: ordinalScale,
                    width,
                    height,
                    position: 'left',
                })
            ).toMatchSnapshot()
        })
    })

    describe('from point scale', () => {
        it('should compute ticks for top axis', () => {
            expect(
                computeAxisTicks({
                    scale: pointScale,
                    width,
                    height,
                    position: 'top',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for right axis', () => {
            expect(
                computeAxisTicks({
                    scale: pointScale,
                    width,
                    height,
                    position: 'right',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for bottom axis', () => {
            expect(
                computeAxisTicks({
                    scale: pointScale,
                    width,
                    height,
                    position: 'bottom',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for left axis', () => {
            expect(
                computeAxisTicks({
                    scale: pointScale,
                    width,
                    height,
                    position: 'left',
                })
            ).toMatchSnapshot()
        })
    })

    describe('from band scale', () => {
        it('ticks should be centered', () => {
            const ticks = computeAxisTicks({
                scale: bandScale,
                width,
                height,
                position: 'top',
            })
            expect(ticks.ticks[0].x).toBe(50)
        })

        it('should compute ticks for top axis', () => {
            expect(
                computeAxisTicks({
                    scale: bandScale,
                    width,
                    height,
                    position: 'top',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for right axis', () => {
            expect(
                computeAxisTicks({
                    scale: bandScale,
                    width,
                    height,
                    position: 'right',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for bottom axis', () => {
            expect(
                computeAxisTicks({
                    scale: bandScale,
                    width,
                    height,
                    position: 'bottom',
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for left axis', () => {
            expect(
                computeAxisTicks({
                    scale: bandScale,
                    width,
                    height,
                    position: 'left',
                })
            ).toMatchSnapshot()
        })
    })

    describe('using canvas engine', () => {
        it('should correctly map textAlign property', () => {
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'right',
                    engine: 'canvas',
                }).textAlign
            ).toBe('left')
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'top',
                    engine: 'canvas',
                }).textAlign
            ).toBe('center')
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'left',
                    engine: 'canvas',
                }).textAlign
            ).toBe('right')
        })

        it('should correctly map textBaseline property', () => {
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'top',
                    engine: 'canvas',
                }).textBaseline
            ).toBe('bottom')
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'right',
                    engine: 'canvas',
                }).textBaseline
            ).toBe('middle')
            expect(
                computeAxisTicks({
                    scale: linearScale,
                    width,
                    height,
                    position: 'bottom',
                    engine: 'canvas',
                }).textBaseline
            ).toBe('top')
        })
    })
})
