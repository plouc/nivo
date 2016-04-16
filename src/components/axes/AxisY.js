import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';

class AxisY extends Component {
    renderD3(props) {
        const {
            orient,
            yScale,
            tickMode,
            tickPadding,
            width,
            transitionDuration,
            transitionEasing
        } = props;

        const element = d3.select(React.findDOMNode(this));

        const axis = d3.svg.axis()
            .scale(yScale)
            .tickPadding(tickPadding)
            .orient(orient)
        ;

        if (tickMode === 'grid') {
            axis.tickSize(-width);
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
        return <g className="chart__axis chart__axis--y"/>;
    }
}

AxisY.displayName = 'AxisY';

AxisY.propTypes = {
    orient:      PropTypes.oneOf(['left', 'right']).isRequired,
    yScale:      PropTypes.func.isRequired,
    tickMode:    PropTypes.oneOf(['normal', 'grid']).isRequired,
    tickPadding: PropTypes.number.isRequired
};

AxisY.defaultProps = {
    orient:             'left',
    transitionDuration: 600,
    transitionEasing:   'cubic-out',
    tickMode:           'normal',
    tickPadding:        3
};


export default AxisY;
