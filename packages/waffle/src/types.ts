import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { SpringValues } from '@react-spring/web'
import { Box, Dimensions, Theme, SvgDefsAndFill, ModernMotionProps, ValueFormat } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Vertex, GridCell, GridFillDirection } from '@nivo/grid'

export type DatumId = string | number

export interface Datum {
    id: string
    label: string
    value: number
}

export interface ComputedDatum<D extends Datum> extends Datum {
    data: D
    isHidden: boolean
    formattedValue: string
    groupIndex: number
    // Index of the starting cell
    startAt: number
    // Index of the ending cell
    endAt: number
    polygons: Vertex[][]
    color: string
    // Used for patterns & gradients
    fill?: string
    borderColor: string
}

// Used for cells without data, considered empty.
export interface EmptyCell extends GridCell {
    color: string
    // Used for patterns & gradients
    fill?: string
    opacity: number
    borderColor: string
}

// Used for cells having data.
export interface DataCell<D extends Datum> extends EmptyCell {
    data: ComputedDatum<D>
}

export type Cell<D extends Datum> = EmptyCell | DataCell<D>

export const isDataCell = <D extends Datum>(cell: Cell<D>): cell is DataCell<D> => {
    return (cell as DataCell<D>).data !== undefined
}

export type CellAnimatedProps = {
    x: number
    y: number
    size: number
    color: string
    opacity: number
    borderColor: string
}

export interface LegendDatum<D extends Datum = Datum> {
    id: D['id']
    label: D['label']
    color: string
    data: ComputedDatum<D>
}

/**
 * When using a custom cell component, if you want to preserve transitions,
 * you should use an SVG element from `@react-spring/web`, for example
 * `animated.rect`.
 */
export interface CellComponentProps<D extends Datum> {
    cell: Cell<D>
    padding: number
    animatedProps: SpringValues<CellAnimatedProps>
    borderRadius: number
    borderWidth: number
    testIdPrefix?: string
}
export type CellComponent<D extends Datum> = FunctionComponent<CellComponentProps<D>>

// All those props are required
export interface DataProps<D extends Datum> {
    data: readonly D[]
    total: number
    rows: number
    columns: number
}

export interface TooltipProps<D extends Datum> {
    data: ComputedDatum<D>
}
export type TooltipComponent<D extends Datum> = FunctionComponent<TooltipProps<D>>

// Most of those props are optional for the public API,
// but required internally, using defaults.
export interface CommonProps<D extends Datum> extends ModernMotionProps {
    hiddenIds: D['id'][]
    margin: Box
    valueFormat?: ValueFormat<D['value']>
    fillDirection: GridFillDirection
    padding: number
    theme: Theme
    colors: OrdinalColorScaleConfig<D>
    emptyColor: string
    emptyOpacity: number
    borderRadius: number
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<D> | { color: string }>
    isInteractive: boolean
    tooltip: TooltipComponent<D>
    forwardLegendData: (data: LegendDatum<D>[]) => void
    role: string
    renderWrapper: boolean
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type MouseHandler<D extends Datum, E extends Element> = (
    data: ComputedDatum<D>,
    event: MouseEvent<E>
) => void

export interface MouseHandlers<D extends Datum, E extends Element> {
    onClick: MouseHandler<D, E>
    onMouseEnter: MouseHandler<D, E>
    onMouseMove: MouseHandler<D, E>
    onMouseLeave: MouseHandler<D, E>
}

export type LayerId = 'cells' | 'areas' | 'legends'

export interface CustomLayerProps<D extends Datum> {
    cells: Cell<D>[]
    computedData: ComputedDatum<D>[]
}

export type WaffleSvgLayer<D extends Datum> = LayerId | FunctionComponent<CustomLayerProps<D>>

export type WaffleSvgProps<D extends Datum = Datum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> &
    SvgDefsAndFill<ComputedDatum<D>> &
    Partial<MouseHandlers<D, SVGGeometryElement>> & {
        layers?: WaffleSvgLayer<D>[]
        legends?: LegendProps[]
        cellComponent?: CellComponent<D>
        motionStagger?: number
        testIdPrefix?: string
    }

export type HtmlLayerId = Exclude<LayerId, 'legends'>

export type WaffleHtmlLayer<D extends Datum> = HtmlLayerId | FunctionComponent<CustomLayerProps<D>>

export type WaffleHtmlProps<D extends Datum = Datum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> &
    Partial<MouseHandlers<D, HTMLElement>> & {
        layers?: WaffleHtmlLayer<D>[]
        cellComponent?: CellComponent<D>
        motionStagger?: number
        testIdPrefix?: string
    }

export type CanvasProps<D extends Datum = Datum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> &
    Partial<Omit<MouseHandlers<D, HTMLCanvasElement>, 'onMouseEnter' | 'onMouseLeave'>> & {
        legends?: LegendProps[]
        pixelRatio?: number
    }
