import * as React from 'react'
import {
    MotionProps,
    CartesianMarkerProps,
} from '@nivo/core'
import { ScaleSpec } from '@nivo/scales'

declare module '@nivo/scatterplot' {
    export interface NodeIdDatum extends Record<string, string | number> {
        serieId: Serie['id']
        index: number
    }

    export type NodeCanvasComponent = (ctx: CanvasRenderingContext2D, props: NodeProps) => void

    export interface ScatterPlotComputedProps {
        xScale: ScaleSpec
        yScale: ScaleSpec
        nodes: Node[]
        innerWidth: number
        innerHeight: number
        outerWidth: number
        outerHeight: number
    }

    export interface CustomSvgLayerProps
        extends Omit<ScatterPlotSvgProps, 'xScale' | 'yScale'>,
            ScatterPlotComputedProps {}
    export interface CustomCanvasLayerProps
        extends Omit<ScatterPlotCanvasProps, 'xScale' | 'yScale'>,
            ScatterPlotComputedProps {}

    export type CustomSvgLayer = (props: CustomSvgLayerProps) => React.ReactNode
    export type CustomCanvasLayer = (
        ctx: CanvasRenderingContext2D,
        props: CustomCanvasLayerProps
    ) => void

    export type CustomLayerId = 'grid' | 'axes' | 'nodes' | 'markers' | 'mesh' | 'legends'

    export interface ScatterPlotProps {}

    export interface ScatterPlotSvgProps extends ScatterPlotProps, MotionProps {
        layers?: (CustomLayerId | CustomSvgLayer)[]
        markers?: CartesianMarkerProps[]
    }

    export interface ScatterPlotCanvasProps extends ScatterPlotProps {
        pixelRatio?: number
        layers?: (CustomLayerId | CustomCanvasLayer)[]
        renderNode?: NodeCanvasComponent
    }
}
