/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import d3 from 'd3'
import _ from 'lodash'
import { getColorRange } from '../../../ColorUtils'

const RadialStackD3Svg = domRoot => {
    // DOM elements
    const svg = d3.select(domRoot)
    const element = svg.append('g')

    // d3 scales/layouts
    const stack = d3.layout.stack()
    const angle = d3.scale.linear()
    const radius = d3.scale.linear()
    const area = d3.svg.area.radial().interpolate('cardinal-closed')

    // an array to store decorator functions
    let decorators = []

    return {
        draw(props) {
            const {
                margin,
                layers,
                offset,
                innerRadius,
                colors,
                transitionDuration,
                transitionEasing,
            } = props

            const width = props.width - margin.left - margin.right
            const height = props.height - margin.top - margin.bottom

            svg.attr({
                width: props.width,
                height: props.height,
            })

            element.attr(
                'transform',
                `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`
            )

            stack.offset(offset)

            const stacked = stack(layers)

            angle.range([0, 2 * Math.PI]).domain([0, stacked[0].length])

            const outerRadius = Math.min(width, height) / 2
            radius
                .range([outerRadius * innerRadius, outerRadius])
                .domain([0, d3.max(stacked, layer => d3.max(layer, d => d.y0 + d.y))])

            const color = getColorRange(colors)

            area
                .angle(d => angle(d.x))
                .innerRadius(d => radius(d.y0))
                .outerRadius(d => radius(d.y0 + d.y))

            let paths = element.selectAll('.nivo_radial-stack_area').data(stacked)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // ENTER: creates new elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            paths
                .enter()
                .append('path')
                .attr('class', 'nivo_radial-stack_area')
                .attr('d', area)
                .style('fill', (d, i) => color(i))

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // UPDATE: updates existing elements
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            paths
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('d', area)
                .style('fill', (d, i) => color(i))

            const radialStackContext = {
                element,
                outerRadius,
                innerRadius: outerRadius * innerRadius,
                layers,
                stacked,
                radius,
                angle,
                transitionDuration,
                transitionEasing,
            }

            decorators.forEach(decorator => {
                decorator(radialStackContext)
            })
        },

        decorate(newDecorators = []) {
            decorators = newDecorators
        },
    }
}

export default RadialStackD3Svg
