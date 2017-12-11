/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { area } from 'd3-shape'
import { curveFromProp } from '@nivo/core'

const LinesAreas = ({ generator, children: render }) => render(generator)

LinesAreas.defaultProps = {
    curve: 'linear',
}

const enhance = compose(
    defaultProps({
        curve: 'linear',
    }),
    withPropsOnChange(['curve', 'height'], ({ curve, height }) => ({
        generator: area()
            .defined(d => d && d.x !== null && d.y !== null)
            .x(d => d.x)
            .y0(height)
            .y1(d => d.y)
            .curve(curveFromProp(curve)),
    }))
)

export default enhance(LinesAreas)
