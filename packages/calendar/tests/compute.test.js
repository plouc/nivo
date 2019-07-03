import { getDayIndex } from '../src/compute'

describe('getDayIndex', () => {
    it('should return the day index based on the first day of the week', () => {
        const monday = new Date('2019-07-01T12:00')
        expect(getDayIndex(monday, 0)).toBe(1)
        expect(getDayIndex(monday, 1)).toBe(0)
        expect(getDayIndex(monday, 2)).toBe(6)
        expect(getDayIndex(monday, 3)).toBe(5)
        expect(getDayIndex(monday, 4)).toBe(4)
        expect(getDayIndex(monday, 5)).toBe(3)
        expect(getDayIndex(monday, 6)).toBe(2)
    })
})
