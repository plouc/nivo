import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import {
    Theme,
    Box,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { Arc, ArcGenerator, ArcLabelsProps, ArcTransitionMode } from '@nivo/arcs'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { ScaleLinear, ScaleBand } from '@nivo/scales'
import { RadialAxisConfig, CircularAxisConfig } from '@nivo/polar-axes'

export interface RadialBarDatum {
    x: string
    y: number
}

export interface RadialBarSerie<D extends RadialBarDatum = RadialBarDatum> {
    id: string
    data: D[]
}

export interface ComputedBar<D extends RadialBarDatum = RadialBarDatum> {
    id: string
    data: D
    groupId: string
    category: string
    value: number
    formattedValue: string
    color: string
    stackedValue: number
    arc: Arc
}

export interface RadialBarDataProps<D extends RadialBarDatum = RadialBarDatum> {
    data: RadialBarSerie<D>[]
}

export type RadialBarLayerId = 'grid' | 'tracks' | 'bars' | 'labels' | 'legends'

export interface RadialBarCustomLayerProps<D extends RadialBarDatum = RadialBarDatum> {
    center: [number, number]
    outerRadius: number
    innerRadius: number
    bars: ComputedBar<D>[]
    arcGenerator: ArcGenerator
    radiusScale: ScaleBand<string>
    valueScale: ScaleLinear<number>
}
export type RadialBarCustomLayer = FunctionComponent<RadialBarCustomLayerProps>

export interface RadialBarTooltipProps<D extends RadialBarDatum = RadialBarDatum> {
    bar: ComputedBar<D>
}
export type RadialBarTooltipComponent = FunctionComponent<RadialBarTooltipProps>

export interface RadialBarTrackDatum {
    id: string
    color: string
    arc: Arc
}

export type RadialBarCommonProps<D extends RadialBarDatum = RadialBarDatum> = {
    maxValue: 'auto' | number
    valueFormat: ValueFormat<number>

    margin: Box

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedBar<D>, 'color'>>
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedBar<D>>
    padAngle: number
    cornerRadius: number

    layers: (RadialBarLayerId | RadialBarCustomLayer)[]

    startAngle: number
    endAngle: number
    innerRadius: number
    padding: number

    enableTracks: boolean
    tracksColor: string

    enableRadialGrid: boolean
    enableCircularGrid: boolean
    radialAxisStart: RadialAxisConfig | null
    radialAxisEnd: RadialAxisConfig | null
    circularAxisInner: CircularAxisConfig | null
    circularAxisOuter: CircularAxisConfig | null

    enableLabels: boolean
    label: PropertyAccessor<ComputedBar<D>, string>
    labelsSkipAngle: ArcLabelsProps<ComputedBar<D>>['arcLabelsSkipAngle']
    labelsRadiusOffset: ArcLabelsProps<ComputedBar<D>>['arcLabelsRadiusOffset']
    labelsTextColor: ArcLabelsProps<ComputedBar<D>>['arcLabelsTextColor']

    isInteractive: boolean
    tooltip: RadialBarTooltipComponent
    onClick: (bar: ComputedBar<D>, event: MouseEvent) => void
    onMouseEnter: (bar: ComputedBar<D>, event: MouseEvent) => void
    onMouseMove: (bar: ComputedBar<D>, event: MouseEvent) => void
    onMouseLeave: (bar: ComputedBar<D>, event: MouseEvent) => void

    legends: LegendProps[]

    renderWrapper: boolean

    transitionMode: ArcTransitionMode

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type RadialBarSvgProps<D extends RadialBarDatum = RadialBarDatum> = Partial<
    RadialBarCommonProps<D>
> &
    RadialBarDataProps<D> &
    Dimensions &
    ModernMotionProps
