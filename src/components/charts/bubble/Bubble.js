/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import _ from 'lodash'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps'
import BubblePlaceholders from './BubblePlaceholders'
import BasicTooltip from '../../tooltip/BasicTooltip'

const createNodes = ({
    borderWidth,
    getBorderColor,
    enableLabel,
    getLabel,
    labelSkipRadius,
    getLabelTextColor,
}) => (nodes, { showTooltip, hideTooltip, theme }) => {
    const renderedNodes = []

    nodes.filter(node => node.style.r > 0).forEach(node => {
        const handleTooltip = e => {
            showTooltip(
                <BasicTooltip
                    id={node.data.id}
                    value={node.data.value}
                    enableChip={true}
                    color={node.style.color}
                    theme={theme}
                />,
                e
            )
        }

        renderedNodes.push(
            <circle
                key={`${node.key}.circle`}
                r={node.style.r}
                transform={`translate(${node.style.x},${node.style.y})`}
                onMouseEnter={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={hideTooltip}
                onClick={node.zoom}
                style={{
                    fill: node.style.color,
                    stroke: getBorderColor(node.style),
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
                        transform={`translate(${node.style.x},${node.style.y})`}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        style={{
                            fill: getLabelTextColor(node.style),
                            pointerEvents: 'none',
                        }}
                    >
                        {getLabel({ ...node.data.data, ...node.data })}
                    </text>
                )
            })
    }

    return renderedNodes
}

const Bubble = props =>
    <BubblePlaceholders {...props} namespace="svg">
        {createNodes(props)}
    </BubblePlaceholders>

Bubble.propTypes = _.omit(bubblePropTypes, [
    'children',
    'namespace',
    'transitionDuration',
    'transitionEasing',
])

const enhance = compose(
    defaultProps(
        _.omit(bubbleDefaultProps, ['namespace', 'transitionDuration', 'transitionEasing'])
    ),
    withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
        getLabel: getLabelGenerator(label, labelFormat),
    })),
    withPropsOnChange(['borderColor'], ({ borderColor }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor),
    })),
    withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
        getLabelTextColor: getInheritedColorGenerator(labelTextColor),
    })),
    pure
)

const enhancedBubble = enhance(Bubble)
enhancedBubble.displayName = 'enhance(Bubble)'

export default enhancedBubble
