/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RadialStack from './RadialStack'
import Dimensions from 'react-dimensions'

class ResponsiveRadialStack extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props

        return (
            <RadialStack
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        )
    }
}

ResponsiveRadialStack.displayName = 'ResponsiveRadialStack'

export default Dimensions()(ResponsiveRadialStack)
