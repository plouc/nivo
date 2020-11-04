import * as React from 'react'
import { Box, Dimensions, Theme, MotionProps, SvgDefsAndFill } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/pie' {
    export type DatumId = string | number
    export type DatumValue = number
    export type DatumFormattedValue = string | number

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
    export type ValueFormatter = (value: number) => string | number
    export type LabelAccessorFunction<R> = (datum: ComputedDatum<R>) => string | number

    export interface DataProps<R = DefaultRawDatum> {
        data: R[]
        id?: string | DatumIdAccessorFunction<R>
        value?: string | DatumValueAccessorFunction<R>
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

    export type CommonPieProps<R> = MotionProps &
        Partial<{
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
            enableSlicesLabels: boolean
            sliceLabel: string | LabelAccessorFunction<R>
            sliceLabelsRadiusOffset: number
            slicesLabelsSkipAngle: number
            slicesLabelsTextColor: InheritedColorProp<ComputedDatum<R>>

            // interactivity
            isInteractive: boolean
            tooltip: React.FC<PieTooltipProps<R>>

            legends: LegendProps[]
        }>

    export type PieSvgProps<R> = DataProps<R> &
        CommonPieProps<R> &
        SvgDefsAndFill<ComputedDatum<R>> &
        Partial<{
            layers: PieLayer<R>[]
            onClick: MouseEventHandler<R, SVGPathElement>
            onMouseEnter: MouseEventHandler<R, SVGPathElement>
            onMouseLeave: MouseEventHandler<R, SVGPathElement>
            role: string
        }>

    export class Pie<R = DefaultRawDatum> extends React.Component<PieSvgProps<R> & Dimensions> {}
    export class ResponsivePie<R = DefaultRawDatum> extends React.Component<PieSvgProps<R>> {}

    export type PieCanvasProps<R> = DataProps<R> &
        CommonPieProps<R> &
        Partial<{
            pixelRatio: number
            onClick: MouseEventHandler<R, HTMLCanvasElement>
            onMouseEnter: MouseEventHandler<R, HTMLCanvasElement>
            onMouseLeave: MouseEventHandler<R, HTMLCanvasElement>
        }>

    export class PieCanvas<R = DefaultRawDatum> extends React.Component<
        PieCanvasProps<R> & Dimensions
    > {}
    export class ResponsivePieCanvas<R = DefaultRawDatum> extends React.Component<
        PieCanvasProps<R>
    > {}
}
