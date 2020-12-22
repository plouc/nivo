import * as React from 'react'
import { Interpolation, SpringValue } from 'react-spring'
import { Box, ModernMotionProps, Theme, PropertyAccessor, ValueFormat } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'

export interface ComputedDatum<RawDatum> {
    id: string | number
    // contain own id plus all ancestor ids
    path: (string | number)[]
    value: number
    percentage: number
    formattedValue: string
    x: number
    y: number
    radius: number
    color: string
    // defined when using patterns or gradients
    fill?: string
    // contains the raw node's data
    data: RawDatum
    depth: number
    height: number
    parent?: ComputedDatum<RawDatum>
}

export type CirclePackingLayerId = 'circles' | 'labels'

export interface CirclePackingCustomLayerProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
}

export type CirclePackingCustomLayer<RawDatum> = React.FC<CirclePackingCustomLayerProps<RawDatum>>

export type CirclePackingLayer<RawDatum> = CirclePackingLayerId | CirclePackingCustomLayer<RawDatum>

export interface CirclePackingCommonProps<RawDatum> {
    data: RawDatum
    id: PropertyAccessor<RawDatum, string | number>
    value: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>

    width: number
    height: number
    margin?: Box
    padding: number
    leavesOnly: boolean

    theme?: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>
    colorBy: 'id' | 'depth'
    // if specified, will determine the node's color
    // according to its parent
    childColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    enableLabels: boolean
    label: PropertyAccessor<ComputedDatum<RawDatum>, string | number>
    labelsFilter?: (label: ComputedLabel<RawDatum>) => boolean
    labelsSkipRadius: number
    labelsTextColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    layers: CirclePackingLayer<RawDatum>[]

    isInteractive: boolean

    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']

    role: string
}

export type CirclePackingSvgProps<RawDatum> = CirclePackingCommonProps<RawDatum>

export type CirclePackingHtmlProps<RawDatum> = CirclePackingCommonProps<RawDatum>

export type CirclePackingCanvasProps<RawDatum> = CirclePackingCommonProps<RawDatum>

export interface CircleProps<RawDatum> {
    node: ComputedDatum<RawDatum>
    style: {
        x: SpringValue<number>
        y: SpringValue<number>
        // using an interpolation to avoid negative values
        radius: Interpolation<number>
        color: SpringValue<string>
        opacity: SpringValue<number>
    }
}

export type CircleComponent<RawDatum> = (props: CircleProps<RawDatum>) => JSX.Element

export interface ComputedLabel<RawDatum> {
    label: string | number
    textColor: string
    node: ComputedDatum<RawDatum>
}

export interface LabelProps<RawDatum> {
    node: ComputedDatum<RawDatum>
    label: string | number
    style: {
        x: SpringValue<number>
        y: SpringValue<number>
        // using an interpolation to avoid negative values
        radius: Interpolation<number>
        textColor: SpringValue<string>
        opacity: SpringValue<number>
    }
}

export type LabelComponent<RawDatum> = (props: LabelProps<RawDatum>) => JSX.Element
