import { CommonProps, TreeSvgProps } from './types'
import { Node } from './Node'
import { Link } from './Link'

export const commonDefaultProps: Pick<
    CommonProps<any>,
    | 'identity'
    | 'mode'
    | 'layout'
    | 'nodeSize'
    | 'nodeColor'
    | 'linkThickness'
    | 'linkColor'
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
    nodeSize: 16,
    nodeColor: { scheme: 'nivo' },
    linkThickness: 1,
    linkColor: { from: 'source.color', modifiers: [['opacity', 0.3]] },
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
    Required<Pick<TreeSvgProps<any>, 'layers' | 'nodeComponent' | 'linkComponent'>> = {
    ...commonDefaultProps,
    layers: ['links', 'nodes', 'mesh'],
    nodeComponent: Node,
    linkComponent: Link,
}
