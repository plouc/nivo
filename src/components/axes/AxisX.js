import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';

class AxisX extends Component {
    renderD3(props) {
        const {
            orient,
            xScale,
            tickMode,
            tickPadding,
            height,
            transitionDuration,
            transitionEasing
        } = props;

        const element = d3.select(React.findDOMNode(this));
        element.attr('transform', `translate(0, ${height})`);

        const axis = d3.svg.axis()
            .scale(xScale)
            .tickPadding(tickPadding)
            .orient(orient)
        ;

        if (tickMode === 'grid') {
            axis.tickSize(-height);
        }

        element
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .call(axis)
        ;

        return false;
    }

    componentDidMount() {
        this.renderD3(this.props);
    }

    shouldComponentUpdate(nextProps) {
        this.renderD3(nextProps);

        return false;
    }

    render() {
        return <g className="chart__axis chart__axis--x"/>;
    }
}

AxisX.displayName = 'AxisX';

AxisX.propTypes = {
    orient:      PropTypes.oneOf(['top', 'bottom']).isRequired,
    xScale:      PropTypes.func.isRequired,
    tickMode:    PropTypes.oneOf(['normal', 'grid']).isRequired,
    tickPadding: PropTypes.number.isRequired
};

AxisX.defaultProps = {
    orient:             'bottom',
    transitionDuration: 600,
    transitionEasing:   'cubic-out',
    tickMode:           'normal',
    tickPadding:        3
};


export default AxisX;
