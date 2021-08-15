import { AriaAttributes } from 'react'
import {
    Box,
    Dimensions,
    ModernMotionProps,
    Theme,
    PropertyAccessor,
    StackOrder,
    StackOffset,
    AreaCurve,
    SvgDefsAndFill,
    ValueFormat,
} from '@nivo/core'
import { AxisProps, GridValues } from '@nivo/axes'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type StreamLayerId = 'grid' | 'axes' | 'layers' | 'dots' | 'slices' | 'legends'

export interface StreamCustomLayerProps {
    xScale: any
    yScale: any
    layers: StreamLayerData[]
    slices: StreamSliceData[]
}

export interface StreamDatum {
    [key: string]: string | number
}

export type TooltipFormatter<T> = (value: T) => React.ReactNode

export type TooltipLabel<T> = (value: T) => string

export type StackFunc<RawDatum extends StreamDatum> = (
    data: RawDatum[]
) => {
    0: number
    1: number
    data: RawDatum
}[][]

export interface StreamLayerData {
    id: string | number
    label: string | number
    color: string
    // populated when using patterns/gradients
    fill?: string
    path: string
    data: StreamLayerDatum[]
}

export interface StreamLayerDatum {
    layerId: StreamLayerData['id']
    layerLabel: StreamLayerData['label']
    index: number
    value: number
    formattedValue: number | string
    color: string
    x: number
    y1: number
    y2: number
}

export type DotComponent = React.FC<{
    datum: StreamLayerDatum
    x: number
    y: number
    size: number
    color: string
    borderWidth: number
    borderColor: string
}>

export interface StreamSliceData {
    index: number
    x: number
    stack: StreamLayerDatum[]
}

export interface StreamDataProps<RawDatum extends StreamDatum> {
    data: RawDatum[]
    keys: Exclude<keyof RawDatum, symbol>[]
}

export type StreamCommonProps<RawDatum extends StreamDatum> = {
    label: PropertyAccessor<Omit<StreamLayerData, 'label' | 'color' | 'data'>, string | number>
    valueFormat: ValueFormat<number>

    stack: StackFunc<RawDatum>
    order: StackOrder
    offsetType: StackOffset
    curve: AreaCurve

    layers: StreamLayerId[]

    margin: Box

    axisTop: AxisProps | null
    axisRight: AxisProps | null
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null
    enableGridX: boolean
    gridXValues: GridValues<string | number>
    enableGridY: boolean
    gridYValues: GridValues<number>

    isInteractive: boolean
    tooltipLabel: PropertyAccessor<StreamLayerData, string>
    enableStackTooltip: boolean

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<StreamLayerData, 'label' | 'color' | 'data'>>
    fillOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<StreamLayerData>

    enableDots: boolean
    dotComponent: DotComponent
    dotPosition: 'start' | 'center' | 'end'
    dotSize: ((datum: StreamLayerDatum) => number) | number
    dotColor: InheritedColorConfig<StreamLayerDatum>
    dotBorderWidth: ((datum: StreamLayerDatum) => number) | number
    dotBorderColor: InheritedColorConfig<StreamLayerDatum>

    legends: LegendProps[]

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type StreamSvgProps<RawDatum extends StreamDatum> = Partial<StreamCommonProps<RawDatum>> &
    StreamDataProps<RawDatum> &
    SvgDefsAndFill<StreamLayerData> &
    Dimensions &
    ModernMotionProps
