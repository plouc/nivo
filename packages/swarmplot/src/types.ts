import * as React from 'react'
import { Interpolation, SpringValue } from 'react-spring'
import { ForceX, ForceY, ForceCollide } from 'd3-force'
import { PropertyAccessor, ValueFormat, Theme, ModernMotionProps, Box } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { GridValues, AxisProps } from '@nivo/axes'

export interface ComputedDatum<RawDatum> {
    id: string
    index: number
    group: string
    value: number
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

export type SwarmPlotLayerId = 'grid' | 'axes' | 'nodes' | 'mesh' | 'annotations'

export interface SwarmPlotCustomLayerProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
}

export type SwarmPlotCustomLayer<RawDatum> = React.FC<SwarmPlotCustomLayerProps<RawDatum>>

export type SwarmPlotLayer<RawDatum> = SwarmPlotLayerId | SwarmPlotCustomLayer<RawDatum>

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
    label: PropertyAccessor<ComputedDatum<RawDatum>, string>
    value: PropertyAccessor<RawDatum, number>
    valueScale: any
    valueFormat: ValueFormat<number>
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
    borderWidth: number | PropertyAccessor<ComputedDatum<RawDatum>, number>
    borderColor: InheritedColorConfig<ComputedDatum<RawDatum>>
    enableGridX: boolean
    gridXValues?: GridValues<string | number>
    enableGridY: boolean
    gridYValues?: GridValues<string | number>
    axisTop?: AxisProps | null
    axisRight?: AxisProps | null
    axisBottom?: AxisProps | null
    axisLeft?: AxisProps | null
    isInteractive: boolean
    useMesh: boolean
    debugMesh: boolean
    tooltip: (props: ComputedDatum<RawDatum>) => JSX.Element
    layers: SwarmPlotLayer<RawDatum>[]
    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']
    role: string
    // annotations: PropTypes.arrayOf(annotationSpecPropType).isRequired,
}

export type SwarmPlotSvgProps<RawDatum> = SwarmPlotCommonProps<RawDatum> &
    MouseHandlers<RawDatum> & {
        circleComponent: CircleComponent<RawDatum>
    }

export type SwarmPlotCanvasProps<RawDatum> = SwarmPlotCommonProps<RawDatum> &
    Pick<MouseHandlers<RawDatum>, 'onMouseMove' | 'onClick'> & {
        renderCircle: (
            ctx: CanvasRenderingContext2D,
            props: {
                node: ComputedDatum<RawDatum>
                getBorderWidth: (node: ComputedDatum<RawDatum>) => number
                getBorderColor: (node: ComputedDatum<RawDatum>) => string
            }
        ) => void
        pixelRatio: number
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
