/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import Dimensions from 'react-dimensions'
import _ from 'lodash'
import d3 from 'd3'
import Nivo from '../../Nivo'
import { margin as marginPropType } from '../../PropTypes'
import { getColorRange } from '../../ColorUtils'
import makeLabel, {
    LABEL_POSITION_TOP,
    LABEL_POSITION_RIGHT,
    LABEL_POSITION_BOTTOM,
    LABEL_POSITION_LEFT,
} from '../../lib/charts/labels'
import {
    HIERARCHICAL_NODE_TYPE_ROOT,
    HIERARCHICAL_NODE_TYPE_LEAF,
    getHierarchicalNodeType,
} from '../../HierarchyUtils'

const horizontalDiagonal = d3.svg.diagonal().projection(d => [d.y, d.x])
const verticalDiagonal = d3.svg.diagonal().projection(d => [d.x, d.y])

const horizontalTransform = d => `translate(${d.y},${d.x})`
const verticalTransform = d => `translate(${d.x},${d.y})`

const horizontalLabelTextAnchor = d => (d.children ? 'end' : 'start')
const horizontalReverseLabelTextAnchor = d => (d.children ? 'start' : 'end')
const verticalLabelTextAnchor = 'middle'

const labelPositions = {
    root: {
        horizontal: LABEL_POSITION_LEFT,
        'horizontal-reverse': LABEL_POSITION_RIGHT,
        vertical: LABEL_POSITION_TOP,
        'vertical-reverse': LABEL_POSITION_BOTTOM,
    },
    intermediate: {
        horizontal: LABEL_POSITION_LEFT,
        'horizontal-reverse': LABEL_POSITION_RIGHT,
        vertical: LABEL_POSITION_TOP,
        'vertical-reverse': LABEL_POSITION_BOTTOM,
    },
    leaf: {
        horizontal: LABEL_POSITION_RIGHT,
        'horizontal-reverse': LABEL_POSITION_LEFT,
        vertical: LABEL_POSITION_LEFT,
        'vertical-reverse': LABEL_POSITION_RIGHT,
    },
}

const computeLabelPositions = ({
    direction,
    rootLabelPosition,
    intermediateLabelPosition,
    leafLabelPosition,
}) => {
    rootLabelPosition = rootLabelPosition || labelPositions.root[direction]
    intermediateLabelPosition = intermediateLabelPosition || labelPositions.intermediate[direction]
    leafLabelPosition = leafLabelPosition || labelPositions.leaf[direction]

    return {
        rootLabelPosition,
        intermediateLabelPosition,
        leafLabelPosition,
    }
}

const labelRotations = {
    root: {
        horizontal: 0,
        'horizontal-reverse': 0,
        vertical: 0,
        'vertical-reverse': 0,
    },
    intermediate: {
        horizontal: 0,
        'horizontal-reverse': 0,
        vertical: 0,
        'vertical-reverse': 0,
    },
    leaf: {
        horizontal: 0,
        'horizontal-reverse': 0,
        vertical: -90,
        'vertical-reverse': -90,
    },
}

const computeLabelRotations = ({
    direction,
    rootLabelRotation,
    intermediateLabelRotation,
    leafLabelRotation,
}) => {
    rootLabelRotation = rootLabelRotation || labelRotations.root[direction]
    intermediateLabelRotation = intermediateLabelRotation || labelRotations.intermediate[direction]
    leafLabelRotation = leafLabelRotation || labelRotations.leaf[direction]

    return {
        rootLabelRotation,
        intermediateLabelRotation,
        leafLabelRotation,
    }
}

class Tree extends Component {
    renderD3(nextProps) {
        const {
            root,
            identity,
            labelFn,
            containerWidth,
            containerHeight,
            direction,
            colors,
            nodeRadius,
            transitionDuration,
            transitionEasing,
            labelOffset,
            labelPaddingX,
            labelPaddingY,
        } = nextProps

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin)

        const width = containerWidth - margin.left - margin.right
        const height = containerHeight - margin.top - margin.bottom

        const element = d3.select(findDOMNode(this)).attr({
            width: containerWidth,
            height: containerHeight,
        })

        let position
        let size
        let diagonal
        let transformer
        let labelTextAnchor

        switch (direction) {
            case 'horizontal':
                position = [margin.left, margin.top]
                size = [height, width]
                diagonal = horizontalDiagonal
                transformer = horizontalTransform
                labelTextAnchor = horizontalLabelTextAnchor
                break

            case 'horizontal-reverse':
                position = [margin.left + width, margin.top]
                size = [height, -width]
                diagonal = horizontalDiagonal
                transformer = horizontalTransform
                labelTextAnchor = horizontalReverseLabelTextAnchor
                break

            case 'vertical':
                position = [margin.left, margin.top]
                size = [width, height]
                diagonal = verticalDiagonal
                transformer = verticalTransform
                labelTextAnchor = verticalLabelTextAnchor
                break

            case 'vertical-reverse':
                position = [margin.left, margin.top + height]
                size = [width, -height]
                diagonal = verticalDiagonal
                transformer = verticalTransform
                labelTextAnchor = verticalLabelTextAnchor
                break
        }

        const wrapper = element.select('.nivo_tree_wrapper').attr({ width, height })
        const previousNodes = _.cloneDeep(wrapper.selectAll('.nivo_tree_circle').data())

        wrapper
            //.transition()
            //.duration(transitionDuration)
            //.ease(transitionEasing)
            .attr('transform', `translate(${position[0]},${position[1]})`)

        const cluster = d3.layout.cluster().size(size)

        const color = getColorRange(colors)

