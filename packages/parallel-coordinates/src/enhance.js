/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { withDimensions, withTheme, withColors, curveFromProp } from '@nivo/core'
import * as props from './props'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { line } from 'd3-shape'

export const commonEnhancers = [
    withDimensions(),
    withColors({
        defaultColors: props.commonDefaultProps.colors,
        defaultColorBy: props.commonDefaultProps.colorBy,
        destKey: 'getLineColor',
    }),
    withTheme(),
    withPropsOnChange(['curve'], ({ curve }) => ({
        lineGenerator: line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
]
