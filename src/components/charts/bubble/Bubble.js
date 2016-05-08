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
import _                                       from 'lodash';
import { getLabelGenerator }                   from '../../../lib/LabelHelper';
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps';
import BubblePlaceholders                      from './BubblePlaceholders';
import { getColorGenerator }                   from '../../../ColorUtils';


const createNodes = ({
    borderWidth, borderColor,
    label, labelFormat, labelSkipRadius, labelTextColor, labelTextDY
}) => {
    const labelFn       = getLabelGenerator(label, labelFormat);
    const borderColorFn = getColorGenerator(borderColor);
    const textColorFn   = getColorGenerator(labelTextColor);
    
    return nodes => {
        const renderedNodes = [];

        nodes.forEach(node => {
            renderedNodes.push(
                <circle
                    key={`${node.key}.circle`}
                    r={node.style.r}
                    className="nivo_bubble_node"
                    transform={`translate(${node.style.x},${node.style.y})`}
                    style={{
                        fill:        node.style.color,
                        stroke:      borderColorFn(node.style),
                        strokeWidth: borderWidth,
                    }}
                />
            );
        });

        nodes
            .filter(node => {
                return labelSkipRadius === 0 || node.data.r >= labelSkipRadius;
            })
            .forEach(node => {
                renderedNodes.push(
                    <text
                        key={`${node.key}.text`}
                        className="nivo_bubble_legend"
                        transform={`translate(${node.style.x},${node.style.y})`}
                        textAnchor={'middle'}
                        dy={labelTextDY}
                        style={{
                            fill: textColorFn(node.style)
                        }}
                    >
                        {labelFn(node.data)}
                    </text>
                );
            })
        ;

        return renderedNodes;
    };
};


class Bubble extends Component {
    render() {
        return (
            <BubblePlaceholders
                {...this.props}
                namespace="svg"
            >
                {createNodes(this.props)}
            </BubblePlaceholders>
        );
    }
}

Bubble.propTypes = _.omit(bubblePropTypes, [
    'children',
    'namespace',
    'transitionDuration',
    'transitionEasing',
]);

Bubble.defaultProps = _.omit(bubbleDefaultProps, [
    'namespace',
    'transitionDuration',
    'transitionEasing',
]);


export default Bubble;
