import { Annotation } from '@nivo/annotations'
import { ComputedNode, InputNode, NetworkSvgProps } from './types'
import { useNodeAnnotations } from './hooks'

interface NetworkNodeAnnotationsProps<Node extends InputNode> {
    nodes: ComputedNode<Node>[]
    annotations: NonNullable<NetworkSvgProps<Node>['annotations']>
}

export const NetworkNodeAnnotations = <Node extends InputNode>({
    nodes,
    annotations,
}: NetworkNodeAnnotationsProps<Node>) => {
    const boundAnnotations = useNodeAnnotations<Node>(nodes, annotations)

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
