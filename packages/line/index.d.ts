/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import {
    Dimensions,
    Box,
    Theme,
    MotionProps,
    CartesianMarkerProps,
    SvgDefsAndFill,
    ValueFormat,
    DatumValue as CoreDatumValue,
} from '@nivo/core'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { Scale, ScaleFunc } from '@nivo/scales'
import { AxisProps, GridValues } from '@nivo/axes'
import { CrosshairType } from '@nivo/tooltip'
import { Line as D3Line } from 'd3-shape'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module '@nivo/line' {
    export type DatumValue = CoreDatumValue

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
        | 'crosshair'
        | 'lines'
        | 'slices'
        | 'points'
        | 'mesh'
        | 'legends'

    export interface CustomLayerProps extends Omit<LineSvgProps, 'xScale' | 'yScale'> {
        innerHeight: number
        innerWidth: number
        lineGenerator: D3Line<Array<ComputedDatum['position']>>
        points: Point[]
        series: ComputedSerie[]
        xScale: ScaleFunc
        yScale: ScaleFunc
    }

    export type CustomLayer = (props: CustomLayerProps) => React.ReactNode
    export type Layer = LineLayerType | CustomLayer

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

    export type AccessorFunc = (datum: Point['data']) => string

    export type PointMouseHandler = (point: Point, event: React.MouseEvent) => void

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
        xFormat?: ValueFormat<DatumValue>
        yScale?: Scale
        yFormat?: ValueFormat<DatumValue>

        layers?: Layer[]

        margin?: Box

        curve?:
            | 'basis'
            | 'cardinal'
            | 'catmullRom'
            | 'linear'
            | 'monotoneX'
            | 'monotoneY'
            | 'natural'
            | 'step'
            | 'stepAfter'
            | 'stepBefore'

        lineWidth?: number

        colors?: OrdinalColorScaleConfig
        theme?: Theme

        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null

        enableGridX?: boolean
        gridXValues?: GridValues<DatumValue>
        enableGridY?: boolean
        gridYValues?: GridValues<DatumValue>

        enablePoints?: boolean
        pointSymbol?: (props: Readonly<PointSymbolProps>) => React.ReactNode
        pointSize?: number
        pointColor?: any
        pointBorderWidth?: number
        pointBorderColor?: any

        enableArea?: boolean
        areaOpacity?: number
        areaBaselineValue?: DatumValue

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

        tooltipFormat?: ValueFormat<DatumValue>
        tooltip?: PointTooltip

        enableCrosshair?: boolean
        crosshairType?: CrosshairType

        legends?: LegendProps[]
    }

    export interface LineSvgProps extends LineProps, MotionProps, SvgDefsAndFill<Datum> {
        enablePointLabel?: boolean
        pointLabel?: string | AccessorFunc
        pointLabelYOffset?: number
        areaBlendMode?: string
        role?: string
        useMesh?: boolean
    }

    export class Line extends React.Component<LineSvgProps & Dimensions> {}
    export class ResponsiveLine extends React.Component<LineSvgProps> {}

    export interface CustomCanvasLayerProps extends CustomLayerProps {
        ctx: CanvasRenderingContext2D
    }

    export type CustomCanvasLayer = (props: CustomCanvasLayerProps) => void
    export type CanvasLayer = LineLayerType | CustomCanvasLayer

    export interface LineCanvasProps extends Omit<LineProps, 'layers'> {
        pixelRatio?: number
        layers?: CanvasLayer[]
    }

    export class LineCanvas extends React.Component<LineCanvasProps & Dimensions> {}
    export class ResponsiveLineCanvas extends React.Component<LineCanvasProps> {}
}
