import {
    CountableTimeInterval,
    timeMillisecond,
    utcMillisecond,
    timeSecond,
    utcSecond,
    timeMinute,
    utcMinute,
    timeHour,
    utcHour,
    timeWeek,
    utcWeek,
    timeSunday,
    utcSunday,
    timeMonday,
    utcMonday,
    timeTuesday,
    utcTuesday,
    timeWednesday,
    utcWednesday,
    timeThursday,
    utcThursday,
    timeFriday,
    utcFriday,
    timeSaturday,
    utcSaturday,
    timeMonth,
    utcMonth,
    timeYear,
    utcYear,
    timeInterval,
} from 'd3-time'
import { ScaleValue, TicksSpec, AnyScale, ScaleWithBandwidth } from './types'

export const centerScale = <Value>(scale: ScaleWithBandwidth) => {
    const bandwidth = scale.bandwidth()

    if (bandwidth === 0) return scale

    let offset = bandwidth / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return <T extends Value>(d: T) => (scale(d) ?? 0) + offset
}

const timeDay = timeInterval(
    date => date.setHours(0, 0, 0, 0),
    (date, step) => date.setDate(date.getDate() + step),
    (start, end) => (end.getTime() - start.getTime()) / 864e5,
    date => Math.floor(date.getTime() / 864e5)
)

const utcDay = timeInterval(
    date => date.setUTCHours(0, 0, 0, 0),
    (date, step) => date.setUTCDate(date.getUTCDate() + step),
    (start, end) => (end.getTime() - start.getTime()) / 864e5,
    date => Math.floor(date.getTime() / 864e5)
)

const timeByType: Record<string, [CountableTimeInterval, CountableTimeInterval]> = {
    millisecond: [timeMillisecond, utcMillisecond],
    second: [timeSecond, utcSecond],
    minute: [timeMinute, utcMinute],
    hour: [timeHour, utcHour],
    day: [timeDay, utcDay],
    week: [timeWeek, utcWeek],
    sunday: [timeSunday, utcSunday],
    monday: [timeMonday, utcMonday],
    tuesday: [timeTuesday, utcTuesday],
    wednesday: [timeWednesday, utcWednesday],
    thursday: [timeThursday, utcThursday],
    friday: [timeFriday, utcFriday],
    saturday: [timeSaturday, utcSaturday],
    month: [timeMonth, utcMonth],
    year: [timeYear, utcYear],
}

const timeTypes = Object.keys(timeByType)
const timeIntervalRegexp = new RegExp(`^every\\s*(\\d+)?\\s*(${timeTypes.join('|')})s?$`, 'i')

const isInteger = (value: unknown): value is number =>
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value

export const getScaleTicks = <Value extends ScaleValue>(
    scale: AnyScale,
    spec?: TicksSpec<Value>
) => {
    // specific values
    if (Array.isArray(spec)) {
        return spec
    }

    if (typeof spec === 'string' && 'useUTC' in scale) {
        // time interval
        const matches = spec.match(timeIntervalRegexp)

        if (matches) {
            const [, amount, type] = matches
            // UTC is used as it's more predictable
            // however local time could be used too
            // let's see how it fits users' requirements
            const timeType = timeByType[type][scale.useUTC ? 1 : 0]

            if (type === 'day') {
                const [start, originalStop] = scale.domain()
                const stop = new Date(originalStop)

                // Set range to include last day in the domain since `interval.range` function is exclusive stop
                stop.setDate(stop.getDate() + 1)

                return timeType.every(Number(amount ?? 1))?.range(start, stop) ?? []
            }

            if (amount === undefined) {
                return scale.ticks(timeType)
            }

            const interval = timeType.every(Number(amount))

            if (interval) {
                return scale.ticks(interval)
            }
        }

        throw new Error(`Invalid tickValues: ${spec}`)
    }

    // continuous scales
    if ('ticks' in scale) {
        // default behaviour
        if (spec === undefined) {
            return scale.ticks()
        }

        // specific tick count
        if (isInteger(spec)) {
            return scale.ticks(spec)
        }
    }

    // non linear scale default
    return scale.domain()
}
