/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveWrapper, MotionProps, SvgDefsAndFill } from '@nivo/core'
import Line from './Line'
import { LineBaseProps, AccessorFunc, Datum } from './hooks'

export interface ResponsiveLineProps extends LineBaseProps, MotionProps, SvgDefsAndFill<Datum> {
    enablePointLabel?: boolean
    pointLabel?: string | AccessorFunc
    pointLabelYOffset?: number
    areaBlendMode?: string
    useMesh?: boolean
  }

const ResponsiveLine = (props: ResponsiveLineProps) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Line width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveLine
