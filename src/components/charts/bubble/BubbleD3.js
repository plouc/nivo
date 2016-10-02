/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component }                    from 'react';
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

BubbleD3.propTypes = _.omit(bubblePropTypes, [
    'children',
    'namespace',
    'motionStiffness',
    'motionDamping',
]);

BubbleD3.defaultProps = _.omit(bubbleDefaultProps, [
    'namespace',
    'motionStiffness',
    'motionDamping',
]);


export default BubbleD3;
