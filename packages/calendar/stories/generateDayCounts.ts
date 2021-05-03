import shuffle from 'lodash/shuffle'
import { timeDays } from 'd3-time'
import { timeFormat } from 'd3-time-format'
/*
 * generating some random data
 *
 * Copied from
 * https://github.com/plouc/nivo/blob/master/packages/generators/src/index.js#L105
 * since that package does not have typedefs I just copied it over
 * */
export const generateDayCounts = (
    { from, to, maxSize = 0.9 }:
        { from: Date, to: Date, maxSize?: number }
) => {
    const days = timeDays(from, to)

    const size =
        Math.round(days.length * (maxSize * 0.4)) +
        Math.round(Math.random() * (days.length * (maxSize * 0.6)))

    const dayFormat = timeFormat('%Y-%m-%d')

    return shuffle(days)
        .slice(0, size)
        .map(day => {
            return {
                day: dayFormat(day),
                value: Math.round(Math.random() * 400),
            }
        })
}

export const generateOrderedDayCounts = (
    { from, to }:
        { from: Date, to: Date }
) => {
    const days = timeDays(from, to)
    const dayFormat = timeFormat('%Y-%m-%d')

    return days
        .map(day => {
            return {
                value: Math.round(Math.random() * 400),
                date: day,
                day: dayFormat(day),
            }
        })
}
