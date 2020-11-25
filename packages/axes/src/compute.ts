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
    timeDay,
    utcDay,
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
} from 'd3-time'
import { timeFormat } from 'd3-time-format'
import { format as d3Format } from 'd3-format'
// @ts-ignore
import { textPropsByEngine } from '@nivo/core'
import { Point, TicksSpec, AnyScale, ScaleWithBandwidth, ValueFormatter, Line } from './types'

export const centerScale = (scale: ScaleWithBandwidth) => {
    const bandwidth = scale.bandwidth()

    if (bandwidth === 0) return scale

    let offset = bandwidth / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return <T>(d: T) => (scale(d) ?? 0) + offset
}

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

export const getScaleTicks = <Value>(scale: AnyScale, spec?: TicksSpec<Value>) => {
    // specific values
    if (Array.isArray(spec)) {
        return spec
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

        if (typeof spec === 'string' && 'useUTC' in scale) {
            // time interval
            const matches = spec.match(timeIntervalRegexp)
            if (matches) {
                // UTC is used as it's more predictible
                // however local time could be used too
                // let's see how it fits users' requirements
                const timeType = timeByType[matches[2]][scale.useUTC ? 1 : 0]

                if (matches[1] === undefined) {
                    return scale.ticks(timeType)
                }

                const interval = timeType.every(Number(matches[1]))

                if (interval) {
                    return scale.ticks(interval)
                }
            }

            throw new Error(`Invalid tickValues: ${spec}`)
        }
    }

    // non linear scale default
    return scale.domain()
}

export const computeCartesianTicks = <Value>({
    axis,
    scale,
    ticksPosition,
    tickValues,
    tickSize = NaN,
    tickPadding = NaN,
    tickRotation = NaN,
    engine = 'svg',
}: {
    axis: 'x' | 'y'
    scale: AnyScale
    ticksPosition?: 'after' | 'before'
    tickValues?: TicksSpec<Value>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    engine?: 'svg' | 'canvas'
}) => {
    const values = getScaleTicks(scale, tickValues)

    const textProps = textPropsByEngine[engine]

    const position = 'bandwidth' in scale ? centerScale(scale) : scale
    const line = { lineX: 0, lineY: 0 }
    const text = { textX: 0, textY: 0 }

    let translate: (value: string | number) => Point
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
            textAlign = textProps.align.right
            textBaseline = textProps.baseline.center
        } else if (
            (ticksPosition === 'after' && tickRotation > 0) ||
            (ticksPosition === 'before' && tickRotation < 0)
        ) {
            textAlign = textProps.align.left
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
        key: value,
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

export const getFormatter = (
    format: string | ValueFormatter,
    scale: AnyScale
): ValueFormatter | undefined => {
    if (typeof format === 'undefined' || typeof format === 'function') return format

    if (scale.type === 'time') {
        const formatter = timeFormat(format)
        return (d: number | string) => formatter(new Date(d))
    }

    return d3Format(format) as ValueFormatter
}

export const computeGridLines = <Value>({
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
    const lineCount = isInteger(_values) ? _values : undefined

    const values = lineValues || getScaleTicks(scale, lineCount)

    const position = 'bandwidth' in scale ? centerScale(scale) : scale

    const lines: Line[] = values.map(value => {
        const key = `${value}`

        return axis === 'x'
            ? {
                  key,
                  x1: position(value) ?? 0,
                  x2: position(value) ?? 0,
                  y1: 0,
                  y2: height,
              }
            : {
                  key,
                  x1: 0,
                  x2: width,
                  y1: position(value) ?? 0,
                  y2: position(value) ?? 0,
              }
    })

    return lines
}
