import { CommonProps, DendogramSvgProps } from './types'
import { Node } from './Node'
import { Link } from './Link'

export const commonDefaultProps: Pick<
    CommonProps<any>,
    | 'identity'
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
    | 'role'
    | 'animate'
    | 'motionConfig'
> = {
    identity: 'id',
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
    role: 'img',
    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps: typeof commonDefaultProps &
    Required<Pick<DendogramSvgProps<any>, 'layers' | 'nodeComponent' | 'linkComponent'>> = {
    ...commonDefaultProps,
    layers: ['links', 'nodes', 'labels', 'mesh'],
    nodeComponent: Node,
    linkComponent: Link,
}
