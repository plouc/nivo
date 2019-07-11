/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps, CartesianMarkerProps } from '@nivo/core'
import { OrdinalColorsInstruction } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Scale, ScaleFunc } from '@nivo/scales'
import { AxisProps } from '@nivo/axes'
import { CrosshairType } from '@nivo/tooltip'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module '@nivo/line' {
    export type LineValue = string | number | Date
    export type TooltipFormatter = (value: LineValue) => React.ReactNode

    export interface LineDatum {
        x?: LineValue | null
        y?: LineValue | null
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
        id: LineValue
        x: number
        data: Array<{
            data: {
                x?: LineValue
                y?: LineValue
            }
            position: {
                x: number
                y: number
            }
            serie: LineComputedSerieData
        }>
    }

    export type LineLayerType =
        | 'grid'
        | 'markers'
        | 'axes'
        | 'areas'
        | 'lines'
        | 'slices'
        | 'points'
        | 'mesh'
        | 'legends'

    export interface LineCustomLayerProps extends Omit<LineSvgProps, 'xScale' | 'yScale'> {
        xScale: ScaleFunc
        yScale: ScaleFunc
    }

    export type DataFormatter = (value: LineValue) => string | number
    export type LineCustomLayer = (props: LineCustomLayerProps) => React.ReactNode
    export type Layer = LineLayerType | LineCustomLayer

    export interface LineTooltipProps {
        point: {
            id: string
            index: number
            serieId: string | number
            serieColor: string
            x: number | string | Date
            y: number | string | Date
            color: string
            borderColor: string
            data: {
                color: string
                x: string | number
                y: number
                yStacked: number
                xFormatted: string | number
                yFormatted: string | number
            }
        }
    }

    export type TooltipProp = React.FC<LineTooltipProps>

    export interface LineProps {
        data: LineSerieData[]

        xScale?: Scale
        xFormat?: string | DataFormatter
        yScale?: Scale
        yFormat?: string | DataFormatter

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

        colors?: OrdinalColorsInstruction
        theme?: Theme

        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null

        enableGridX?: boolean
        enableGridY?: boolean

        enablePoints?: boolean
        pointSize?: number
        pointColor?: any
        pointBorderWidth?: number
        pointBorderColor?: any

        enableArea?: boolean
        areaOpacity?: number
        areaBaselineValue?: LineValue

        markers?: CartesianMarkerProps[]

        isInteractive?: boolean

        debugMesh?: boolean

        enableSlices?: 'x' | 'y' | false
        debugSlices?: boolean
        sliceTooltip?: (data: LineSliceData) => React.ReactNode

        tooltipFormat?: TooltipFormatter | string
        tooltip?: TooltipProp

        enableCrosshair?: boolean
        crosshairType?: CrosshairType

        legends?: LegendProps[]
    }

    export interface LineSvgProps extends LineProps, MotionProps {
        enablePointLabel?: boolean
        pointLabel?: string
        pointLabelYOffset?: number
        areaBlendMode?: string
        useMesh?: boolean
    }

    export class Line extends React.Component<LineSvgProps & Dimensions> {}
    export class ResponsiveLine extends React.Component<LineSvgProps> {}

    export interface LineCanvasProps extends LineProps {
        pixelRatio?: number
    }

    export class LineCanvas extends React.Component<LineCanvasProps & Dimensions> {}
    export class ResponsiveLineCanvas extends React.Component<LineCanvasProps> {}
}
