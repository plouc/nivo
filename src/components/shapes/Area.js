import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';
import Nivo                            from '../../Nivo';


class Area extends Component {
    renderD3(props) {
        const {
            data,
            xScale, yScale,
            width, height,
            interpolation,
            transitionDuration,
            transitionEasing
        } = props;

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
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Area;
