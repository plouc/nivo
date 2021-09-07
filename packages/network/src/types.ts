import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { Box, Theme, Dimensions, ModernMotionProps, PropertyAccessor } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'

export interface InputNode {
    id: string
    [key: string]: unknown
}

export interface ComputedNode {
    id: string
    x: number
    y: number
    radius: number
    color: string
    data: InputNode
    [key: string]: unknown
}

export interface NodeAnimatedProps {
    x: number
    y: number
    radius: number
    color: string
    borderWidth: number
    borderColor: string
    opacity: number
    scale: number
}

export interface InputLink {
    source: string
    target: string
    [key: string]: unknown
}

export interface ComputedLink {
    id: string
    source: ComputedNode
    target: ComputedNode
    [key: string]: unknown
}

export interface LinkAnimatedProps {
    x1: number
    y1: number
    x2: number
    y2: number
    color: string
    opacity: number
}

export interface NetworkDataProps {
    data: {
        nodes: InputNode[]
        links: InputLink[]
    }
}

export type NetworkLayerId = 'links' | 'nodes'
export interface NetworkCustomLayerProps {
    nodes: ComputedNode[]
    links: ComputedLink[]
}
export type NetworkCustomLayer = FunctionComponent<NetworkCustomLayerProps>

export interface NetworkNodeTooltipProps {
    node: ComputedNode
}
export type NetworkNodeTooltipComponent = FunctionComponent<NetworkNodeTooltipProps>

export interface NetworkCommonProps {
    margin: Box

    layers: (NetworkLayerId | NetworkCustomLayer)[]

    linkDistance: number | PropertyAccessor<InputLink, number>
    repulsivity: number
    distanceMin: number
    distanceMax: number
    iterations: number

    theme: Theme

    nodeColor: string | PropertyAccessor<ComputedNode, string>
    nodeBorderWidth: number
    nodeBorderColor: InheritedColorConfig<ComputedNode>

    linkThickness: number | PropertyAccessor<ComputedLink, number>
    linkColor: InheritedColorConfig<ComputedLink>

    isInteractive: boolean
    tooltip: NetworkNodeTooltipComponent
    onClick: (node: ComputedNode, event: MouseEvent<SVGCircleElement>) => void

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type NetworkSvgProps = Partial<NetworkCommonProps> &
    NetworkDataProps &
    Dimensions &
    ModernMotionProps

export type NetworkCanvasProps = Partial<NetworkCommonProps> &
    NetworkDataProps &
    Dimensions &
    // only used by tooltips
    ModernMotionProps & {
        pixelRatio?: number
    }
