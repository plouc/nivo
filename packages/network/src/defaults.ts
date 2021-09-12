import { NetworkLayerId } from './types'
import { NetworkNode } from './NetworkNode'
import { renderCanvasNode } from './renderCanvasNode'
import { NetworkLink } from './NetworkLink'
import { renderCanvasLink } from './renderCanvasLink'
import { NetworkNodeTooltip } from './NetworkNodeTooltip'

export const commonDefaultProps = {
    layers: ['links', 'nodes'] as NetworkLayerId[],

    linkDistance: 30,
    repulsivity: 10,
    distanceMin: 1,
    distanceMax: Infinity,
    iterations: 90,

    nodeColor: '#000000',
    nodeBorderWidth: 0,
    nodeBorderColor: { from: 'color' },

    linkThickness: 1,
    linkColor: { from: 'source.color' },

    isInteractive: true,
    nodeTooltip: NetworkNodeTooltip,

    animate: true,
    motionConfig: 'gentle' as const,

    role: 'img',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: NetworkNode,
    linkComponent: NetworkLink,
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    renderNode: renderCanvasNode,
    renderLink: renderCanvasLink,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
