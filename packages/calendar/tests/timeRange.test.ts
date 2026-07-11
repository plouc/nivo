import { computeCellPositions, computeTotalDays } from '../src/compute/timeRange'

const noop = () => '#000000'

describe('computeCellPositions()', () => {
    // https://github.com/plouc/nivo/issues/2814
    it('should include the first day of the range when from/to are date-only strings', () => {
        const days = computeCellPositions({
            direction: 'horizontal',
            colorScale: noop,
            emptyColor: '#eeeeee',
            from: '2018-04-01',
            to: '2018-08-12',
            data: [],
            cellWidth: 10,
            cellHeight: 10,
            daySpacing: 2,
            offset: 0,
            firstWeekday: 'sunday',
        })

        expect(days[0].day).toBe('2018-04-01')
    })

    // https://github.com/plouc/nivo/issues/2333
    it('should include the last day of the range when from/to are date-only strings', () => {
        const days = computeCellPositions({
            direction: 'horizontal',
            colorScale: noop,
            emptyColor: '#eeeeee',
            from: '2018-04-01',
            to: '2018-08-12',
            data: [],
            cellWidth: 10,
            cellHeight: 10,
            daySpacing: 2,
            offset: 0,
            firstWeekday: 'sunday',
        })

        expect(days[days.length - 1].day).toBe('2018-08-12')
    })

    it('should render a single-day range instead of an empty one', () => {
        const days = computeCellPositions({
            direction: 'horizontal',
            colorScale: noop,
            emptyColor: '#eeeeee',
            from: '2026-02-01',
            to: '2026-02-01',
            data: [],
            cellWidth: 10,
            cellHeight: 10,
            daySpacing: 2,
            offset: 0,
            firstWeekday: 'sunday',
        })

        expect(days.map(day => day.day)).toEqual(['2026-02-01'])
    })
})

describe('computeTotalDays()', () => {
    it('should count both endpoints as inclusive days', () => {
        // 2018-04-01 is a Sunday, so the leading weekday padding is 0 and
        // this reduces to a plain inclusive day count between the two dates
        const totalDays = computeTotalDays({
            from: '2018-04-01',
            to: '2018-08-12',
            data: [],
        })

        expect(totalDays).toBe(134)
    })

    it('should stay in sync with the number of cells computeCellPositions renders', () => {
        const from = '2018-04-01'
        const to = '2018-08-12'

        const totalDays = computeTotalDays({ from, to, data: [] })
        const days = computeCellPositions({
            direction: 'horizontal',
            colorScale: noop,
            emptyColor: '#eeeeee',
            from,
            to,
            data: [],
            cellWidth: 10,
            cellHeight: 10,
            daySpacing: 2,
            offset: 0,
            firstWeekday: 'sunday',
        })

        // computeTotalDays pads the count with `startDate.getDay()` leading
        // empty cells to align the first day under its weekday column, so it
        // will be >= the actual number of days in range, never less.
        expect(totalDays).toBeGreaterThanOrEqual(days.length)
    })
})
