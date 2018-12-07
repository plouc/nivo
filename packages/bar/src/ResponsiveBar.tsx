/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import Bar from './Bar'
import { BarOuterProps } from './props'

type ResponsiveBarProps<Datum> = Pick<
    BarOuterProps<Datum>,
    Exclude<keyof BarOuterProps<Datum>, 'width' | 'height'>
>

export class ResponsiveBar<Datum> extends React.Component<ResponsiveBarProps<Datum>> {
    render() {
        return (
            <ResponsiveWrapper>
                {({ width, height }) => <Bar width={width} height={height} {...this.props} />}
            </ResponsiveWrapper>
        )
    }
}
