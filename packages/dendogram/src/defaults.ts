import { Node } from './Node'

export const commonDefaultProps: any = {
    layout: 'top-to-bottom',
    layers: ['links', 'nodes', 'labels'],
    isInteractive: true,
    role: 'img',
    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: Node,
}
