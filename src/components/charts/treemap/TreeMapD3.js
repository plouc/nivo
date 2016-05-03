/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component }                      from 'react';
import { findDOMNode }                           from 'react-dom';
import _                                         from 'lodash';
import d3                                        from 'd3';
import Nivo                                      from '../../../Nivo';
import { getColorStyleObject, getColorRange }    from '../../../ColorUtils';
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps';
import Layout                                    from '../../../lib/charts/treemap/TreeMapD3';


function nodePosition() {
    this
        .style('left',   d => `${d.x}px`)
        .style('top',    d => `${d.y}px`)
        .style('width',  d => `${Math.max(0, d.dx - 1)}px`)
        .style('height', d => `${Math.max(0, d.dy - 1)}px`)
    ;
}

class TreeMapD3 extends Component {
    renderD3(nextProps) {
        const {
            root,
            mode, orientLabels, padding, skipVMin,
            valueAccessor, labelFn,
            colors,
            transitionDuration, transitionEasing
        } = nextProps;

        const borderColorStyle = getColorStyleObject(nextProps.borderColor, 'color');

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);

        const width  = nextProps.width  - margin.left - margin.right;
        const height = nextProps.height - margin.top - margin.bottom;

        const treemap = d3.layout.treemap()
            .size([width, height])
            .sticky(true)
            .round(true)
            .value(valueAccessor)
            .mode(mode)
            .padding(padding)
        ;

        const element = d3.select(findDOMNode(this))
            .style({
                width:  nextProps.width,
                height: nextProps.height
            })
        ;
        const wrapper = element.select('.nivo_treemap_wrapper')
            .style({
                top:    `${margin.top}px`,
                left:   `${margin.left}px`,
                width:  `${width}px`,
                height: `${height}px`
            })
        ;

        const color = getColorRange(colors);

        const nodes = wrapper.datum(root).selectAll('.nivo_treemap_node').data(treemap.nodes);

        const newNodes = nodes.enter().append('div')
            .classed('nivo_treemap_node', true)
            .classed('_is-parent', d => (d.children && d.children.length > 0))
            .classed('_is-child', d => (d.parent !== undefined && (!d.children || d.children.length === 0)))
            .each(function (d) {
                if (d.depth > 1 ) {
                    d.color = d3.rgb(d.parent.color).brighter(.2);
                } else {
                    d.color = color(d.name);
                }

                const el    = d3.select(this);
                const label = el.append('span')
                    .attr('class', 'nivo_treemap_node_label')
                    .text(d.children ? '' : labelFn(d))
                    .style('transform', d => {
                        if (orientLabels && d.dy > d.dx) {
                            return 'rotate(-90deg)';
                        }

                        return 'rotate(0)';
                    })
                ;

                if (orientLabels) {
                    if (d.dy > d.dx) {
                        label.style('transform', 'rotate(90deg)');
                    }
                }
            })
            .style(borderColorStyle)
            .style({
                overflow:          'hidden',
                position:          'absolute',
                display:           'flex',
                'align-items':     'center',
                'justify-content': 'center',
            })
            .call(nodePosition)
            .style('background', function(d) { return  d.color; })
        ;

        nodes
            .each(function (d) {
                if (d.depth > 1 ) {
                    d.color = d3.rgb(d.parent.color).brighter(.2);
                } else {
                    d.color = color(d.name);
                }
            })
            .classed('_is-parent', d => d.children && d.children.length > 0)
            .style(borderColorStyle)
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style('background', d => d.color)
            .call(nodePosition)
            .each(function (d) {
                const el = d3.select(this);

                const transform = (orientLabels && d.dy > d.dx) ? 'rotate(-90deg)' : 'rotate(0deg)';

                el.select('span')
                    .style('transform', transform)
                ;
            })
        ;
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps);

        return false;
    }

    componentDidMount() {
        this.renderD3(this.props);
    }

    componentWillMount() {
        this.treemap = Layout();
    }

    render() {
        return (
            <div className="nivo_treemap" style={{ position: 'relative' }}>
                <div className="nivo_treemap_wrapper" style={{ position: 'absolute' }} />
            </div>
        );
    }
}

TreeMapD3.propTypes    = _.omit(treeMapPropTypes,    ['children', 'stiffness', 'damping']);
TreeMapD3.defaultProps = _.omit(treeMapDefaultProps, ['stiffness', 'damping']);


export default TreeMapD3;
