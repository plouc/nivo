import * as React from 'react'
import { Box, Dimensions, Theme, MotionProps, ColorProps, SvgDefsAndFill } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/pie' {
    export interface PieDatum {
        id: string | number
        value: number
        [key: string]: string | number
    }

    export type PieDatumWithColor = PieDatum & {
        color: string
    }

    export type AccessorFunc = (datum: PieDatum) => string

    export type ValueFormatter = (value: number) => string | number

    export type PieMouseEventHandler<T = HTMLCanvasElement> = (
        datum: PieDatum,
        event: React.MouseEvent<T>
    ) => void

    export interface Data {
        data: PieDatum[]
    }

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
            colors: OrdinalColorsInstruction<PieDatum>
            theme: Theme
            borderWidth: number
            borderColor: InheritedColorProp<PieDatum>

            // radial labels
            enableRadialLabels: boolean
            radialLabel: string | AccessorFunc
            radialLabelsSkipAngle: number
            radialLabelsTextXOffset: number
            radialLabelsTextColor: InheritedColorProp<PieDatumWithColor>
            radialLabelsLinkOffset: number
            radialLabelsLinkDiagonalLength: number
            radialLabelsLinkHorizontalLength: number
            radialLabelsLinkStrokeWidth: number
            radialLabelsLinkColor: InheritedColorProp<PieDatumWithColor>

            // slices labels
            enableSlicesLabels: boolean
            sliceLabel: string | AccessorFunc
            slicesLabelsSkipAngle: number
            slicesLabelsTextColor: InheritedColorProp<PieDatumWithColor>

            // interactivity
            isInteractive: boolean
            tooltipFormat: string | ValueFormatter
            tooltip: React.StatelessComponent<PieDatumWithColor>

            legends: LegendProps[]
        }>

    export type PieSvgProps = Data &
        CommonPieProps &
        SvgDefsAndFill<PieDatum> &
        Partial<{
            onClick: PieMouseEventHandler<SVGPathElement>
            onMouseEnter: PieMouseEventHandler<SVGPathElement>
            onMouseLeave: PieMouseEventHandler<SVGPathElement>
        }>

    export class Pie extends React.Component<PieSvgProps & Dimensions> {}
    export class ResponsivePie extends React.Component<PieSvgProps> {}

    export type PieCanvasProps = Data &
        CommonPieProps &
        Partial<{
            pixelRatio: number
            onClick: PieMouseEventHandler
            onMouseEnter: PieMouseEventHandler
            onMouseLeave: PieMouseEventHandler
        }>

    export class PieCanvas extends React.Component<PieCanvasProps & Dimensions> {}
    export class ResponsivePieCanvas extends React.Component<PieCanvasProps> {}
}
