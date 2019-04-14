import { Component } from 'react'
import { Box, MotionProps, Dimensions, Theme } from '@nivo/core'
import { OrdinalColorsInstruction } from '@nivo/colors'

declare module '@nivo/swarmplot' {
    export interface ComputedNode<Datum> {
        id: string
        index: number
        group: string
        value: string
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

    interface CommonSwarmPlotProps<Datum = any> {
        data: Datum[]

        margin?: Box

        groups: string[]
        groupBy?: string
        identity?: string | DatumAccessor<Datum, string>
        value?: string | DatumAccessor<Datum, number>
        valueScale?: any
        size?: number | DatumAccessor<Datum, number> | DynamicSizeSpec
        layout?: 'horizontal' | 'vertical'
        gap?: number

        forceStrength?: number
        simulationIterations?: number

        layers: any[]

        colors?: OrdinalColorsInstruction
        theme?: Theme
        borderWidth?: number | ComputedNodeAccessor<Datum, number>
        borderColor?: any

        enableGridX?: boolean
        gridXValues?: number[]
        enableGridY?: boolean
        gridYValues?: number[]

        axisTop?: any
        axisRight?: any
        axisBottom?: any
        axisLeft?: any

        isInteractive?: boolean
        onMouseEnter?: SwarmPlotMouseHandler<Datum>
        onMouseMove?: SwarmPlotMouseHandler<Datum>
        onMouseLeave?: SwarmPlotMouseHandler<Datum>
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
