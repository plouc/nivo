import { FunctionComponent, MouseEvent, TouchEvent, AriaAttributes } from 'react'
import { Line, Area } from 'd3-shape'
import {
    Dimensions,
    Box,
    MotionProps,
    CssMixBlendMode,
    ValueFormat,
    SvgDefsAndFill,
    CartesianMarkerProps,
    PropertyAccessor,
    LineCurveFactoryId,
    DotsItemSymbolComponent,
} from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { AxisProps, CanvasAxisProps } from '@nivo/axes'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { ScaleSpec, TicksSpec } from '@nivo/scales'
import { LegendProps } from '@nivo/legends'
import { CrosshairType } from '@nivo/tooltip'

export type AllowedSeriesId = string | number
// `null` is allowed in the data to indicate a missing value.
export type AllowedValue = string | number | Date | null
export type LineSeries = {
    id: AllowedSeriesId
    data: readonly { x: AllowedValue; y: AllowedValue }[]
}

export type InferSeriesId<T> = T extends { id: infer Id } ? Id : never

export type InferX<T> = T extends { data: ReadonlyArray<infer D> }
    ? D extends { x: infer X }
        ? X
        : never
    : never
export type InferY<T> = T extends { data: ReadonlyArray<infer D> }
    ? D extends { y: infer Y }
        ? Y
        : never
    : never

export type DefaultSeries = {
    id: string
    data: readonly {
        x: string | null
        y: number | null
    }[]
}

export interface ComputedDatum<Series extends LineSeries> {
    data: Series['data'][number]
    position: {
        x: number
        y: number
    }
}

export type ComputedSeries<Series extends LineSeries> = Omit<Series, 'data' | 'id'> & {
    id: InferSeriesId<Series>
    data: readonly ComputedDatum<Series>[]
    color: string
}

export interface Point<Series extends LineSeries> {
    id: string
    indexInSeries: number
    absIndex: number
    seriesIndex: number
    seriesId: InferSeriesId<Series>
    seriesColor: string
    x: number
    y: number
    color: string
    borderColor: string
    data: Series['data'][number] & {
        xFormatted: string
        yFormatted: string
    }
}

export type PointColorContext<Series extends LineSeries> = {
    series: ComputedSeries<Series>
    point: Omit<Point<Series>, 'color' | 'borderColor'>
}

export interface SliceData<Series extends LineSeries> {
    id: string
    x0: number
    x: number
    y0: number
    y: number
    width: number
    height: number
    points: readonly Point<Series>[]
}

export type PointOrSliceData<Series extends LineSeries> = Point<Series> | SliceData<Series>
export function isPoint<Series extends LineSeries>(
    data: PointOrSliceData<Series>
): data is Point<Series> {
    return (data as Point<Series>).seriesId !== undefined
}
export function isSliceData<Series extends LineSeries>(
    data: PointOrSliceData<Series>
): data is SliceData<Series> {
    return (data as SliceData<Series>).points !== undefined
}

export interface DataProps<Series extends LineSeries> {
    data: readonly Series[]
}

export type LineGenerator = Line<{ x: number; y: number }>
export type AreaGenerator = Area<{ x: number; y: number }>

export interface PointTooltipProps<Series extends LineSeries> {
    point: Point<Series>
}
export type PointTooltipComponent<Series extends LineSeries> = FunctionComponent<
    PointTooltipProps<Series>
>

export interface SliceTooltipProps<Series extends LineSeries> {
    axis: 'x' | 'y'
    slice: SliceData<Series>
}
export type SliceTooltipComponent<Series extends LineSeries> = FunctionComponent<
    SliceTooltipProps<Series>
>

export type PointOrSliceMouseHandler<Series extends LineSeries> = (
    datum: Readonly<Point<Series>> | Readonly<SliceData<Series>>,
    event: MouseEvent
) => void
export type PointOrSliceTouchHandler<Series extends LineSeries> = (
    datum: Readonly<Point<Series>> | Readonly<SliceData<Series>>,
    event: TouchEvent
) => void

export type LineLayerId =
    | 'grid'
    | 'markers'
    | 'axes'
    | 'areas'
    | 'crosshair'
    | 'lines'
    | 'slices'
    | 'points'
    | 'mesh'
    | 'legends'

export interface CommonCustomLayerProps<Series extends LineSeries> {
    innerWidth: number
    innerHeight: number
    series: readonly ComputedSeries<Series>[]
    points: readonly Point<Series>[]
    xScale: (x: InferX<Series>) => number
    yScale: (y: InferY<Series>) => number
    lineGenerator: LineGenerator
    areaGenerator: AreaGenerator
    currentPoint: Point<Series> | null
    setCurrentPoint: (point: Point<Series> | null) => void
}

export type LineCustomSvgLayerProps<Series extends LineSeries> = Omit<
    LineSvgPropsWithDefaults<Series>,
    'xScale' | 'yScale'
> &
    CommonCustomLayerProps<Series> & {
        slices: readonly SliceData<Series>[]
        currentSlice: SliceData<Series> | null
        setCurrentSlice: (slice: SliceData<Series> | null) => void
    }
