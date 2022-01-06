import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { AnimatedProps } from '@react-spring/web'
import {
    Box,
    Theme,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { AxisProps } from '@nivo/axes'
import { InheritedColorConfig, ContinuousColorScaleConfig } from '@nivo/colors'
import { AnchoredContinuousColorsLegendProps } from '@nivo/legends'

export interface HeatMapDatum {
    x: string | number
    y: number
}

export interface DefaultHeatMapDatum {
    x: string
    y: number
}

export type HeatMapSerie<Datum extends HeatMapDatum, ExtraProps extends object> = {
    id: string
    data: Datum[]
} & ExtraProps

export interface ComputedCell<Datum extends HeatMapDatum> {
    id: string
    serieId: string
    value: number
    formattedValue: string
    data: Datum
    x: number
    y: number
    width: number
    height: number
    color: string
    opacity: number
    borderColor: string
    label: string
    labelTextColor: string
}

export interface CellAnimatedProps {
    x: number
    y: number
    width: number
    height: number
    color: string
    opacity: number
    textColor: string
    borderColor: string
}

export type CellCanvasRenderer<Datum extends HeatMapDatum> = (
    ctx: CanvasRenderingContext2D,
    cell: ComputedCell<Datum>
) => void

export interface HeatMapDataProps<Datum extends HeatMapDatum, ExtraProps extends object> {
    data: HeatMapSerie<Datum, ExtraProps>[]
}

export type LayerId = 'grid' | 'axes' | 'cells' | 'legends'
export interface CustomLayerProps<Datum extends HeatMapDatum> {
    cells: ComputedCell<Datum>[]
}
export type CustomLayer<Datum extends HeatMapDatum> = FunctionComponent<CustomLayerProps<Datum>>
export type CustomCanvasLayer<Datum extends HeatMapDatum> = (
    ctx: CanvasRenderingContext2D,
    props: CustomLayerProps<Datum>
) => void

export interface TooltipProps<Datum extends HeatMapDatum> {
    cell: ComputedCell<Datum>
}
export type TooltipComponent<Datum extends HeatMapDatum> = FunctionComponent<TooltipProps<Datum>>

export interface CellComponentProps<Datum extends HeatMapDatum> {
    cell: ComputedCell<Datum>
    animated: AnimatedProps<CellAnimatedProps>
    onClick?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
    onMouseEnter?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
    onMouseMove?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
    onMouseLeave?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
}
export type CellComponent<Datum extends HeatMapDatum> = FunctionComponent<CellComponentProps<Datum>>

export type CellShape = 'rect' | 'circle'

export type HeatMapCommonProps<Datum extends HeatMapDatum> = {
    minValue: number | 'auto'
    maxValue: number | 'auto'
    valueFormat: ValueFormat<number>

    margin: Box

    forceSquare: boolean
    sizeVariation: number
    xInnerPadding: number
    xOuterPadding: number
    yInnerPadding: number
    yOuterPadding: number

    opacity: number
    activeOpacity: number
    inactiveOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<Omit<ComputedCell<Datum>, 'borderColor'>>

    enableGridX: boolean
    enableGridY: boolean
    axisTop: AxisProps | null
    axisRight: AxisProps | null
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null

    theme: Theme
    colors:
        | ContinuousColorScaleConfig
        | ((
              cell: Omit<
                  ComputedCell<Datum>,
                  'color' | 'opacity' | 'borderColor' | 'labelTextColor'
              >
          ) => string)
    nanColor: string

    enableLabels: boolean
    label: PropertyAccessor<
        Omit<ComputedCell<Datum>, 'label' | 'color' | 'opacity' | 'borderColor' | 'labelTextColor'>,
        string
    >
    labelTextColor: InheritedColorConfig<Omit<ComputedCell<Datum>, 'labelTextColor'>>

    legends: Omit<AnchoredContinuousColorsLegendProps, 'containerWidth' | 'containerHeight'>[]

    isInteractive: boolean
    hoverTarget: 'cell' | 'row' | 'column' | 'rowColumn'
    tooltip: TooltipComponent<Datum>
    onClick: (cell: ComputedCell<Datum>, event: MouseEvent) => void

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & Required<ModernMotionProps>

export type HeatMapSvgProps<Datum extends HeatMapDatum, ExtraProps extends object> = Partial<
    HeatMapCommonProps<Datum>
> &
    HeatMapDataProps<Datum, ExtraProps> &
    Dimensions & {
        borderRadius?: number
        layers?: (LayerId | CustomLayer<Datum>)[]
        cellComponent?: CellShape | CellComponent<Datum>
        onMouseEnter?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
        onMouseMove?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
        onMouseLeave?: (cell: ComputedCell<Datum>, event: MouseEvent) => void
    }

export type HeatMapCanvasProps<Datum extends HeatMapDatum, ExtraProps extends object> = Partial<
    HeatMapCommonProps<Datum>
> &
    HeatMapDataProps<Datum, ExtraProps> &
    Dimensions & {
        layers?: (LayerId | CustomCanvasLayer<Datum>)[]
        renderCell?: CellShape | CellCanvasRenderer<Datum>
        pixelRatio?: number
    }
