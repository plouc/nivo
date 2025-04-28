import { FunctionComponent, MouseEvent } from 'react'
import { Area } from 'd3-shape'
import { Box, Dimensions, MotionProps, CssMixBlendMode, SvgDefsAndFill } from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { AxisProps } from '@nivo/axes'
import { ScalePoint } from '@nivo/scales'

export interface AreaBumpDatum {
    x: number | string
    y: number
}

export interface DefaultAreaBumpDatum {
    x: string
    y: number
}

export type AreaBumpSerieExtraProps = Record<string, unknown>

export type AreaBumpSerie<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = ExtraProps & {
    id: string
    data: Datum[]
}

export interface AreaBumpPoint<Datum extends AreaBumpDatum> {
    x: number
    y: number
    height: number
    data: Datum
}

export interface AreaBumpAreaPoint {
    x: number
    y0: number
    y1: number
}

export type AreaBumpAreaGenerator = Area<AreaBumpAreaPoint>

export interface AreaBumpComputedSerie<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> {
    id: string
    data: AreaBumpSerie<Datum, ExtraProps>
    points: AreaBumpPoint<Datum>[]
    areaPoints: AreaBumpAreaPoint[]
    color: string
    fill?: string
    fillOpacity: number
    borderWidth: number
    borderColor: string
    borderOpacity: number
}

export type AreaBumpAlign = 'start' | 'middle' | 'end'

export type AreaBumpDataProps<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = {
    data: AreaBumpSerie<Datum, ExtraProps>[]
}

export type AreaBumpInterpolation = 'smooth' | 'linear'

export type AreaBumpLabel<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = ((serie: AreaBumpSerie<Datum, ExtraProps>) => string) | boolean
export interface AreaBumpLabelData<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> {
    id: string
    serie: AreaBumpComputedSerie<Datum, ExtraProps>
    label: string
    x: number
    y: number
    color: string
    opacity: number
    textAnchor: 'start' | 'end'
}

export type AreaBumpMouseHandler<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = (serie: AreaBumpComputedSerie<Datum, ExtraProps>, event: MouseEvent<SVGPathElement>) => void

export type AreaBumpLayerId = 'grid' | 'axes' | 'labels' | 'areas'
export interface AreaBumpCustomLayerProps<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> {
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    series: AreaBumpComputedSerie<Datum, ExtraProps>[]
    xScale: ScalePoint<Datum['x']>
    areaGenerator: AreaBumpAreaGenerator
}
export type AreaBumpCustomLayer<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = FunctionComponent<AreaBumpCustomLayerProps<Datum, ExtraProps>>
export type AreaBumpLayer<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = AreaBumpLayerId | AreaBumpCustomLayer<Datum, ExtraProps>

export type AreaBumpAreaTooltip<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = FunctionComponent<{
    serie: AreaBumpComputedSerie<Datum, ExtraProps>
}>

export type AreaBumpCommonProps<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = {
    margin: Box

    align: AreaBumpAlign
    interpolation: AreaBumpInterpolation
    spacing: number
    xPadding: number

    theme: PartialTheme
    colors: OrdinalColorScaleConfig<AreaBumpSerie<Datum, ExtraProps>>
    blendMode: CssMixBlendMode
    fillOpacity: number
    activeFillOpacity: number
    inactiveFillOpacity: number
    borderWidth: number
    activeBorderWidth: number
    inactiveBorderWidth: number
    borderColor: InheritedColorConfig<
        Omit<
            AreaBumpComputedSerie<Datum, ExtraProps>,
            'fillOpacity' | 'borderWidth' | 'borderColor' | 'borderOpacity'
        >
    >
    borderOpacity: number
    activeBorderOpacity: number
    inactiveBorderOpacity: number

    startLabel: AreaBumpLabel<Datum, ExtraProps>
    startLabelPadding: number
    startLabelTextColor: InheritedColorConfig<AreaBumpComputedSerie<Datum, ExtraProps>>
    endLabel: AreaBumpLabel<Datum, ExtraProps>
    endLabelPadding: number
    endLabelTextColor: InheritedColorConfig<AreaBumpComputedSerie<Datum, ExtraProps>>

    enableGridX: boolean
    axisBottom: AxisProps | null
    axisTop: AxisProps | null

    isInteractive: boolean
    defaultActiveSerieIds: string[]
    onMouseEnter: AreaBumpMouseHandler<Datum, ExtraProps>
    onMouseMove: AreaBumpMouseHandler<Datum, ExtraProps>
    onMouseLeave: AreaBumpMouseHandler<Datum, ExtraProps>
    onClick: AreaBumpMouseHandler<Datum, ExtraProps>
    tooltip: AreaBumpAreaTooltip<Datum, ExtraProps>
    role: string

    layers: AreaBumpLayer<Datum, ExtraProps>[]

    renderWrapper: boolean
}

export type AreaBumpSvgProps<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> = Partial<AreaBumpCommonProps<Datum, ExtraProps>> &
    AreaBumpDataProps<Datum, ExtraProps> &
    SvgDefsAndFill<AreaBumpComputedSerie<Datum, ExtraProps>> &
    Dimensions &
    MotionProps
