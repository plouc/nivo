import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';


class XYScales extends Component {
    render() {
        const {
            data,
            width, height,
            children
        } = this.props;

        if (React.Children.count(children) === 0) {
            return null;
        }

        const xScale = d3.scale.linear()
            .range([0, width])
            .domain([0, data.length - 1])
        ;

        const yScale = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(data)])
        ;

        return (
            <g>
                {React.Children.map(children, child => (
                    React.cloneElement(child, { data: data.slice(), xScale, yScale, width, height })
                ))}
            </g>
        );
    }
}

XYScales.displayName = 'XYScales';

XYScales.propTypes = {
    data:   PropTypes.array.isRequired,
    width:  PropTypes.number,
    height: PropTypes.number
};


export default XYScales;
