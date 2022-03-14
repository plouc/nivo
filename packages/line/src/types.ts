import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { Line, Area } from 'd3-shape'
import {
    Box,
    Theme,
    Dimensions,
    ModernMotionProps,
    PropertyAccessor,
    SvgDefsAndFill,
    CssMixBlendMode,
    ValueFormat,
} from '@nivo/core'
import { AxisProps, CanvasAxisProps } from '@nivo/axes'
import { CrosshairType } from '@nivo/tooltip'
import { ScaleSpec } from '@nivo/scales'
import { LegendProps } from '@nivo/legends'

export type LineValue = number | string | Date | null

export interface LineDatum {
    x: LineValue
    y: LineValue
}

export interface DefaultLineDatum {
    x: number | null | undefined
    y: number | null | undefined
}

export type LineSeries<Datum extends LineDatum, ExtraProps extends object> = {
    id: string
    data: Datum[]
} & ExtraProps

export type SliceAxis = 'x' | 'y'

export interface SliceDatum<Datum extends LineDatum> {
    id: 0
    x0: number
    x: number
    y0: number
    y: number
    width: number
    height: number
    points: any[]
}

export interface PointTooltipProps<Datum extends LineDatum> {
    point: LinePointDatum<Datum>
}
export type PointTooltipComponent<Datum extends LineDatum> = FunctionComponent<
    PointTooltipProps<Datum>
>

export interface SliceTooltipProps<Datum extends LineDatum> {
    slice: SliceDatum<Datum>
    axis: SliceAxis
}
export type SliceTooltipComponent<Datum extends LineDatum> = FunctionComponent<
    SliceTooltipProps<Datum>
>

export interface LineDataProps<Datum extends LineDatum, ExtraProps extends object> {
    data: LineSeries<Datum, ExtraProps>[]
}

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

export type CurveInterpolation =
    | 'basis'
    | 'cardinal'
    | 'catmullRom'
    | 'linear'
    | 'monotoneX'
    | 'monotoneY'
    | 'natural'
    | 'step'
    | 'stepAfter'
    | 'stepBefore'

export type LineGenerator<Datum extends LineDatum> = Line<LinePointDatum<Datum>['position']>

export type AreaGenerator<Datum extends LineDatum> = Area<LinePointDatum<Datum>['position']>

export interface LineStyle {
    lineWidth: number
    opacity: number
}

export interface LineSvgStyle extends LineStyle {}

export interface LineCanvasStyle extends LineStyle {}

export interface LinePointDatum<Datum extends LineDatum> {
    data: Datum
    position: {
        x: number
        y: number
    }
}

export interface PointDatum<Datum extends LineDatum> {
    id: string
    index: number
    serieId: string
    serieColor: string
    x: number
    y: number
    data: Datum & {
        xFormatted: string
        yFormatted: string
    }
}

export type LineCommonProps<Datum extends LineDatum> = {
    xScale: ScaleSpec
    xFormat: ValueFormat<Exclude<Datum['x'], null>>
    yScale: ScaleSpec
    yFormat: ValueFormat<Exclude<Datum['y'], null>>

    margin: Box

    layers: LineLayerId[]

    enableGridX: boolean
    gridXValues: Exclude<Datum['x'], null>[]
    enableGridY: boolean
    gridYValues: Exclude<Datum['y'], null>[]

    curve: CurveInterpolation
    lineWidth: number
    enableArea: boolean
    areaBaselineValue: number
    areaOpacity: number
    areaBlendMode: CssMixBlendMode

    enablePoints: boolean
    pointSize: number
    // pointColor: { from: 'color' },
    pointBorderWidth: number
    // pointBorderColor: { theme: 'background' },
    enablePointLabel: boolean
    // pointLabel: 'yFormatted',

    theme: Theme

    // annotations: AnnotationMatcher<ComputedCell<Datum>>[]

    isInteractive: boolean
    debugMesh: boolean
    enableSlices: SliceAxis | false
    debugSlices: boolean
    sliceTooltip: SliceTooltipComponent<Datum>
    enableCrosshair: boolean
    crosshairType: CrosshairType
    onMouseEnter: (point: LinePointDatum<Datum>, event: MouseEvent) => void
    onMouseMove: (point: LinePointDatum<Datum>, event: MouseEvent) => void
    onMouseLeave: (point: LinePointDatum<Datum>, event: MouseEvent) => void
    onClick: (point: LinePointDatum<Datum>, event: MouseEvent) => void
    tooltip: PointTooltipComponent<Datum>

    markers: any[]

    legends: LegendProps[]

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & Required<ModernMotionProps>

export type LineSvgProps<Datum extends LineDatum, ExtraProps extends object> = Partial<
    LineCommonProps<Datum>
> &
    LineDataProps<Datum, ExtraProps> &
    Dimensions &
    SvgDefsAndFill<any> &
    Partial<{
        axisTop: AxisProps | null
        axisRight: AxisProps | null
        axisBottom: AxisProps | null
        axisLeft: AxisProps | null
        useMesh: boolean
    }>

export type LineCanvasProps<Datum extends LineDatum, ExtraProps extends object> = Partial<
    LineCommonProps<Datum>
> &
    LineDataProps<Datum, ExtraProps> &
    Dimensions &
    Partial<{
        axisTop: CanvasAxisProps<Exclude<Datum['x'], null>> | null
        axisRight: CanvasAxisProps<Exclude<Datum['y'], null>> | null
        axisBottom: CanvasAxisProps<Exclude<Datum['x'], null>> | null
        axisLeft: CanvasAxisProps<Exclude<Datum['y'], null>> | null
        pixelRatio: number
    }>
