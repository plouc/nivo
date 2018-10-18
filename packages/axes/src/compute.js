/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import isNumber from 'lodash/isNumber'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
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

export const getScaleTicks = (scale, tickCount) => {
    if (scale.ticks) return scale.ticks(tickCount)
    return scale.domain()
}

export const computeCartesianTicks = ({
    axis,
    scale,
    ticksPosition,
    tickValues: _tickValues,
    tickSize,
    tickPadding,
    tickRotation,
    engine = 'svg',
}) => {
    const tickValues = isArray(_tickValues) ? _tickValues : undefined
    const tickCount = isNumber(_tickValues) ? _tickValues : undefined

    const values = tickValues || getScaleTicks(scale, tickCount)

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
    if (!format || isFunction(format)) return format

    if (scale.type === 'time') {
        const f = timeFormat(format)
        return d => f(new Date(d))
    }

    return d3Format(format)
}
