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
import TreeMapD3                       from './TreeMapD3';
import Dimensions                      from 'react-dimensions';


class ResponsiveTreeMapD3 extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props;

        return (
            <TreeMapD3
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        );
    }
}


export default Dimensions()(ResponsiveTreeMapD3);
