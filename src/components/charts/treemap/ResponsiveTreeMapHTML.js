/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import TreeMapHTML                     from './TreeMapHTML'
import Dimensions                      from 'react-dimensions'


class ResponsiveTreeMapHTML extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props

        return (
            <TreeMapHTML
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        )
    }
}


export default Dimensions()(ResponsiveTreeMapHTML)
