/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import Dimensions                      from 'react-dimensions'
import Bars                            from './Bars'


class ResponsiveBars extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props

        return (
            <Bars
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        )
    }
}


export default Dimensions()(ResponsiveBars)
