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
    CssMixBlendMode,
} from '@nivo/core'
import { OrdinalColorsInstruction } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'
import { AxisProps } from '@nivo/axes'
import { Scale } from '@nivo/scales'

declare module '@nivo/scatterplot' {
    export type Value = number | string | Date
    export type ValueFormatter = (value: Value) => string | number

    export interface Datum {
        x: Value
        y: Value
    }

    export type DerivedDatumProp<T> = (node: Datum) => T

    export interface Serie {
        id: string
        data: Datum[]
    }

    export interface Node {
        id: string
        serieId: string
        x: number
        y: number
        size: number
        style: {
            color: string
        }
        data: {
            x: Value
            formattedX: string | number
            y: Value
            formattedY: string | number
        }
    }

    export type DerivedNodeProp<T> = (node: Node) => T

    export interface NodeProps {
        node: Node

        x: number
        y: number
        size: number
        color: string
        blendMode: CssMixBlendMode

        onMouseEnter?: VoidFunction
        onMouseMove?: VoidFunction
        onMouseLeave?: VoidFunction
        onClick?: VoidFunction
    }

    export type NodeComponent = (props: NodeProps) => React.ReactNode
    export type NodeCanvasComponent = (ctx: CanvasRenderingContext2D, props: NodeProps) => void

    export type MouseHandler = (node: Node, event: React.MouseEvent<any>) => void

    export interface DynamicSizeSpec {
        key: string
        values: [number, number]
        sizes: [number, number]
    }

    export type CustomTooltip = ({ node: Node }) => React.ReactNode

    export interface ScatterPlotProps {
        data: Serie[]

        xScale?: Scale
        xFormat?: string | ValueFormatter
        yScale?: Scale
        yFormat?: string | ValueFormatter

        margin?: Box

        layers: any[]

        theme?: Theme
        colors?: OrdinalColorsInstruction
        blendMode?: CssMixBlendMode

        enableGridX?: boolean
        enableGridY?: boolean
        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null

        nodeSize?: number | DerivedDatumProp<number> | DynamicSizeSpec

        isInteractive?: boolean
        useMesh?: boolean
        debugMesh?: boolean
        onMouseEnter?: MouseHandler
        onMouseMove?: MouseHandler
        onMouseLeave?: MouseHandler
        onClick?: MouseHandler
        tooltip?: CustomTooltip

        legends?: LegendProps[]
    }

    export interface ScatterPlotSvgProps extends ScatterPlotProps, MotionProps {
        renderNode?: NodeComponent
        markers?: CartesianMarkerProps[]
    }

    export class ScatterPlot extends React.Component<ScatterPlotSvgProps & Dimensions> {}
    export class ResponsiveScatterPlot extends React.Component<ScatterPlotSvgProps> {}

    export interface ScatterPlotCanvasProps extends ScatterPlotProps {
        pixelRatio?: number
        renderNode?: NodeCanvasComponent
    }

    export class ScatterPlotCanvas extends React.Component<ScatterPlotCanvasProps & Dimensions> {}
    export class ResponsiveScatterPlotCanvas extends React.Component<ScatterPlotCanvasProps> {}
}
