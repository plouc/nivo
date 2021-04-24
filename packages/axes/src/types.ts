import { SpringValues } from 'react-spring'
import {
    ScaleBand,
    ScaleLinear,
    ScaleOrdinal,
    ScalePoint,
    ScaleTime,
    ScaleSymLog,
    ScaleLogarithmic,
} from 'd3-scale'
import React from 'react'

export type AxisValue = string | number | Date

export type GridValuesBuilder<T> = T extends number
    ? number[]
    : T extends string
    ? string[]
    : T extends Date
    ? Date[]
    : never

export type GridValues<T extends AxisValue> = number | GridValuesBuilder<T>

export type Point = {
    x: number
    y: number
}

export type ScaleWithBandwidth =
    | (ScaleBand<any> & { type: 'band' })
    | (ScalePoint<any> & { type: 'point' })

export type AnyScale =
    | (ScaleLinear<any, any> & { type: 'linear' })
    | (ScaleOrdinal<any, any> & { type: 'ordinal' })
    | (ScaleTime<any, any> & { useUTC: boolean; type: 'time' })
    | (ScaleSymLog<any, any> & { type: 'symlog' })
    | (ScaleLogarithmic<any, any> & { type: 'log' })
    | ScaleWithBandwidth

export type TicksSpec<Value extends AxisValue> =
    // exact number of ticks, please note that
    // depending on the current range of values,
    // you might not get this exact count
    | number
    // string is used for Date based scales,
    // it can express a time interval,
    // for example: every 2 weeks
    | string
    // override scale ticks with custom explicit values
    | Value[]

export type AxisLegendPosition = 'start' | 'middle' | 'end'

export type ValueFormatter<Value extends AxisValue> = (value: Value) => Value

export interface AxisProp<Value extends AxisValue> {
    ticksPosition?: 'before' | 'after'
    tickValues?: TicksSpec<Value>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: string | ValueFormatter<Value>
    renderTick?: (props: AxisTickProps<Value>) => JSX.Element
    legend?: React.ReactNode
    legendPosition?: AxisLegendPosition
    legendOffset?: number
}

export interface CanvasAxisProp<Value extends string | number | Date>
    extends Omit<AxisProp<Value>, 'legend'> {
    legend?: string
}

export interface AxisProps<Value extends AxisValue = any> {
    axis: 'x' | 'y'
    scale: AnyScale
    x?: number
    y?: number
    length: number
    ticksPosition: 'before' | 'after'
    tickValues?: TicksSpec<Value>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: string | ValueFormatter<Value>
    renderTick?: (props: AxisTickProps<Value>) => JSX.Element
    legend?: React.ReactNode
    legendPosition?: 'start' | 'middle' | 'end'
    legendOffset?: number
    onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, value: Value) => void
    ariaHidden?: boolean
}

export interface AxisTickProps<Value extends AxisValue> {
    tickIndex: number
    value: Value
    format?: string | ValueFormatter<Value>
    x: number
    y: number
    lineX: number
    lineY: number
    textX: number
    textY: number
    textBaseline: string
    textAnchor: string
    opacity?: number
    rotate?: number
    animatedProps: SpringValues<{
        opacity: number
        textTransform: string
        transform: string
    }>
    onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, value: Value) => void
}

export type Line = {
    key: string
    x1: number
    x2: number
    y1: number
    y2: number
}
