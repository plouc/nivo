import * as React from 'react'
import {
    stackOffsetDiverging,
    stackOffsetExpand,
    stackOffsetNone,
    stackOffsetSilhouette,
    stackOffsetWiggle,
} from 'd3-shape'
import { ScaleLinear } from 'd3-scale'
import {
    Box,
    Dimensions,
    Theme,
    SvgDefsAndFill,
    ModernMotionProps,
    DataFormatter,
} from '@nivo/core'
import { AxisProps } from '@nivo/axes'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type DatumId = string | number
export type DatumValue = number
export type DatumFormattedValue = string | number

export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T

export interface DataProps<RawDatum> {
    data: RawDatum[]
    id: string | number | DatumPropertyAccessor<RawDatum, DatumId>
    value: string | number | DatumPropertyAccessor<RawDatum, DatumValue>
    dimensions: {
        id: string
        value: string | number | DatumPropertyAccessor<RawDatum, DatumValue>
    }[]
    valueFormat?: string | DataFormatter
}

export interface NormalizedDatum<RawDatum> {
    index: number
    id: DatumId
    value: DatumValue
    data: RawDatum
}

export interface DimensionDatum<RawDatum> {
    id: string
    value: number
    formattedValue: string | number
    color: string
    x: number
    y: number
    width: number
    height: number
    datum: ComputedDatum<RawDatum>
}

export interface ComputedDatum<RawDatum> extends NormalizedDatum<RawDatum> {
    x: number
    y: number
    width: number
    height: number
    dimensions: DimensionDatum<RawDatum>[]
}

export interface BarDatum<RawDatum> extends DimensionDatum<RawDatum> {
    key: string
    fill?: string
    borderColor: string
    borderWidth: number
}

export type LabelAccessorFunction<RawDatum> = (datum: ComputedDatum<RawDatum>) => string | number

export type LayerId = 'grid' | 'axes' | 'bars' | 'legends'

export interface CustomLayerProps<RawDatum> {
    data: ComputedDatum<RawDatum>[]
    bars: BarDatum<RawDatum>[]
    thicknessScale: ScaleLinear<number, number>
    dimensionsScale: ScaleLinear<number, number>
}

export type CustomLayer<RawDatum> = React.FC<CustomLayerProps<RawDatum>>

export type Layer<RawDatum> = LayerId | CustomLayer<RawDatum>

export interface TooltipProps<RawDatum> {
    bar: BarDatum<RawDatum>
}

export type BarTooltipType<RawDatum> = (props: TooltipProps<RawDatum>) => JSX.Element

export type Layout = 'horizontal' | 'vertical'

export const offsetById = {
    // Applies a zero baseline and normalizes the values
    // for each point such that the topline is always one.
    expand: stackOffsetExpand,
    // Positive values are stacked above zero, negative values
    // are stacked below zero, and zero values are stacked at zero.
    diverging: stackOffsetDiverging,
    // Applies a zero baseline.
    none: stackOffsetNone,
    // Shifts the baseline down such that the center of the streamgraph
    // is always at zero.
    silouhette: stackOffsetSilhouette,
    // Shifts the baseline so as to minimize the weighted wiggle of layers.
    // This offset is recommended for streamgraphs in conjunction with the inside-out order.
    // See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
    wiggle: stackOffsetWiggle,
}

export type OffsetId = keyof typeof offsetById

export type CommonProps<RawDatum> = {
    margin: Box
    layout: Layout
    offset: OffsetId
    outerPadding: number
    innerPadding: number

    // axes and grid
    axisTop?: AxisProps
    axisRight?: AxisProps
    axisBottom?: AxisProps
    axisLeft?: AxisProps
    enableGridX: boolean
    gridXValues?: number[]
    enableGridY: boolean
    gridYValues?: number[]

    // colors, theme and border
    colors: OrdinalColorScaleConfig<Omit<DimensionDatum<RawDatum>, 'color' | 'fill'>>
    theme: Theme
    borderWidth: number
    borderColor: InheritedColorConfig<DimensionDatum<RawDatum>>

    // labels
    enableLabels: boolean
    label: string | LabelAccessorFunction<RawDatum>
    labelSkipWidth: number
    labelSkipHeight: number
    labelTextColor: InheritedColorConfig<DimensionDatum<RawDatum>>

    // interactivity
    isInteractive: boolean
    tooltip: BarTooltipType<RawDatum>

    legends: LegendProps[]

    role: string
}

export type MouseEventHandler<RawDatum, ElementType> = (
    datum: BarDatum<RawDatum>,
    event: React.MouseEvent<ElementType>
) => void

export type MouseEventHandlers<RawDatum, ElementType> = Partial<{
    onClick: MouseEventHandler<RawDatum, ElementType>
    onMouseEnter: MouseEventHandler<RawDatum, ElementType>
    onMouseMove: MouseEventHandler<RawDatum, ElementType>
    onMouseLeave: MouseEventHandler<RawDatum, ElementType>
}>

export type SvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> &
    ModernMotionProps &
    SvgDefsAndFill<BarDatum<RawDatum>> &
    MouseEventHandlers<RawDatum, SVGRectElement> & {
        layers?: Layer<RawDatum>[]
    }
