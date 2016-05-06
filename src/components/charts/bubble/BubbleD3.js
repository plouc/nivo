/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes }         from 'react';
import { findDOMNode }                         from 'react-dom';
import _                                       from 'lodash';
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps';
import Nivo                                    from '../../../Nivo';
import BubbleD3Svg                             from '../../../lib/charts/bubble/BubbleD3Svg';
import decoratorsFromReactChildren             from '../../../lib/decoratorsFromReactChildren';


class BubbleD3 extends Component {
    renderChart(props) {
        this.bubble.decorate(decoratorsFromReactChildren(props.children, 'decorateBubble'));
        this.bubble.draw(_.assign({}, props, {
            margin: _.assign({}, Nivo.defaults.margin, props.margin)
        }));
    }

    shouldComponentUpdate(nextProps) {
        this.renderChart(nextProps);

        return false;
    }

    componentDidMount() {
        this.bubble = BubbleD3Svg(findDOMNode(this.refs.svg));
        this.renderChart(this.props);
    }

    render() {
        return <svg ref="svg" className="nivo_bubble" />;
    }
}

const { number, string } = PropTypes;

BubbleD3.propTypes = _.assign({}, bubblePropTypes, {
    width:              number.isRequired,
    height:             number.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
});

BubbleD3.defaultProps = _.assign({}, bubbleDefaultProps, {
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
});


export default BubbleD3;
