import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps, CartesianMarkerProps } from '@nivo/core'
import { OrdinalColorsInstruction } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { AxisProps } from '@nivo/axes'
import { Scale } from '@nivo/scales'

declare module '@nivo/scatterplot' {
    export type TooltipFormatter = (value: { x: number | string; y: number | string }) => string

    export interface ScatterPlotDatum {
        serie: string
        id: string | number
        x: string | number
        y: string | number
        color: string
    }

    interface Point {
        id: string
        data: {
            x: number
            y: number
        }
    }

    export type SymbolSvg = (
        x: number,
        y: number,
        size: number,
        color: string,
        onMouseEnter: (event: React.MouseEvent<any>) => void,
        onMouseMove: (event: React.MouseEvent<any>) => void,
        onMouseLeave: (event: React.MouseEvent<any>) => void,
        onClick: (event: React.MouseEvent<any>) => void,
        point: Point
    ) => React.ReactNode

    export type SymbolCanvas = (
        ctx: CanvasRenderingContext2D,
        point: Point,
        getSymbolSize: () => void,
        getColor: () => void
    ) => void

    export type ScatterPlotMouseHandler = (
        data: ScatterPlotDatum,
        event: React.MouseEvent<any>
    ) => void

    export type ScatterPlotSizeGetter = (data: ScatterPlotDatum) => number

    export interface ScatterPlotProps {
        data: Point[]

        xScale?: Scale
        yScale?: Scale

        colors?: OrdinalColorsInstruction
        theme?: Theme

        margin?: Box

        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null

        enableGridX?: boolean
        enableGridY?: boolean

        symbolSize?: number | ScatterPlotSizeGetter
        symbolShape?: 'circle' | 'square'
        symbol?: SymbolCanvas | SymbolSvg | React.MemoExoticComponent<any>

        isInteractive?: boolean
        useMesh?: boolean
        debugMesh?: boolean
        onMouseEnter?: ScatterPlotMouseHandler
        onMouseMove?: ScatterPlotMouseHandler
        onMouseLeave?: ScatterPlotMouseHandler
        onClick?: ScatterPlotMouseHandler

        tooltipFormat?: TooltipFormatter
        tooltip?: (data: ScatterPlotDatum) => React.ReactNode

        legends?: LegendProps[]
    }

    export interface ScatterPlotSvgProps extends ScatterPlotProps, MotionProps {
        markers?: CartesianMarkerProps[]
    }

    export class ScatterPlot extends React.Component<ScatterPlotSvgProps & Dimensions> {}
    export class ResponsiveScatterPlot extends React.Component<ScatterPlotSvgProps> {}

    export interface ScatterPlotCanvasProps extends ScatterPlotProps {
        pixelRatio?: number
    }

    export class ScatterPlotCanvas extends React.Component<ScatterPlotCanvasProps & Dimensions> {}
    export class ResponsiveScatterPlotCanvas extends React.Component<ScatterPlotCanvasProps> {}
}
