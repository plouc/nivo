/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from 'react'
import { AxisProps, GridValues } from '@nivo/axes'
import { Box, MotionProps, Dimensions, Theme } from '@nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@nivo/colors'

declare module '@nivo/swarmplot' {
    export interface ComputedNode<Datum> {
        id: string
        index: number
        group: string
        label: string
        value: number
        formattedValue: number | string
        x: number
        y: number
        size: number
        color: string
        data: Datum
    }

    type DatumAccessor<Datum, T> = (datum: Datum) => T
    type ComputedNodeAccessor<Datum, T> = (node: ComputedNode<Datum>) => T

    export interface DynamicSizeSpec {
        key: string
        values: [number, number]
        sizes: [number, number]
    }

    export type SwarmPlotMouseHandler<Datum> = (
        node: ComputedNode<Datum>,
        event: React.MouseEvent<any>
    ) => void

    type ValueFormatter<Datum> = (datum: Datum) => string | number

    interface CommonSwarmPlotProps<Datum = any> {
        data: Datum[]

        margin?: Box

        groups: string[]
        groupBy?: string
        identity?: string | DatumAccessor<Datum, string>
        label?: string | DatumAccessor<Datum, string>
        value?: string | DatumAccessor<Datum, number>
        valueScale?: any
        valueFormat?: string | ValueFormatter<Datum>
        size?: number | DatumAccessor<Datum, number> | DynamicSizeSpec
        spacing?: number
        layout?: 'horizontal' | 'vertical'
        gap?: number

        forceStrength?: number
        simulationIterations?: number

        layers: any[]

        colors?: OrdinalColorsInstruction
        colorBy?: string | ComputedNodeAccessor<Datum, string | number>
        theme?: Theme
        borderWidth?: number | ComputedNodeAccessor<Datum, number>
        borderColor?: InheritedColorProp<ComputedNode<Datum>>

        enableGridX?: boolean
        gridXValues?: GridValues<number>
        enableGridY?: boolean
        gridYValues?: GridValues<number>

        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null

        isInteractive?: boolean
        useMesh?: boolean
        debugMesh?: boolean
        onMouseEnter?: SwarmPlotMouseHandler<Datum>
        onMouseMove?: SwarmPlotMouseHandler<Datum>
        onMouseLeave?: SwarmPlotMouseHandler<Datum>
        onClick?: SwarmPlotMouseHandler<Datum>
        tooltip?: any
    }

    export type SwarmPlotProps = CommonSwarmPlotProps & MotionProps

    export class SwarmPlot extends Component<SwarmPlotProps & Dimensions> {}
    export class ResponsiveSwarmPlot extends Component<SwarmPlotProps> {}

    export type SwarmPlotCanvasProps = CommonSwarmPlotProps & {
        pixelRatio?: number
    }

    export class SwarmPlotCanvas extends Component<SwarmPlotCanvasProps & Dimensions> {}
    export class ResponsiveSwarmPlotCanvas extends Component<SwarmPlotCanvasProps> {}
}
