import React, { Component, PropTypes }        from 'react';
import { findDOMNode }                        from 'react-dom';
import _                                      from 'lodash';
import d3                                     from 'd3';
import Dimensions                             from 'react-dimensions';
import Nivo                                   from '../../Nivo';
import { margin as marginPropType }           from '../../PropTypes';
import { flatten }                            from '../../DataUtils';
import { getColorRange }                      from '../../ColorUtils';


class Bubble extends Component {
    renderD3(nextProps) {
        const {
            root,
            containerWidth, containerHeight,
            padding,
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
            .padding(padding)
        ;

        const color = getColorRange(colors);

        const flattened = flatten(root);
        flattened.children.forEach(child => {
            child.color = color(child.packageName);
        });

        const bubbled = bubble.nodes(flattened).filter(d => !d.children);
        const nodes   = wrapper.selectAll('.bubble_node').data(bubbled);

        nodes
            .enter().append('circle')
            .attr('class', 'bubble_node')
            .attr('r', 2)
            .style('fill', d => color(d.packageName))
            .attr('transform', d => `translate(${d.x},${d.y})`)
        ;

        nodes
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('r', d => d.r)
            .attr('transform', d => `translate(${d.x},${d.y})`)
        ;

        nodes.exit()
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', `translate(${width / 2},${height / 2})`)
            .remove()
        ;

        const bubbleContext = {
            element:  wrapper,
            width,
            height,
            rawData:  root,
            flatData: flattened,
            data:     bubbled,
            transitionDuration,
            transitionEasing
        };

        this.legends.forEach(legend => {
            legend(bubbleContext);
        });
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps);

        return false;
    }

    componentDidMount() {
        this.renderD3(this.props);
    }

    componentWillMount() {
        const { children } = this.props;

        const legends = [];

        React.Children.forEach(children, element => {
            if (React.isValidElement(element)) {
                if (element.type.createBubbleLegendsFromReactElement) {
                    legends.push(element.type.createBubbleLegendsFromReactElement(element));
                }
            }
        });

        this.legends = legends;
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
    padding:            number.isRequired,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Bubble.defaultProps = {
    margin:             Nivo.defaults.margin,
    padding:            1,
    colors:             Nivo.defaults.colorRange,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Dimensions()(Bubble);
