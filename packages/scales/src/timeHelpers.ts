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

export type TIME_PRECISION = typeof timePrecisions[number]

export const precisionCutOffs: ((date: Date) => void)[] = [
    date => date.setMilliseconds(0),
    date => date.setSeconds(0),
    date => date.setMinutes(0),
    date => date.setHours(0),
    date => date.setDate(1),
    date => date.setMonth(0),
]

export const precisionCutOffsByType: Record<TIME_PRECISION, ((date: Date) => void)[]> = {
    millisecond: [],
    second: precisionCutOffs.slice(0, 1),
    minute: precisionCutOffs.slice(0, 2),
    hour: precisionCutOffs.slice(0, 3),
    day: precisionCutOffs.slice(0, 4),
    month: precisionCutOffs.slice(0, 5),
    year: precisionCutOffs.slice(0, 6),
}

export const createPrecisionMethod = (precision: TIME_PRECISION) => (date: Date) => {
    precisionCutOffsByType[precision].forEach(cutOff => {
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
    const precisionFn = createPrecisionMethod(precision)

    return (value: Date | string) => {
        if (format === 'native' || value instanceof Date) {
            return precisionFn(value as Date)
        }

        const parseTime = useUTC ? utcParse(format) : timeParse(format)
        return precisionFn(parseTime(value as string) as Date)
    }
}