export type LineCustomSvgLayer<Series extends LineSeries> = FunctionComponent<
    LineCustomSvgLayerProps<Series>
>
export type LineSvgLayer<Series extends LineSeries> = LineLayerId | LineCustomSvgLayer<Series>

export type LineCustomCanvasLayerProps<Series extends LineSeries> = CommonCustomLayerProps<Series>
export type LineCustomCanvasLayer<Series extends LineSeries> = (
    context: CanvasRenderingContext2D,
    props: LineCustomCanvasLayerProps<Series>
) => void
export type LineCanvasLayer<Series extends LineSeries> = LineLayerId | LineCustomCanvasLayer<Series>

export type CommonLineProps<Series extends LineSeries> = {
    xScale: ScaleSpec
    xFormat?: ValueFormat<InferX<Series>>
    yScale: ScaleSpec
    yFormat?: ValueFormat<InferY<Series>>
    margin: Box
    curve: LineCurveFactoryId
    theme: PartialTheme
    colors: OrdinalColorScaleConfig<Series>
    lineWidth: number
    enablePoints: boolean
    pointSymbol?: DotsItemSymbolComponent<Point<Series>>
    pointSize: number
    pointColor: InheritedColorConfig<PointColorContext<Series>>
    pointBorderWidth: number
    pointBorderColor: InheritedColorConfig<Omit<Point<Series>, 'borderColor'>>
    enableArea: boolean
    areaBaselineValue: InferY<Series>
    areaOpacity: number
    enableGridX: boolean
    gridXValues?: TicksSpec<InferX<Series>>
    enableGridY: boolean
    gridYValues?: TicksSpec<InferY<Series>>
    legends: readonly LegendProps[]
    isInteractive: boolean
    debugMesh: boolean
    onMouseEnter?: PointOrSliceMouseHandler<Series>
    onMouseMove?: PointOrSliceMouseHandler<Series>
    onMouseLeave?: PointOrSliceMouseHandler<Series>
    onMouseDown?: PointOrSliceMouseHandler<Series>
    onMouseUp?: PointOrSliceMouseHandler<Series>
    onClick?: PointOrSliceMouseHandler<Series>
    onDoubleClick?: PointOrSliceMouseHandler<Series>
    onTouchStart?: PointOrSliceTouchHandler<Series>
    onTouchMove?: PointOrSliceTouchHandler<Series>
    onTouchEnd?: PointOrSliceTouchHandler<Series>
    tooltip: PointTooltipComponent<Series>
    sliceTooltip: SliceTooltipComponent<Series>
    renderWrapper: boolean
    role?: string
}

export interface LineSvgExtraProps<Series extends LineSeries> {
    layers: readonly LineSvgLayer<Series>[]
    enablePointLabel: boolean
    pointLabel: PropertyAccessor<Point<Series>, string>
    pointLabelYOffset?: number
    areaBlendMode: CssMixBlendMode
    axisTop?: AxisProps | null
    axisRight?: AxisProps | null
    axisBottom?: AxisProps | null
    axisLeft?: AxisProps | null
    useMesh: boolean
    enableSlices: 'x' | 'y' | false
    debugSlices: boolean
    enableCrosshair: boolean
    crosshairType: CrosshairType
    enableTouchCrosshair: boolean
    markers?: readonly CartesianMarkerProps[]
    initialHiddenIds: readonly InferSeriesId<Series>[]
    animate: boolean
    motionConfig: MotionProps['motionConfig']
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
    isFocusable: boolean
    pointAriaLabel?: (point: Point<Series>) => AriaAttributes['aria-label']
    pointAriaLabelledBy?: (point: Point<Series>) => AriaAttributes['aria-labelledby']
    pointAriaDescribedBy?: (point: Point<Series>) => AriaAttributes['aria-describedby']
    pointAriaHidden?: (point: Point<Series>) => AriaAttributes['aria-hidden']
    pointAriaDisabled?: (point: Point<Series>) => AriaAttributes['aria-disabled']
}
export type LineSvgProps<Series extends LineSeries> = DataProps<Series> &
    Dimensions &
    Partial<CommonLineProps<Series>> &
    Partial<LineSvgExtraProps<Series>> &
    SvgDefsAndFill<any>
export type LineSvgPropsWithDefaults<Series extends LineSeries> = DataProps<Series> &
    Dimensions &
    CommonLineProps<Series> &
    LineSvgExtraProps<Series> &
    SvgDefsAndFill<any>

export interface LineCanvasExtraProps<Series extends LineSeries> {
    layers: readonly LineCanvasLayer<Series>[]
    pixelRatio: number
    axisTop?: CanvasAxisProps | null
    axisRight?: CanvasAxisProps | null
    axisBottom?: CanvasAxisProps | null
    axisLeft?: CanvasAxisProps | null
}
export type LineCanvasProps<Series extends LineSeries> = DataProps<Series> &
    Dimensions &
    Partial<CommonLineProps<Series>> &
    Partial<LineCanvasExtraProps<Series>>
export type LineCanvasPropsWithDefaults<Series extends LineSeries> = DataProps<Series> &
    Dimensions &
    CommonLineProps<Series> &
    LineCanvasExtraProps<Series>
