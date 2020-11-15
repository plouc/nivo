import * as React from 'react'
import { Box, Dimensions, Theme, SvgDefsAndFill } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type DatumId = string | number
export type DatumValue = number
export type DatumFormattedValue = string | number
export type ValueFormatter = (value: number) => DatumFormattedValue

export type DatumPropertyAccessor<RawDatum, T> = (datum: RawDatum) => T

export interface DataProps<RawDatum> {
    data: RawDatum[]
    id: string | number | DatumPropertyAccessor<RawDatum, DatumId>
    value: string | number | DatumPropertyAccessor<RawDatum, DatumValue>
    dimensions: {
        id: string
        value: string | number | DatumPropertyAccessor<RawDatum, DatumValue>
    }[]
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
    thickness: number
    dimensions: DimensionDatum<RawDatum>[]
}

export interface BarDatum<RawDatum> extends DimensionDatum<RawDatum> {
    key: string
    borderColor: string
    borderWidth: number
}

export type LabelAccessorFunction<RawDatum> = (datum: ComputedDatum<RawDatum>) => string | number

export type LayerId = 'grid' | 'axes' | 'bars' | 'legends'

export interface CustomLayerProps<RawDatum> {
    data: ComputedDatum<RawDatum>[]
    bars: BarDatum<RawDatum>[]
}

export type CustomLayer<RawDatum> = React.FC<CustomLayerProps<RawDatum>>

export type Layer<RawDatum> = LayerId | CustomLayer<RawDatum>

export interface TooltipProps<RawDatum> {
    datum: ComputedDatum<RawDatum>
}

export type Layout = 'horizontal' | 'vertical'

export type CommonProps<RawDatum> = {
    valueFormat?: string | ValueFormatter

    margin: Box
    layout: Layout

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
    tooltip: React.FC<TooltipProps<RawDatum>>

    legends: LegendProps[]

    animate: boolean

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
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    MouseEventHandlers<RawDatum, SVGRectElement> & {
        layers?: Layer<RawDatum>[]
    }

export type CompleteSvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    CommonProps<RawDatum> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    MouseEventHandlers<RawDatum, SVGRectElement> & {
        layers: Layer<RawDatum>[]
    }
