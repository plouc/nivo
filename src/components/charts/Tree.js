import React, { Component, PropTypes }        from 'react';
import { findDOMNode }                        from 'react-dom';
import _                                      from 'lodash';
import d3                                     from 'd3';
import Dimensions                             from 'react-dimensions';
import Nivo                                   from '../../Nivo';
import { margin as marginPropType }           from '../../PropTypes';
import { flatten }                            from '../../DataUtils';
import { getColorRange }                      from '../../ColorUtils';


const horizontalDiagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);
const verticalDiagonal   = d3.svg.diagonal().projection(d => [d.x, d.y]);

const horizontalTransform = d => `translate(${d.y},${d.x})`;
const verticalTransform   = d => `translate(${d.x},${d.y})`;


class Tree extends Component {
    renderD3(nextProps) {
        const {
            root,
            containerWidth, containerHeight,
            direction,
            labelFn,
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

        let position;
        let size;
        let diagonal;
        let transformer;

        switch (direction) {
            case 'horizontal':
                position    = [margin.left, margin.top];
                size        = [height, width];
                diagonal    = horizontalDiagonal;
                transformer = horizontalTransform;
                break;

            case 'horizontal-reverse':
                position    = [margin.left + width, margin.top];
                size        = [height, -width];
                diagonal    = horizontalDiagonal;
                transformer = horizontalTransform;
                break;

            case 'vertical':
                position    = [margin.left, margin.top];
                size        = [width, height];
                diagonal    = verticalDiagonal;
                transformer = verticalTransform;
                break;

            case 'vertical-reverse':
                position    = [margin.left, margin.top + height];
                size        = [width, -height];
                diagonal    = verticalDiagonal;
                transformer = verticalTransform;
                break;
        }

        const wrapper = element.select('.nivo_bubble_wrapper').attr({
            width,
            height,
            transform: `translate(${position[0]},${position[1]})`
        });

        const cluster = d3.layout.cluster().size(size);

        const nodes = cluster.nodes(root);
        const links = cluster.links(nodes);

        const link = wrapper.selectAll('.nivo_dendrogram_link').data(links);

        link
            .enter().append('path')
            .attr('fill', 'none')
            .attr('stroke', '#000')
            .attr('class', 'nivo_dendrogram_link')
            .attr('d', d => {
                const o = { x: d.source.x, y: d.source.y };

                return diagonal({ source: o, target: o });
            })
        ;

        link
            .transition()
            .delay(d => (d.source ? d.source.depth * transitionDuration : 0))
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', diagonal)
        ;

        link.exit()
            .remove()
        ;

        const node = wrapper.selectAll('.nivo_dendrogram_node').data(nodes);

        const newNode = node
            .enter().append('g')
            .attr('class', 'nivo_dendrogram_node')
            .attr('transform', d => {
                let o = { x: d.x, y: d.y };
                if (d.parent) {
                    o = { x: d.parent.x, y: d.parent.y };
                }

                return transformer(o);
            })
        ;

        newNode.append('circle')
            .attr('r', 0.5)
        ;

        node
            .transition()
            .delay(d => (d.depth - 1) * transitionDuration)
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', transformer)
        ;

        node.exit()
            .remove()
        ;

        /*
        node.append('text')
            .attr('dx', function(d) { return d.children ? -8 : 8; })
            .attr('dy', 3)
            .style('text-anchor', d => {
                if (direction === 'vertical') {
                    return 'middle';
                }

                return d.children ? 'end' : 'start';
            })
            .text(labelFn)
        ;
        */
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

const { object, number, string, func, any, oneOf } = PropTypes;

Tree.propTypes = {
    containerWidth:     number.isRequired,
    containerHeight:    number.isRequired,
    margin:             marginPropType,
    root:               object.isRequired,
    labelFn:            func.isRequired,
    direction:          oneOf(['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse']).isRequired,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Tree.defaultProps = {
    margin:             Nivo.defaults.margin,
    labelFn:            d => d.name,
    direction:          'horizontal',
    colors:             Nivo.defaults.colorRange,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Dimensions()(Tree);
