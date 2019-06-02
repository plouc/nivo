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
import { blendModePropType } from '@nivo/core'
import { NodePropType } from './props'
import NodeWrapper from './NodeWrapper'

const StaticNodes = ({
    nodes,
    renderNode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    blendMode,
}) => {
    return nodes.map(node => (
        <NodeWrapper
            key={node.id}
            node={node}
            renderNode={renderNode}
            x={node.x}
            y={node.y}
            size={node.size}
            color={node.style.color}
            isInteractive={isInteractive}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            tooltip={tooltip}
            blendMode={blendMode}
        />
    ))
}

StaticNodes.propTypes = {
    nodes: PropTypes.arrayOf(NodePropType).isRequired,
    renderNode: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    blendMode: blendModePropType.isRequired,
}

export default memo(StaticNodes)
