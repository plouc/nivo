/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import _ from 'lodash'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { getColorGenerator } from '../../../lib/colorUtils'
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps'
import BubblePlaceholders from './BubblePlaceholders'
import BasicTooltip from '../../tooltip/BasicTooltip'

const createNodes = ({
    borderWidth,
    borderColor,
    enableLabel,
    label: _label,
    labelFormat,
    labelSkipRadius,
    labelTextColor,
    labelTextDY,
}) => {
    const label = getLabelGenerator(_label, labelFormat)
    const borderColorFn = getColorGenerator(borderColor)
    const textColorFn = getColorGenerator(labelTextColor)

    return (nodes, { showTooltip, hideTooltip }) => {
        const renderedNodes = []

        nodes.filter(node => node.style.r > 0).forEach(node => {
            const handleTooltip = e =>
                showTooltip(
                    <BasicTooltip
                        id={node.data.data.name}
                        value={node.data.value}
                        enableChip={true}
                        color={node.style.color}
                    />,
                    e
                )

            renderedNodes.push(
                <circle
                    key={`${node.key}.circle`}
                    r={node.style.r}
                    className="nivo_bubble_node"
                    transform={`translate(${node.style.x},${node.style.y})`}
                    onMouseEnter={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={hideTooltip}
                    style={{
                        fill: node.style.color,
                        stroke: borderColorFn(node.style),
                        strokeWidth: borderWidth,
                    }}
                />
            )
        })

        if (enableLabel === true) {
            nodes
                .filter(node => {
                    return (
                        node.data.height === 0 &&
                        (labelSkipRadius === 0 || node.data.r >= labelSkipRadius)
                    )
                })
                .forEach(node => {
                    renderedNodes.push(
                        <text
                            key={`${node.key}.text`}
                            className="nivo_bubble_legend"
                            transform={`translate(${node.style.x},${node.style.y})`}
                            textAnchor={'middle'}
                            dy={labelTextDY}
                            style={{
                                fill: textColorFn(node.style),
                                pointerEvents: 'none',
                            }}
                        >
                            {label(node.data.data)}
                        </text>
                    )
                })
        }

        return renderedNodes
    }
}

export default class Bubble extends Component {
    static propTypes = _.omit(bubblePropTypes, [
        'children',
        'namespace',
        'transitionDuration',
        'transitionEasing',
    ])

    static defaultProps = _.omit(bubbleDefaultProps, [
        'namespace',
        'transitionDuration',
        'transitionEasing',
    ])

    render() {
        return (
            <BubblePlaceholders {...this.props} namespace="svg">
                {createNodes(this.props)}
            </BubblePlaceholders>
        )
    }
}
