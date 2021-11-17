import { timeFormat } from 'd3-time-format'
import { format as d3Format } from 'd3-format'
// @ts-ignore
import { textPropsByEngine } from '@nivo/core'
import { ScaleValue, AnyScale, TicksSpec, getScaleTicks, centerScale } from '@nivo/scales'
import { Point, ValueFormatter, Line } from './types'

const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)

export const computeCartesianTicks = <Value extends ScaleValue>({
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
    const values = getScaleTicks<Value>(scale, tickValues)

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

export const getFormatter = <Value extends ScaleValue>(
    format: string | ValueFormatter<Value> | undefined,
    scale: AnyScale
): ValueFormatter<Value> | undefined => {
    if (typeof format === 'undefined' || typeof format === 'function') return format

    if (scale.type === 'time') {
        const formatter = timeFormat(format)

        return ((d: any) => formatter(d instanceof Date ? d : new Date(d))) as ValueFormatter<Value>
    }

    return (d3Format(format) as unknown) as ValueFormatter<Value>
}

export const computeGridLines = <Value extends ScaleValue>({
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
    const values = lineValues || getScaleTicks<Value>(scale, _values)
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
