import React, { Component, PropTypes } from 'react';
import Dimensions                      from 'react-dimensions';
import _                               from 'lodash';


const defaultMargin = {
    top:    0,
    right:  0,
    bottom: 0,
    left:   0
};

class Chart extends Component {
    render() {
        const {
            containerWidth,
            containerHeight,
            children
        } = this.props;

        const margin = _.assign({}, defaultMargin, this.props.margin);

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
    margin: {}
};


export default Dimensions()(Chart);
