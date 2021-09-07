import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { Box, Theme, Dimensions, ModernMotionProps, PropertyAccessor } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'

export interface InputNode {
    id: string
    [key: string]: any
}

export interface ComputedNode {
    id: string
    x: string
    y: string
    radius: string
    color: string
    [key: string]: any
}

export interface InputLink {
    source: string
    target: string
    [key: string]: any
}

export interface ComputedLink {
    id: string
    source: ComputedNode
    target: ComputedNode
    [key: string]: any
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

/*
nodes: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.string.isRequired,
    })
).isRequired,
links: PropTypes.arrayOf(
    PropTypes.shape({
        source: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
    })
).isRequired,

layers: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.oneOf(['links', 'nodes']), PropTypes.func])
).isRequired,

linkDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number])
    .isRequired,
repulsivity: PropTypes.number.isRequired,
distanceMin: PropTypes.number.isRequired,
distanceMax: PropTypes.number.isRequired,
iterations: PropTypes.number.isRequired,

nodeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
nodeBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
nodeBorderColor: inheritedColorPropType.isRequired,

linkThickness: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
linkColor: inheritedColorPropType.isRequired,

isInteractive: PropTypes.bool.isRequired,
onClick: PropTypes.func,
*/

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
    Dimensions & {
        pixelRatio?: number
    }
