import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';


class Line extends Component {
    shouldComponentUpdate(nextProps) {
        const {
            data,
            xScale, yScale,
            interpolation,
            transitionDuration,
            transitionEasing
        } = nextProps;

        const element = d3.select(React.findDOMNode(this));

        const line = d3.svg.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .interpolate(interpolation)
        ;

        element.datum(data)
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', line)
        ;

        return false;
    }

    render() {
        return <path className="chart__shape__line" />;
    }
}

Line.displayName = 'Line';

Line.propTypes = {
    data:               PropTypes.array.isRequired,
    xScale:             PropTypes.func.isRequired,
    yScale:             PropTypes.func.isRequired,
    interpolation:      PropTypes.string.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    transitionEasing:   PropTypes.string.isRequired
};

Line.defaultProps = {
    interpolation:      'linear',
    transitionDuration: 600,
    transitionEasing:   'cubic-out'
};


export default Line;
