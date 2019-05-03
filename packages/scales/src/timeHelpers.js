/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { timeParse, utcParse } from 'd3-time-format'

export const TIME_PRECISION_MILLISECOND = 'millisecond'
export const TIME_PRECISION_SECOND = 'second'
export const TIME_PRECISION_MINUTE = 'minute'
export const TIME_PRECISION_HOUR = 'hour'
export const TIME_PRECISION_DAY = 'day'
export const TIME_PRECISION_MONTH = 'month'
export const TIME_PRECISION_YEAR = 'year'

export const timePrecisions = [
    TIME_PRECISION_MILLISECOND,
    TIME_PRECISION_SECOND,
    TIME_PRECISION_MINUTE,
    TIME_PRECISION_HOUR,
    TIME_PRECISION_DAY,
    TIME_PRECISION_MONTH,
    TIME_PRECISION_YEAR,
]

export const precisionCutOffs = [
    date => date.setMilliseconds(0),
    date => date.setSeconds(0),
    date => date.setMinutes(0),
    date => date.setHours(0),
    date => date.setDate(1),
    date => date.setMonth(0),
]

export const precisionCutOffsByType = {
    [TIME_PRECISION_MILLISECOND]: [],
    [TIME_PRECISION_SECOND]: precisionCutOffs.slice(0, 1),
    [TIME_PRECISION_MINUTE]: precisionCutOffs.slice(0, 2),
    [TIME_PRECISION_HOUR]: precisionCutOffs.slice(0, 3),
    [TIME_PRECISION_DAY]: precisionCutOffs.slice(0, 4),
    [TIME_PRECISION_MONTH]: precisionCutOffs.slice(0, 5),
    [TIME_PRECISION_YEAR]: precisionCutOffs.slice(0, 6),
}

export const createPrecisionMethod = precision => date => {
    precisionCutOffsByType[precision].forEach(cutOff => {
        cutOff(date)
    })
    return date
}

export const createDateNormalizer = ({
    format = 'native',
    precision = 'millisecond',
    useUTC = true,
}) => {
    const precisionFn = createPrecisionMethod(precision)
    if (format === 'native') return v => precisionFn(v)

    const parseTime = useUTC ? utcParse(format) : timeParse(format)
    return v => precisionFn(parseTime(v))
}
