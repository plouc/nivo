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
import Dimensions                              from 'react-dimensions';
import { TransitionMotion, spring }            from 'react-motion';
import d3                                      from 'd3';
import _                                       from 'lodash';
import Nivo                                    from '../../../Nivo';
import { getColorRange }                       from '../../../ColorUtils';
import BubbleD3                                from '../../../lib/charts/bubble/BubbleD3';
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps';
import BubbleNode                              from './BubbleNode';


class Bubble extends Component {
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
            enableFisheye,
            colors,
            stiffness, damping
        } = this.props;

        const margin        = _.assign({}, Nivo.defaults.margin, this.props.margin);

        const width         = containerWidth  - margin.left - margin.right;
        const height        = containerHeight - margin.top  - margin.bottom;

        const valueAccessor = d => d[valueProperty];
        const color         = getColorRange(colors);

        const nodes = this.bubble.compute({
            width, height,
            root,
            identityProperty, valueAccessor,
            padding,
            enableFisheye,
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
                    colorB: color.b
                }
            };
        });

        return (
            <div style={{ width: containerWidth, height: containerHeight, padding: 0, border: 0 }}>
                <svg className="nivo_bubble" style={{ width: containerWidth, height: containerHeight }}>
                    <g className="nivo_bubble_wrapper" transform={`translate(${margin.left},${margin.top})`}>
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
                                        colorB: spring(color.b, { stiffness, damping, precision: 1 })
                                    }
                                };
                            })}
                        >
                            {interpolatedStyles =>
                                <g>
                                    {interpolatedStyles.map(b => <BubbleNode key={b.key} {...b.style} />)}
                                </g>
                            }
                        </TransitionMotion>
                    </g>
                </svg>
            </div>
        );
    }
}

Bubble.propTypes    = _.omit(bubblePropTypes,    ['children', 'transitionDuration', 'transitionEasing']);
Bubble.defaultProps = _.omit(bubbleDefaultProps, ['transitionDuration', 'transitionEasing']);


export default Dimensions()(Bubble);
