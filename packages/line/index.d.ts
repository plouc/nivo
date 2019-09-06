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
    export type DatumValue = string | number | Date

    export interface Datum {
        x?: DatumValue | null
        y?: DatumValue | null
        [key: string]: any
    }
    export interface ComputedDatum {
        data: Datum
        position: {
            x: number
            y: number
        }
    }

    export interface Serie {
        id: string | number
        data: Datum[]
        [key: string]: any
    }
    export interface ComputedSerie {
        id: string | number
        data: ComputedDatum[]
        color?: string
        [key: string]: any
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

    export interface CustomLayerProps extends Omit<LineSvgProps, 'xScale' | 'yScale'> {
        xScale: ScaleFunc
        yScale: ScaleFunc
    }

    export type CustomLayer = (props: CustomLayerProps) => React.ReactNode
    export type Layer = LineLayerType | CustomLayer

    export type DataFormatter = (value: DatumValue) => string | number

    export interface Point {
        id: string
        index: number
        serieId: string | number
        serieColor: string
        x: number
        y: number
        color: string
        borderColor: string
        data: {
            x: DatumValue
            xFormatted: string | number
            y: DatumValue
            yFormatted: string | number
            yStacked?: number
        }
    }

    export type PointMouseHandler = (point: Point, event: React.MouseEvent) => void

    export type TooltipFormatter = (value: DatumValue) => React.ReactNode

    export interface PointTooltipProps {
        point: Point
    }
    export type PointTooltip = React.FunctionComponent<PointTooltipProps>

    export interface SliceTooltipProps {
        axis: 'x' | 'y'
        slice: {
            id: DatumValue
            height: number
            width: number
            x0: number
            x: number
            y0: number
            y: number
            points: Point[]
        }
    }
    export type SliceTooltip = React.FunctionComponent<SliceTooltipProps>

    export interface PointSymbolProps {
        borderColor: string
        borderWidth: number
        color: string
        datum: Datum
        size: number
    }

    export interface LineProps {
        data: Serie[]

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
        gridXValues?: number | number[] | string[] | Date[]
        enableGridY?: boolean
        gridYValues?: number | number[] | string[] | Date[]

        enablePoints?: boolean
        pointSymbol?: (props: Readonly<PointSymbolProps>) => React.ReactNode
        pointSize?: number
        pointColor?: any
        pointBorderWidth?: number
        pointBorderColor?: any

        enableArea?: boolean
        areaOpacity?: number
        areaBaseDatumValue?: DatumValue

        markers?: CartesianMarkerProps[]

        isInteractive?: boolean
        onMouseEnter?: PointMouseHandler
        onMouseMove?: PointMouseHandler
        onMouseLeave?: PointMouseHandler
        onClick?: PointMouseHandler

        debugMesh?: boolean

        enableSlices?: 'x' | 'y' | false
        debugSlices?: boolean
        sliceTooltip?: SliceTooltip

        tooltipFormat?: TooltipFormatter | string
        tooltip?: PointTooltip

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
