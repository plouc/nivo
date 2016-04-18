import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';
import Nivo                            from '../../Nivo';


class Area extends Component {
    renderD3(props) {
        const {
            data,
            xScale, yScale,
            xAccessor, yAccessor,
            width, height,
            interpolation,
            transitionDuration,
            transitionEasing
        } = props;

        const element = d3.select(React.findDOMNode(this));

        const area = d3.svg.area()
            .x((d, i) => xScale(xAccessor(d, i)))
            .y0(height)
            .y1((d, i) => yScale(yAccessor(d, i)))
            .interpolate(interpolation)
        ;

        element.datum(data)
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', area)
        ;
    }

    componentDidMount() {
        this.renderD3(this.props);
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps);

        return false;
    }

    render() {
        return <path className="chart__shape__area" />;
    }
}

Area.displayName = 'Area';

const { array, func, string, number } = PropTypes;

Area.propTypes = {
    data:               array.isRequired,
    xScale:             func.isRequired,
    yScale:             func.isRequired,
    xAccessor:          func.isRequired,
    yAccessor:          func.isRequired,
    width:              number.isRequired,
    height:             number.isRequired,
    interpolation:      string.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Area.defaultProps = {
    xAccessor:          (d, i) => i,
    yAccessor:          d => d,
    interpolation:      'linear',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Area;
