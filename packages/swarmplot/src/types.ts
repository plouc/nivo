import * as React from 'react'
import { Interpolation, SpringValue } from '@react-spring/web'
import { ForceX, ForceY, ForceCollide } from 'd3-force'
import { PropertyAccessor, ValueFormat, Theme, ModernMotionProps, Box, Margin } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { AxisProps, CanvasAxisProp } from '@nivo/axes'
import { ScaleLinear, ScaleLinearSpec, ScaleTime, ScaleTimeSpec, TicksSpec } from '@nivo/scales'
import { AnnotationMatcher } from '@nivo/annotations'
import { ScaleOrdinal } from 'd3-scale'

export interface ComputedDatum<RawDatum> {
    id: string
    index: number
    group: string
    value: number | Date
    formattedValue: string
    x: number
    y: number
    size: number
    color: string
    data: RawDatum
}

export type PreSimulationDatum<RawDatum> = Pick<
    ComputedDatum<RawDatum>,
    'id' | 'group' | 'value' | 'size' | 'data'
> &
    Partial<Pick<ComputedDatum<RawDatum>, 'x' | 'y' | 'index'>>

export type SimulationForces<RawDatum> = {
    x: ForceX<PreSimulationDatum<RawDatum>>
    y: ForceY<PreSimulationDatum<RawDatum>>
    collision: ForceCollide<PreSimulationDatum<RawDatum>>
}

export type SwarmPlotLayerId = 'grid' | 'axes' | 'circles' | 'annotations' | 'mesh'

export interface SwarmPlotCustomLayerProps<
    RawDatum,
    Scale extends
        | ScaleLinear<number>
        | ScaleTime<string | Date>
        | ScaleOrdinal<string, number> = ScaleLinear<number>
> {
    nodes: ComputedDatum<RawDatum>[]
    xScale: Scale
    yScale: Scale
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    margin: Margin
}

export type SwarmPlotCustomLayer<
    RawDatum,
    Scale extends
        | ScaleLinear<number>
        | ScaleTime<string | Date>
        | ScaleOrdinal<string, number> = ScaleLinear<number>
> = React.FC<SwarmPlotCustomLayerProps<RawDatum, Scale>>

export type SwarmPlotLayer<
    RawDatum,
    Scale extends
        | ScaleLinear<number>
        | ScaleTime<string | Date>
        | ScaleOrdinal<string, number> = ScaleLinear<number>
> = SwarmPlotLayerId | SwarmPlotCustomLayer<RawDatum, Scale>

export type SizeSpec<RawDatum> =
    // static size
    | number
    // user defined size function
    | ((datum: RawDatum) => number)
    | {
          key: string
          values: number[]
          sizes: number[]
      }

export type MouseHandler<RawDatum> = (
    datum: ComputedDatum<RawDatum>,
    event: React.MouseEvent
) => void

export type MouseHandlers<RawDatum> = {
    onClick?: MouseHandler<RawDatum>
    onMouseEnter?: MouseHandler<RawDatum>
    onMouseMove?: MouseHandler<RawDatum>
    onMouseLeave?: MouseHandler<RawDatum>
}

export type SwarmPlotCommonProps<RawDatum> = {
    data: RawDatum[]
    width: number
    height: number
    margin?: Box
    groups: string[]
    id: PropertyAccessor<RawDatum, string>
    value: PropertyAccessor<RawDatum, number | Date>
    valueScale: ScaleLinearSpec | ScaleTimeSpec
    valueFormat: ValueFormat<number | Date>
    groupBy: PropertyAccessor<RawDatum, string>
    size: SizeSpec<RawDatum>
    spacing: number
    layout: 'horizontal' | 'vertical'
    gap: number
    forceStrength: number
    simulationIterations: number
    theme?: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color'>>
    colorBy: PropertyAccessor<Omit<ComputedDatum<RawDatum>, 'color'>, string>
    borderWidth: number | ((node: ComputedDatum<RawDatum>) => number)
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    enableGridX: boolean
    gridXValues?: TicksSpec<string | number>
    enableGridY: boolean
    gridYValues?: TicksSpec<string | number>
    isInteractive: boolean
    useMesh: boolean
    debugMesh: boolean
    tooltip: (props: ComputedDatum<RawDatum>) => JSX.Element
    annotations: AnnotationMatcher<ComputedDatum<RawDatum>>[]
    layers: SwarmPlotLayer<
        RawDatum,
        ScaleLinear<number> | ScaleTime<string | Date> | ScaleOrdinal<string, number>
    >[]
    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']
    role: string
    renderWrapper?: boolean
}

export type SwarmPlotSvgProps<RawDatum> = SwarmPlotCommonProps<RawDatum> &
    MouseHandlers<RawDatum> & {
        axisTop?: AxisProps | null
        axisRight?: AxisProps | null
        axisBottom?: AxisProps | null
        axisLeft?: AxisProps | null
        circleComponent: CircleComponent<RawDatum>
    }

export type SwarmPlotCanvasProps<RawDatum> = SwarmPlotCommonProps<RawDatum> &
    Pick<MouseHandlers<RawDatum>, 'onMouseMove' | 'onClick'> & {
        axisTop?: CanvasAxisProp<string> | null
        axisRight?: CanvasAxisProp<string> | null
        axisBottom?: CanvasAxisProp<string> | null
        axisLeft?: CanvasAxisProp<string> | null
        pixelRatio: number
        renderCircle: (
            ctx: CanvasRenderingContext2D,
            props: {
                node: ComputedDatum<RawDatum>
                getBorderWidth: (node: ComputedDatum<RawDatum>) => number
                getBorderColor: (node: ComputedDatum<RawDatum>) => string
            }
        ) => void
    }

export type CircleProps<RawDatum> = {
    node: ComputedDatum<RawDatum>
    style: {
        x: SpringValue<number>
        y: SpringValue<number>
        // using an interpolation to avoid negative values
        radius: Interpolation<number>
        color: SpringValue<string>
        opacity: SpringValue<number>
        borderWidth: number
        borderColor: SpringValue<string>
    }
} & MouseHandlers<RawDatum>

export type CircleComponent<RawDatum> = (props: CircleProps<RawDatum>) => JSX.Element
