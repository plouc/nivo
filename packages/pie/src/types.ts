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

export type PieArcGenerator = (arc: PieArc) => string

export type PieLayerId = 'slices' | 'radialLabels' | 'sliceLabels' | 'legends'

export interface PieCustomLayerProps<RawDatum> {
    dataWithArc: ComputedDatum<RawDatum>[]
    centerX: number
    centerY: number
    radius: number
    innerRadius: number
    arcGenerator: PieArcGenerator
}

export type PieCustomLayer<RawDatum> = React.FC<PieCustomLayerProps<RawDatum>>

export type PieLayer<RawDatum> = PieLayerId | PieCustomLayer<RawDatum>

export type CommonPieProps<RawDatum> = Dimensions & {
    id: string | DatumIdAccessorFunction<RawDatum>
    value: string | DatumValueAccessorFunction<RawDatum>
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
    colors: OrdinalColorsInstruction<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>
    theme: Theme
    borderWidth: number
    borderColor: InheritedColorProp<ComputedDatum<RawDatum>>

    // radial labels
    enableRadialLabels: boolean
    radialLabel: string | LabelAccessorFunction<RawDatum>
    radialLabelsSkipAngle: number
    radialLabelsTextXOffset: number
    radialLabelsTextColor: InheritedColorProp<ComputedDatum<RawDatum>>
    radialLabelsLinkOffset: number
    radialLabelsLinkDiagonalLength: number
    radialLabelsLinkHorizontalLength: number
    radialLabelsLinkStrokeWidth: number
    radialLabelsLinkColor: InheritedColorProp<ComputedDatum<RawDatum>>

    // slices labels
    enableSliceLabels: boolean
    sliceLabel: string | LabelAccessorFunction<RawDatum>
    sliceLabelsRadiusOffset: number
    sliceLabelsSkipAngle: number
    sliceLabelsTextColor: InheritedColorProp<ComputedDatum<RawDatum>>

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
    Partial<CommonPieProps<RawDatum>> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    PieHandlers<RawDatum, SVGPathElement> & {
        layers?: PieLayer<RawDatum>[]
    }

export type CompletePieSvgProps<RawDatum> = DataProps<RawDatum> &
    CommonPieProps<RawDatum> &
    SvgDefsAndFill<ComputedDatum<RawDatum>> &
    PieHandlers<RawDatum, SVGPathElement> & {
        layers: PieLayer<RawDatum>[]
    }

export type PieCanvasProps<RawDatum> = DataProps<RawDatum> &
    Partial<CommonPieProps<RawDatum>> &
    Pick<PieHandlers<RawDatum, HTMLCanvasElement>, 'onClick' | 'onMouseMove'> & {
        pixelRatio?: number
    }

export type CompletePieCanvasProps<RawDatum> = DataProps<RawDatum> &
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

export type SliceLabelData<RawDatum> = {
    x: number
    y: number
    label: string | number
    textColor: string
    datum: ComputedDatum<RawDatum>
}
