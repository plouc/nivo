/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import Dimensions                      from 'react-dimensions';
import _                               from 'lodash';
import Nivo                            from '../Nivo';


class Chart extends Component {
    render() {
        const {
            containerWidth,
            containerHeight,
            children
        } = this.props;

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);
        const width  = containerWidth  - margin.left - margin.right;
        const height = containerHeight - margin.top  - margin.bottom;

        return (
            <svg width={containerWidth} height={containerHeight}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {React.Children.map(children, child => (
                        React.cloneElement(child, { width, height })
                    ))}
                </g>
            </svg>
        );
    }
}

Chart.displayName = 'Chart';

Chart.propTypes = {
    containerWidth:  PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    margin:          PropTypes.shape({
        top:    PropTypes.number,
        right:  PropTypes.number,
        bottom: PropTypes.number,
        left:   PropTypes.number
    }).isRequired
};

Chart.defaultProps = {
    margin: Nivo.defaults.margin
};


export default Dimensions()(Chart);
