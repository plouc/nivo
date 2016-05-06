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
import Dimensions                      from 'react-dimensions';
import Bubble                          from './Bubble';


class ResponsiveBubble extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props;

        return (
            <Bubble
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        );
    }
}


export default Dimensions()(ResponsiveBubble);
