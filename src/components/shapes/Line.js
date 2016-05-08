/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode }                 from 'react-dom';
import d3                              from 'd3';
import Nivo                            from '../../Nivo';


class Line extends Component {
    renderD3(props) {
        const {
            data,
            xScale, yScale,
            xAccessor, yAccessor,
            interpolation,
            transitionDuration,
            transitionEasing
        } = props;

        const element = d3.select(findDOMNode(this));

        const line = d3.svg.line()
            .x((d, i) => xScale(xAccessor(d, i)))
            .y((d, i) => yScale(yAccessor(d, i)))
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

const { array, func, string, number } = PropTypes;

Line.propTypes = {
    data:               array.isRequired,
    xScale:             func.isRequired,
    yScale:             func.isRequired,
    xAccessor:          func.isRequired,
    yAccessor:          func.isRequired,
    interpolation:      string.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Line.defaultProps = {
    xAccessor:          (d, i) => i,
    yAccessor:          d => d,
    interpolation:      'linear',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
};


export default Line;
