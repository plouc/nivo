/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import TreeMapPlaceholders from './TreeMapPlaceholders'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'

const createNodes = ({
    borderWidth,
    borderColor: _borderColor,
    enableLabels,
    label: _label,
    labelFormat,
    orientLabels,
    labelSkipSize,
    labelTextColor,
}) => {
    const label = getLabelGenerator(_label, labelFormat)
    const borderColor = getInheritedColorGenerator(_borderColor)
    const textColor = getInheritedColorGenerator(labelTextColor)

    return nodes => {
        const renderedNodes = []

        nodes.forEach(node => {
            const shouldRenderLabel =
                enableLabels &&
                (labelSkipSize === 0 ||
                    Math.min(node.style.width, node.style.height) > labelSkipSize)

            const rotate = shouldRenderLabel && orientLabels && node.style.height > node.style.width

            renderedNodes.push(
                <g
                    key={node.key}
                    className="nivo_treemap_node"
                    transform={`translate(${node.style.x},${node.style.y})`}
                >
                    <rect
                        width={node.style.width}
                        height={node.style.height}
                        fill={node.style.color}
                        stroke={borderColor(node.data)}
                        strokeWidth={borderWidth}
                    />
                    {shouldRenderLabel &&
                        <g
                            transform={`translate(${node.style.width / 2},${node.style.height /
                                2}) rotate(${rotate ? '-90' : '0'})`}
                        >
                            <text
                                className="nivo_treemap_node_label"
                                textAnchor="middle"
                                dy="0.5em"
                                style={{
                                    fill: textColor(node.data),
                                }}
                            >
                                {label(node.data)}
                            </text>
                        </g>}
                </g>
            )
        })

        return renderedNodes
    }
}

class TreeMap extends Component {
    render() {
        return (
            <TreeMapPlaceholders {...this.props} namespace="svg">
                {createNodes(this.props)}
            </TreeMapPlaceholders>
        )
    }
}

TreeMap.propTypes = _.omit(treeMapPropTypes, ['children', 'namespace'])

TreeMap.defaultProps = _.omit(treeMapDefaultProps, [])

export default TreeMap
