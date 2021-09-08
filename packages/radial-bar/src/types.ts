import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { Theme, Box, Dimensions, ModernMotionProps, PropertyAccessor } from '@nivo/core'
import { Arc, ArcLabelsProps, ArcTransitionMode } from '@nivo/arcs'
import { OrdinalColorScaleConfig } from '@nivo/colors'

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
    arc: Arc
}

export interface RadialBarDataProps {
    data: RadialBarSerie[]
}

export type RadialBarLayerId = 'grid' | 'bars' | 'labels' | 'legends'

export interface RadialBarTooltipProps {
    bar: ComputedBar
}
export type RadialBarTooltipComponent = FunctionComponent<RadialBarTooltipProps>

export type RadialBarCommonProps = {
    margin: Box

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedBar, 'color'>>
    cornerRadius: number

    layers: RadialBarLayerId[]

    startAngle: number
    endAngle: number

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
