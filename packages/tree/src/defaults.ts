import { CommonProps, TreeCanvasProps, TreeSvgProps } from './types'
import { Node } from './Node'
import { Link } from './Link'
import { Label } from './Label'
import { renderNode, renderLink, renderLabel } from './canvas'

export const commonDefaultProps: Pick<
    CommonProps<any>,
    | 'identity'
    | 'mode'
    | 'layout'
    | 'nodeSize'
    | 'nodeColor'
    | 'fixNodeColorAtDepth'
    | 'linkCurve'
    | 'linkThickness'
    | 'linkColor'
    | 'enableLabel'
    | 'label'
    | 'labelsPosition'
    | 'orientLabel'
    | 'labelOffset'
    | 'isInteractive'
    | 'useMesh'
    | 'meshDetectionThreshold'
    | 'debugMesh'
    | 'highlightAncestorNodes'
    | 'highlightDescendantNodes'
    | 'highlightAncestorLinks'
    | 'highlightDescendantLinks'
    | 'role'
    | 'animate'
    | 'motionConfig'
> = {
    identity: 'id',
    mode: 'dendogram',
    layout: 'top-to-bottom',
    nodeSize: 12,
    nodeColor: { scheme: 'nivo' },
    fixNodeColorAtDepth: Infinity,
    linkCurve: 'bump',
    linkThickness: 1,
    linkColor: { from: 'source.color', modifiers: [['opacity', 0.4]] },
    enableLabel: true,
    label: 'id',
    labelsPosition: 'outward',
    orientLabel: true,
    labelOffset: 6,
    isInteractive: true,
    useMesh: true,
    meshDetectionThreshold: Infinity,
    debugMesh: false,
    highlightAncestorNodes: true,
    highlightDescendantNodes: false,
    highlightAncestorLinks: true,
    highlightDescendantLinks: false,
    role: 'img',
    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps: typeof commonDefaultProps &
    Required<
        Pick<TreeSvgProps<any>, 'layers' | 'nodeComponent' | 'linkComponent' | 'labelComponent'>
    > = {
    ...commonDefaultProps,
    layers: ['links', 'nodes', 'labels', 'mesh'],
    nodeComponent: Node,
    linkComponent: Link,
    labelComponent: Label,
}

export const canvasDefaultProps: typeof commonDefaultProps &
    Required<
        Pick<
            TreeCanvasProps<any>,
            'layers' | 'renderNode' | 'renderLink' | 'renderLabel' | 'pixelRatio'
        >
    > = {
    ...commonDefaultProps,
    layers: ['links', 'nodes', 'labels', 'mesh'],
    renderNode,
    renderLink,
    renderLabel,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
