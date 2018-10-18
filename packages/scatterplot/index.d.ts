import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps, CartesianMarkerProps } from '@nivo/core'
import { LegendProps } from '@nivo/legends'
import { Axis } from '@nivo/axes'
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

    export type ScatterPlotMouseHandler = (
        data: ScatterPlotDatum,
        event: React.MouseEvent<any>
    ) => void

    export type ScatterPlotSizeGetter = (data: ScatterPlotDatum) => number

    export interface ScatterPlotProps {
        data: Array<{
            id: string
            data: Array<{
                x: number
                y: number
            }>
        }>

        xScale?: Scale
        yScale?: Scale

        theme?: Theme

        margin?: Box

        axisTop?: Axis
        axisRight?: Axis
        axisBottom?: Axis
        axisLeft?: Axis

        enableGridX?: boolean
        enableGridY?: boolean

        symbolSize?: number | ScatterPlotSizeGetter
        symbolShape?: 'circle' | 'square'

        isInteractive?: boolean
        onClick?: ScatterPlotMouseHandler
        onMouseEnter?: ScatterPlotMouseHandler
        onMouseLeave?: ScatterPlotMouseHandler

        tooltipFormat?: TooltipFormatter
        tooltip?: (data: ScatterPlotDatum) => React.ReactNode

        legends?: LegendProps[]

        markers?: CartesianMarkerProps[]
    }

    export interface ScatterPlotSvgProps extends ScatterPlotProps, MotionProps {}

    export class ScatterPlot extends React.Component<ScatterPlotSvgProps & Dimensions> {}
    export class ResponsiveScatterPlot extends React.Component<ScatterPlotSvgProps> {}
}
