/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { line } from 'd3-shape'
import { withDimensions, withTheme, curveFromProp } from '@nivo/core'
import { getOrdinalColorScale } from '@nivo/colors'
import withPropsOnChange from 'recompose/withPropsOnChange'

export const commonEnhancers = [
    withDimensions(),
    withTheme(),
    withPropsOnChange(['colors'], ({ colors }) => ({
        getLineColor: getOrdinalColorScale(colors, 'index'),
    })),
    withPropsOnChange(['curve'], ({ curve }) => ({
        lineGenerator: line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
]