        // prevents mutation on the original object by cloning original dataset
        // add color to each datum
        const nodes = cluster.nodes(_.cloneDeep(root)).map(node => {
            node.hierarchicalType = getHierarchicalNodeType(node)
            if (node.depth <= 1) {
                node.color = color(node.name)
            } else if (node.depth > 1) {
                node.color = node.parent.color
            }

            return node
        })

        const links = cluster.links(nodes)

        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Links
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const link = wrapper
            .selectAll('.nivo_tree_link')
            .data(links, d => `${identity(d.source)}.${identity(d.target)}`)

        link
            .enter()
            .append('path')
            .attr('fill', 'none')
            .style('stroke', d => d.target.color)
            .attr('class', 'nivo_tree_link')
            .attr('d', diagonal)
            .attr('stroke-dasharray', function() {
                return this.getTotalLength()
            })
            .attr('stroke-dashoffset', function() {
                return this.getTotalLength()
            })

        link
            .transition()
            //.delay(d => d.source.depth * transitionDuration)
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', diagonal)
            .attr('stroke-dasharray', function() {
                return this.getTotalLength()
            })
            .attr('stroke-dashoffset', 0)

        link
            .exit()
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('stroke-dashoffset', function() {
                return this.getTotalLength()
            })
            .remove()

        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Circles
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const circle = wrapper.selectAll('.nivo_tree_circle').data(nodes, identity)

        circle
            .enter()
            .append('circle')
            .attr('class', 'nivo_tree_circle')
            .style('fill', d => d.color)
            .attr('transform', transformer)
            .attr('r', 0)

        circle
            .transition()
            //.delay(d => d.depth * transitionDuration)
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', transformer)
            .attr('r', nodeRadius)

        circle.exit().remove()

        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Labels
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const label = wrapper.selectAll('.nivo_tree_label').data(nodes, identity)

        const {
            rootLabelPosition,
            intermediateLabelPosition,
            leafLabelPosition,
        } = computeLabelPositions(nextProps)

        const {
            rootLabelRotation,
            intermediateLabelRotation,
            leafLabelRotation,
        } = computeLabelRotations(nextProps)

        label
            .enter()
            .append('g')
            .attr('class', 'nivo_tree_label')
            .style('opacity', 0)
            .each(function(d) {
                const el = d3.select(this)

                let position
                let rotation
                if (d.hierarchicalType === HIERARCHICAL_NODE_TYPE_ROOT) {
                    position = rootLabelPosition
                    rotation = rootLabelRotation
                } else if (d.hierarchicalType === HIERARCHICAL_NODE_TYPE_LEAF) {
                    position = leafLabelPosition
                    rotation = leafLabelRotation
                } else {
                    position = intermediateLabelPosition
                    rotation = intermediateLabelRotation
                }

                el.attr('transform', `${transformer(d)} rotate(${rotation})`)

                el.call(
                    makeLabel({
                        text: d.name,
                        position,
                        labelOffset: 0,
                        labelPaddingX,
                        labelPaddingY,
                    })
                )
            })

        label
            .transition()
            //.delay(d => d.depth === 0 ? 0 : (Math.max(d.depth - 1, 0) + 1) * transitionDuration)
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style('opacity', 1)
            .attr('transform', d => {
                const translate = transformer(d)

                let rotation
                if (d.hierarchicalType === HIERARCHICAL_NODE_TYPE_ROOT) {
                    rotation = rootLabelRotation
                } else if (d.hierarchicalType === HIERARCHICAL_NODE_TYPE_LEAF) {
                    rotation = leafLabelRotation
                } else {
                    rotation = intermediateLabelRotation
                }

                return `${translate} rotate(${rotation})`
            })
            .each(function(d) {
                const el = d3.select(this)

                let position
                if (d.hierarchicalType === HIERARCHICAL_NODE_TYPE_ROOT) {
                    position = rootLabelPosition
                } else if (d.hierarchicalType === HIERARCHICAL_NODE_TYPE_LEAF) {
                    position = leafLabelPosition
                } else {
                    position = intermediateLabelPosition
                }

                el.call(
                    makeLabel({
                        text: d.name,
                        position,
                        labelOffset,
                        labelPaddingX,
                        labelPaddingY,
                    })
                )
            })
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps)

        return false
    }

    componentDidMount() {
        this.renderD3(this.props)
    }

    render() {
        return (
            <svg className="nivo_tree">
                <g className="nivo_tree_wrapper" />
            </svg>
        )
    }
}

const { object, number, string, func, any, oneOf } = PropTypes

Tree.propTypes = {
    containerWidth: number.isRequired,
    containerHeight: number.isRequired,
    margin: marginPropType,
    root: object.isRequired,
    identity: func.isRequired,
    labelFn: func.isRequired,
    direction: oneOf(['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse'])
        .isRequired,
    colors: any.isRequired,
    nodeRadius: number.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing: string.isRequired,
    labelOffset: number.isRequired,
    labelPaddingX: number.isRequired,
    labelPaddingY: number.isRequired,
    rootLabelPosition: string,
    intermediateLabelPosition: string,
    leafLabelPosition: string,
    rootLabelRotation: number,
    intermediateLabelRotation: number,
    leafLabelRotation: number,
}

Tree.defaultProps = {
    margin: Nivo.defaults.margin,
    labelFn: d => d.name,
    direction: 'horizontal',
    identity: d => `${d.parent ? d.parent.name : 'root'}.${d.name}.${d.depth}`,
    colors: Nivo.defaults.colorRange,
    labelOffset: 8,
    labelPaddingX: 8,
    labelPaddingY: 4,
    nodeRadius: 6,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
}

export default Dimensions()(Tree)
