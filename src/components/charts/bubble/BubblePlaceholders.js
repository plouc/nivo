/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component }                    from 'react';
import { findDOMNode }                         from 'react-dom';
import Dimensions                              from 'react-dimensions';
import { TransitionMotion, spring }            from 'react-motion';
import _                                       from 'lodash';
import { getColorRange }                       from '../../../ColorUtils';
import BubbleD3                                from '../../../lib/charts/bubble/BubbleD3';
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps';


class BubblePlaceholders extends Component {
    componentWillMount() {
        this.bubble = BubbleD3();
    }

    willEnter(d) {
        return { r: spring(0) };
    }

    willLeave() {
        return { r: spring(0) };
    }

    render() {
        const {
            root,
            containerWidth, containerHeight,
            identityProperty, valueProperty,
            padding,
            colors,
            stiffness, damping
        } = this.props;

        const width         = containerWidth;
        const height        = containerHeight;

        const valueAccessor = d => d[valueProperty];
        const color         = getColorRange(colors);

        const nodes = this.bubble.compute({
            width, height,
            root,
            identityProperty, valueAccessor,
            padding,
            color
        });

        const defaultStyles = nodes.map(b => ({
            key:   b[identityProperty],
            data:  b,
            style: {
                r: 1,
                x: b.x,
                y: b.y
            }
        }));

        return (
            <div className="nivo_bubble" style={{ position: 'relative', width, height }}>
                <TransitionMotion
                    willEnter={this.willEnter}
                    willLeave={this.willLeave}
                    defaultStyles={defaultStyles}
                    styles={nodes.map(b => ({
                        key:   b[identityProperty],
                        data:  b,
                        style: {
                            r: spring(b.r, { stiffness, damping }),
                            x: spring(b.x, { stiffness, damping }),
                            y: spring(b.y, { stiffness, damping })
                        }
                    }))}
                >
                    {interpolatedStyles => (
                        <div>
                            {this.props.children(interpolatedStyles)}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        );
    }
}

BubblePlaceholders.propTypes    = _.omit(bubblePropTypes,    ['margin', 'transitionDuration', 'transitionEasing']);
BubblePlaceholders.defaultProps = _.omit(bubbleDefaultProps, ['margin', 'transitionDuration', 'transitionEasing']);


export default Dimensions()(BubblePlaceholders);
