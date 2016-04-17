import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';
import Nivo                            from '../../Nivo';


class Line extends Component {
    renderD3(props) {
        const {
            data,
            xScale, yScale,
            interpolation,
            transitionDuration,
            transitionEasing
        } = props;

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
    }

    componentDidMount() {
        this.renderD3(this.props);
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps);

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
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing
};


export default Line;
