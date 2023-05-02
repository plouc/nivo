import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { SpringValues } from '@react-spring/web'
import { Box, Dimensions, Theme, SvgDefsAndFill, ModernMotionProps } from '@nivo/core'
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

// Used for cells without data, considered empty.
export interface EmptyCell {
    key: string
    position: number
    row: number
    column: number
    x: number
    y: number
    color: string
}

// Used for cells having data, non-empty.
export interface DataCell<RawDatum extends Datum> extends EmptyCell {
    data: ComputedDatum<RawDatum>
}

export type Cell<RawDatum extends Datum> = EmptyCell | DataCell<RawDatum>

export const isDataCell = <RawDatum extends Datum>(
    cell: Cell<RawDatum>
): cell is DataCell<RawDatum> => {
    return (cell as DataCell<RawDatum>).data !== undefined
}

export interface CellAnimatedProps {
    x: number
    y: number
    size: number
    fill: string
}

/**
 * When using a custom cell component, if you want to preserve transitions,
 * you should use an SVG element from `@react-spring/web`, for example
 * `animated.rect`.
 */
export interface CellComponentProps<RawDatum extends Datum> {
    cell: Cell<RawDatum>
    animatedProps: SpringValues<CellAnimatedProps>
    borderWidth: number
    testIdPrefix?: string
}
export type CellComponent<RawDatum extends Datum> = FunctionComponent<CellComponentProps<RawDatum>>

export interface HtmlCellComponentProps<RawDatum extends Datum>
    extends CellComponentProps<RawDatum> {
    tooltip: TooltipComponent<RawDatum>
}
export type HtmlCellComponent<RawDatum extends Datum> = FunctionComponent<
    HtmlCellComponentProps<RawDatum>
>

export type FillDirection = 'top' | 'right' | 'bottom' | 'left'

// All those props are required
export interface DataProps<RawDatum extends Datum> {
    data: RawDatum[]
    total: number
    rows: number
    columns: number
}

export interface TooltipProps<RawDatum extends Datum> {
    cell: DataCell<RawDatum>
}
export type TooltipComponent<RawDatum extends Datum> = FunctionComponent<TooltipProps<RawDatum>>

// Most of those props are optional for the public API,
// but required internally, using defaults.
export interface CommonProps<RawDatum extends Datum> {
    margin: Box
    valueFormat?: string | ValueFormatter
    fillDirection: FillDirection
    padding: number
    theme: Theme
    colors: OrdinalColorScaleConfig<RawDatum>
    emptyColor: string
    emptyOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<Cell<RawDatum>>
    isInteractive: boolean
    tooltip: TooltipComponent<RawDatum>
    role: string
    renderWrapper: boolean
}

export type MouseHandler<RawDatum extends Datum, ElementType = HTMLCanvasElement> = (
    cell: Cell<RawDatum>,
    event: MouseEvent<ElementType>
) => void

interface MouseHandlers<RawDatum extends Datum, ElementType = HTMLCanvasElement> {
    onClick?: MouseHandler<RawDatum, ElementType>
    onMouseEnter?: MouseHandler<RawDatum, ElementType>
    onMouseMove?: MouseHandler<RawDatum, ElementType>
    onMouseLeave?: MouseHandler<RawDatum, ElementType>
}

export type LayerId = 'cells' | 'legends'

export interface CustomLayerProps<RawDatum extends Datum> {
    yay?: RawDatum
}

export type SvgLayer<RawDatum extends Datum> =
    | LayerId
    | FunctionComponent<CustomLayerProps<RawDatum>>

export type SvgProps<RawDatum extends Datum = DefaultRawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> &
    ModernMotionProps &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    MouseHandlers<RawDatum> & {
        layers?: SvgLayer<RawDatum>[]
        legends?: LegendProps[]
        ariaLabel?: AriaAttributes['aria-label']
        ariaLabelledBy?: AriaAttributes['aria-labelledby']
        ariaDescribedBy?: AriaAttributes['aria-describedby']
        testIdPrefix?: string
        cellComponent?: CellComponent<RawDatum>
    }

export type HtmlLayerId = Exclude<LayerId, 'legends'>

export type HtmlLayer<RawDatum extends Datum> =
    | HtmlLayerId
    | FunctionComponent<CustomLayerProps<RawDatum>>

export type HtmlProps<RawDatum extends Datum = DefaultRawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> &
    ModernMotionProps &
    MouseHandlers<RawDatum> & {
        layers?: HtmlLayer<RawDatum>[]
        ariaLabel?: AriaAttributes['aria-label']
        ariaLabelledBy?: AriaAttributes['aria-labelledby']
        ariaDescribedBy?: AriaAttributes['aria-describedby']
        testIdPrefix?: string
        cellComponent?: HtmlCellComponent<RawDatum>
    }

export type CanvasProps<RawDatum extends Datum = DefaultRawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonProps<RawDatum>> & {
        legends?: LegendProps[]
    } & {
        pixelRatio?: number
    } & Omit<MouseHandlers<RawDatum>, 'onMouseEnter' | 'onMouseLeave'>
