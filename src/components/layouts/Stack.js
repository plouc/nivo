import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';
import Nivo                            from '../../Nivo';


class Stack extends Component {
    renderD3(nextProps) {
        const {
            layers,
            width, height,
            interpolation,
            transitionDuration, transitionEasing
        } = nextProps;

        if (layers.length === 0) {
            return;
        }

        const stack = d3.layout.stack().offset('wiggle');
        const stacked = stack(layers);

        const xScale = d3.scale.linear()
            .range([0, width])
            .domain([0, stacked[0].length])
        ;

        const yScale = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(stacked, layer => d3.max(layer, d => (d.y0 + d.y)))])
        ;

        const color = d3.scale.linear()
            .domain([0, 0.5, 1])
            .range(['#ba1300', '#c6482e', '#ff9068'])
        ;

        const area = d3.svg.area()
            .interpolate(interpolation)
            .x(d => xScale(d.x))
            .y0(d => yScale(d.y0))
            .y1(d => yScale(d.y0 + d.y))
        ;

        const element = d3.select(React.findDOMNode(this));
        let paths = element.selectAll('.stack_area').data(stacked);

        paths.enter().append('path')
            .attr('class', 'stack_area')
            .attr('d', area)
            .style("fill", function() { return color(Math.random()); })
        ;

        paths
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', area)
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
        const { children } = this.props;

        this.layers = [];

        React.Children.forEach(children, element => {
            if (React.isValidElement(element)) {
                /*
                if (element.type.createLegendsFromReactElement) {
                    legends.push(element.type.createLegendsFromReactElement(element));
                }
                */
            }
        });
    }

    render() {
        return (
            <g>
            </g>
        );
    }
}

const { array, number, string, func } = PropTypes;

Stack.propTypes = {
    width:              number.isRequired,
    height:             number.isRequired,
    sort:               func,
    layers:             array.isRequired,
    keyProp:            string.isRequired,
    valueProp:          string.isRequired,
    interpolation:      PropTypes.string.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Stack.defaultProps = {
    sort:               null,
    keyProp:            'label',
    valueProp:          'value',
    interpolation:      'monotone',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Stack;
