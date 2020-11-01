import * as React from 'react'
import { Box, Dimensions, Theme, MotionProps, SvgDefsAndFill } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/pie' {
    export type DatumId = string | number
    export type DatumValue = number
    export type DatumFormattedValue = string | number

    export interface DefaultRawDatum {
        id: DatumId
        value: DatumValue
        [key: string]: string | number
    }

    export interface Datum<R = DefaultRawDatum> {
        id: DatumId
        value: DatumValue
        formattedValue: DatumFormattedValue
        data: R
    }

    export type DatumIdAccessorFunction = (datum: any) => DatumId
    export type DatumValueAccessorFunction = (datum: any) => DatumValue
    export type ValueFormatter = (value: number) => string | number

    export interface Data {
        data: Datum[]
        id?: string | DatumIdAccessorFunction
        value?: string | DatumValueAccessorFunction
    }

    export type DatumWithColor = Datum & {
        color: string
    }

    export type PieTooltip = DatumWithColor & {
        label: string | number
    }

    export type AccessorFunc = (datum: Datum) => string

    export type MouseEventHandler<T = HTMLCanvasElement> = (
        datum: Datum,
        event: React.MouseEvent<T>
    ) => void

    export type CommonPieProps = MotionProps &
        Partial<{
            margin: Box
            sortByValue: boolean
            innerRadius: number
            padAngle: number
            cornerRadius: number
            startAngle: number
            endAngle: number
            fit: boolean

            // border
            // styling
            colors: OrdinalColorsInstruction<Datum>
            theme: Theme
            borderWidth: number
            borderColor: InheritedColorProp<Datum>

            // radial labels
            enableRadialLabels: boolean
            radialLabel: string | AccessorFunc
            radialLabelsSkipAngle: number
            radialLabelsTextXOffset: number
            radialLabelsTextColor: InheritedColorProp<DatumWithColor>
            radialLabelsLinkOffset: number
            radialLabelsLinkDiagonalLength: number
            radialLabelsLinkHorizontalLength: number
            radialLabelsLinkStrokeWidth: number
            radialLabelsLinkColor: InheritedColorProp<DatumWithColor>

            // slices labels
            enableSlicesLabels: boolean
            sliceLabel: string | AccessorFunc
            slicesLabelsSkipAngle: number
            slicesLabelsTextColor: InheritedColorProp<DatumWithColor>

            // interactivity
            isInteractive: boolean
            tooltipFormat: string | ValueFormatter
            tooltip: React.FC<PieTooltip>

            legends: LegendProps[]
        }>

    export type PieSvgProps = Data &
        CommonPieProps &
        SvgDefsAndFill<Datum> &
        Partial<{
            onClick: MouseEventHandler<SVGPathElement>
            onMouseEnter: MouseEventHandler<SVGPathElement>
            onMouseLeave: MouseEventHandler<SVGPathElement>
            role: string
        }>

    export class Pie extends React.Component<PieSvgProps & Dimensions> {}
    export class ResponsivePie extends React.Component<PieSvgProps> {}

    export type PieCanvasProps = Data &
        CommonPieProps &
        Partial<{
            pixelRatio: number
            onClick: MouseEventHandler
            onMouseEnter: MouseEventHandler
            onMouseLeave: MouseEventHandler
        }>

    export class PieCanvas extends React.Component<PieCanvasProps & Dimensions> {}
    export class ResponsivePieCanvas extends React.Component<PieCanvasProps> {}
}
