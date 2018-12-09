/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { timeParse } from 'd3-time-format'
import { TimeScaleConfig } from './timeScale'

export enum TimePrecision {
    Millisecond = 'millisecond',
    Second = 'second',
    Minute = 'minute',
    Hour = 'hour',
    Day = 'day',
    Month = 'month',
    Year = 'year',
}

type CutOffFn = (date: Date) => void

export const precisionCutOffs = [
    (date: Date) => date.setMilliseconds(0),
    (date: Date) => date.setSeconds(0),
    (date: Date) => date.setMinutes(0),
    (date: Date) => date.setHours(0),
    (date: Date) => date.setDate(1),
    (date: Date) => date.setMonth(0),
]

export const precisionCutOffsByType: {
    [key in TimePrecision]: CutOffFn[]
} = {
    [TimePrecision.Millisecond]: [],
    [TimePrecision.Second]: precisionCutOffs.slice(0, 1),
    [TimePrecision.Minute]: precisionCutOffs.slice(0, 2),
    [TimePrecision.Hour]: precisionCutOffs.slice(0, 3),
    [TimePrecision.Day]: precisionCutOffs.slice(0, 4),
    [TimePrecision.Month]: precisionCutOffs.slice(0, 5),
    [TimePrecision.Year]: precisionCutOffs.slice(0, 6),
}

export const createPrecisionMethod = (precision: TimePrecision) => (date: Date) => {
    precisionCutOffsByType[precision].forEach((cutOff) => {
        cutOff(date)
    })

    return date
}

export const createDateNormalizer = ({ format = 'native', precision = TimePrecision.Millisecond }: {
    format?: string, precision?: TimePrecision
}) => {
    const precisionFn = createPrecisionMethod(precision)
    if (format === 'native') return v => precisionFn(v)

    const parseTime = timeParse(format)
    return v => precisionFn(parseTime(v))
}
