import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { AnimatedProps } from '@react-spring/web'
import { Box, Theme, Dimensions, MotionProps, CssMixBlendMode } from '@bitbloom/nivo-core'
import { InheritedColorConfig } from '@bitbloom/nivo-colors'
import { AnnotationMatcher } from '@bitbloom/nivo-annotations'

// minimal node data
export interface InputNode {
    id: string
}

export interface ComputedNode<Node extends InputNode> {
    id: string
    data: Node
    // computed by D3
    index: number
    x: number
    y: number
    vx: number
    vy: number
    // styles computed by nivo
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

// intermediate type for D3 as it mutates nodes,
// `ComputedNode` is used for the final data structure.
export type TransientNode<Node extends InputNode> = Omit<
    ComputedNode<Node>,
    'size' | 'color' | 'borderWidth' | 'borderColor'
>

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

export interface ComputedLink<Node extends InputNode, Link extends InputLink> {
    id: string
    data: Link
    index: number
    source: ComputedNode<Node>
    target: ComputedNode<Node>
    thickness: number
    color: string
}

// intermediate type for D3 as it mutates links,
// `ComputedLink` is used for the final data structure.
export interface TransientLink<Node extends InputNode, Link extends InputLink> {
    data: Link
    index: number
    source: TransientNode<Node>
    target: TransientNode<Node>
}

export interface LinkAnimatedProps {
    x1: number
    y1: number
    x2: number
    y2: number
    color: string
    opacity: number
}

export interface LinkProps<Node extends InputNode, Link extends InputLink> {
    link: ComputedLink<Node, Link>
    animated: AnimatedProps<LinkAnimatedProps>
    blendMode: NonNullable<NetworkSvgProps<Node, Link>['linkBlendMode']>
}
export type LinkComponent<Node extends InputNode, Link extends InputLink> = FunctionComponent<
    LinkProps<Node, Link>
>
export type LinkCanvasRenderer<Node extends InputNode, Link extends InputLink> = (
    ctx: CanvasRenderingContext2D,
    node: ComputedLink<Node, Link>
) => void

export interface NetworkDataProps<Node extends InputNode, Link extends InputLink> {
    data: {
        nodes: Node[]
        links: Link[]
    }
}

export type LayerId = 'links' | 'nodes' | 'annotations'
export interface CustomLayerProps<Node extends InputNode, Link extends InputLink> {
    nodes: ComputedNode<Node>[]
    links: ComputedLink<Node, Link>[]
    activeNodeIds: string[]
    setActiveNodeIds: (nodeIds: string[]) => void
}
export type CustomLayer<Node extends InputNode, Link extends InputLink> = FunctionComponent<
    CustomLayerProps<Node, Link>
>
export type CustomCanvasLayer<Node extends InputNode, Link extends InputLink> = (
    ctx: CanvasRenderingContext2D,
    props: CustomLayerProps<Node, Link>
) => void

export interface NodeTooltipProps<Node extends InputNode> {
    node: ComputedNode<Node>
}
export type NodeTooltip<Node extends InputNode> = FunctionComponent<NodeTooltipProps<Node>>

export type DerivedProp<Target, Output extends number | string> =
    | Output
    | ((target: Target) => Output)

export type NetworkCommonProps<Node extends InputNode, Link extends InputLink> = {
    margin: Box

    linkDistance: DerivedProp<Link, number>
    centeringStrength: number
    repulsivity: number
    distanceMin: number
    distanceMax: number
    iterations: number

    theme: Theme

    nodeSize: DerivedProp<Node, number>
    activeNodeSize: DerivedProp<Node, number>
    inactiveNodeSize: DerivedProp<Node, number>
    nodeColor: DerivedProp<Node, string>
    nodeBorderWidth: DerivedProp<Node, number>
    nodeBorderColor: InheritedColorConfig<
        Omit<ComputedNode<Node>, 'size' | 'borderWidth' | 'borderColor'>
    >

    linkThickness: DerivedProp<Omit<ComputedLink<Node, Link>, 'color' | 'thickness'>, number>
    linkColor: InheritedColorConfig<Omit<ComputedLink<Node, Link>, 'color' | 'thickness'>>

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
} & Required<MotionProps>

export type NetworkSvgProps<Node extends InputNode, Link extends InputLink> = Partial<
    NetworkCommonProps<Node, Link>
> &
    NetworkDataProps<Node, Link> &
    Dimensions & {
        layers?: (LayerId | CustomLayer<Node, Link>)[]
        nodeComponent?: NodeComponent<Node>
        linkComponent?: LinkComponent<Node, Link>
        linkBlendMode?: CssMixBlendMode
        onMouseEnter?: (node: ComputedNode<Node>, event: MouseEvent) => void
        onMouseMove?: (node: ComputedNode<Node>, event: MouseEvent) => void
        onMouseLeave?: (node: ComputedNode<Node>, event: MouseEvent) => void
    }

export type NetworkCanvasProps<Node extends InputNode, Link extends InputLink> = Partial<
    NetworkCommonProps<Node, Link>
> &
    NetworkDataProps<Node, Link> &
    Dimensions & {
        layers?: (LayerId | CustomCanvasLayer<Node, Link>)[]
        renderNode?: NodeCanvasRenderer<Node>
        renderLink?: LinkCanvasRenderer<Node, Link>
        pixelRatio?: number
    }
