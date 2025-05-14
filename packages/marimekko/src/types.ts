import * as React from 'react'
import {
    stackOffsetDiverging,
    stackOffsetExpand,
    stackOffsetNone,
    stackOffsetSilhouette,
    stackOffsetWiggle,
} from 'd3-shape'
import { ScaleLinear } from '@nivo/scales'
import { Box, Dimensions, SvgDefsAndFill, MotionProps, ValueFormat } from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { AxisProps } from '@nivo/axes'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type DatumId = string | number
export type DatumValue = number

export type DatumPropertyAccessor<Datum, T> = (datum: Datum) => T

export type RawDimensionDatum<Datum> = {
    id: string
    value: string | number | DatumPropertyAccessor<Datum, DatumValue>
}

export interface DataProps<Datum> {
    data: readonly Datum[]
    id: string | number | DatumPropertyAccessor<Datum, DatumId>
    value: string | number | DatumPropertyAccessor<Datum, DatumValue>
    dimensions: readonly RawDimensionDatum<Datum>[]
}

export interface NormalizedDatum<Datum> {
    index: number
    id: DatumId
    value: DatumValue
    data: Datum
}

export interface DimensionDatum<Datum> {
    id: string
    value: number
    formattedValue: string | number
    color: string
    x: number
    y: number
    width: number
    height: number
    dimension: RawDimensionDatum<Datum>
    datum: ComputedDatum<Datum>
}

export interface ComputedDatum<Datum> extends NormalizedDatum<Datum> {
    x: number
    y: number
    width: number
    height: number
    dimensions: readonly DimensionDatum<Datum>[]
}

export interface BarDatum<Datum> extends DimensionDatum<Datum> {
    key: string
    fill?: string
    borderColor: string
    borderWidth: number
}

export type LabelAccessorFunction<Datum> = (datum: ComputedDatum<Datum>) => string | number

export type MarimekkoLayerId = 'grid' | 'axes' | 'bars' | 'legends'

export interface CustomLayerProps<Datum> {
    data: readonly ComputedDatum<Datum>[]
    bars: readonly BarDatum<Datum>[]
    thicknessScale: ScaleLinear<number>
    dimensionsScale: ScaleLinear<number>
}

export type CustomLayer<Datum> = React.FC<CustomLayerProps<Datum>>

export type Layer<Datum> = MarimekkoLayerId | CustomLayer<Datum>

export interface TooltipProps<Datum> {
    bar: BarDatum<Datum>
}

export type BarTooltipType<Datum> = (props: TooltipProps<Datum>) => JSX.Element

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

export interface MarimekkoCommonProps<Datum> {
    valueFormat?: ValueFormat<number>
    margin: Box
    layout: Layout
    offset: OffsetId
    outerPadding: number
    innerPadding: number
    axisTop?: AxisProps | null
    axisRight?: AxisProps | null
    axisBottom?: AxisProps | null
    axisLeft?: AxisProps | null
    enableGridX: boolean
    gridXValues?: readonly number[]
    enableGridY: boolean
    gridYValues?: readonly number[]
    colors: OrdinalColorScaleConfig<Omit<DimensionDatum<Datum>, 'color' | 'fill'>>
    theme: PartialTheme
    borderWidth: number
    borderColor: InheritedColorConfig<DimensionDatum<Datum>>
    isInteractive: boolean
    tooltip: BarTooltipType<Datum>
    legends: readonly LegendProps[]
    role?: string
}

export type MouseEventHandler<Datum, ElementType> = (
    datum: BarDatum<Datum>,
    event: React.MouseEvent<ElementType>
) => void

export type MouseEventHandlers<Datum, ElementType> = Partial<{
    onClick: MouseEventHandler<Datum, ElementType>
    onMouseEnter: MouseEventHandler<Datum, ElementType>
    onMouseMove: MouseEventHandler<Datum, ElementType>
    onMouseLeave: MouseEventHandler<Datum, ElementType>
}>

export interface MarimekkoSvgExtraProps<Datum> {
    layers: readonly Layer<Datum>[]
}

export type MarimekkoSvgProps<Datum> = DataProps<Datum> &
    Dimensions &
    Partial<MarimekkoCommonProps<Datum>> &
    Partial<MarimekkoSvgExtraProps<Datum>> &
    MouseEventHandlers<Datum, SVGRectElement> &
    MotionProps &
    SvgDefsAndFill<BarDatum<Datum>>
export type MarimekkoSvgPropsWithDefaults<Datum> = DataProps<Datum> &
    Dimensions &
    MarimekkoCommonProps<Datum> &
    MarimekkoSvgExtraProps<Datum> &
    MouseEventHandlers<Datum, SVGRectElement> &
    MotionProps &
    SvgDefsAndFill<BarDatum<Datum>>
