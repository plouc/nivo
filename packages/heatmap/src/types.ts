import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { AnimatedProps } from '@react-spring/web'
import {
    Box,
    Theme,
    CompleteTheme,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { AxisProps, CanvasAxisProps } from '@nivo/axes'
import {
    InheritedColorConfig,
    ContinuousColorScaleConfig,
    AnyContinuousColorScale,
} from '@nivo/colors'
import { ContinuousColorsLegendProps } from '@nivo/legends'
import { AnnotationMatcher } from '@nivo/annotations'

export interface HeatMapDatum {
    x: string | number
    y?: number | null | undefined
}

export interface DefaultHeatMapDatum {
    x: string
    y?: number | null | undefined
}

export type HeatMapSerie<Datum extends HeatMapDatum, ExtraProps extends object> = {
    id: string
    data: Datum[]
} & ExtraProps

export interface ComputedCell<Datum extends HeatMapDatum> {
    id: string
    serieId: string
    value: number | null
    formattedValue: string | null
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
    scale: number
    color: string
    opacity: number
    borderColor: string
    labelTextColor: string
}

export interface HeatMapDataProps<Datum extends HeatMapDatum, ExtraProps extends object> {
    data: HeatMapSerie<Datum, ExtraProps>[]
}

export interface SizeVariationConfig {
    // use auto min/max values if unspecified
    values?: [min: number, max: number]
    // expressed as a range from 0~1
    sizes: [min: number, max: number]
}

export type LayerId = 'grid' | 'axes' | 'cells' | 'legends' | 'annotations'
export interface CustomLayerProps<Datum extends HeatMapDatum> {
    margin: Box
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    scale: AnyContinuousColorScale
    theme: Theme
    cells: ComputedCell<Datum>[]
    activeCell: ComputedCell<Datum> | null
    setActiveCell: (cell: ComputedCell<Datum> | null) => void
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
    borderWidth: number
    borderRadius: number
    animatedProps: AnimatedProps<CellAnimatedProps>
    onMouseEnter?: (cell: ComputedCell<Datum>) => (event: MouseEvent) => void
    onMouseMove?: (cell: ComputedCell<Datum>) => (event: MouseEvent) => void
    onMouseLeave?: (cell: ComputedCell<Datum>) => (event: MouseEvent) => void
    onClick?: (cell: ComputedCell<Datum>) => (event: MouseEvent) => void
    enableLabels: boolean
}
export type CellComponent<Datum extends HeatMapDatum> = FunctionComponent<CellComponentProps<Datum>>

export interface CellCanvasRendererProps<Datum extends HeatMapDatum> {
    cell: ComputedCell<Datum>
    borderWidth: number
    enableLabels: boolean
    theme: CompleteTheme
}
export type CellCanvasRenderer<Datum extends HeatMapDatum> = (
    ctx: CanvasRenderingContext2D,
    props: CellCanvasRendererProps<Datum>
) => void

export type CellShape = 'rect' | 'circle'

export type HeatMapCommonProps<Datum extends HeatMapDatum> = {
    valueFormat: ValueFormat<number>

    margin: Box

    forceSquare: boolean
    sizeVariation: false | SizeVariationConfig
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

    theme: Theme
    colors:
        | ContinuousColorScaleConfig
        | ((
              cell: Omit<
                  ComputedCell<Datum>,
                  'color' | 'opacity' | 'borderColor' | 'labelTextColor'
              >
          ) => string)
    emptyColor: string

    enableLabels: boolean
    label: PropertyAccessor<
        Omit<ComputedCell<Datum>, 'label' | 'color' | 'opacity' | 'borderColor' | 'labelTextColor'>,
        string
    >
    labelTextColor: InheritedColorConfig<Omit<ComputedCell<Datum>, 'labelTextColor'>>

    legends: Omit<ContinuousColorsLegendProps, 'scale'>[]

    annotations: AnnotationMatcher<ComputedCell<Datum>>[]

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
    Dimensions &
    Partial<{
        axisTop: AxisProps | null
        axisRight: AxisProps | null
        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        borderRadius: number
        layers: (LayerId | CustomLayer<Datum>)[]
        cellComponent: CellShape | CellComponent<Datum>
        onMouseEnter: (cell: ComputedCell<Datum>, event: MouseEvent) => void
        onMouseMove: (cell: ComputedCell<Datum>, event: MouseEvent) => void
        onMouseLeave: (cell: ComputedCell<Datum>, event: MouseEvent) => void
    }>

export type HeatMapCanvasProps<Datum extends HeatMapDatum, ExtraProps extends object> = Partial<
    HeatMapCommonProps<Datum>
> &
    HeatMapDataProps<Datum, ExtraProps> &
    Dimensions &
    Partial<{
        axisTop: CanvasAxisProps<Datum['x']> | null
        axisRight: CanvasAxisProps<string> | null
        axisBottom: CanvasAxisProps<Datum['x']> | null
        axisLeft: CanvasAxisProps<string> | null
        layers: (LayerId | CustomCanvasLayer<Datum>)[]
        renderCell: CellShape | CellCanvasRenderer<Datum>
        pixelRatio: number
    }>
