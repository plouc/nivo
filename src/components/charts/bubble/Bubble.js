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
import _                                       from 'lodash';
import Nivo                                    from '../../../Nivo';
import { getLabelGenerator }                   from '../../../lib/LabelHelper';
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps';
import BubblePlaceholders                      from './BubblePlaceholders';


const createNodes = ({ label, labelFormat, skipRadius }) => {
    const labelFn = getLabelGenerator(label, labelFormat);
    
    return nodes => {
        const renderedNodes = [];

        nodes.forEach(node => {
            renderedNodes.push(
                <circle
                    key={`${node.key}.circle`}
                    r={node.style.r}
                    className="nivo_bubble_node"
                    transform={`translate(${node.style.x},${node.style.y})`}
                    style={{ fill: node.style.color }}
                />
            );
        });

        nodes
            .filter(node => {
                return skipRadius === 0 || node.data.r >= skipRadius;
            })
            .forEach(node => {
                renderedNodes.push(
                    <text
                        key={`${node.key}.text`}
                        transform={`translate(${node.style.x},${node.style.y})`}
                        textAnchor={'middle'}
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

const { number, string, any } = PropTypes;

Bubble.propTypes = _.assign({}, bubblePropTypes, {
    label:       string.isRequired,
    labelFormat: string,
    textColor:   any.isRequired,
    skipRadius:  number.isRequired,
    width:       number.isRequired,
    height:      number.isRequired,
    stiffness:   number.isRequired, // react-motion
    damping:     number.isRequired, // react-motion
});

Bubble.defaultProps = _.assign({}, bubbleDefaultProps, {
    label:      'name',
    skipRadius: 0,
    stiffness:  Nivo.defaults.motionStiffness,
    damping:    Nivo.defaults.motionDamping,
});


export default Bubble;
