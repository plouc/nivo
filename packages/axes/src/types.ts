import { SpringValues } from 'react-spring'
import { ScaleBand, ScaleLinear, ScalePoint } from 'd3-scale'
import React from 'react'

// export type AxisValue = string | number | Date

export type GridValuesBuilder<T> = T extends number
    ? number[]
    : T extends string
    ? string[]
    : T extends Date
    ? Date[]
    : never

export type GridValues<T extends string | number | Date> = number | GridValuesBuilder<T>

export type Point = {
    x: number
    y: number
}

export type AnyScale<Range, Output, Unknown> =
    | ScaleLinear<Range, Output, Unknown>
    | ScaleBand<Range>
    | ScalePoint<Range>

export type TicksSpec<Value> =
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

type NumberValue = number | { valueOf(): number }

interface CommonScale {
    domain(): unknown[]
    ticks<Count>(count?: Count): number[]

    useUTC?: boolean
    // type: 'linear' | 'symlog' | 'log' | 'point' | 'time' | 'band'
}

export interface OtherScale extends CommonScale {
    (value: unknown): number | undefined
    <Output>(value: NumberValue): Output | undefined
    <Output>(value: NumberValue | Date): Output | undefined
    <Domain extends string | number | Date, Output>(value: Domain): Output | undefined
    <Domain extends { toString(): string }, Output>(value: Domain): Output | undefined
    (value: NumberValue): number | undefined

    bandwidth: never
    type: 'linear' | 'symlog' | 'log' | 'time'
}

export interface ScaleWithBandwidth extends CommonScale {
    <Domain>(domain: Domain): number | undefined
    bandwidth(): number
    round(): boolean
    type: 'band' | 'point'
}

export type AllScales = ScaleWithBandwidth | OtherScale

export type AxisLegendPosition = 'start' | 'middle' | 'end'

export interface AxisProp<Value> {
    ticksPosition?: 'before' | 'after'
    tickValues?: TicksSpec<Value>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any
    renderTick?: any
    legend?: React.ReactNode
    legendPosition?: AxisLegendPosition
    legendOffset?: number
}

export interface CanvasAxisProp<Value> extends Omit<AxisProp<Value>, 'legend'> {
    legend?: string
}

export interface AxisProps<Scale = unknown> {
    axis: 'x' | 'y'
    // scale: AllScales
    scale: Scale
    x?: number
    y?: number
    length: number
    ticksPosition: 'before' | 'after'
    tickValues?: TicksSpec<number | string | Date>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any
    renderTick?: any
    legend?: React.ReactNode
    legendPosition?: 'start' | 'middle' | 'end'
    legendOffset?: number
    onClick?: any
    ariaHidden?: boolean
}

export interface AxisTickProps<Value extends number | string | Date> {
    value: Value
    format?: any
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

export type ValueFormatter = (value: number | string) => string

export type Line = {
    key: string
    x1: number
    x2: number
    y1: number
    y2: number
}
