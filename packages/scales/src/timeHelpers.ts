import { timeParse, utcParse } from 'd3-time-format'

export const timePrecisions = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'month',
    'year',
] as const

export type TIME_PRECISION = (typeof timePrecisions)[number]

export const precisionCutOffs: ((date: Date) => void)[] = [
    date => date.setMilliseconds(0),
    date => date.setSeconds(0),
    date => date.setMinutes(0),
    date => date.setHours(0),
    date => date.setDate(1),
    date => date.setMonth(0),
]

export const utcPrecisionCutOffs: ((date: Date) => void)[] = [
    date => date.setUTCMilliseconds(0),
    date => date.setUTCSeconds(0),
    date => date.setUTCMinutes(0),
    date => date.setUTCHours(0),
    date => date.setUTCDate(1),
    date => date.setUTCMonth(0),
]

const getCutOffsByType = (
    cutOffs: ((date: Date) => void)[]
): Record<TIME_PRECISION, ((date: Date) => void)[]> => ({
    millisecond: [],
    second: cutOffs.slice(0, 1),
    minute: cutOffs.slice(0, 2),
    hour: cutOffs.slice(0, 3),
    day: cutOffs.slice(0, 4),
    month: cutOffs.slice(0, 5),
    year: cutOffs.slice(0, 6),
})

export const precisionCutOffsByType = getCutOffsByType(precisionCutOffs)
export const utcPrecisionCutOffsByType = getCutOffsByType(utcPrecisionCutOffs)

export const createPrecisionMethod =
    (precision: TIME_PRECISION, useUTC = false) =>
    (date: Date) => {
        const cutOffsByType = useUTC ? utcPrecisionCutOffsByType : precisionCutOffsByType
        cutOffsByType[precision].forEach(cutOff => {
            cutOff(date)
        })

        return date
    }

export const createDateNormalizer = ({
    format = 'native',
    precision = 'millisecond',
    useUTC = true,
}: {
    format?: 'native' | string
    precision?: TIME_PRECISION
    useUTC?: boolean
}) => {
    const precisionFn = createPrecisionMethod(precision, useUTC)

    return (value: Date | string | undefined) => {
        if (value === undefined) {
            return value
        }

        if (format === 'native' || value instanceof Date) {
            return precisionFn(value as Date)
        }

        const parseTime = useUTC ? utcParse(format) : timeParse(format)
        return precisionFn(parseTime(value as string) as Date)
    }
}
