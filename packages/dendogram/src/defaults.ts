import { CommonProps, DendogramSvgProps } from './types'
import { Node } from './Node'
import { Link } from './Link'

export const commonDefaultProps: Pick<
    CommonProps<any>,
    'identity' | 'layout' | 'linkThickness' | 'isInteractive' | 'role' | 'animate' | 'motionConfig'
> = {
    identity: 'id',
    layout: 'top-to-bottom',
    linkThickness: 1,
    isInteractive: true,
    role: 'img',
    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps: typeof commonDefaultProps &
    Required<Pick<DendogramSvgProps<any>, 'layers' | 'nodeComponent' | 'linkComponent'>> = {
    ...commonDefaultProps,
    layers: ['links', 'nodes', 'labels'],
    nodeComponent: Node,
    linkComponent: Link,
}
