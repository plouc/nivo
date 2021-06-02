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
import { timeFormat } from 'd3-time-format'
import { format as d3Format } from 'd3-format'
// @ts-ignore
import { textPropsByEngine } from '@nivo/core'
import {
    AxisValue,
    Point,
    TicksSpec,
    AnyScale,
    ScaleWithBandwidth,
    ValueFormatter,
    Line,
} from './types'

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

const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)

export const getScaleTicks = <Value extends AxisValue>(
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
            // UTC is used as it's more predictible
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

export const computeCartesianTicks = <Value extends AxisValue>({
    axis,
    scale,
    ticksPosition,
    tickValues,
    tickSize,
    tickPadding,
    tickRotation,
    engine = 'svg',
}: {
    axis: 'x' | 'y'
    scale: AnyScale
    ticksPosition?: 'after' | 'before'
    tickValues?: TicksSpec<Value>
    tickSize: number
    tickPadding: number
    tickRotation: number
    engine?: 'svg' | 'canvas'
}) => {
    const values = getScaleTicks(scale, tickValues)

    const textProps = textPropsByEngine[engine]

    const position = 'bandwidth' in scale ? centerScale(scale) : scale
    const line = { lineX: 0, lineY: 0 }
    const text = { textX: 0, textY: 0 }

    const isRTL = typeof document === 'object' ? document.dir === 'rtl' : false
    let translate: (value: Value) => Point
    let textAlign: CanvasTextAlign = textProps.align.center
    let textBaseline: CanvasTextBaseline = textProps.baseline.center

    if (axis === 'x') {
        translate = d => ({ x: position(d) ?? 0, y: 0 })

        line.lineY = tickSize * (ticksPosition === 'after' ? 1 : -1)
        text.textY = (tickSize + tickPadding) * (ticksPosition === 'after' ? 1 : -1)

        if (ticksPosition === 'after') {
            textBaseline = textProps.baseline.top
        } else {
            textBaseline = textProps.baseline.bottom
        }

        if (tickRotation === 0) {
            textAlign = textProps.align.center
        } else if (
            (ticksPosition === 'after' && tickRotation < 0) ||
            (ticksPosition === 'before' && tickRotation > 0)
        ) {
            textAlign = textProps.align[isRTL ? 'left' : 'right']
            textBaseline = textProps.baseline.center
        } else if (
            (ticksPosition === 'after' && tickRotation > 0) ||
            (ticksPosition === 'before' && tickRotation < 0)
        ) {
            textAlign = textProps.align[isRTL ? 'right' : 'left']
            textBaseline = textProps.baseline.center
        }
    } else {
        translate = d => ({ x: 0, y: position(d) ?? 0 })

        line.lineX = tickSize * (ticksPosition === 'after' ? 1 : -1)
        text.textX = (tickSize + tickPadding) * (ticksPosition === 'after' ? 1 : -1)

        if (ticksPosition === 'after') {
            textAlign = textProps.align.left
        } else {
            textAlign = textProps.align.right
        }
    }

    const ticks = values.map(value => ({
        key: typeof value === 'number' || typeof value === 'string' ? value : `${value}`,
        value,
        ...translate(value),
        ...line,
        ...text,
    }))

    return {
        ticks,
        textAlign,
        textBaseline,
    }
}

export const getFormatter = <Value extends AxisValue>(
    format: string | ValueFormatter<Value> | undefined,
    scale: AnyScale
): ValueFormatter<Value> | undefined => {
    if (typeof format === 'undefined' || typeof format === 'function') return format

    if (scale.type === 'time') {
        const formatter = timeFormat(format)

        return (d => formatter(d instanceof Date ? d : new Date(d))) as ValueFormatter<Value>
    }

    return (d3Format(format) as unknown) as ValueFormatter<Value>
}

export const computeGridLines = <Value extends AxisValue>({
    width,
    height,
    scale,
    axis,
    values: _values,
}: {
    width: number
    height: number
    scale: AnyScale
    axis: 'x' | 'y'
    values?: TicksSpec<Value>
}) => {
    const lineValues = isArray<number>(_values) ? _values : undefined
    const values = lineValues || getScaleTicks(scale, _values)
    const position = 'bandwidth' in scale ? centerScale(scale) : scale

    const lines: Line[] =
        axis === 'x'
            ? values.map(value => ({
                  key: `${value}`,
                  x1: position(value) ?? 0,
                  x2: position(value) ?? 0,
                  y1: 0,
                  y2: height,
              }))
            : values.map(value => ({
                  key: `${value}`,
                  x1: 0,
                  x2: width,
                  y1: position(value) ?? 0,
                  y2: position(value) ?? 0,
              }))

    return lines
}
