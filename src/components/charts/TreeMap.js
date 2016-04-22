import React, { Component, PropTypes }        from 'react';
import { findDOMNode }                        from 'react-dom';
import _                                      from 'lodash';
import d3                                     from 'd3';
import Dimensions                             from 'react-dimensions';
import Nivo                                   from '../../Nivo';
import { getColorStyleObject, getColorRange } from '../../ColorUtils';

function nodePosition() {
    this
        .style('left',   d => `${d.x}px`)
        .style('top',    d => `${d.y}px`)
        .style('width',  d => `${Math.max(0, d.dx - 1)}px`)
        .style('height', d => `${Math.max(0, d.dy - 1)}px`)
    ;
}

class TreeMap extends Component {
    renderD3(nextProps) {
        const {
            root,
            mode,
            valueAccessor, labelFn,
            containerWidth, containerHeight,
            colors,
            transitionDuration, transitionEasing
        } = nextProps;

        const borderColorStyle = getColorStyleObject(nextProps.borderColor, 'color');

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);

        const width  = containerWidth  - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const treemap = d3.layout.treemap()
            .size([width, height])
            .sticky(true)
            .value(valueAccessor)
            .mode(mode)
            .round(true)
            //.padding(10)
        ;

        const element = d3.select(findDOMNode(this));
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

        nodes.enter().append('div')
            .classed('nivo_treemap_node', true)
            .classed('_is-parent', d => (d.children && d.children.length > 0))
            .classed('_is-child', d => (d.parent !== undefined && (!d.children || d.children.length === 0)))
            .each(d => {
                if (d.depth > 1 ) {
                    d.color = d3.rgb(d.parent.color).brighter(.2);
                } else {
                    d.color = color(d.name);
                }
            })
            .style(borderColorStyle)
            .style({
                overflow: 'hidden',
                position: 'absolute'
            })
            .call(nodePosition)
            .style('background', function(d) { return  d.color; })
            .text(d => (d.children ? null : labelFn(d)))
        ;

        nodes
            .each(d => {
                if (d.depth > 1 ) {
                    d.color = d3.rgb(d.parent.color).brighter(.2);
                } else {
                    d.color = color(d.name);
                }
            })
            .classed('_is-parent', d => d.children && d.children.length > 0)
            .style(borderColorStyle)
            .style('background', function(d) { return d.color; })
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .call(nodePosition)
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
    }

    render() {
        return (
            <div className="nivo_treemap" style={{ position: 'relative' }}>
                <div className="nivo_treemap_wrapper" style={{ position: 'absolute' }} />
            </div>
        );
    }
}

const { object, number, string, func, shape, oneOf, any } = PropTypes;

TreeMap.propTypes = {
    containerWidth:     number.isRequired,
    containerHeight:    number.isRequired,
    root:               object.isRequired,
    valueAccessor:      func.isRequired,
    labelFn:            func.isRequired,
    mode:               oneOf(['squarify', 'slice', 'dice', 'slice-dice']),
    colors:             any.isRequired,
    borderColor:        any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
    margin:             shape({
        top:    number,
        right:  number,
        bottom: number,
        left:   number
    }).isRequired
};

TreeMap.defaultProps = {
    valueAccessor:      d => d.size,
    labelFn:            d => d.name,
    mode:               'squarify',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    margin:             Nivo.defaults.margin,
    borderColor:        'none',
    colors:             Nivo.defaults.colorRange
};


export default Dimensions()(TreeMap);
