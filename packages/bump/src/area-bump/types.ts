import { FunctionComponent, MouseEvent } from 'react'
import {
    PropertyAccessor,
    Box,
    Theme,
    Dimensions,
    ModernMotionProps,
    CssMixBlendMode,
    SvgDefsAndFill,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { AxisProps } from '@nivo/axes'
import { Area } from 'd3-shape'
import { ScalePoint } from '@nivo/scales'

export interface AreaBumpDatum {
    x: number | string
    y: number
}

export interface DefaultAreaBumpDatum {
    x: string
    y: number
}

export interface AreaBumpSerie<D extends AreaBumpDatum> {
    id: string
    data: D[]
}

export interface AreaBumpPoint<D extends AreaBumpDatum> {
    x: number
    y: number
    height: number
    data: D
}

export interface AreaBumpAreaPoint {
    x: number
    y0: number
    y1: number
}

export type AreaBumpAreaGenerator = Area<AreaBumpAreaPoint>

export interface AreaBumpComputedSerie<D extends AreaBumpDatum> extends AreaBumpSerie<D> {
    points: AreaBumpPoint<D>[]
    areaPoints: AreaBumpAreaPoint[]
    color: string
    fill?: string
    style: {
        fillOpacity: number
        borderWidth: number
        borderColor: string
        borderOpacity: number
    }
}

export type AreaBumpAlign = 'start' | 'middle' | 'end'

export type AreaBumpDataProps<D extends AreaBumpDatum> = {
    data: AreaBumpSerie<D>[]
}

export type AreaBumpInterpolation = 'smooth' | 'linear'

export type AreaBumpLabel<D extends AreaBumpDatum> =
    | PropertyAccessor<AreaBumpComputedSerie<D>, string>
    | false
export interface AreaBumpLabelData<D extends AreaBumpDatum> {
    serie: AreaBumpComputedSerie<D>
    id: AreaBumpSerie<D>['id']
    label: string
    x: number
    y: number
    color: string
    opacity: number
    textAnchor: 'start' | 'end'
}

export type AreaBumpMouseHandler<D extends AreaBumpDatum> = (
    serie: AreaBumpComputedSerie<D>,
    event: MouseEvent<SVGPathElement>
) => void

export type AreaBumpLayerId = 'grid' | 'axes' | 'labels' | 'areas'
export interface AreaBumpCustomLayerProps<D extends AreaBumpDatum> {
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    series: AreaBumpComputedSerie<D>[]
    xScale: ScalePoint<D['x']>
    areaGenerator: AreaBumpAreaGenerator
}
export type AreaBumpCustomLayer<D extends AreaBumpDatum> = FunctionComponent<
    AreaBumpCustomLayerProps<D>
>

export type AreaBumpCommonProps<D extends AreaBumpDatum> = {
    margin: Box

    align: AreaBumpAlign
    interpolation: AreaBumpInterpolation
    spacing: number
    xPadding: number

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<AreaBumpComputedSerie<D>, 'color' | 'style'>>
    blendMode: CssMixBlendMode
    fillOpacity: number
    activeFillOpacity: number
    inactiveFillOpacity: number
    borderWidth: number
    activeBorderWidth: number
    inactiveBorderWidth: number
    borderColor: InheritedColorConfig<Omit<AreaBumpComputedSerie<D>, 'style'>>
    borderOpacity: number
    activeBorderOpacity: number
    inactiveBorderOpacity: number

    startLabel: AreaBumpLabel<D>
    startLabelPadding: number
    startLabelTextColor: InheritedColorConfig<AreaBumpComputedSerie<D>>
    endLabel: AreaBumpLabel<D>
    endLabelPadding: number
    endLabelTextColor: InheritedColorConfig<AreaBumpComputedSerie<D>>

    enableGridX: boolean
    axisBottom: AxisProps | null
    axisTop: AxisProps | null

    isInteractive: boolean
    defaultActiveSerieIds: string[]
    onMouseEnter: AreaBumpMouseHandler<D>
    onMouseMove: AreaBumpMouseHandler<D>
    onMouseLeave: AreaBumpMouseHandler<D>
    onClick: AreaBumpMouseHandler<D>
    tooltip: FunctionComponent<{ serie: AreaBumpComputedSerie<D> }>
    role: string

    layers: (AreaBumpLayerId | AreaBumpCustomLayer<D>)[]

    renderWrapper: boolean
}

export type AreaBumpSvgProps<D extends AreaBumpDatum> = Partial<AreaBumpCommonProps<D>> &
    AreaBumpDataProps<D> &
    SvgDefsAndFill<AreaBumpComputedSerie<D>> &
    Dimensions &
    ModernMotionProps
