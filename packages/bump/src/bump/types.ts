import { FunctionComponent, MouseEvent } from 'react'
import { Line as D3Line } from 'd3-shape'
import { Theme, Box, Dimensions, MotionProps } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { AxisProps } from '@nivo/axes'
import { ScalePoint } from '@nivo/scales'
import { PointProps } from './Point'

export interface BumpDatum {
    x: number | string
    y: number | null
}

export interface DefaultBumpDatum {
    x: string
    y: number
}

export type BumpSerieExtraProps = Record<string, unknown>

export type BumpSerie<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = ExtraProps & {
    id: string
    data: Datum[]
}

export interface BumpSeriePoint<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    id: string
    serie: BumpSerie<Datum, ExtraProps>
    data: Datum
    x: number
    y: number | null
}

export interface BumpPoint<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    id: string
    serie: BumpComputedSerie<Datum, ExtraProps>
    data: Datum
    x: number
    y: number | null
    isActive: boolean
    isInactive: boolean
    size: number
    color: string
    borderWidth: number
    borderColor: string
}
export type BumpPointComponent<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = FunctionComponent<PointProps<Datum, ExtraProps>>

export interface BumpComputedSerie<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> {
    id: string
    data: BumpSerie<Datum, ExtraProps>
    points: BumpSeriePoint<Datum, ExtraProps>[]
    linePoints: [number, number | null][]
    color: string
    opacity: number
    lineWidth: number
}

export type BumpDataProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> = {
    data: BumpSerie<Datum, ExtraProps>[]
}

export type BumpInterpolation = 'smooth' | 'linear'

export type BumpLabel<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> =
    | ((serie: BumpSerie<Datum, ExtraProps>) => string)
    | boolean
export interface BumpLabelData<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    serie: BumpComputedSerie<Datum, ExtraProps>
    id: string
    label: string
    x: number
    y: number
    color: string
    opacity: number
    textAnchor: 'start' | 'end'
}

export type BumpSerieMouseHandler<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = (serie: BumpComputedSerie<Datum, ExtraProps>, event: MouseEvent<SVGPathElement>) => void
export type BumpPointMouseHandler<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = (point: BumpPoint<Datum, ExtraProps>, event: MouseEvent) => void

export type BumpLayerId = 'grid' | 'axes' | 'labels' | 'lines' | 'points' | 'mesh'
export interface BumpCustomLayerProps<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> {
    innerHeight: number
    innerWidth: number
    lineGenerator: D3Line<[number, number | null]>
    points: BumpPoint<Datum, ExtraProps>[]
    series: BumpComputedSerie<Datum, ExtraProps>[]
    xScale: ScalePoint<Datum['x']>
    yScale: ScalePoint<number>
    activeSerieIds: string[]
    activePointIds: string[]
    setActiveSerieIds: (serieIds: string[]) => void
    setActivePointIds: (pointIds: string[]) => void
}
export type BumpCustomLayer<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = FunctionComponent<BumpCustomLayerProps<Datum, ExtraProps>>
export type BumpLayer<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> =
    | BumpLayerId
    | BumpCustomLayer<Datum, ExtraProps>

export type BumpLineTooltip<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = FunctionComponent<{
    serie: BumpComputedSerie<Datum, ExtraProps>
}>

export type BumpPointTooltip<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = FunctionComponent<{
    point: BumpPoint<Datum, ExtraProps>
}>

export interface BumpBaseCommonProps<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> {
    margin: Box

    interpolation: BumpInterpolation
    xPadding: number
    xOuterPadding: number
    yOuterPadding: number

    theme: Theme
    colors: OrdinalColorScaleConfig<BumpSerie<Datum, ExtraProps>>
    lineWidth: number
    activeLineWidth: number
    inactiveLineWidth: number
    opacity: number
    activeOpacity: number
    inactiveOpacity: number

    startLabel: BumpLabel<Datum, ExtraProps>
    startLabelPadding: number
    startLabelTextColor: InheritedColorConfig<BumpComputedSerie<Datum, ExtraProps>>
    endLabel: BumpLabel<Datum, ExtraProps>
    endLabelPadding: number
    endLabelTextColor: InheritedColorConfig<BumpComputedSerie<Datum, ExtraProps>>

    pointSize: number
    activePointSize: number
    inactivePointSize: number
    pointColor: InheritedColorConfig<Omit<BumpPoint<Datum, ExtraProps>, 'color' | 'borderColor'>>
    pointBorderWidth: number
    activePointBorderWidth: number
    inactivePointBorderWidth: number
    pointBorderColor: InheritedColorConfig<Omit<BumpPoint<Datum, ExtraProps>, 'borderColor'>>

    enableGridX: boolean
    enableGridY: boolean
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null
    axisRight: AxisProps | null
    axisTop: AxisProps | null

    isInteractive: boolean
    defaultActiveSerieIds: string[]
    lineTooltip: BumpLineTooltip<Datum, ExtraProps>
    pointTooltip: BumpPointTooltip<Datum, ExtraProps>
    role: string
    layers: BumpLayer<Datum, ExtraProps>[]
    renderWrapper: boolean
    useMesh: boolean
    debugMesh: boolean
}

export const isBumpPoint = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>(
    point: BumpComputedSerie<Datum, ExtraProps> | BumpPoint<Datum, ExtraProps>
): point is BumpPoint<Datum, ExtraProps> => {
    return 'serie' in point
}

export const isComputedBumpSerie = <
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
>(
    serie: BumpComputedSerie<Datum, ExtraProps> | BumpPoint<Datum, ExtraProps>
): serie is BumpComputedSerie<Datum, ExtraProps> => {
    return 'points' in serie
}

interface BumpMeshCommonProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>
    extends BumpBaseCommonProps<Datum, ExtraProps> {
    useMesh: true
    onMouseEnter?: BumpPointMouseHandler<Datum, ExtraProps>
    onMouseMove?: BumpPointMouseHandler<Datum, ExtraProps>
    onMouseLeave?: BumpPointMouseHandler<Datum, ExtraProps>
    onClick?: BumpPointMouseHandler<Datum, ExtraProps>
}

interface BumpSerieCommonProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>
    extends BumpBaseCommonProps<Datum, ExtraProps> {
    useMesh: false
    onMouseEnter?: BumpSerieMouseHandler<Datum, ExtraProps>
    onMouseMove?: BumpSerieMouseHandler<Datum, ExtraProps>
    onMouseLeave?: BumpSerieMouseHandler<Datum, ExtraProps>
    onClick?: BumpSerieMouseHandler<Datum, ExtraProps>
}

export type BumpCommonProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> =
    | BumpMeshCommonProps<Datum, ExtraProps>
    | BumpSerieCommonProps<Datum, ExtraProps>

export type BumpResponsiveProps<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = BumpCommonProps<Datum, ExtraProps> &
    BumpDataProps<Datum, ExtraProps> & {
        pointComponent?: BumpPointComponent<Datum, ExtraProps>
    } & MotionProps

export type BumpSvgProps<
    Datum extends BumpDatum,
    ExtraProps extends BumpSerieExtraProps
> = BumpResponsiveProps<Datum, ExtraProps> & Dimensions
