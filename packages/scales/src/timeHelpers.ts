/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { timeParse, utcParse } from 'd3-time-format'
import { TimeScaleOptions } from './timeScale'

export const timePrecisions = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year']

export const precisionCutOffs = [
    (date: Date) => date.setMilliseconds(0),
    (date: Date) => date.setSeconds(0),
    (date: Date) => date.setMinutes(0),
    (date: Date) => date.setHours(0),
    (date: Date) => date.setDate(1),
    (date: Date) => date.setMonth(0),
]

export const precisionCutOffsByType = {
    millisecond: [],
    second: precisionCutOffs.slice(0, 1),
    minute: precisionCutOffs.slice(0, 2),
    hour: precisionCutOffs.slice(0, 3),
    day: precisionCutOffs.slice(0, 4),
    month: precisionCutOffs.slice(0, 5),
    year: precisionCutOffs.slice(0, 6),
}

export type TimeScalePrecision = keyof typeof precisionCutOffsByType

export const createPrecisionMethod = (precision: TimeScalePrecision) => (date: Date) => {
    precisionCutOffsByType[precision].forEach((cutOff: (date: Date) => void) => {
        cutOff(date)
    })

    return date
}

export const createDateNormalizer = ({
    format = 'native',
    precision = 'millisecond',
    useUTC = true,
}: Pick<TimeScaleOptions, 'format' | 'precision' | 'useUTC'>) => {
    const precisionFn = createPrecisionMethod(precision)
    if (format === 'native') {
        return (v: Date) => precisionFn(v)
    }

    const parseTime = useUTC ? utcParse(format) : timeParse(format)

    return (dateString: string) => {
        const date = parseTime(dateString) as Date

        return precisionFn(date)
    }
}
