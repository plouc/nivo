import * as React from 'react'
import { ScaleValue, TicksSpec } from '@nivo/scales'
import { SpringValues } from '@react-spring/web'

export type GridValuesBuilder<T> = T extends number
    ? number[]
    : T extends string
    ? string[]
    : T extends Date
    ? Date[]
    : never

export type GridValues<T extends ScaleValue> = number | GridValuesBuilder<T>

export type Point = {
    x: number
    y: number
}

export type AxisLegendPosition = 'start' | 'middle' | 'end'

export type ValueFormatter<Value extends ScaleValue> = (value: Value) => Value | string

export interface AxisProps<Value extends ScaleValue = any> {
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
    ariaHidden?: boolean
}

export interface CanvasAxisProp<Value extends ScaleValue> extends Omit<AxisProps<Value>, 'legend'> {
    legend?: string
}

export interface AxisTickProps<Value extends ScaleValue> {
    tickIndex: number
    value: Value
    format?: ValueFormatter<Value>
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
    onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, value: Value | string) => void
}

export type Line = {
    key: string
    x1: number
    x2: number
    y1: number
    y2: number
}
