import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps, ColorProps, CartesianMarkerProps } from '@nivo/core'
import { LegendProps } from '@nivo/legends'
import { Scale, ScaleFunc } from '@nivo/scales'
import { AxisProps } from '@nivo/axes'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module '@nivo/line' {
    export type TooltipFormatter = (value: string | number | Date) => React.ReactNode

    export interface LineDatum {
        x?: string | number | Date | null
        y?: string | number | Date | null
        [key: string]: any
    }

    export interface LineSerieData {
        id: string | number
        data: LineDatum[]
        [key: string]: any
    }

    export interface LineComputedSerieDatum {
        position: {
            x: number
            y: number
        }
        data: LineDatum
    }

    export interface LineComputedSerieData {
        id: string | number
        data: LineComputedSerieDatum[]
        color?: string
        [key: string]: any
    }

    export interface LineSliceData {
        id: string | number | Date
        x: number
        data: Array<{
            data: {
                x?: string | number | Date
                y?: string | number | Date
            }
            position: {
                x: number
                y: number
            }
            serie: LineComputedSerieData
        }>
    }

    export enum LineLayerType {
        Grid = 'grid',
        Markers = 'markers',
        Axes = 'axes',
        Areas = 'areas',
        Lines = 'lines',
        Slices = 'slices',
        Dots = 'dots',
        Legends = 'legends',
    }

    export interface LineCustomLayerProps extends Omit<LineSvgProps, 'xScale' | 'yScale'> {
        xScale: ScaleFunc
        yScale: ScaleFunc
        showTooltip: (tooltip: React.ReactNode, event: React.MouseEvent<SVGPathElement>) => void
        hideTooltip: () => void
    }

    export type LineCustomLayer = (props: LineCustomLayerProps) => React.ReactNode
    export type Layer = LineLayerType | LineCustomLayer

    export interface LineProps extends ColorProps<LineComputedSerieData> {
        data: LineSerieData[]

        xScale?: Scale
        yScale?: Scale

        layers?: Layer[]

        margin?: Box

        curve?:
            | 'linear'
            | 'monotoneX'
            | 'monotoneY'
            | 'natural'
            | 'stepBefore'
            | 'step'
            | 'stepAfter'
        lineWidth?: number

        theme?: Theme

        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null

        enableGridX?: boolean
        enableGridY?: boolean

        enableDots?: boolean
        dotSize?: number
        dotColor?: any
        dotBorderWidth?: number
        dotBorderColor?: any
        enableDotLabel?: boolean

        enableArea?: boolean
        areaOpacity?: number
        areaBlendMode?: string
        areaBaselineValue?: number | string | Date

        markers?: CartesianMarkerProps[]

        isInteractive?: boolean
        enableStackTooltip?: boolean

        tooltip?: (data: LineSliceData) => React.ReactNode
        tooltipFormat?: TooltipFormatter | string

        legends?: LegendProps[]
    }

    export interface LineSvgProps extends LineProps, MotionProps {}

    export class Line extends React.Component<LineSvgProps & Dimensions> {}
    export class ResponsiveLine extends React.Component<LineSvgProps> {}
}
