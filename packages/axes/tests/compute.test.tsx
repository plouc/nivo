import { scaleLinear, scaleOrdinal, scalePoint, scaleBand } from 'd3-scale'
// @ts-ignore
import { computeCartesianTicks } from '../src/compute'

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
