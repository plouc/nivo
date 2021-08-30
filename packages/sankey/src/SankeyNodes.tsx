import { SankeyCommonProps, SankeyId, SankeyLinkDatum, SankeyNodeDatum } from './types'
import { SankeyNodesItem } from './SankeyNodesItem'

interface SankeyNodesProps<Id extends SankeyId> {
    nodes: SankeyNodeDatum<Id>[]
    nodeOpacity: SankeyCommonProps<Id>['nodeOpacity']
    nodeHoverOpacity: SankeyCommonProps<Id>['nodeHoverOpacity']
    nodeHoverOthersOpacity: SankeyCommonProps<Id>['nodeHoverOthersOpacity']
    borderWidth: SankeyCommonProps<Id>['nodeBorderWidth']
    getBorderColor: (node: SankeyNodeDatum<Id>) => string
    borderRadius: SankeyCommonProps<Id>['nodeBorderRadius']
    setCurrentNode: (node: SankeyNodeDatum<Id> | null) => void
    currentNode: SankeyNodeDatum<Id> | null
    currentLink: SankeyLinkDatum<Id> | null
    isCurrentNode: (node: SankeyNodeDatum<Id>) => boolean
    isInteractive: SankeyCommonProps<Id>['isInteractive']
    onClick?: SankeyCommonProps<Id>['onClick']
    tooltip: SankeyCommonProps<Id>['nodeTooltip']
}

export const SankeyNodes = <Id extends SankeyId>({
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
}: SankeyNodesProps<Id>) => {
    const getOpacity = (node: SankeyNodeDatum<Id>) => {
        if (!currentNode && !currentLink) return nodeOpacity
        if (isCurrentNode(node)) return nodeHoverOpacity
        return nodeHoverOthersOpacity
    }

    return (
        <>
            {nodes.map(node => (
                <SankeyNodesItem<Id>
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
