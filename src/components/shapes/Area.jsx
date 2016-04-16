import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';


class Area extends Component {
    shouldComponentUpdate(nextProps) {
        const {
            data,
            xScale, yScale,
            width, height,
            interpolation,
            transitionDuration,
            transitionEasing
        } = nextProps;

        const element = d3.select(React.findDOMNode(this));

        const area = d3.svg.area()
            .x((d, i) => xScale(i))
            .y0(height)
            .y1(d => yScale(d))
            .interpolate(interpolation)
        ;

        element.datum(data)
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', area)
        ;

        return false;
    }

    render() {
        return <path className="chart__shape__area" />;
    }
}

Area.displayName = 'Area';

Area.propTypes = {
    data:               PropTypes.array.isRequired,
    xScale:             PropTypes.func.isRequired,
    yScale:             PropTypes.func.isRequired,
    width:              PropTypes.number.isRequired,
    height:             PropTypes.number.isRequired,
    interpolation:      PropTypes.string.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    transitionEasing:   PropTypes.string.isRequired
};

Area.defaultProps = {
    interpolation:      'linear',
    transitionDuration: 600,
    transitionEasing:   'cubic-out'
};


export default Area;
