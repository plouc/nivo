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
    ClosedCurveFactoryId,
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
    index: string | number
    key: string | number
    value: number
    formattedValue: string
    color: string
}

export interface PointProps {
    key: string
    label: ReactNode | null
    data: PointData
    style: {
        fill: string
        stroke: string
        x: number
        y: number
    }
}

export interface DotSymbolProps {
    size: number
    color: InheritedColorConfig<PointData>
    borderWidth: number
    borderColor: InheritedColorConfig<PointData>
}
export type DotSymbolComponent = FunctionComponent<DotSymbolProps>

export type RadarLayerId = 'grid' | 'shapes' | 'dots' | 'legends'

export type RadarColorMapping = Record<string | number, string>

export interface RadarCommonProps {
    maxValue: number | 'auto'
    valueFormat: ValueFormat<number>

    layers: RadarLayerId[]

    margin: Box

    curve: ClosedCurveFactoryId

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
    dotLabel: PropertyAccessor<PointData, string | number>
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

export type RadarSvgProps<D extends Record<string, unknown>> = Partial<RadarCommonProps> &
    RadarDataProps<D> &
    Dimensions &
    ModernMotionProps
