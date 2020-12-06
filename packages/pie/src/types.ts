import * as React from 'react'
import { Box, Dimensions, Theme, SvgDefsAndFill, ModernMotionProps } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Arc, ArcGenerator, ArcTransitionMode } from '@nivo/arcs'

export type DatumId = string | number
export type DatumValue = number
export type DatumFormattedValue = string | number
export type ValueFormatter = (value: number) => DatumFormattedValue

// Default datum to use when `id` and `value` properties
// use default values, should be redefined if using
// a different structure.
export interface DefaultRawDatum {
    id: DatumId
    value: DatumValue
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
    value: DatumValue
    formattedValue: DatumFormattedValue
    color: string
    // only defined in case gradients or patterns are used
    // and the datum matches one of the rules.
    fill?: string
    // contains the raw datum as passed to the chart
    data: RawDatum
    arc: PieArc
}

export type DatumIdAccessorFunction<RawDatum> = (datum: RawDatum) => DatumId
export type DatumValueAccessorFunction<RawDatum> = (datum: RawDatum) => DatumValue
export type LabelAccessorFunction<RawDatum> = (datum: ComputedDatum<RawDatum>) => string | number

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

export type PieLayerId = 'radialLabels' | 'slices' | 'sliceLabels' | 'legends'

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
    id: string | DatumIdAccessorFunction<RawDatum>
    value: string | DatumValueAccessorFunction<RawDatum>
    valueFormat?: string | ValueFormatter

    margin: Box
    sortByValue: boolean
    innerRadius: number
    padAngle: number
    cornerRadius: number
    startAngle: number
    endAngle: number
    fit: boolean

    // colors, theme and border
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill' | 'arc'>>
    theme: Theme
    borderWidth: number
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    // radial labels
    enableRadialLabels: boolean
    radialLabel: string | LabelAccessorFunction<RawDatum>
    radialLabelsSkipAngle: number
    radialLabelsTextXOffset: number
    radialLabelsTextColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    radialLabelsLinkOffset: number
    radialLabelsLinkDiagonalLength: number
    radialLabelsLinkHorizontalLength: number
    radialLabelsLinkStrokeWidth: number
    radialLabelsLinkColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    // slices labels
    enableSliceLabels: boolean
    sliceLabel: string | LabelAccessorFunction<RawDatum>
    sliceLabelsRadiusOffset: number
    sliceLabelsSkipAngle: number
    sliceLabelsTextColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    // interactivity
    isInteractive: boolean
    tooltip: React.FC<PieTooltipProps<RawDatum>>

    legends: LegendProps[]

    role: string
}

export type PieHandlers<RawDatum, ElementType> = {
    onClick?: MouseEventHandler<RawDatum, ElementType>
    onMouseEnter?: MouseEventHandler<RawDatum, ElementType>
    onMouseMove?: MouseEventHandler<RawDatum, ElementType>
    onMouseLeave?: MouseEventHandler<RawDatum, ElementType>
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
    }

export type CompletePieSvgProps<RawDatum> = DataProps<RawDatum> &
    Dimensions &
    CommonPieProps<RawDatum> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    PieHandlers<RawDatum, SVGPathElement> & {
        layers: PieLayer<RawDatum>[]
        animate: boolean
        motionConfig: ModernMotionProps['motionConfig']
        transitionMode: ArcTransitionMode
    }

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

export type Point = {
    x: number
    y: number
}

export type RadialLabelData<RawDatum> = {
    text: string | number
    textColor: string
    position: Point
    align: string
    line: [Point, Point, Point]
    linkColor: string
    datum: ComputedDatum<RawDatum>
}
