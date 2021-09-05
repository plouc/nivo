import { FunctionComponent, AriaAttributes, ReactNode } from 'react'
import { AnimatedProps } from '@react-spring/web'
import {
    Box,
    Theme,
    CssMixBlendMode,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export interface RadarDataProps<D extends Record<string, unknown>> {
    data: D[]
    keys: string[] | number[]
    indexBy: PropertyAccessor<D, string | number>
}

export interface GridLabelProps {
    id: string | number
    anchor: 'start' | 'middle' | 'end'
    angle: number
    x: number
    y: number
    animated: AnimatedProps<{
        transform: string
    }>
}
export type GridLabelComponent = FunctionComponent<GridLabelProps>

export type PointData = {
    index: number
    key: string
    value: number
    color: string
}

export interface DotSymbolProps {
    size: number
    color: InheritedColorConfig<PointData>
    borderWidth: number
    borderColor: InheritedColorConfig<PointData>
}
export type DotSymbolComponent = FunctionComponent<DotSymbolProps>

export type RadarLayerId = 'grid' | 'shapes' | 'dots' | 'legends'

export interface RadarCommonProps<D extends Record<string, unknown>> {
    maxValue: number | 'auto'

    layers: RadarLayerId[]

    margin: Box

    curve: string // closedCurvePropType.isRequired,

    gridLevels: number
    gridShape: 'circular' | 'linear'
    gridLabel: GridLabelComponent
    gridLabelOffset: number

    enableDots: boolean
    dotSymbol: DotSymbolComponent
    dotSize: number
    dotColor: InheritedColorConfig<PointData>
    dotBorderWidth: number
    dotBorderColor: InheritedColorConfig<PointData>
    enableDotLabel: boolean
    dotLabel: PropertyAccessor<D, ReactNode>
    dotLabelFormat: ValueFormat<number>
    dotLabelYOffset: number

    theme: Theme
    colors: OrdinalColorScaleConfig<{ key: string | number; index: number }>
    fillOpacity: number
    blendMode: CssMixBlendMode
    borderWidth: number
    borderColor: InheritedColorConfig<{ key: string | number; color: string }>

    isInteractive: boolean
    tooltipFormat: ValueFormat<number>

    renderWrapper: boolean

    legends: LegendProps[]

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type RadarSvgProps<D extends Record<string, unknown>> = Partial<RadarCommonProps<D>> &
    RadarDataProps<D> &
    Dimensions &
    ModernMotionProps
