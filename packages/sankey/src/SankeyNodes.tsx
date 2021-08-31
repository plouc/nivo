import {
    DefaultLink,
    DefaultNode,
    SankeyCommonProps,
    SankeyLinkDatum,
    SankeyNodeDatum,
} from './types'
import { SankeyNodesItem } from './SankeyNodesItem'

interface SankeyNodesProps<N extends DefaultNode, L extends DefaultLink> {
    nodes: SankeyNodeDatum<N, L>[]
    nodeOpacity: SankeyCommonProps<N, L>['nodeOpacity']
    nodeHoverOpacity: SankeyCommonProps<N, L>['nodeHoverOpacity']
    nodeHoverOthersOpacity: SankeyCommonProps<N, L>['nodeHoverOthersOpacity']
    borderWidth: SankeyCommonProps<N, L>['nodeBorderWidth']
    getBorderColor: (node: SankeyNodeDatum<N, L>) => string
    borderRadius: SankeyCommonProps<N, L>['nodeBorderRadius']
    setCurrentNode: (node: SankeyNodeDatum<N, L> | null) => void
    currentNode: SankeyNodeDatum<N, L> | null
    currentLink: SankeyLinkDatum<N, L> | null
    isCurrentNode: (node: SankeyNodeDatum<N, L>) => boolean
    isInteractive: SankeyCommonProps<N, L>['isInteractive']
    onClick?: SankeyCommonProps<N, L>['onClick']
    tooltip: SankeyCommonProps<N, L>['nodeTooltip']
}

export const SankeyNodes = <N extends DefaultNode, L extends DefaultLink>({
    nodes,
    nodeOpacity,
    nodeHoverOpacity,
    nodeHoverOthersOpacity,
    borderWidth,
    getBorderColor,
    borderRadius,
    setCurrentNode,
    currentNode,
    currentLink,
    isCurrentNode,
    isInteractive,
    onClick,
    tooltip,
}: SankeyNodesProps<N, L>) => {
    const getOpacity = (node: SankeyNodeDatum<N, L>) => {
        if (!currentNode && !currentLink) return nodeOpacity
        if (isCurrentNode(node)) return nodeHoverOpacity
        return nodeHoverOthersOpacity
    }

    return (
        <>
            {nodes.map(node => (
                <SankeyNodesItem<N, L>
                    key={node.id}
                    node={node}
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    color={node.color}
                    opacity={getOpacity(node)}
                    borderWidth={borderWidth}
                    borderColor={getBorderColor(node)}
                    borderRadius={borderRadius}
                    setCurrent={setCurrentNode}
                    isInteractive={isInteractive}
                    onClick={onClick}
                    tooltip={tooltip}
                />
            ))}
        </>
    )
}
