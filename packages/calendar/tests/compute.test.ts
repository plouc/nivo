import { bindDaysData } from '../src/compute/calendar'

describe('bindDaysData', () => {
    const colorScale = ((value: number) => `color-${value}`) as any
    const day = (d: string) => ({ day: d, date: new Date(d), x: 0, y: 0, size: 10 }) as any

    it('should bind data to matching days and leave others empty', () => {
        const days = [day('2020-01-01'), day('2020-01-02'), day('2020-01-03')]
        const data = [
            { day: '2020-01-03', value: 3 },
            { day: '2020-01-01', value: 1 },
        ]

        const result = bindDaysData({ days, data, colorScale, emptyColor: 'empty' })

        expect(result.map(d => [d.day, (d as any).value, d.color])).toEqual([
            ['2020-01-01', 1, 'color-1'],
            ['2020-01-02', undefined, 'empty'],
            ['2020-01-03', 3, 'color-3'],
        ])
        expect((result[0] as any).data).toBe(data[1])
    })

    it('should use the first datum when a day is duplicated', () => {
        const data = [
            { day: '2020-01-01', value: 1 },
            { day: '2020-01-01', value: 2 },
        ]

        const [result] = bindDaysData({
            days: [day('2020-01-01')],
            data,
            colorScale,
            emptyColor: 'empty',
        })

        expect((result as any).value).toBe(1)
    })
})
