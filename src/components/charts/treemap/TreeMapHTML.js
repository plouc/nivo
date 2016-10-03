/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component }                      from 'react'
import { findDOMNode }                           from 'react-dom'
import _                                         from 'lodash'
import { convertLabel }                          from '../../../lib/propertiesConverters'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import TreeMapPlaceholders                       from './TreeMapPlaceholders'
import { getColorGenerator }                     from '../../../ColorUtils'


const createNodes = ({
    borderWidth,
    borderColor,
    enableLabels,
    label: _label,
    labelFormat,
    orientLabels,
    labelSkipSize,
    labelTextColor,
}) => {
    const label         = convertLabel(_label, labelFormat)
    const borderColorFn = getColorGenerator(borderColor)
    const textColorFn   = getColorGenerator(labelTextColor)

    return nodes => {
        const renderedNodes = []

        nodes.forEach(node => {
            const shouldRenderLabel = enableLabels &&
                node.data.height === 0 &&
                (labelSkipSize === 0 || Math.min(node.style.width, node.style.height) > labelSkipSize)

            const rotate = shouldRenderLabel &&
                orientLabels &&
                node.style.height > node.style.width

            renderedNodes.push(
                <div
                    key={node.key}
                    className="nivo_treemap_node"
                    style={{
                        boxSizing:      'border-box',
                        position:       'absolute',
                        top:            node.style.y,
                        left:           node.style.x,
                        width:          node.style.width,
                        height:         node.style.height,
                        background:     node.style.color,
                        overflow:       'hidden',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        borderWidth:    borderWidth,
                        borderStyle:    'solid',
                        borderColor:    borderColorFn(node.data),
                    }}
                >
                    {shouldRenderLabel && (
                        <span
                            className="nivo_treemap_node_label"
                            style={{
                                color:     textColorFn(node.data),
                                transform: `rotate(${rotate ? '-90' : '0'}deg)`
                            }}
                        >
                            {label(node.data.data)}
                        </span>
                    )}
                </div>
            )
        })

        return renderedNodes
    }
}


class TreeMapHTML extends Component {
    render() {
        return (
            <TreeMapPlaceholders
                {...this.props}
                namespace="html"
            >
                {createNodes(this.props)}
            </TreeMapPlaceholders>
        )
    }
}

TreeMapHTML.propTypes = _.omit(treeMapPropTypes, [
    'children',
    'namespace',
])

TreeMapHTML.defaultProps = _.omit(treeMapDefaultProps, [
])


export default TreeMapHTML
