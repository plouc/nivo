/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'

const StaticSwarmPlotNodes = memo(
    ({
        nodes,
        renderNode,
        getBorderWidth,
        getBorderColor,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    }) => {
        return nodes.map(node => {
            return (
                <Fragment key={node.id}>
                    {renderNode({
                        node,
                        x: node.x,
                        y: node.y,
                        size: node.size,
                        color: node.color,
                        borderWidth: getBorderWidth(node),
                        borderColor: getBorderColor(node),
                        isInteractive,
                        onMouseEnter,
                        onMouseMove,
                        onMouseLeave,
                        onClick,
                    })}
                </Fragment>
            )
        })
    }
)

StaticSwarmPlotNodes.displayName = 'StaticSwarmPlotNodes'
StaticSwarmPlotNodes.propTypes = {
    nodes: PropTypes.array.isRequired,
    renderNode: PropTypes.func.isRequired,
    getBorderWidth: PropTypes.func.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default StaticSwarmPlotNodes
