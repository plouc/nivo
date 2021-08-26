import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { SpringValues } from '@react-spring/web'
import {
    Dimensions,
    Box,
    Theme,
    ValueFormat,
    ModernMotionProps,
    CssMixBlendMode,
    CartesianMarkerProps,
    PropertyAccessor,
} from '@nivo/core'
import { ScaleSpec } from '@nivo/scales'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { AxisProps, GridValues } from '@nivo/axes'
import { LegendProps } from '@nivo/legends'
import { AnnotationMatcher } from '@nivo/annotations'

// the types supported for x/y values
export type ScatterPlotValue = number | string | Date

export interface ScatterPlotDatum {
    x: ScatterPlotValue
    y: ScatterPlotValue
}

export type ScatterPlotRawSerie<RawDatum extends ScatterPlotDatum> = {
    id: string | number
    data: RawDatum[]
}

export interface ScatterPlotNodeData<RawDatum extends ScatterPlotDatum> {
    // absolute index, relative to all points in all series
    index: number
    // relative index, in a specific serie
    serieIndex: number
    id: string
    serieId: ScatterPlotRawSerie<RawDatum>['id']
    // x position
    x: number
    xValue: RawDatum['x']
    formattedX: string | number
    // y position
    y: number
    yValue: RawDatum['y']
    formattedY: string | number
    size: number
    color: string
    data: RawDatum
}

export interface ScatterPlotNodeProps<RawDatum extends ScatterPlotDatum> {
    node: ScatterPlotNodeData<RawDatum>
    style: SpringValues<{
        x: number
        y: number
        size: number
        color: string
    }>
    blendMode: CssMixBlendMode
    isInteractive: boolean
    onMouseEnter?: ScatterPlotMouseHandler<RawDatum>
    onMouseMove?: ScatterPlotMouseHandler<RawDatum>
    onMouseLeave?: ScatterPlotMouseHandler<RawDatum>
    onClick?: ScatterPlotMouseHandler<RawDatum>
}
export type ScatterPlotNode<RawDatum extends ScatterPlotDatum> = FunctionComponent<
    ScatterPlotNodeProps<RawDatum>
>

export interface ScatterPlotTooltipProps<RawDatum extends ScatterPlotDatum> {
    node: ScatterPlotNodeData<RawDatum>
}
export type ScatterPlotTooltip<RawDatum extends ScatterPlotDatum> = FunctionComponent<
    ScatterPlotTooltipProps<RawDatum>
>

export type ScatterPlotLayerId =
    | 'grid'
    | 'axes'
    | 'nodes'
    | 'markers'
    | 'mesh'
    | 'legends'
    | 'annotations'
export interface ScatterPlotLayerProps<RawDatum extends ScatterPlotDatum> {
    xScale: any
    yScale: any
    nodes: ScatterPlotNodeData<RawDatum>[]
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
}
export type ScatterPlotCustomSvgLayer<RawDatum extends ScatterPlotDatum> = FunctionComponent<
    ScatterPlotLayerProps<RawDatum>
>
export type ScatterPlotCustomCanvasLayer<RawDatum extends ScatterPlotDatum> = (
    ctx: CanvasRenderingContext2D,
    props: ScatterPlotLayerProps<RawDatum>
) => void

export interface ScatterPlotNodeDynamicSizeSpec {
    key: string
    values: [number, number]
    sizes: [number, number]
}

export type ScatterPlotMouseHandler<RawDatum extends ScatterPlotDatum> = (
    node: ScatterPlotNodeData<RawDatum>,
    event: MouseEvent<any>
) => void

export interface ScatterPlotDataProps<RawDatum extends ScatterPlotDatum> {
    data: ScatterPlotRawSerie<RawDatum>[]
}

export type ScatterPlotCommonProps<RawDatum extends ScatterPlotDatum> = {
    nodeId: PropertyAccessor<Omit<ScatterPlotNodeData<RawDatum>, 'id' | 'size' | 'color'>, string>
    xScale: ScaleSpec
    xFormat: ValueFormat<RawDatum['x']>
    yScale: ScaleSpec
    yFormat: ValueFormat<RawDatum['y']>
    margin: Box
    enableGridX: boolean
    gridXValues: GridValues<RawDatum['x']>
    enableGridY: boolean
    gridYValues: GridValues<RawDatum['y']>
    axisTop: AxisProps | null
    axisRight: AxisProps | null
    axisBottom: AxisProps | null
    axisLeft: AxisProps | null
    theme: Theme
    colors: OrdinalColorScaleConfig<{ serieId: ScatterPlotRawSerie<RawDatum>['id'] }>
    nodeSize:
        | number
        | ScatterPlotNodeDynamicSizeSpec
        | PropertyAccessor<Omit<ScatterPlotNodeData<RawDatum>, 'size' | 'color'>, number>
    renderWrapper?: boolean
    isInteractive: boolean
    useMesh: boolean
    debugMesh: boolean
    onMouseEnter: ScatterPlotMouseHandler<RawDatum>
    onMouseMove: ScatterPlotMouseHandler<RawDatum>
    onMouseLeave: ScatterPlotMouseHandler<RawDatum>
    onClick: ScatterPlotMouseHandler<RawDatum>
    tooltip: ScatterPlotTooltip<RawDatum>
    annotations: AnnotationMatcher<ScatterPlotNodeData<RawDatum>>[]
    legends: LegendProps[]
    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type ScatterPlotSvgProps<RawDatum extends ScatterPlotDatum> = Partial<
    ScatterPlotCommonProps<RawDatum>
> &
    ScatterPlotDataProps<RawDatum> &
    Dimensions &
    ModernMotionProps & {
        blendMode?: CssMixBlendMode
        layers?: (ScatterPlotLayerId | ScatterPlotCustomSvgLayer<RawDatum>)[]
        nodeComponent?: ScatterPlotNode<RawDatum>
        markers?: CartesianMarkerProps<RawDatum['x'] | RawDatum['y']>[]
    }

export type ScatterPlotCanvasProps<RawDatum extends ScatterPlotDatum> = Partial<
    ScatterPlotCommonProps<RawDatum>
> &
    ScatterPlotDataProps<RawDatum> &
    Dimensions & {
        layers?: (ScatterPlotLayerId | ScatterPlotCustomCanvasLayer<RawDatum>)[]
        pixelRatio?: number
        renderNode?: (ctx: CanvasRenderingContext2D, node: ScatterPlotNodeData<RawDatum>) => void
    }
