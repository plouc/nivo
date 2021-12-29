import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { AnimatedProps } from '@react-spring/web'
import { Box, Theme, Dimensions, ModernMotionProps, CssMixBlendMode } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { AnnotationMatcher } from '@nivo/annotations'

export interface InputNode {
    id: string
}

export interface ComputedNode<Node extends InputNode> {
    id: string
    data: Node
    x: number
    y: number
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

export interface NodeAnimatedProps {
    x: number
    y: number
    size: number
    color: string
    borderWidth: number
    borderColor: string
    opacity: number
    scale: number
}

export interface NodeProps<Node extends InputNode> {
    node: ComputedNode<Node>
    animated: AnimatedProps<NodeAnimatedProps>
    blendMode: NonNullable<NetworkSvgProps<Node>['nodeBlendMode']>
    onClick?: (node: ComputedNode<Node>, event: MouseEvent) => void
    onMouseEnter?: (node: ComputedNode<Node>, event: MouseEvent) => void
    onMouseMove?: (node: ComputedNode<Node>, event: MouseEvent) => void
    onMouseLeave?: (node: ComputedNode<Node>, event: MouseEvent) => void
}
export type NodeComponent<Node extends InputNode> = FunctionComponent<NodeProps<Node>>
export type NodeCanvasRenderer<Node extends InputNode> = (
    ctx: CanvasRenderingContext2D,
    node: ComputedNode<Node>
) => void

export interface InputLink {
    source: string
    target: string
}

export interface ComputedLink<Node extends InputNode> {
    id: string
    source: ComputedNode<Node>
    previousSource?: ComputedNode<Node>
    target: ComputedNode<Node>
    previousTarget?: ComputedNode<Node>
    thickness: number
    color: string
}

export interface LinkAnimatedProps {
    x1: number
    y1: number
    x2: number
    y2: number
    color: string
    opacity: number
}

export interface LinkProps<Node extends InputNode> {
    link: ComputedLink<Node>
    animated: AnimatedProps<LinkAnimatedProps>
    blendMode: NonNullable<NetworkSvgProps<Node>['linkBlendMode']>
}
export type LinkComponent<Node extends InputNode> = FunctionComponent<LinkProps<Node>>
export type LinkCanvasRenderer<Node extends InputNode> = (
    ctx: CanvasRenderingContext2D,
    node: ComputedLink<Node>
) => void

export interface NetworkDataProps<Node extends InputNode> {
    data: {
        nodes: Node[]
        links: InputLink[]
    }
}

export type LayerId = 'links' | 'nodes' | 'annotations'
export interface CustomLayerProps<Node extends InputNode> {
    nodes: ComputedNode<Node>[]
    links: ComputedLink<Node>[]
}
export type CustomLayer<Node extends InputNode> = FunctionComponent<CustomLayerProps<Node>>
export type CustomCanvasLayer<Node extends InputNode> = (
    ctx: CanvasRenderingContext2D,
    props: CustomLayerProps<Node>
) => void

export interface NodeTooltipProps<Node extends InputNode> {
    node: ComputedNode<Node>
}
export type NodeTooltip<Node extends InputNode> = FunctionComponent<NodeTooltipProps<Node>>

export type NodeDerivedProp<Node extends InputNode, T> = T | ((node: ComputedNode<Node>) => T)
export type LinkDerivedProp<Node extends InputNode, T> = T | ((link: ComputedLink<Node>) => T)

export type NetworkCommonProps<Node extends InputNode> = {
    margin: Box

    linkDistance: LinkDerivedProp<Node, number>
    repulsivity: number
    distanceMin: number
    distanceMax: number
    iterations: number

    theme: Theme

    nodeSize: NodeDerivedProp<Node, number>
    activeNodeSize: NodeDerivedProp<Node, number>
    inactiveNodeSize: NodeDerivedProp<Node, number>
    nodeColor: NodeDerivedProp<Node, string>
    nodeBorderWidth: NodeDerivedProp<Node, number>
    nodeBorderColor: InheritedColorConfig<ComputedNode<Node>>

    linkThickness: LinkDerivedProp<Node, number>
    activeLinkThickness: LinkDerivedProp<Node, number>
    linkColor: InheritedColorConfig<ComputedLink<Node>>

    annotations: AnnotationMatcher<ComputedNode<Node>>[]

    isInteractive: boolean
    defaultActiveNodeIds: string[]
    nodeTooltip: NodeTooltip<Node>
    onClick: (node: ComputedNode<Node>, event: MouseEvent) => void

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & Required<ModernMotionProps>

export type NetworkSvgProps<Node extends InputNode> = Partial<NetworkCommonProps<Node>> &
    NetworkDataProps<Node> &
    Dimensions & {
        layers?: (LayerId | CustomLayer<Node>)[]
        nodeComponent?: NodeComponent<Node>
        nodeBlendMode?: CssMixBlendMode
        linkComponent?: LinkComponent<Node>
        linkBlendMode?: CssMixBlendMode
    }

export type NetworkCanvasProps<Node extends InputNode> = Partial<NetworkCommonProps<Node>> &
    NetworkDataProps<Node> &
    Dimensions & {
        layers?: (LayerId | CustomCanvasLayer<Node>)[]
        renderNode?: NodeCanvasRenderer<Node>
        renderLink?: LinkCanvasRenderer<Node>
        pixelRatio?: number
    }
