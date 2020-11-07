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
import Node from './Node'

const StaticNodes = ({
    nodes,
    color,
    borderWidth,
    borderColor,
    handleNodeHover,
    handleNodeLeave,
}) => {
    return nodes.map(node => {
        return (
            <Node
                key={node.id}
                node={node}
                x={node.x}
                y={node.y}
                radius={node.radius}
                color={color(node)}
                borderWidth={borderWidth}
                borderColor={borderColor(node)}
                handleNodeHover={handleNodeHover}
                handleNodeLeave={handleNodeLeave}
            />
        )
    })
}

StaticNodes.propTypes = {
    nodes: PropTypes.array.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,
    handleNodeHover: PropTypes.func.isRequired,
    handleNodeLeave: PropTypes.func.isRequired,
}

export default memo(StaticNodes)
