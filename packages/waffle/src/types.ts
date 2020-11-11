import * as React from 'react'
import { Box, Dimensions, Theme, SvgDefsAndFill } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type DatumId = string | number
export type DatumLabel = string | number
export type DatumValue = number
export type DatumFormattedValue = string | number

export interface Datum {
    id: DatumId
    label: DatumLabel
    value: DatumValue
}

export interface DefaultRawDatum extends Datum {
    id: string
    label: string
    value: number
}

export type ValueFormatter = (value: number) => DatumFormattedValue

export interface ComputedDatum<RawDatum> extends Datum {
    formattedValue: DatumFormattedValue
    groupIndex: number
    // Index of the starting cell
    startAt: number
    // Index of the ending cell
    endAt: number
    color: string
    fill?: string
    data: RawDatum
}

// used for cells without data, considered empty
export interface EmptyCell {
    position: number
    row: number
    column: number
    x: number
    y: number
    color: string
}

// used for cells having data
export interface DataCell<RawDatum extends Datum> extends EmptyCell {
    data: ComputedDatum<RawDatum>
}

export type Cell<RawDatum extends Datum> = EmptyCell | DataCell<RawDatum>

export type FillDirection = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps<RawDatum> {
    datum: ComputedDatum<RawDatum>
}

// all those props are required
export interface DataProps<RawDatum extends Datum> {
    data: RawDatum[]
    total: number
    rows: number
    columns: number
}

// most of those props are optional for the public API,
// but required internally, using defaults.
export interface CommonProps<RawDatum extends Datum> {
    margin: Box
    valueFormat: string | ValueFormatter
    fillDirection: FillDirection
    padding: number
    theme: Theme
    colors: OrdinalColorScaleConfig<RawDatum>
    emptyColor: string
    emptyOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<Cell<RawDatum>>
    isInteractive: boolean
    tooltip: React.FC<TooltipProps<RawDatum>>
    role: string
}

export type MouseHandler<RawDatum extends Datum, ElementType = HTMLCanvasElement> = (
    datum: ComputedDatum<RawDatum>,
    event: React.MouseEvent<ElementType>
) => void

interface MouseHandlers<RawDatum extends Datum, ElementType = HTMLCanvasElement> {
    onClick?: MouseHandler<ComputedDatum<RawDatum>, ElementType>
    onMouseEnter?: MouseHandler<ComputedDatum<RawDatum>, ElementType>
    onMouseMove?: MouseHandler<ComputedDatum<RawDatum>, ElementType>
    onMouseLeave?: MouseHandler<ComputedDatum<RawDatum>, ElementType>
}

export type SvgProps<RawDatum extends Datum = DefaultRawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> & {
        legends?: LegendProps[]
    } & MouseHandlers<RawDatum>

export type HtmlProps<RawDatum extends Datum = DefaultRawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> &
    MouseHandlers<RawDatum>

export type CanvasProps<RawDatum extends Datum = DefaultRawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> & {
        legends?: LegendProps[]
    } & MouseHandlers<RawDatum>
