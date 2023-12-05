import { FunctionComponent, MouseEvent } from 'react'
import { Line, Area } from 'd3-shape'
import {
    LineCurveFactoryId,
    Dimensions,
    MotionProps,
    Theme,
    Box,
    CssMixBlendMode,
    SvgDefsAndFill,
    ValueFormat,
    CartesianMarkerProps,
    PropertyAccessor,
    DotsItemSymbolComponent,
} from '@nivo/core'
import { LegendProps } from '@nivo/legends'
import { AxisProps, CanvasAxisProps } from '@nivo/axes'
import { ScaleSpec, ScaleBandSpec, TicksSpec, AnyScale } from '@nivo/scales'
import { CrosshairType } from '@nivo/tooltip'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'

export type LineValue = number | string | Date | null

export type LineScaleSpec = Exclude<ScaleSpec, ScaleBandSpec>

export interface LineDatum {
    x: LineValue
    y: LineValue
}

export type LineSeries<Datum extends LineDatum = LineDatum> = {
    id: string
    data: readonly Datum[]
}

export type ComputedSeries<Series extends LineSeries> = Omit<Series, 'data'> & {
    color: string
    data: LinePointDatum<Series['data'][0]>[]
}

export type SliceAxis = 'x' | 'y'

export type PointPosition = {
    x: number | null
    y: number | null
}

export interface SliceDatum<Datum extends LineDatum> {
    id: 0
    x0: number
    x: number
    y0: number
    y: number
    width: number
    height: number
    points: readonly PointDatum<Datum>[]
}

export type LineGenerator = Line<PointPosition>

export type AreaGenerator = Area<PointPosition>

export interface PointTooltipProps<Datum extends LineDatum> {
    point: PointDatum<Datum>
}
export type PointTooltipComponent<Datum extends LineDatum> = FunctionComponent<
    PointTooltipProps<Datum>
>

export type PointMouseHandler<Datum extends LineDatum> = (
    point: PointDatum<Datum>,
    event: MouseEvent
) => void

export interface SliceTooltipProps<Datum extends LineDatum> {
    slice: SliceDatum<Datum>
    axis: SliceAxis
}
export type SliceTooltipComponent<Datum extends LineDatum> = FunctionComponent<
    SliceTooltipProps<Datum>
>

export interface LineDataProps<Series extends LineSeries> {
    data: readonly Series[]
}

export interface LinePointDatum<Datum extends LineDatum> {
    data: Datum
    position: PointPosition
}

export interface PointDatum<Datum extends LineDatum> {
    id: string
    index: number
    serieId: LineSeries['id']
    serieColor: string
    x: number
    y: number
    color: string
    borderColor: string
    data: Datum & {
        xFormatted: string
        yFormatted: string
    }
}

export interface LegendDatum {
    id: LineSeries['id']
    label: string
    color: string
    hidden: boolean
}

export type LayerId =
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

export type LineCommonProps<Series extends LineSeries> = {
    xScale: LineScaleSpec
    xFormat: ValueFormat<Exclude<Series['data'][0]['x'], null | undefined>>
    yScale: LineScaleSpec
    yFormat: ValueFormat<Exclude<Series['data'][0]['y'], null | undefined>>

    margin: Box

    markers: readonly CartesianMarkerProps<
        | Exclude<Series['data'][0]['x'], null | undefined>
        | Exclude<Series['data'][0]['y'], null | undefined>
    >[]

    curve: LineCurveFactoryId
    lineWidth: number

    colors: OrdinalColorScaleConfig<Series>
    theme: Theme

    enablePoints: boolean
    pointSymbol: DotsItemSymbolComponent
    pointSize: number
    pointColor: InheritedColorConfig<PointDatum<Series['data'][0]>>
    pointBorderWidth: number
    pointBorderColor: InheritedColorConfig<PointDatum<Series['data'][0]>>

    enableArea: boolean
    areaBaselineValue: Exclude<Series['data'][0]['y'], null | undefined>
    areaOpacity: number

    enableGridX: boolean
    gridXValues: TicksSpec<Exclude<Series['data'][0]['x'], null | undefined>>
    enableGridY: boolean
    gridYValues: TicksSpec<Exclude<Series['data'][0]['y'], null | undefined>>

    isInteractive: boolean
    onMouseEnter: PointMouseHandler<Series['data'][0]>
    onMouseMove: PointMouseHandler<Series['data'][0]>
    onMouseLeave: PointMouseHandler<Series['data'][0]>
    onClick: PointMouseHandler<Series['data'][0]>
    tooltip: PointTooltipComponent<Series['data'][0]>
    debugMesh: boolean
    enableCrosshair: boolean
    crosshairType: CrosshairType
    enableSlices: SliceAxis | false
    sliceTooltip: SliceTooltipComponent<Series['data'][0]>
    debugSlices: boolean

    legends: readonly LegendProps[]

    role: string

    renderWrapper: boolean
}

export interface CustomLayerProps<Series extends LineSeries> {
    innerHeight: number
    innerWidth: number
    lineGenerator: LineGenerator
    lineWidth: number
    areaGenerator: AreaGenerator
    points: readonly PointDatum<Series['data'][0]>[]
    series: readonly ComputedSeries<Series>[]
    xScale: AnyScale
    yScale: AnyScale
}

export type CustomLayerComponentProps<Series extends LineSeries> = CustomLayerProps<Series>

export type CustomLayerComponent<Series extends LineSeries> = FunctionComponent<
    CustomLayerComponentProps<Series>
>

export type SvgLayer<Series extends LineSeries> = LayerId | CustomLayerComponent<Series>

export type LineSvgProps<Series extends LineSeries> = Partial<LineCommonProps<Series>> &
    LineDataProps<Series> &
    Partial<{
        layers: readonly SvgLayer<Series>[]
        enablePointLabel: boolean
        pointLabel: PropertyAccessor<Series['data'][0], string>
        pointLabelYOffset: number
        areaBlendMode: CssMixBlendMode
        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        axisRight: AxisProps | null
        axisTop: AxisProps | null
        useMesh: boolean
    }> &
    Dimensions &
    MotionProps &
    SvgDefsAndFill<ComputedSeries<Series>>

export interface CustomCanvasLayerProps<Series extends LineSeries>
    extends CustomLayerComponentProps<Series> {
    ctx: CanvasRenderingContext2D
}

export type CustomCanvasLayer<Series extends LineSeries> = (
    props: CustomCanvasLayerProps<Series>
) => void

export type CanvasLayer<Series extends LineSeries> = LayerId | CustomCanvasLayer<Series>

export type LineCanvasProps<Series extends LineSeries> = Partial<LineCommonProps<Series>> &
    LineDataProps<Series> &
    Partial<{
        layers: readonly CanvasLayer<Series>[]
        axisBottom: CanvasAxisProps | null
        axisLeft: CanvasAxisProps | null
        axisRight: CanvasAxisProps | null
        axisTop: CanvasAxisProps | null
        pixelRatio: number
    }> &
    Dimensions
