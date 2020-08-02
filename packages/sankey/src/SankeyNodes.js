/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import SankeyNodesItem from './SankeyNodesItem'

const SankeyNodes = ({
    nodes,
    nodeOpacity,
    nodeHoverOpacity,
    nodeHoverOthersOpacity,
    nodeBorderWidth,
    getNodeBorderColor,
    setCurrentNode,
    currentNode,
    currentLink,
    isCurrentNode,
    isInteractive,
    onClick,
    tooltip,
}) => {
    const getOpacity = node => {
        if (!currentNode && !currentLink) return nodeOpacity
        if (isCurrentNode(node)) return nodeHoverOpacity
        return nodeHoverOthersOpacity
    }

    return nodes.map(node => (
        <SankeyNodesItem
            key={node.id}
            node={node}
            x={node.x}
            y={node.y}
            width={node.width}
            height={node.height}
            color={node.color}
            opacity={getOpacity(node)}
            borderWidth={nodeBorderWidth}
            borderColor={getNodeBorderColor(node)}
            setCurrent={setCurrentNode}
            isInteractive={isInteractive}
            onClick={onClick}
            tooltip={tooltip}
        />
    ))
}

SankeyNodes.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,
    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeHoverOthersOpacity: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    getNodeBorderColor: PropTypes.func.isRequired,
    tooltip: PropTypes.func,
    setCurrentNode: PropTypes.func.isRequired,
    currentNode: PropTypes.object,
    currentLink: PropTypes.object,
    isCurrentNode: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default memo(SankeyNodes)
