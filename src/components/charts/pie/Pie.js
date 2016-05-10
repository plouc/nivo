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
import Nivo                            from '../../../Nivo';
import PieD3Svg                        from '../../../lib/charts/pie/PieD3Svg';
import decoratorsFromReactChildren     from '../../../lib/decoratorsFromReactChildren';


class Pie extends Component {
    shouldComponentUpdate(nextProps) {
        this.pie.decorate(decoratorsFromReactChildren(nextProps.children, 'decoratePie'));
        this.pie.draw(_.assign({}, nextProps, {
            margin: _.assign({}, Nivo.defaults.margin, nextProps.margin)
        }));

        return false;
    }

    componentDidMount() {
        this.pie = PieD3Svg(findDOMNode(this));
        this.pie.decorate(decoratorsFromReactChildren(this.props.children, 'decoratePie'));
        this.pie.draw(_.assign({}, this.props, {
            margin: _.assign({}, Nivo.defaults.margin, this.props.margin)
        }));
    }

    render() {
        return (
            <svg className="nivo_pie">
                <g className="nivo_pie_wrapper" />
            </svg>
        );
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
    innerRadius:        number.isRequired,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
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
