/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import ResponsiveWrapper from '../ResponsiveWrapper'
import BarD3 from './BarD3'

export default class ResponsiveBarD3 extends Component {
    render() {
        return (
            <ResponsiveWrapper>
                {({ width, height }) =>
                    <BarD3 width={width} height={height} {...this.props} />}
            </ResponsiveWrapper>
        )
    }
}
