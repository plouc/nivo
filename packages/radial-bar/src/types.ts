import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { Theme, Box, Dimensions, ModernMotionProps } from '@nivo/core'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { Arc } from 'd3-shape'

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

export interface RadialBarTooltipProps {
    bar: ComputedBar
}
export type RadialBarTooltipComponent = FunctionComponent<RadialBarTooltipProps>

export interface RadialBarArcData {
    startAngle: number
    endAngle: number
    innerRadius: number
    outerRadius: number
}
export type RadialBarArcGenerator = Arc<unknown, RadialBarArcData>

export interface RadialBarCommonProps {
    margin: Box

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedBar, 'color'>>
    cornerRadius: number

    layers: RadialBarLayerId[]

    startAngle: number
    endAngle: number

    isInteractive: boolean
    tooltip: RadialBarTooltipComponent
    onClick: (bar: ComputedBar, event: MouseEvent) => void
    onMouseEnter: (bar: ComputedBar, event: MouseEvent) => void
    onMouseMove: (bar: ComputedBar, event: MouseEvent) => void
    onMouseLeave: (bar: ComputedBar, event: MouseEvent) => void

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
