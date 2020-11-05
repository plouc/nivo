import * as React from 'react'
import { Box, Dimensions, Theme, SvgDefsAndFill } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

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

export interface PieArc {
    index: number
    startAngle: number
    endAngle: number
    // center angle
    angle: number
    angleDeg: number
    padAngle: number
}

export interface ComputedDatum<R> {
    id: DatumId
    label: DatumId
    value: DatumValue
    formattedValue: DatumFormattedValue
    color: string
    // only defined in case gradients or patterns are used
    // and the datum matches one of the rules.
    fill?: string
    // contains the raw datum as passed to the chart
    data: R
    arc: PieArc
}

export type DatumIdAccessorFunction<R> = (datum: R) => DatumId
export type DatumValueAccessorFunction<R> = (datum: R) => DatumValue
export type LabelAccessorFunction<R> = (datum: ComputedDatum<R>) => string | number

export interface DataProps<R> {
    data: R[]
}

export interface PieTooltipProps<R> {
    datum: ComputedDatum<R>
}

export type MouseEventHandler<R, T = HTMLCanvasElement> = (
    datum: ComputedDatum<R>,
    event: React.MouseEvent<T>
) => void

export type PieArcGenerator = (arc: PieArc) => string

export type PieLayerId = 'slices' | 'radialLabels' | 'sliceLabels' | 'legends'

export interface PieCustomLayerProps<R> {
    dataWithArc: ComputedDatum<R>[]
    centerX: number
    centerY: number
    radius: number
    innerRadius: number
    arcGenerator: PieArcGenerator
}

export type PieCustomLayer<R> = React.FC<PieCustomLayerProps<R>>

export type PieLayer<R> = PieLayerId | PieCustomLayer<R>

export type CommonPieProps<R> = Dimensions & {
    id: string | DatumIdAccessorFunction<R>
    value: string | DatumValueAccessorFunction<R>
    valueFormat?: ValueFormatter

    margin: Box
    sortByValue: boolean
    innerRadius: number
    padAngle: number
    cornerRadius: number
    startAngle: number
    endAngle: number
    fit: boolean

    // colors, theme and border
    colors: OrdinalColorsInstruction<Omit<ComputedDatum<R>, 'color' | 'fill'>>
    theme: Theme
    borderWidth: number
    borderColor: InheritedColorProp<ComputedDatum<R>>

    // radial labels
    enableRadialLabels: boolean
    radialLabel: string | LabelAccessorFunction<R>
    radialLabelsSkipAngle: number
    radialLabelsTextXOffset: number
    radialLabelsTextColor: InheritedColorProp<ComputedDatum<R>>
    radialLabelsLinkOffset: number
    radialLabelsLinkDiagonalLength: number
    radialLabelsLinkHorizontalLength: number
    radialLabelsLinkStrokeWidth: number
    radialLabelsLinkColor: InheritedColorProp<ComputedDatum<R>>

    // slices labels
    enableSliceLabels: boolean
    sliceLabel: string | LabelAccessorFunction<R>
    sliceLabelsRadiusOffset: number
    sliceLabelsSkipAngle: number
    sliceLabelsTextColor: InheritedColorProp<ComputedDatum<R>>

    // interactivity
    isInteractive: boolean
    tooltip: React.FC<PieTooltipProps<R>>

    legends: LegendProps[]

    role: string
}

export type PieHandlers<R, E> = {
    onClick?: MouseEventHandler<R, E>
    onMouseEnter?: MouseEventHandler<R, E>
    onMouseMove?: MouseEventHandler<R, E>
    onMouseLeave?: MouseEventHandler<R, E>
}

export type PieSvgProps<R> = DataProps<R> &
    Partial<CommonPieProps<R>> &
    SvgDefsAndFill<ComputedDatum<R>> &
    PieHandlers<R, SVGPathElement> & {
        layers?: PieLayer<R>[]
    }

export type CompletePieSvgProps<R> = DataProps<R> &
    CommonPieProps<R> &
    SvgDefsAndFill<ComputedDatum<R>> &
    PieHandlers<R, SVGPathElement> & {
        layers: PieLayer<R>[]
    }

export type PieCanvasProps<R> = DataProps<R> &
    Partial<CommonPieProps<R>> &
    PieHandlers<R, HTMLCanvasElement> & {
        pixelRatio?: number
    }

export type CompletePieCanvasProps<R> = DataProps<R> &
    CommonPieProps<R> &
    PieHandlers<R, HTMLCanvasElement> & {
        pixelRatio: number
    }

export type Point = {
    x: number
    y: number
}

export type RadialLabelData<R> = {
    text: string | number
    textColor: string
    position: Point
    align: string
    line: [Point, Point, Point]
    linkColor: string
    datum: ComputedDatum<R>
}
