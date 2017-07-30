/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import d3 from 'd3'
import Nivo from '../../../Nivo'
import { getColorStyleObject, getColorRange } from '../../../ColorUtils'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import Treemap from '../../../lib/charts/treemap/TreeMapD3'

function nodePosition() {
    this.style('left', d => `${d.x0}px`)
        .style('top', d => `${d.y0}px`)
        .style('width', d => `${Math.max(0, d.x1 - d.x0)}px`)
        .style('height', d => `${Math.max(0, d.y1 - d.y0)}px`)
}

class TreeMapD3 extends Component {
    componentWillMount() {
        this.treemap = Treemap()
    }

    renderD3(nextProps) {
        const {
            root,
            tile,
            orientLabels,
            innerPadding,
            outerPadding,
            skipVMin,
            identityProperty,
            valueAccessor,
            labelFn,
            colors,
            transitionDuration,
            transitionEasing,
        } = this.props

        const borderColorStyle = getColorStyleObject(
            nextProps.borderColor,
            'color'
        )

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin)

        const width = nextProps.width - margin.left - margin.right
        const height = nextProps.height - margin.top - margin.bottom

        const _nodes = this.treemap.compute({
            width,
            height,
            root,
            tile,
            innerPadding,
            outerPadding,
            identityProperty,
            valueAccessor,
        })

        const element = d3.select(findDOMNode(this)).style({
            width: nextProps.width,
            height: nextProps.height,
        })

        const wrapper = element.select('.nivo_treemap_wrapper').style({
            top: `${margin.top}px`,
            left: `${margin.left}px`,
            width: `${width}px`,
            height: `${height}px`,
        })

        const color = getColorRange(colors)

        const nodes = wrapper.selectAll('.nivo_treemap_node').data(_nodes)

        nodes
            .enter()
            .append('div')
            .classed('nivo_treemap_node', true)
            .style('z-index', 10)
            .each(function(d) {
                let p = d
                while (p.depth > 1) p = p.parent
                d.color = color(p.data.name)

                const el = d3.select(this)
                const label = el
                    .append('span')
                    .attr('class', 'nivo_treemap_node_label')
                    .text(d.children ? '' : labelFn(d.data))
                    .style('transform', d => {
                        if (orientLabels && d.dy > d.dx) {
                            return 'rotate(-90deg)'
                        }

                        return 'rotate(0)'
                    })

                if (orientLabels) {
                    if (d.y1 - d.y0 > d.x1 - d.x0) {
                        label.style('transform', 'rotate(90deg)')
                    }
                }
            })
            .style(borderColorStyle)
            .style({
                overflow: 'hidden',
                position: 'absolute',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
            })
            .call(nodePosition)
            .style('background', d => d.color)

        nodes
            .each(function(d) {
                let p = d
                while (p.depth > 1) p = p.parent
                d.color = color(p.data.name)
            })
            .style(borderColorStyle)
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style('background', d => d.color)
            .call(nodePosition)
            .each(function(d) {
                const el = d3.select(this)

                const transform =
                    orientLabels && d.dy > d.dx
                        ? 'rotate(-90deg)'
                        : 'rotate(0deg)'

                el.select('span').style('transform', transform)
            })

        nodes
            .exit()
            .style('z-index', 5)
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style('width', '0px')
            .style('height', '0px')
            .style('opacity', 0)
            .remove()
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
            <div className="nivo_treemap" style={{ position: 'relative' }}>
                <div
                    className="nivo_treemap_wrapper"
                    style={{ position: 'absolute' }}
                />
            </div>
        )
    }
}

TreeMapD3.propTypes = _.omit(treeMapPropTypes, [
    'children',
    'stiffness',
    'damping',
])
TreeMapD3.defaultProps = _.omit(treeMapDefaultProps, ['stiffness', 'damping'])

export default TreeMapD3
