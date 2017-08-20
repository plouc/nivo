/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import d3 from 'd3'
import BubbleD3 from './BubbleD3'
import {
    getColorRange,
    getInheritedColorGenerator,
    getColorStyleObject,
} from '../../../lib/colorUtils'
import { convertLabel } from '../../propertiesConverters'

const BubbleD3Svg = domRoot => {
    // DOM elements
    const element = d3.select(domRoot)
    const wrapper = element.append('g').attr('class', 'nivo_bubble_wrapper')

    const bubble = BubbleD3()

    // an array to store decorator functions
    let decorators = []

    return {
        draw(props) {
            const {
                data,
                onBubbleClick,
                identityProperty,
                value,
                width,
                height,
                margin,
                padding,
                colors,
                borderWidth,
                borderColor,
                label,
                labelFormat,
                labelSkipRadius,
                labelTextColor,
                labelTextDY,
                transitionDuration,
                transitionEasing,
            } = props

            const identity = d => d[identityProperty]
            const valueAccessor = d => d[value]

            element.attr({ width, height })

            const useWidth = width - margin.left - margin.right
            const useHeight = height - margin.top - margin.bottom

            wrapper.attr({
                width: useWidth,
                height: useHeight,
                transform: `translate(${margin.left},${margin.top})`,
            })

            const color = getColorRange(colors)
            const borderColorFn = getInheritedColorGenerator(borderColor)

            const bubbled = bubble.compute({
                width: useWidth,
                height: useHeight,
                data,
                identityProperty,
                valueAccessor,
                padding,
                color,
            })

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // NODES
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            const nodes = wrapper.selectAll('.nivo_bubble_node').data(bubbled, identity)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // ENTER: creates new nodes
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            nodes
                .enter()
                .append('circle')
                .attr('class', 'nivo_bubble_node')
                .attr('r', 2)
                .style('fill', d => d.color)
                .style('stroke', borderColorFn)
                .style('stroke-width', borderWidth)
                .attr('transform', d => `translate(${d.x},${d.y})`)
                .on('click', onBubbleClick)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // UPDATE: updates existing nodes
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            nodes
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style('fill', d => d.color)
                .style('stroke', borderColorFn)
                .style('stroke-width', borderWidth)
                .attr('r', d => d.r)
                .attr('transform', d => `translate(${d.x},${d.y})`)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // EXIT: removes stale nodes
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            nodes
                .exit()
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('transform', `translate(${width / 2},${height / 2})`)
                .attr('r', 0)
                .remove()

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // LABELS
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            const labelFn = convertLabel(label, labelFormat)
            const textColorStyle = getColorStyleObject(labelTextColor, 'fill')

            let legendsData = bubbled
            if (labelSkipRadius > 0) {
                legendsData = bubbled.filter(d => d.r >= labelSkipRadius)
            }

            const legends = wrapper.selectAll('.nivo_bubble_legend').data(legendsData, identity)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // ENTER: creates new labels
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            legends
                .enter()
                .append('text')
                .attr('class', 'nivo_bubble_legend')
                .style('text-anchor', 'middle')
                .style(textColorStyle)
                .style('opacity', 0)
                .text(labelFn)
                .attr('transform', d => `translate(${d.x},${d.y})`)
                .attr('dy', labelTextDY)
                .on('click', onBubbleClick)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // UPDATE: updates existing labels
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            legends
                .text(labelFn)
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style(textColorStyle)
                .style('opacity', 1)
                .attr('transform', d => `translate(${d.x},${d.y})`)
                .attr('dy', labelTextDY)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // EXIT: removes stale labels
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            legends
                .exit()
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style('opacity', 0)
                .remove()

            const bubbleContext = {
                element: wrapper,
                width: useWidth,
                height: useHeight,
                rawData: data,
                identity,
                valueAccessor,
                data: bubbled,
                transitionDuration,
                transitionEasing,
            }

            decorators.forEach(decorator => {
                decorator(bubbleContext)
            })
        },

        decorate(newDecorators = []) {
            decorators = newDecorators
        },
    }
}

export default BubbleD3Svg
