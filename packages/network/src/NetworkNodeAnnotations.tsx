import { Annotation } from '@nivo/annotations'
import { ComputedNode, InputLink, InputNode, NetworkSvgProps } from './types'
import { useNodeAnnotations } from './hooks'

interface NetworkNodeAnnotationsProps<Node extends InputNode, Link extends InputLink> {
    nodes: ComputedNode<Node>[]
    annotations: NonNullable<NetworkSvgProps<Node, Link>['annotations']>
}

export const NetworkNodeAnnotations = <Node extends InputNode, Link extends InputLink>({
    nodes,
    annotations,
}: NetworkNodeAnnotationsProps<Node, Link>) => {
    const boundAnnotations = useNodeAnnotations<Node>(nodes, annotations)

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
