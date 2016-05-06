/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component }                      from 'react';
import { findDOMNode }                           from 'react-dom';
import _                                         from 'lodash';
import { TransitionMotion, spring }              from 'react-motion';
import { getColorStyleObject, getColorRange }    from '../../../ColorUtils';
import Nivo                                      from '../../../Nivo';
import TreeMapD3                                 from '../../../lib/charts/treemap/TreeMapD3';
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps';


class TreeMapPlaceholders extends Component {
    componentWillMount() {
        this.treemap = TreeMapD3();
    }

    render() {
        const {
            root,
            mode, padding,
            enableFisheye,
            identityProperty, valueAccessor,
            colors,
            stiffness, damping
        } = this.props;

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);

        const width  = this.props.width  - margin.left - margin.right;
        const height = this.props.height - margin.top  - margin.bottom;

        const nodes = this.treemap.compute({
            width, height,
            root,
            mode, padding,
            enableFisheye,
            identityProperty, valueAccessor
        });

        const defaultStyles = nodes.map(node => ({
            key:   node[identityProperty],
            data:  node,
            style: {
                x:      node.x + node.dx / 2,
                y:      node.y + node.dy / 2,
                width:  1,
                height: 1
            }
        }));

        return (
            <div className="nivo_treemap" style={{ position: 'relative' }}>
                <TransitionMotion
                    defaultStyles={defaultStyles}
                    styles={nodes.map(node => ({
                        key:   node[identityProperty],
                        data:  node,
                        style: {
                            x:      spring(node.x,  { stiffness, damping }),
                            y:      spring(node.y,  { stiffness, damping }),
                            width:  spring(node.dx, { stiffness, damping }),
                            height: spring(node.dy, { stiffness, damping }),
                        },
                    }))}
                >
                    {interpolatedStyles => (
                        <div
                            className="nivo_treemap_wrapper"
                            style={{
                                position: 'absolute',
                                top:      margin.top,
                                left:     margin.left,
                            }}
                        >
                            {this.props.children(interpolatedStyles)}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        );
    }
}

TreeMapPlaceholders.propTypes    = _.omit(treeMapPropTypes,    ['orientLabels', 'skipVMin', 'transitionDuration', 'transitionEasing']);
TreeMapPlaceholders.defaultProps = _.omit(treeMapDefaultProps, ['orientLabels', 'skipVMin', 'transitionDuration', 'transitionEasing']);


export default TreeMapPlaceholders;
