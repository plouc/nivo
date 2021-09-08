import { AriaAttributes, MouseEvent } from 'react'
import { Theme, Box, Dimensions, ModernMotionProps } from '@nivo/core'
import { OrdinalColorScaleConfig } from '@nivo/colors'

export interface RadialBarDatum {
    x: string
    y: number
}

export interface RadialBarSerie {
    id: string
    data: RadialBarDatum[]
}

export interface ComputedDatum {
    id: string
    data: RadialBarDatum
    category: string
    value: number
    color: string
    stackedValue: number
    startAngle: number
    endAngle: number
    innerRadius: number
    outerRadius: number
}

export interface RadialBarDataProps {
    data: RadialBarSerie[]
}

export type RadialBarLayerId = 'grid' | 'bars' | 'legends'

export interface RadialBarCommonProps {
    margin: Box

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum, 'color'>>
    cornerRadius: number

    layers: RadialBarLayerId[]

    startAngle: number
    endAngle: number

    isInteractive: boolean
    onClick: (bar: ComputedDatum, event: MouseEvent) => void
    onMouseEnter: (bar: ComputedDatum, event: MouseEvent) => void
    onMouseMove: (bar: ComputedDatum, event: MouseEvent) => void
    onMouseLeave: (bar: ComputedDatum, event: MouseEvent) => void

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type RadialBarSvgProps = Partial<RadialBarCommonProps> &
    RadialBarDataProps &
    Dimensions &
    ModernMotionProps
