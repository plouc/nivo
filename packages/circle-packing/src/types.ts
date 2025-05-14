import { JSX, FunctionComponent, MouseEvent } from 'react'
import { Interpolation, SpringValue } from '@react-spring/web'
import {
    Box,
    MotionProps,
    PropertyAccessor,
    ValueFormat,
    SvgDefsAndFill,
    Dimensions,
} from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'

export interface ComputedDatum<Datum> {
    id: string
    // contain own id plus all ancestor ids
    path: string[]
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
    data: Datum
    depth: number
    height: number
    parent?: ComputedDatum<Datum>
}

export type CirclePackingLayerId = 'circles' | 'labels'

export interface CirclePackingCustomLayerProps<Datum> {
    nodes: ComputedDatum<Datum>[]
}

export type CirclePackingCustomLayer<Datum> = FunctionComponent<
    CirclePackingCustomLayerProps<Datum>
>

export type CirclePackingLayer<Datum> = CirclePackingLayerId | CirclePackingCustomLayer<Datum>

export type MouseHandler<Datum> = (datum: ComputedDatum<Datum>, event: MouseEvent) => void

export type MouseHandlers<Datum> = {
    onClick?: MouseHandler<Datum>
    onMouseEnter?: MouseHandler<Datum>
    onMouseMove?: MouseHandler<Datum>
    onMouseLeave?: MouseHandler<Datum>
}

export interface CirclePackingDataProps<Datum> {
    data: Readonly<Datum>
}

export interface CirclePackingCommonProps<Datum> {
    id: PropertyAccessor<Datum, string>
    value: PropertyAccessor<Datum, number>
    valueFormat?: ValueFormat<number>
    margin: Box
    padding: number
    leavesOnly: boolean
    theme: PartialTheme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<Datum>, 'color' | 'fill'>>
    colorBy: 'id' | 'depth'
    inheritColorFromParent: boolean
    // used if `inheritColorFromParent` is `true`
    childColor: InheritedColorConfig<ComputedDatum<Datum>>
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<Datum>>
    enableLabels: boolean
    label: PropertyAccessor<ComputedDatum<Datum>, string>
    labelsFilter?: (label: ComputedLabel<Datum>) => boolean
    labelsSkipRadius: number
    labelTextColor: InheritedColorConfig<ComputedDatum<Datum>>
    layers: CirclePackingLayer<Datum>[]
    isInteractive: boolean
    tooltip: (props: ComputedDatum<Datum>) => JSX.Element
    zoomedId?: string | null
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    role?: string
    renderWrapper: boolean
}

export interface CirclePackingSvgExtraProps<Datum> {
    circleComponent: CircleComponent<Datum>
    labelComponent: LabelComponent<Datum>
}

export type CirclePackingSvgProps<Datum> = Dimensions &
    CirclePackingDataProps<Datum> &
    Partial<CirclePackingCommonProps<Datum>> &
    Partial<CirclePackingSvgExtraProps<Datum>> &
    MouseHandlers<Datum> &
    SvgDefsAndFill<ComputedDatum<Datum>>
export type CirclePackingSvgPropsWithDefaults<Datum> = Dimensions &
    CirclePackingDataProps<Datum> &
    CirclePackingCommonProps<Datum> &
    CirclePackingSvgExtraProps<Datum> &
    MouseHandlers<Datum> &
    SvgDefsAndFill<ComputedDatum<Datum>>

export interface CirclePackingHtmlExtraProps<Datum> {
    circleComponent: CircleComponent<Datum>
    labelComponent: LabelComponent<Datum>
}

export type CirclePackingHtmlProps<Datum> = Dimensions &
    CirclePackingDataProps<Datum> &
    Partial<CirclePackingCommonProps<Datum>> &
    Partial<CirclePackingHtmlExtraProps<Datum>> &
    MouseHandlers<Datum>
export type CirclePackingHtmlPropsWithDefaults<Datum> = Dimensions &
    CirclePackingDataProps<Datum> &
    CirclePackingCommonProps<Datum> &
    CirclePackingHtmlExtraProps<Datum> &
    MouseHandlers<Datum>

export interface CirclePackingCanvasExtraProps {
    pixelRatio: number
}

export type CirclePackingCanvasProps<Datum> = Dimensions &
    CirclePackingDataProps<Datum> &
    Partial<CirclePackingCommonProps<Datum>> &
    Partial<CirclePackingCanvasExtraProps> &
    Pick<MouseHandlers<Datum>, 'onMouseMove' | 'onClick'>
export type CirclePackingCanvasPropsWithDefaults<Datum> = Dimensions &
    CirclePackingDataProps<Datum> &
    CirclePackingCommonProps<Datum> &
    CirclePackingCanvasExtraProps &
    Pick<MouseHandlers<Datum>, 'onMouseMove' | 'onClick'>

export type CircleProps<Datum> = {
    node: ComputedDatum<Datum>
    style: {
        x: SpringValue<number>
        y: SpringValue<number>
        // using an interpolation to avoid negative values
        radius: Interpolation<number>
        color: SpringValue<string>
        opacity: SpringValue<number>
        borderWidth: number
        borderColor: SpringValue<string>
    }
} & MouseHandlers<Datum>

export type CircleComponent<Datum> = (props: CircleProps<Datum>) => JSX.Element

export interface ComputedLabel<Datum> {
    label: string | number
    textColor: string
    node: ComputedDatum<Datum>
}

export interface LabelProps<Datum> {
    node: ComputedDatum<Datum>
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

export type LabelComponent<Datum> = (props: LabelProps<Datum>) => JSX.Element
