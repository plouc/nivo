import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { ScaleLinear, ScaleBand } from 'd3-scale'
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

export interface RadialBarDatum {
    x: string
    y: number
}

export interface RadialBarSerie {
    id: string
    data: RadialBarDatum[]
}

export interface ComputedBar {
    id: string
    data: RadialBarDatum
    groupId: string
    category: string
    value: number
    formattedValue: string
    color: string
    stackedValue: number
    arc: Arc
}

export interface RadialBarDataProps {
    data: RadialBarSerie[]
}

export type RadialBarLayerId = 'grid' | 'tracks' | 'bars' | 'labels' | 'legends'

export interface RadialBarCustomLayerProps {
    center: [number, number]
    outerRadius: number
    bars: ComputedBar[]
    arcGenerator: ArcGenerator
    radiusScale: ScaleBand<string>
    valueScale: ScaleLinear<number, number>
}
export type RadialBarCustomLayer = FunctionComponent<RadialBarCustomLayerProps>

export interface RadialBarTooltipProps {
    bar: ComputedBar
}
export type RadialBarTooltipComponent = FunctionComponent<RadialBarTooltipProps>

export interface RadialBarTrackDatum {
    id: string
    color: string
    arc: Arc
}

export type RadialBarCommonProps = {
    valueFormat: ValueFormat<number>

    margin: Box

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedBar, 'color'>>
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedBar>
    cornerRadius: number

    layers: (RadialBarLayerId | RadialBarCustomLayer)[]

    startAngle: number
    endAngle: number
    padding: number

    enableTracks: boolean
    tracksColor: string

    enableGridAngles: boolean
    enableGridRadii: boolean

    enableLabels: boolean
    label: PropertyAccessor<ComputedBar, string>
    labelsSkipAngle: ArcLabelsProps<ComputedBar>['arcLabelsSkipAngle']
    labelsRadiusOffset: ArcLabelsProps<ComputedBar>['arcLabelsRadiusOffset']
    labelsTextColor: ArcLabelsProps<ComputedBar>['arcLabelsTextColor']

    isInteractive: boolean
    tooltip: RadialBarTooltipComponent
    onClick: (bar: ComputedBar, event: MouseEvent) => void
    onMouseEnter: (bar: ComputedBar, event: MouseEvent) => void
    onMouseMove: (bar: ComputedBar, event: MouseEvent) => void
    onMouseLeave: (bar: ComputedBar, event: MouseEvent) => void

    legends: LegendProps[]

    renderWrapper: boolean

    transitionMode: ArcTransitionMode

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type RadialBarSvgProps = Partial<RadialBarCommonProps> &
    RadialBarDataProps &
    Dimensions &
    ModernMotionProps
