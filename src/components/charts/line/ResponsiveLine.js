/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import ResponsiveWrapper from '../ResponsiveWrapper'
import Line from './Line'

export default class ResponsiveLine extends Component {
    render() {
        return (
            <ResponsiveWrapper>
                {({ width, height }) => <Line width={width} height={height} {...this.props} />}
            </ResponsiveWrapper>
        )
    }
}
