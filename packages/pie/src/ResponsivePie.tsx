/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import Pie from './Pie'
import { PieSvgProps } from './types'

// prettier-ignore
const ResponsivePie = <R, >(props: Omit<PieSvgProps<R>, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number, height: number }) => <Pie<R> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsivePie
