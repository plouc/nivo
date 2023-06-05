import { NetworkCommonProps, InputNode, LayerId, NetworkSvgProps, InputLink } from './types'
import { NetworkNode } from './NetworkNode'
import { renderCanvasNode } from './renderCanvasNode'
import { NetworkLink } from './NetworkLink'
import { renderCanvasLink } from './renderCanvasLink'
import { NetworkNodeTooltip } from './NetworkNodeTooltip'

export const commonDefaultProps: Omit<
    NetworkCommonProps<InputNode, InputLink>,
    | 'margin'
    | 'theme'
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
    centeringStrength: 1,
    repulsivity: 10,
    distanceMin: 1,
    distanceMax: Infinity,
    iterations: 120,

    nodeSize: 12,
    activeNodeSize: 18,
    inactiveNodeSize: 8,
    nodeColor: '#000000',
    nodeBorderWidth: 0,
    nodeBorderColor: { from: 'color' },

    linkThickness: 1,
    linkColor: { from: 'source.color' },

    isInteractive: true,
    defaultActiveNodeIds: [],
    nodeTooltip: NetworkNodeTooltip,

    annotations: [],

    animate: true,
    motionConfig: 'gentle' as const,

    role: 'img',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: NetworkNode as NonNullable<
        NetworkSvgProps<InputNode, InputLink>['nodeComponent']
    >,
    linkComponent: NetworkLink as NonNullable<
        NetworkSvgProps<InputNode, InputLink>['linkComponent']
    >,
    linkBlendMode: 'normal' as NonNullable<NetworkSvgProps<InputNode, InputLink>['linkBlendMode']>,
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    renderNode: renderCanvasNode,
    renderLink: renderCanvasLink,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
