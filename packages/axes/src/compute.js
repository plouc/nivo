/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import isNumber from 'lodash/isNumber'
import {
    timeMillisecond,
    timeSecond,
    timeMinute,
    timeHour,
    timeDay,
    timeWeek,
    timeSunday,
    timeMonday,
    timeTuesday,
    timeWednesday,
    timeThursday,
    timeFriday,
    timeSaturday,
    timeMonth,
    timeYear,
} from 'd3-time'
import { timeFormat } from 'd3-time-format'
import { format as d3Format } from 'd3-format'
import { textPropsByEngine } from '@nivo/core'

export const centerScale = scale => {
    const bandwidth = scale.bandwidth()

    if (bandwidth === 0) return scale

    let offset = bandwidth / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return d => scale(d) + offset
}

const timeByType = {
    millisecond: timeMillisecond,
    second: timeSecond,
    minute: timeMinute,
    hour: timeHour,
    day: timeDay,
    week: timeWeek,
    sunday: timeSunday,
    monday: timeMonday,
    tuesday: timeTuesday,
    wednesday: timeWednesday,
    thursday: timeThursday,
    friday: timeFriday,
    saturday: timeSaturday,
    month: timeMonth,
    year: timeYear,
}

const timeTypes = Object.keys(timeByType)
const timeIntervalRegexp = new RegExp(`^every\\s*(\\d+)?\\s*(${timeTypes.join('|')})s?$`, 'i')

export const getScaleTicks = (scale, spec) => {
    // specific values
    if (Array.isArray(spec)) {
        return spec
    }

    // continuous scales
    if (scale.ticks) {
        // default behaviour
        if (spec === undefined) {
            return scale.ticks()
        }

        // specific tick count
        if (isNumber(spec)) {
            return scale.ticks(spec)
        }

        if (typeof spec === 'string') {
            // time interval
            const matches = spec.match(timeIntervalRegexp)
            if (matches) {
                const timeType = timeByType[matches[2]]
                if (matches[1] === undefined) {
                    return scale.ticks(timeType)
                }

                return scale.ticks(timeType.every(Number(matches[1])))
            }

            throw new Error(`Invalid tickValues: ${spec}`)
        }
    }

    // non linear scale default
    return scale.domain()
}

export const computeCartesianTicks = ({
    axis,
    scale,
    ticksPosition,
    tickValues,
    tickSize,
    tickPadding,
    tickRotation,
    engine = 'svg',
}) => {
    const values = getScaleTicks(scale, tickValues)

    const textProps = textPropsByEngine[engine]

    const position = scale.bandwidth ? centerScale(scale) : scale
    const line = { lineX: 0, lineY: 0 }
    const text = { textX: 0, textY: 0 }

    let translate
    let textAlign = textProps.align.center
    let textBaseline = textProps.baseline.center

    if (axis === 'x') {
        translate = d => ({ x: position(d), y: 0 })

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
        translate = d => ({ x: 0, y: position(d) })

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

export const getFormatter = (format, scale) => {
    if (!format || typeof format === 'function') return format

    if (scale.type === 'time') {
        const f = timeFormat(format)
        return d => f(new Date(d))
    }

    return d3Format(format)
}

export const computeGridLines = ({ width, height, scale, axis, values: _values }) => {
    const lineValues = Array.isArray(_values) ? _values : undefined
    const lineCount = isNumber(_values) ? _values : undefined

    const values = lineValues || getScaleTicks(scale, lineCount)

    const position = scale.bandwidth ? centerScale(scale) : scale

    let lines
    if (axis === 'x') {
        lines = values.map(v => ({
            key: `${v}`,
            x1: position(v),
            x2: position(v),
            y1: 0,
            y2: height,
        }))
    } else if (axis === 'y') {
        lines = values.map(v => ({
            key: `${v}`,
            x1: 0,
            x2: width,
            y1: position(v),
            y2: position(v),
        }))
    }

    return lines
}
