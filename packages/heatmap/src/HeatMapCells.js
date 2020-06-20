/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

const HeatMapCells = ({
    nodes,
    cellComponent,
    cellBorderWidth,
    getCellBorderColor,
    enableLabels,
    getLabelTextColor,
    handleNodeHover,
    handleNodeLeave,
    onClick,
}) => {
    return nodes.map(node =>
        React.createElement(cellComponent, {
            key: node.key,
            data: node,
            value: node.value,
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
            color: node.color,
            opacity: node.opacity,
            borderWidth: cellBorderWidth,
            borderColor: getCellBorderColor(node),
            enableLabel: enableLabels,
            textColor: getLabelTextColor(node),
            onHover: handleNodeHover ? event => handleNodeHover(node, event) : undefined,
            onLeave: handleNodeLeave,
            onClick,
        })
    )
}

HeatMapCells.propTypes = {}

export default HeatMapCells
