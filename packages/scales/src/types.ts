import {
    ScaleLinear as D3ScaleLinear,
    ScalePoint as D3ScalePoint,
    ScaleBand as D3ScaleBand,
    ScaleLogarithmic as D3ScaleLogarithmic,
    ScaleSymLog as D3ScaleSymLog,
    ScaleTime as D3ScaleTime,
} from 'd3-scale'
import { TIME_PRECISION } from './timeHelpers'

export type ScaleAxis = 'x' | 'y'
export type OtherScaleAxis<Axis extends ScaleAxis> = Axis extends 'x' ? 'y' : 'x'

export type NumericValue = { valueOf(): number }
export type StringValue = { toString(): string }
export type ScaleValue = NumericValue | StringValue | Date

export interface ScaleTypeToSpec {
    linear: ScaleLinearSpec
    log: ScaleLogSpec
    symlog: ScaleSymlogSpec
    point: ScalePointSpec
    band: ScaleBandSpec
    time: ScaleTimeSpec
}

export type ScaleType = keyof ScaleTypeToSpec
export type ScaleSpec = ScaleTypeToSpec[keyof ScaleTypeToSpec]

export interface ScaleTypeToScale<Input, Output> {
    linear: ScaleLinear<Output>
    log: ScaleLog
    symlog: ScaleSymlog
    point: ScalePoint<Input>
    band: ScaleBand<Input>
    time: ScaleTime<Input>
}

export type Scale<Input, Output> = ScaleTypeToScale<Input, Output>[keyof ScaleTypeToScale<
    Input,
    Output
>]

export type ScaleLinearSpec = {
    type: 'linear'
    // default to `auto`
    min?: 'auto' | number
    // default to `auto`
    max?: 'auto' | number
    stacked?: boolean
    reverse?: boolean
    clamp?: boolean
    nice?: boolean | number
}
export interface ScaleLinear<Output> extends D3ScaleLinear<number, Output, never> {
    type: 'linear'
    // default to `false`
    stacked: boolean
}

export interface ScaleLogSpec {
    type: 'log'
    // default to `10`
    base?: number
    // default to `auto`
    min?: 'auto' | number
    // default to `auto`
    max?: 'auto' | number
}
export interface ScaleLog extends D3ScaleLogarithmic<number, number> {
    type: 'log'
}

export interface ScaleSymlogSpec {
    type: 'symlog'
    // default to `1`
    constant?: number
    // default to `auto`
    min?: 'auto' | number
    // default to `auto`
    max?: 'auto' | number
    reverse?: boolean
}
export interface ScaleSymlog extends D3ScaleSymLog<number, number> {
    type: 'symlog'
}

export type ScalePointSpec = {
    type: 'point'
}
export interface ScalePoint<Input extends StringValue> extends D3ScalePoint<Input> {
    type: 'point'
}

export type ScaleBandSpec = {
    type: 'band'
    round?: boolean
}
export interface ScaleBand<Input extends StringValue> extends D3ScaleBand<Input> {
    type: 'band'
}

export type ScaleTimeSpec = {
    type: 'time'
    // default to `native`
    format?: 'native' | string
    // default to `millisecond`
    precision?: TIME_PRECISION
    // default to `auto`
    min?: 'auto' | Date | string
    // default to `auto`
    max?: 'auto' | Date | string
    // default to `true`
    useUTC?: boolean
    // default to `false`
    nice?: boolean
}

export interface ScaleTime<Input> extends D3ScaleTime<Input, number> {
    type: 'time'
    useUTC: boolean
}

export type AnyScale = Scale<any, any>

export type ScaleWithBandwidth = ScaleBand<any> | ScalePoint<any>

export type Series<XValue extends ScaleValue, YValue extends ScaleValue> = {
    data: {
        data: {
            x: XValue | null
            y: YValue | null
        }
    }[]
}[]

// A serie containing data for a specific axis
export type SerieAxis<Axis extends ScaleAxis, Value extends ScaleValue> = {
    data: {
        data: Record<Axis, Value | null>
    }[]
}[]

export type ComputedSerieAxis<Value extends ScaleValue> = {
    all: Value[]
    min: Value
    minStacked?: Value
    max: Value
    maxStacked?: Value
}

export type TicksSpec<Value extends ScaleValue> =
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
