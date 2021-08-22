import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
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
    index: number
    id: string
    x: number
    y: number
    size: number
    style: {
        color: string
    }
    data: {
        id: string | number
        serieId: ScatterPlotRawSerie<RawDatum>['id']
        x: RawDatum['x']
        formattedX: string | number
        y: RawDatum['y']
        formattedY: string | number
    }
}

export interface ScatterPlotNodeProps<RawDatum extends ScatterPlotDatum> {
    node: ScatterPlotNodeData<RawDatum>
    x: number
    y: number
    size: number
    color: string
    blendMode: CssMixBlendMode
    onMouseEnter?: (event: MouseEvent<any>) => void
    onMouseMove?: (event: MouseEvent<any>) => void
    onMouseLeave?: (event: MouseEvent<any>) => void
    onClick?: (event: MouseEvent<any>) => void
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
    nodeId: PropertyAccessor<
        Omit<ScatterPlotNodeData<RawDatum>['data'], 'id'> & {
            serieId: ScatterPlotRawSerie<RawDatum>['id']
            index: number
        },
        string
    >
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
    colors: OrdinalColorScaleConfig
    nodeSize:
        | number
        | ScatterPlotNodeDynamicSizeSpec
        | PropertyAccessor<ScatterPlotNodeData<RawDatum>['data'], number>
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
        layers?: ScatterPlotLayerId[]
        renderNode?: ScatterPlotNode<RawDatum>
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
