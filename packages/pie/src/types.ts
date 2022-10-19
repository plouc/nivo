import * as React from 'react'
import {
    Box,
    Dimensions,
    Theme,
    SvgDefsAndFill,
    ModernMotionProps,
    ValueFormat,
    PropertyAccessor,
} from '@nivo/core'
import {
    Arc,
    ArcGenerator,
    ArcTransitionMode,
    ArcLabelsProps,
    ArcLinkLabelsProps,
} from '@nivo/arcs'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type DatumId = string | number

// Default datum to use when `id` and `value` properties
// use default values, should be redefined if using
// a different structure.
export interface DefaultRawDatum {
    id: DatumId
    value: number
}

export interface PieArc extends Arc {
    index: number
    // middle angle in radians
    angle: number
    angleDeg: number
    // outer radius - inner radius in pixels
    thickness: number
    padAngle: number
}

export interface ComputedDatum<RawDatum> {
    id: DatumId
    label: DatumId
    value: number
    formattedValue: string
    color: string
    // only defined in case gradients or patterns are used
    // and the datum matches one of the rules.
    fill?: string
    // contains the raw datum as passed to the chart
    data: RawDatum
    arc: PieArc
    hidden: boolean
}

export interface DataProps<RawDatum> {
    data: RawDatum[]
}

export interface PieTooltipProps<RawDatum> {
    datum: ComputedDatum<RawDatum>
}

export type MouseEventHandler<RawDatum, ElementType = HTMLCanvasElement> = (
    datum: ComputedDatum<RawDatum>,
    event: React.MouseEvent<ElementType>
) => void

export type PieLayerId = 'arcLinkLabels' | 'arcs' | 'arcLabels' | 'legends'

export interface PieCustomLayerProps<RawDatum> {
    dataWithArc: ComputedDatum<RawDatum>[]
    centerX: number
    centerY: number
    radius: number
    innerRadius: number
    arcGenerator: ArcGenerator
}

export type PieCustomLayer<RawDatum> = React.FC<PieCustomLayerProps<RawDatum>>

export type PieLayer<RawDatum> = PieLayerId | PieCustomLayer<RawDatum>

export type CommonPieProps<RawDatum> = {
    id: PropertyAccessor<RawDatum, DatumId>
    value: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>

    margin: Box
    sortByValue: boolean
    innerRadius: number
    padAngle: number
    cornerRadius: number
    startAngle: number
    endAngle: number
    fit: boolean
    activeInnerRadiusOffset: number
    activeOuterRadiusOffset: number

    // colors, theme and border
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill' | 'arc'>>
    theme: Theme
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    enableArcLabels: boolean
    enableArcLinkLabels: boolean

    // interactivity
    isInteractive: boolean
    tooltip: React.FC<PieTooltipProps<RawDatum>>
    forceActiveId: DatumId | undefined

    legends: LegendProps[]

    role: string
    renderWrapper: boolean
} & Partial<ArcLabelsProps<ComputedDatum<RawDatum>>> &
    Partial<ArcLinkLabelsProps<ComputedDatum<RawDatum>>>

export type PieHandlers<RawDatum, ElementType> = {
    onClick?: MouseEventHandler<RawDatum, ElementType>
    onMouseEnter?: MouseEventHandler<RawDatum, ElementType>
    onMouseMove?: MouseEventHandler<RawDatum, ElementType>
    onMouseLeave?: MouseEventHandler<RawDatum, ElementType>
}

export type PieSvgCustomComponents<RawDatum> = {
    arcLinkLabelComponent?: ArcLinkLabelsProps<ComputedDatum<RawDatum>>['component']
}

export type PieSvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonPieProps<RawDatum>> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    PieHandlers<RawDatum, SVGPathElement> & {
        layers?: PieLayer<RawDatum>[]
        animate?: boolean
        motionConfig?: ModernMotionProps['motionConfig']
        transitionMode?: ArcTransitionMode
    } & PieSvgCustomComponents<RawDatum>

export type CompletePieSvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    CommonPieProps<RawDatum> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    PieHandlers<RawDatum, SVGPathElement> & {
        layers: PieLayer<RawDatum>[]
        animate: boolean
        motionConfig: ModernMotionProps['motionConfig']
        transitionMode: ArcTransitionMode
    } & PieSvgCustomComponents<RawDatum>

export type PieCanvasProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    Partial<CommonPieProps<RawDatum>> &
    Pick<PieHandlers<RawDatum, HTMLCanvasElement>, 'onClick' | 'onMouseMove'> & {
        pixelRatio?: number
    }

export type CompletePieCanvasProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    CommonPieProps<RawDatum> &
    Pick<PieHandlers<RawDatum, HTMLCanvasElement>, 'onClick' | 'onMouseMove'> & {
        pixelRatio: number
    }
