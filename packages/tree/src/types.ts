import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { HierarchyNode } from 'd3-hierarchy'
import { Link as LinkShape, DefaultLinkObject } from 'd3-shape'
import { SpringValues } from '@react-spring/web'
import { Box, Dimensions, MotionProps, Theme, PropertyAccessor } from '@nivo/core'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'

export type TreeMode = 'tree' | 'dendogram'
export type Layout = 'top-to-bottom' | 'right-to-left' | 'bottom-to-top' | 'left-to-right'
export type LayerId = 'links' | 'nodes' | 'labels' | 'mesh'
export type LinkCurve = 'bump' | 'linear' | 'step' | 'step-before' | 'step-after'
export type LabelsPosition = 'outward' | 'inward' | 'layout' | 'layout-opposite'

export interface DefaultDatum {
    id: string
    value?: number
    children?: readonly DefaultDatum[]
}

export interface HierarchyTreeNode<Datum> extends HierarchyNode<Datum> {
    uid: string | undefined
    ancestorIds: readonly string[] | undefined
    ancestorUids: readonly string[] | undefined
    descendantUids: readonly string[] | undefined
}

export interface HierarchyTreeLink<Datum> {
    source: HierarchyTreeNode<Datum>
    target: HierarchyTreeNode<Datum>
}

export interface IntermediateComputedNode<Datum> {
    path: readonly string[]
    uid: string
    isRoot: boolean
    isLeaf: boolean
    ancestorIds: readonly string[]
    ancestorUids: readonly string[]
    descendantUids: readonly string[]
    id: string
    data: Datum
    depth: number
    height: number
    x: number
    y: number
}

export interface ComputedNode<Datum> extends IntermediateComputedNode<Datum> {
    size: number
    color: string
    isActive: boolean | null
}

export type CurrentNodeSetter<Datum> = (node: ComputedNode<Datum> | null) => void

export interface IntermediateComputedLink<Datum> {
    id: string
    source: ComputedNode<Datum>
    target: ComputedNode<Datum>
}

export interface ComputedLink<Datum> extends IntermediateComputedLink<Datum> {
    thickness: number
    color: string
    isActive: boolean | null
}

export type NodeSizeFunction<Datum> = (node: IntermediateComputedNode<Datum>) => number

export type NodeSizeModifierFunction<Datum> = (node: ComputedNode<Datum>) => number

export type NodeAnimatedProps = {
    x: number
    y: number
    size: number
    color: string
}

export interface NodeComponentProps<Datum> {
    node: ComputedNode<Datum>
    isInteractive: boolean
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    setCurrentNode: CurrentNodeSetter<Datum>
    tooltip?: NodeTooltip<Datum>
    animatedProps: SpringValues<NodeAnimatedProps>
}
export type NodeComponent<Datum> = FunctionComponent<NodeComponentProps<Datum>>

export interface NodeTooltipProps<Datum> {
    node: ComputedNode<Datum>
}
export type NodeTooltip<Datum> = FunctionComponent<NodeTooltipProps<Datum>>

export type NodeMouseEventHandler<Datum> = (node: ComputedNode<Datum>, event: MouseEvent) => void

export type LinkThicknessFunction<Datum> = (link: IntermediateComputedLink<Datum>) => number

export type LinkThicknessModifierFunction<Datum> = (link: ComputedLink<Datum>) => number

export type LinkAnimatedProps = {
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    thickness: number
    color: string
}

export type LinkGenerator = LinkShape<any, DefaultLinkObject, [number, number]>

export interface LinkComponentProps<Datum> {
    link: ComputedLink<Datum>
    linkGenerator: LinkGenerator
    isInteractive: boolean
    onMouseEnter?: LinkMouseEventHandler<Datum>
    onMouseMove?: LinkMouseEventHandler<Datum>
    onMouseLeave?: LinkMouseEventHandler<Datum>
    onClick?: LinkMouseEventHandler<Datum>
    tooltip?: LinkTooltip<Datum>
    animatedProps: SpringValues<LinkAnimatedProps>
}
export type LinkComponent<Datum> = FunctionComponent<LinkComponentProps<Datum>>

export type LinkMouseEventHandler<Datum> = (node: ComputedLink<Datum>, event: MouseEvent) => void

export interface LinkTooltipProps<Datum> {
    link: ComputedLink<Datum>
}
export type LinkTooltip<Datum> = FunctionComponent<LinkTooltipProps<Datum>>

export type LabelTextAnchor = 'start' | 'middle' | 'end'
export type LabelBaseline = 'auto' | 'middle' | 'hanging'

export interface ComputedLabel<Datum> {
    id: string // node.uid
    label: string
    node: ComputedNode<Datum>
    x: number
    y: number
    rotation: number
    textAnchor: LabelTextAnchor
    baseline: LabelBaseline
}

export type LabelAnimatedProps = {
    x: number
    y: number
    rotation: number
}

export interface LabelComponentProps<Datum> {
    label: ComputedLabel<Datum>
    animatedProps: SpringValues<LabelAnimatedProps>
}
export type LabelComponent<Datum> = FunctionComponent<LabelComponentProps<Datum>>

export interface CustomLayerProps<Datum> {
    nodes: readonly ComputedNode<Datum>[]
    nodeByUid: Record<string, ComputedNode<Datum>>
    links: readonly ComputedLink<Datum>[]
    innerWidth: number
    innerHeight: number
    linkGenerator: LinkGenerator
    setCurrentNode: (node: ComputedNode<Datum> | null) => void
}
export type CustomSvgLayer<Datum> = FunctionComponent<CustomLayerProps<Datum>>

export interface TreeDataProps<Datum> {
    data: Datum
}

export interface CommonProps<Datum> extends MotionProps {
    margin: Box

    mode: TreeMode
    layout: Layout
    identity: PropertyAccessor<Datum, string>

    theme: Theme
    nodeSize: number | NodeSizeFunction<Datum>
    activeNodeSize: number | NodeSizeModifierFunction<Datum>
    inactiveNodeSize: number | NodeSizeModifierFunction<Datum>
    nodeColor: OrdinalColorScaleConfig<IntermediateComputedNode<Datum>>
    fixNodeColorAtDepth: number
    linkCurve: LinkCurve
    linkThickness: number | LinkThicknessFunction<Datum>
    activeLinkThickness: number | LinkThicknessModifierFunction<Datum>
    inactiveLinkThickness: number | LinkThicknessModifierFunction<Datum>
    linkColor: InheritedColorConfig<IntermediateComputedLink<Datum>>

    enableLabel: boolean
    label: PropertyAccessor<ComputedNode<Datum>, string>
    labelsPosition: LabelsPosition
    orientLabel: boolean
    labelOffset: number
    labelComponent: LabelComponent<Datum>

    isInteractive: boolean
    useMesh: boolean
    meshDetectionThreshold: number
    debugMesh: boolean
    highlightAncestorNodes: boolean
    highlightDescendantNodes: boolean
    highlightAncestorLinks: boolean
    highlightDescendantLinks: boolean
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

export type TreeSvgProps<Datum> = TreeDataProps<Datum> &
    Dimensions &
    Partial<CommonProps<Datum>> & {
        layers?: (LayerId | CustomSvgLayer<Datum>)[]
        nodeComponent?: NodeComponent<Datum>
        linkComponent?: LinkComponent<Datum>
    }

export type ResponsiveTreeSvgProps<Datum> = Omit<TreeSvgProps<Datum>, 'height' | 'width'>
