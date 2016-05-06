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
import { TransitionMotion, spring }            from 'react-motion';
import d3                                      from 'd3';
import _                                       from 'lodash';
import Nivo                                    from '../../../Nivo';
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
            namespace,
            identityProperty, value,
            padding,
            colors,
            stiffness, damping
        } = this.props;

        const valueAccessor = d => d[value];
        const color         = getColorRange(colors);

        const width     = this.props.width;
        const height    = this.props.height;
        const margin    = _.assign({}, Nivo.defaults.margin, this.props.margin);
        const useWidth  = width  - margin.left - margin.right;
        const useHeight = height - margin.top  - margin.bottom;

        const nodes = this.bubble.compute({
            width:  useWidth,
            height: useHeight,
            root,
            identityProperty, valueAccessor,
            padding,
            color
        });

        const defaultStyles = nodes.map(b => {
            const color = d3.rgb(b.color);

            return {
                key:   b[identityProperty],
                data:  b,
                style: {
                    r:      1,
                    x:      b.x,
                    y:      b.y,
                    colorR: color.r,
                    colorG: color.g,
                    colorB: color.b,
                }
            };
        });

        let wrapperTag;
        let containerTag;

        const wrapperProps   = {};
        const containerProps = {};

        if (namespace === 'svg') {
            wrapperTag   = 'svg';
            containerTag = 'g';

            wrapperProps.width       = width;
            wrapperProps.height      = height;
            containerProps.transform = `translate(${margin.left},${margin.top})`;
        } else {
            wrapperTag   = 'div';
            containerTag = 'div';

            wrapperProps.style = {
                position: 'relative',
                width,
                height
            };
            containerProps.style = margin;
        }

        return React.createElement(wrapperTag, wrapperProps, (
            <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                defaultStyles={defaultStyles}
                styles={nodes.map(b => {
                    const color = d3.rgb(b.color);

                    return {
                        key:   b[identityProperty],
                        data:  b,
                        style: {
                            r:      spring(b.r, { stiffness, damping }),
                            x:      spring(b.x, { stiffness, damping }),
                            y:      spring(b.y, { stiffness, damping }),
                            colorR: spring(color.r, { stiffness, damping, precision: 1 }),
                            colorG: spring(color.g, { stiffness, damping, precision: 1 }),
                            colorB: spring(color.b, { stiffness, damping, precision: 1 }),
                        }
                    };
                })}
            >
                {interpolatedStyles => {
                    return React.createElement(
                        containerTag,
                        containerProps,
                        this.props.children(interpolatedStyles.map(interpolatedStyle => {
                            const { colorR, colorG, colorB } = interpolatedStyle.style;
                            interpolatedStyle.style.color = `rgb(${Math.round(colorR)},${Math.round(colorG)},${Math.round(colorB)})`;

                            return interpolatedStyle;
                        }))
                    );
                }}
            </TransitionMotion>
        ));
    }
}

const { number, func, oneOf } = PropTypes;

BubblePlaceholders.propTypes = _.assign({}, bubblePropTypes, {
    namespace: oneOf(['html', 'svg']),
    children:  func.isRequired,
    width:     number.isRequired,
    height:    number.isRequired,
    stiffness: number.isRequired, // react-motion
    damping:   number.isRequired, // react-motion
});

BubblePlaceholders.defaultProps = _.assign({}, bubbleDefaultProps, {
    namespace: 'html',
    stiffness: Nivo.defaults.motionStiffness,
    damping:   Nivo.defaults.motionDamping,
});


export default BubblePlaceholders;
