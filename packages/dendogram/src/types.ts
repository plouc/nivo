import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { HierarchyNode } from 'd3-hierarchy'
import { SpringValues } from '@react-spring/web'
import { Box, Dimensions, MotionProps, Theme, PropertyAccessor } from '@nivo/core'

export type Layout = 'top-to-bottom' | 'right-to-left' | 'bottom-to-top' | 'left-to-right'

export type LayerId = 'links' | 'nodes' | 'labels'

export interface DefaultDatum {
    id: string
    value?: number
    children?: DefaultDatum[]
}

export interface HierarchyDendogramNode<Datum> extends HierarchyNode<Datum> {
    uid: string | undefined
}

export interface HierarchyDendogramLink<Datum> {
    source: HierarchyDendogramNode<Datum>
    target: HierarchyDendogramNode<Datum>
}

export interface ComputedNode<Datum extends object> {
    uid: string
    id: string
    data: Datum
    pathComponents: string[]
    depth: number
    height: number
    x: number
    y: number
}

export interface IntermediateComputedLink<Datum extends object> {
    id: string
    source: ComputedNode<Datum>
    target: ComputedNode<Datum>
}

export interface ComputedLink<Datum extends object> extends IntermediateComputedLink<Datum> {
    thickness: number
}

export interface NodeComponentProps<Datum extends object> {
    node: ComputedNode<Datum>
    isInteractive: boolean
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    tooltip?: NodeTooltip<Datum>
    animatedProps: SpringValues<{
        x: number
        y: number
    }>
}
export type NodeComponent<Datum extends object> = FunctionComponent<NodeComponentProps<Datum>>

export interface NodeTooltipProps<Datum extends object> {
    node: ComputedNode<Datum>
}
export type NodeTooltip<Datum extends object> = FunctionComponent<NodeTooltipProps<Datum>>

export type NodeMouseEventHandler<Datum extends object> = (
    node: ComputedNode<Datum>,
    event: MouseEvent
) => void

export type LinkThicknessFunction<Datum extends object> = (
    link: IntermediateComputedLink<Datum>
) => number

export interface LinkComponentProps<Datum extends object> {
    link: ComputedLink<Datum>
    isInteractive: boolean
    onMouseEnter?: LinkMouseEventHandler<Datum>
    onMouseMove?: LinkMouseEventHandler<Datum>
    onMouseLeave?: LinkMouseEventHandler<Datum>
    onClick?: LinkMouseEventHandler<Datum>
    tooltip?: LinkTooltip<Datum>
    animatedProps: SpringValues<{
        sourceX: number
        sourceY: number
        targetX: number
        targetY: number
    }>
}
export type LinkComponent<Datum extends object> = FunctionComponent<LinkComponentProps<Datum>>

export type LinkMouseEventHandler<Datum extends object> = (
    node: ComputedLink<Datum>,
    event: MouseEvent
) => void

export interface LinkTooltipProps<Datum extends object> {
    link: ComputedLink<Datum>
}
export type LinkTooltip<Datum extends object> = FunctionComponent<LinkTooltipProps<Datum>>

export interface CustomLayerProps<Datum extends object> {
    nodes: ComputedNode<Datum>[]
    links: ComputedLink<Datum>[]
    innerWidth: number
    innerHeight: number
}
export type CustomSvgLayer<Datum extends object> = FunctionComponent<CustomLayerProps<Datum>>

export interface DendogramDataProps<Datum extends object> {
    data: Datum
}

export interface CommonProps<Datum extends object> extends MotionProps {
    margin: Box

    layout: Layout
    identity: PropertyAccessor<Datum, string>

    theme: Theme
    linkThickness: number | LinkThicknessFunction<Datum>

    isInteractive: boolean
    onNodeMouseEnter: NodeMouseEventHandler<Datum>
    onNodeMouseMove: NodeMouseEventHandler<Datum>
    onNodeMouseLeave: NodeMouseEventHandler<Datum>
    onNodeClick: NodeMouseEventHandler<Datum>
    nodeTooltip: NodeTooltip<Datum>
    onLinkMouseEnter: LinkMouseEventHandler<Datum>
    onLinkMouseMove: LinkMouseEventHandler<Datum>
    onLinkMouseLeave: LinkMouseEventHandler<Datum>
    onLinkClick: LinkMouseEventHandler<Datum>
    linkTooltip: LinkTooltip<Datum>

    role: string
    renderWrapper: boolean
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type DendogramSvgProps<Datum extends object> = DendogramDataProps<Datum> &
    Dimensions &
    Partial<CommonProps<Datum>> & {
        layers?: (LayerId | CustomSvgLayer<Datum>)[]
        nodeComponent?: NodeComponent<Datum>
        linkComponent?: LinkComponent<Datum>
    }

export type ResponsiveDendogramSvgProps<Datum extends object> = Omit<
    DendogramSvgProps<Datum>,
    'height' | 'width'
>
