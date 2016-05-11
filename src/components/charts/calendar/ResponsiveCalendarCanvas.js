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
import CalendarCanvas                  from './CalendarCanvas';
import Dimensions                      from 'react-dimensions';


class ResponsiveCalendarCanvas extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props;

        return (
            <CalendarCanvas
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        );
    }
}


export default Dimensions()(ResponsiveCalendarCanvas);
