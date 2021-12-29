import { NetworkCommonProps, InputNode, LayerId, NetworkSvgProps } from './types'
import { NetworkNode } from './NetworkNode'
import { renderCanvasNode } from './renderCanvasNode'
import { NetworkLink } from './NetworkLink'
import { renderCanvasLink } from './renderCanvasLink'
import { NetworkNodeTooltip } from './NetworkNodeTooltip'

export const commonDefaultProps: Omit<
    NetworkCommonProps<InputNode>,
    | 'margin'
    | 'theme'
    | 'activeLinkThickness'
    | 'defaultActiveNodeIds'
    | 'onClick'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> & {
    layers: LayerId[]
} = {
    layers: ['links', 'nodes', 'annotations'],

    linkDistance: 30,
    repulsivity: 10,
    distanceMin: 1,
    distanceMax: Infinity,
    iterations: 90,

    nodeSize: 12,
    activeNodeSize: 18,
    inactiveNodeSize: 8,
    nodeColor: '#000000',
    nodeBorderWidth: 0,
    nodeBorderColor: { from: 'color' },

    linkThickness: 1,
    linkColor: { from: 'source.color' },

    isInteractive: true,
    nodeTooltip: NetworkNodeTooltip,

    annotations: [],

    animate: true,
    motionConfig: 'gentle' as const,

    role: 'img',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: NetworkNode as NonNullable<NetworkSvgProps<InputNode>['nodeComponent']>,
    nodeBlendMode: 'normal' as NonNullable<NetworkSvgProps<InputNode>['nodeBlendMode']>,
    linkComponent: NetworkLink as NonNullable<NetworkSvgProps<InputNode>['linkComponent']>,
    linkBlendMode: 'normal' as NonNullable<NetworkSvgProps<InputNode>['linkBlendMode']>,
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    renderNode: renderCanvasNode,
    renderLink: renderCanvasLink,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
