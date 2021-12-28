import { FunctionComponent, MouseEvent } from 'react'
import { Theme, Box, Dimensions, ModernMotionProps, PropertyAccessor } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { AxisProps } from '@nivo/axes'

export interface BumpDatum {
    x: number | string
    y: number | null
}

export interface DefaultBumpDatum {
    x: string
    y: number
}

export interface BumpSerie<D extends BumpDatum> {
    id: string
    data: D[]
}

export interface BumpSeriePoint<D extends BumpDatum> {
    id: string
    serie: BumpSerie<D>
    data: D
    x: number
    y: number | null
}

export interface BumpPoint<D extends BumpDatum> extends BumpSeriePoint<D> {
    isActive: boolean
    isInactive: boolean
    color: string
    borderColor: string
    style: {
        size: number
        borderWidth: number
    }
}
export type BumpPointComponent<D extends BumpDatum> = FunctionComponent<{
    point: BumpPoint<D>
}>

export interface BumpComputedSerie<D extends BumpDatum> extends BumpSerie<D> {
    color: string
    style: {
        lineWidth: number
        opacity: number
    }
    points: BumpSeriePoint<D>[]
    linePoints: [number, number | null][]
}

export type BumpDataProps<D extends BumpDatum> = {
    data: BumpSerie<D>[]
}

export type BumpInterpolation = 'smooth' | 'linear'

export type BumpLabel = PropertyAccessor<any, string> | false
export interface BumpLabelData<D extends BumpDatum> {
    serie: BumpComputedSerie<D>
    id: BumpSerie<D>['id']
    label: string
    x: number
    y: number
    color: string
    opacity: number
    textAnchor: 'start' | 'end'
}

export type BumpMouseHandler<D extends BumpDatum> = (
    serie: BumpComputedSerie<D>,
    event: MouseEvent<SVGPathElement>
) => void

export type BumpLayerId = 'grid' | 'axes' | 'labels' | 'lines' | 'points'
export interface BumpCustomLayerProps {}
export type BumpCustomLayer = FunctionComponent<BumpCustomLayerProps>

export type BumpCommonProps<D extends BumpDatum> = {
    margin: Box

    interpolation: BumpInterpolation
    xPadding: number
    xOuterPadding: number
    yOuterPadding: number

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<BumpComputedSerie<D>, 'color' | 'style'>>
    lineWidth: number
    activeLineWidth: number
    inactiveLineWidth: number
    opacity: number
    activeOpacity: number
    inactiveOpacity: number

    startLabel: BumpLabel
    startLabelPadding: number
    startLabelTextColor: InheritedColorConfig<BumpComputedSerie<D>>
    endLabel: BumpLabel
    endLabelPadding: number
    endLabelTextColor: InheritedColorConfig<BumpComputedSerie<D>>

    pointSize: number
    activePointSize: number
    inactivePointSize: number
    pointColor: InheritedColorConfig<any>
    pointBorderWidth: number
    activePointBorderWidth: number
    inactivePointBorderWidth: number
    pointBorderColor: InheritedColorConfig<any>

    enableGridX: boolean
    enableGridY: boolean
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null
    axisRight: AxisProps | null
    axisTop: AxisProps | null

    isInteractive: boolean
    defaultActiveSerieIds: string[]
    onMouseEnter: BumpMouseHandler<D>
    onMouseMove: BumpMouseHandler<D>
    onMouseLeave: BumpMouseHandler<D>
    onClick: BumpMouseHandler<D>
    tooltip: FunctionComponent<{ serie: BumpComputedSerie<D> }>
    role: string

    layers: (BumpLayerId | BumpCustomLayer)[]

    renderWrapper: boolean
}

export type BumpSvgProps<D extends BumpDatum> = Partial<BumpCommonProps<D>> &
    BumpDataProps<D> & {
        pointComponent: BumpPointComponent<D>
    } & Dimensions &
    ModernMotionProps
