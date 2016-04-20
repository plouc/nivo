import React, { Component, PropTypes }        from 'react';
import { findDOMNode }                        from 'react-dom';
import _                                      from 'lodash';
import d3                                     from 'd3';
import Dimensions                             from 'react-dimensions';
import Nivo                                   from '../../Nivo';
import { margin as marginPropType }           from '../../PropTypes';
import { flatten }                            from '../../DataUtils';
import { getColorStyleObject, getColorRange } from '../../ColorUtils';


class Bubble extends Component {
    renderD3(nextProps) {
        const {
            root,
            mode,
            valueAccessor, labelFn,
            containerWidth, containerHeight,
            colors,
            transitionDuration, transitionEasing
        } = nextProps;

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);

        const width  = containerWidth  - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const element = d3.select(findDOMNode(this)).attr({
            width:  containerWidth,
            height: containerHeight
        });

        const wrapper = element.select('.nivo_bubble_wrapper').attr({
            width,
            height,
            transform: `translate(${margin.left},${margin.top})`
        });

        const bubble = d3.layout.pack()
            .sort(null)
            .size([width, height])
            .padding(1)
        ;

        let nodes = wrapper.selectAll('.bubble_node')
            .data(bubble.nodes(flatten(root))
            .filter(d => !d.children))
        ;

        const color = getColorRange(colors);

        nodes
            .enter().append('g')
            .attr('class', 'bubble_node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
        .append('circle')
            .attr('r', 2)
            .style('fill', d => color(d.packageName))
        ;

        nodes
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', d => `translate(${d.x},${d.y})`)
        ;

        nodes.each(function (d) {
            const el = d3.select(this);

            el.select('circle')
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('r', d => d.r)
            ;
        });

        nodes.exit()
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', `translate(${width / 2},${height / 2})`)
            .remove()
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
            <svg className="nivo_bubble">
                <g className="nivo_bubble_wrapper" />
            </svg>
        );
    }
}

const { object, number, string, func, any } = PropTypes;

Bubble.propTypes = {
    containerWidth:     number.isRequired,
    containerHeight:    number.isRequired,
    margin:             marginPropType,
    root:               object.isRequired,
    valueAccessor:      func.isRequired,
    labelFn:            func.isRequired,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Bubble.defaultProps = {
    margin:             Nivo.defaults.margin,
    valueAccessor:      d => d.size,
    labelFn:            d => d.name,
    colors:             Nivo.defaults.colorRange,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Dimensions()(Bubble);
