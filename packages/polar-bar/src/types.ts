import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { Box, Theme, Dimensions, PropertyAccessor, MotionProps, ValueFormat } from '@nivo/core'
import { Arc, ArcGenerator, ArcTransitionMode } from '@nivo/arcs'
import { CircularAxisConfig, RadialAxisConfig } from '@nivo/polar-axes'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { ScaleLinear, ScaleBand } from '@nivo/scales'
import { LegendProps } from '@nivo/legends'

export interface PolarBarDatum {
    [key: string]: string | number
}

export interface PolarBarComputedDatum {
    index: string
    key: string
    id: string
    value: number
    formattedValue: string
    color: string
    arc: Arc
}

export interface PolarBarDataProps<RawDatum extends PolarBarDatum> {
    data: readonly RawDatum[]
}

export type PolarBarLayerId = 'grid' | 'arcs' | 'axes' | 'labels' | 'legends'

export interface PolarBarCustomLayerProps {
    center: [number, number]
    outerRadius: number
    innerRadius: number
    arcs: PolarBarComputedDatum[]
    arcGenerator: ArcGenerator
    radiusScale: ScaleLinear<number>
    angleScale: ScaleBand<string>
}
export type PolarBarCustomLayer = FunctionComponent<PolarBarCustomLayerProps>

export interface PolarBarTooltipProps {
    arc: PolarBarComputedDatum
}
export type PolarBarTooltipComponent = FunctionComponent<PolarBarTooltipProps>

export interface PolarBarLegendDatum {
    id: string
    label: string
    color: string
}

export type PolarBarCommonProps<RawDatum extends PolarBarDatum> = {
    indexBy: PropertyAccessor<RawDatum, string>
    keys: readonly string[]
    valueFormat?: ValueFormat<number>

    margin: Box
    startAngle: number
    endAngle: number
    innerRadius: number
    cornerRadius: number

    layers: readonly (PolarBarLayerId | PolarBarCustomLayer)[]

    colors: OrdinalColorScaleConfig<Omit<PolarBarComputedDatum, 'color' | 'fill' | 'arc'>>
    theme: Theme
    borderWidth: number
    borderColor: InheritedColorConfig<PolarBarComputedDatum>

    enableRadialGrid: boolean
    enableCircularGrid: boolean
    radialAxisStart: RadialAxisConfig | null
    radialAxisEnd: RadialAxisConfig | null
    circularAxisInner: CircularAxisConfig | null
    circularAxisOuter: CircularAxisConfig | null

    isInteractive: boolean
    tooltip: PolarBarTooltipComponent
    onClick: (arc: PolarBarComputedDatum, event: MouseEvent) => void
    onMouseEnter: (arc: PolarBarComputedDatum, event: MouseEvent) => void
    onMouseMove: (arc: PolarBarComputedDatum, event: MouseEvent) => void
    onMouseLeave: (arc: PolarBarComputedDatum, event: MouseEvent) => void

    legends: readonly LegendProps[]
    forwardLegendData: (data: PolarBarLegendDatum[]) => void

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type PolarBarSvgProps<RawDatum extends PolarBarDatum> = PolarBarDataProps<RawDatum> &
    Dimensions &
    Partial<PolarBarCommonProps<RawDatum>> & {
        animate?: boolean
        motionConfig?: MotionProps['motionConfig']
        transitionMode?: ArcTransitionMode
    }
