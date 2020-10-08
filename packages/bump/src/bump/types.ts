import { FunctionComponent, MouseEvent } from 'react'
import { Line as D3Line } from 'd3-shape'
import { Theme, Box, Dimensions, MotionProps } from '@bitbloom/nivo-core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@bitbloom/nivo-colors'
import { AxisProps } from '@bitbloom/nivo-axes'
import { ScalePoint } from '@bitbloom/nivo-scales'

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
> = FunctionComponent<{
    point: BumpPoint<Datum, ExtraProps>
}>

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

export type BumpMouseHandler<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> = (
    serie: BumpComputedSerie<Datum, ExtraProps>,
    event: MouseEvent<SVGPathElement>
) => void

export type BumpLayerId = 'grid' | 'axes' | 'labels' | 'lines' | 'points'
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
    setActiveSerieIds: (serieIds: string[]) => void
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

export type BumpCommonProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> = {
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
    onMouseEnter: BumpMouseHandler<Datum, ExtraProps>
    onMouseMove: BumpMouseHandler<Datum, ExtraProps>
    onMouseLeave: BumpMouseHandler<Datum, ExtraProps>
    onClick: BumpMouseHandler<Datum, ExtraProps>
    tooltip: BumpLineTooltip<Datum, ExtraProps>
    role: string

    layers: BumpLayer<Datum, ExtraProps>[]

    renderWrapper: boolean
}

export type BumpSvgProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> = Partial<
    BumpCommonProps<Datum, ExtraProps>
> &
    BumpDataProps<Datum, ExtraProps> & {
        pointComponent?: BumpPointComponent<Datum, ExtraProps>
    } & Dimensions &
    MotionProps
