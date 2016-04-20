import React, { Component, PropTypes }        from 'react';
import d3                                     from 'd3';
import Nivo                                   from '../../Nivo';
import { lineInterpolation }                  from '../../PropTypes';
import { getColorStyleObject, getColorRange } from '../../ColorUtils';


class RadialStack extends Component {
    renderD3(nextProps) {
        const {
            layers,
            offset,
            width, height,
            interpolation,
            colors,
            transitionDuration, transitionEasing
        } = nextProps;

        const element = d3.select(React.findDOMNode(this));
        element.attr('transform', `translate(${width / 2}, ${height / 2})`);

        const stack   = d3.layout.stack().offset(offset);
        const stacked = stack(layers);

        const angle = d3.scale.linear()
            .range([0, 2 * Math.PI])
            .domain([0, stacked[0].length])
        ;

        const outerRadius = Math.min(width, height) / 2;
        const radius = d3.scale.linear()
            .range([outerRadius * nextProps.innerRadius, outerRadius])
            .domain([0, d3.max(stacked, layer => d3.max(layer, d => (d.y0 + d.y)))])
        ;

        const color = getColorRange(colors);

        const area = d3.svg.area.radial()
            .interpolate('cardinal-closed')
            .angle(d => angle(d.x))
            .innerRadius(d => radius(d.y0))
            .outerRadius(d => radius(d.y0 + d.y))
        ;

        let paths = element.selectAll('.stack_area').data(stacked);

        paths.enter().append('path')
            .attr('class', 'stack_area')
            .attr('d', area)
            .style('fill', function() { return color(Math.random() * 6); })
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
        return <g />;
    }
}

const { array, number, string, func, any, oneOf } = PropTypes;

RadialStack.propTypes = {
    width:              number.isRequired,
    height:             number.isRequired,
    innerRadius:        number.isRequired,
    sort:               func,
    layers:             array.isRequired,
    offset:             oneOf(['silhouette', 'wiggle', 'expand', 'zero']).isRequired,
    keyProp:            string.isRequired,
    valueProp:          string.isRequired,
    interpolation:      lineInterpolation,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

RadialStack.defaultProps = {
    innerRadius:        .6,
    sort:               null,
    offset:             'zero',
    keyProp:            'label',
    valueProp:          'value',
    interpolation:      'monotone',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    colors:             Nivo.defaults.colorRange
};


export default RadialStack;
