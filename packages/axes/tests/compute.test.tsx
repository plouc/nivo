import { scaleLinear, scaleOrdinal, scalePoint, scaleBand } from 'd3-scale'
import { castLinearScale, castBandScale, castPointScale } from '@bitbloom/nivo-scales'
// @ts-ignore
import { computeCartesianTicks } from '../src/compute'

describe('computeCartesianTicks()', () => {
    const ordinalScale = scaleOrdinal([0, 10, 20, 30]).domain(['A', 'B', 'C', 'D'])
    const pointScale = castPointScale(scalePoint().domain(['E', 'F', 'G', 'H']).range([0, 300]))
    const bandScale = castBandScale(scaleBand().domain(['I', 'J', 'K', 'L']).rangeRound([0, 400]))
    const linearScale = castLinearScale(scaleLinear().domain([0, 500]).range([0, 100]), false)

    describe('from linear scale', () => {
        it('should compute ticks for x axis', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'x',
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                })
            ).toMatchSnapshot()
        })

        it('should allow to customize tick values', () => {
            const tickValues = [10, 20, 30]
            const axis = computeCartesianTicks({
                scale: linearScale,
                tickValues,
                axis: 'x',
                ticksPosition: 'after',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
            })
            expect(axis.ticks.map(({ value }) => value)).toEqual(tickValues)
        })

        it('should allow to customize tick count', () => {
            const axis = computeCartesianTicks({
                scale: linearScale,
                tickValues: 1,
                axis: 'y',
                ticksPosition: 'after',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
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
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: ordinalScale,
                    axis: 'y',
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
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
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: pointScale,
                    axis: 'y',
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                })
            ).toMatchSnapshot()
        })
    })

    describe('from band scale', () => {
        it('ticks should be centered', () => {
            const ticks = computeCartesianTicks({
                scale: bandScale,
                axis: 'x',
                ticksPosition: 'after',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
            })
            expect(ticks.ticks[0].x).toBe(50)
        })

        it('should compute ticks for x axis', () => {
            expect(
                computeCartesianTicks({
                    scale: bandScale,
                    axis: 'x',
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                })
            ).toMatchSnapshot()
        })

        it('should compute ticks for y axis', () => {
            expect(
                computeCartesianTicks({
                    scale: bandScale,
                    axis: 'y',
                    ticksPosition: 'after',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
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
                    ticksPosition: 'before',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                }).textAlign
            ).toBe('right')
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                    ticksPosition: 'after',
                    engine: 'canvas',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                }).textAlign
            ).toBe('left')
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'x',
                    engine: 'canvas',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                }).textAlign
            ).toBe('center')
        })

        it('should correctly map textBaseline property', () => {
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'x',
                    engine: 'canvas',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                }).textBaseline
            ).toBe('bottom')
            expect(
                computeCartesianTicks({
                    scale: linearScale,
                    axis: 'y',
                    engine: 'canvas',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                }).textBaseline
            ).toBe('middle')
        })
    })
})
