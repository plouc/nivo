import React, { Component, PropTypes } from 'react';
import { findDOMNode }                 from 'react-dom';
import Nivo                            from '../../../Nivo';
import PieD3Svg                        from '../../../lib/charts/pie/PieD3Svg';
import decoratorsFromReactChildren     from '../../../lib/decoratorsFromReactChildren';


class Pie extends Component {
    shouldComponentUpdate(nextProps) {
        this.pie.decorate(decoratorsFromReactChildren(nextProps.children, 'decoratePie'));
        this.pie.draw(nextProps);

        return false;
    }

    componentDidMount() {
        this.pie = PieD3Svg(findDOMNode(this));
        this.pie.decorate(decoratorsFromReactChildren(this.props.children, 'decoratePie'));
        this.pie.draw(this.props);
    }

    render() {
        return <g />;
    }
}

const { array, number, string, func, any } = PropTypes;

Pie.propTypes = {
    width:              number.isRequired,
    height:             number.isRequired,
    sort:               func,
    data:               array.isRequired,
    keyProp:            string.isRequired,
    valueProp:          string.isRequired,
    startAngle:         number.isRequired,
    endAngle:           number.isRequired,
    padAngle:           number.isRequired,
    cornerRadius:       number.isRequired,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
    innerRadius:        number.isRequired
};

Pie.defaultProps = {
    sort:               null,
    keyProp:            'label',
    valueProp:          'value',
    startAngle:         0,
    endAngle:           360,
    padAngle:           0,
    cornerRadius:       0,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    innerRadius:        0,
    colors:             Nivo.defaults.colorRange
};


export default Pie;
