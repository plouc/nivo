import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { SpringValues } from '@react-spring/web'
import { Box, Dimensions, Theme, SvgDefsAndFill, ModernMotionProps, ValueFormat } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Vertex } from './polygons'

export type DatumId = string | number

export interface Datum {
    id: string
    label: string | number
    value: number
}

export interface ComputedDatum<D extends Datum> extends Datum {
    data: D
    formattedValue: string
    groupIndex: number
    // Index of the starting cell
    startAt: number
    // Index of the ending cell
    endAt: number
    polygons: Vertex[][]
    color: string
    borderColor: string
    fill?: string
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
    fill: string
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
    cellSize: number
    animatedProps: SpringValues<CellAnimatedProps>
    borderWidth: number
    testIdPrefix?: string
}
export type CellComponent<D extends Datum> = FunctionComponent<CellComponentProps<D>>

export type FillDirection = 'top' | 'right' | 'bottom' | 'left'

// All those props are required
export interface DataProps<D extends Datum> {
    data: D[]
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
    fillDirection: FillDirection
    padding: number
    theme: Theme
    colors: OrdinalColorScaleConfig<D>
    emptyColor: string
    emptyOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<D>>
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
    yay?: D
}

export type SvgLayer<D extends Datum> = LayerId | FunctionComponent<CustomLayerProps<D>>

export type SvgProps<D extends Datum = Datum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> &
    SvgDefsAndFill<ComputedDatum<D>> &
    Partial<MouseHandlers<D, SVGGeometryElement>> & {
        layers?: SvgLayer<D>[]
        legends?: LegendProps[]
        cellComponent?: CellComponent<D>
        motionStagger?: number
        testIdPrefix?: string
    }

export type HtmlLayerId = Exclude<LayerId, 'legends'>

export type HtmlLayer<D extends Datum> = HtmlLayerId | FunctionComponent<CustomLayerProps<D>>

export type HtmlProps<D extends Datum = Datum> = DataProps<D> &
    Dimensions &
    Partial<CommonProps<D>> &
    Partial<MouseHandlers<D, HTMLElement>> & {
        layers?: HtmlLayer<D>[]
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
