/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear } from 'd3-scale'
import { Delaunay } from 'd3-delaunay'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withTheme, withDimensions } from '@nivo/core'
import { VoronoiDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(VoronoiDefaultProps),
        withTheme(),
        withDimensions(),
        withPropsOnChange(
            ['xDomain', 'yDomain', 'width', 'height'],
            ({ xDomain, yDomain, width, height }) => ({
                xScale: scaleLinear().domain(xDomain).range([0, width]),
                yScale: scaleLinear().domain(yDomain).range([0, height]),
            })
        ),
        withPropsOnChange(['data', 'xScale', 'yScale'], ({ data, xScale, yScale }) => ({
            scaledPoints: data.map(d => ({
                data: d,
                x: xScale(d.x),
                y: yScale(d.y),
            })),
        })),
        withPropsOnChange(
            ['scaledPoints', 'width', 'height'],
            ({ scaledPoints, width, height }) => {
                const delaunay = Delaunay.from(scaledPoints.map(p => [p.x, p.y]))
                const voronoi = delaunay.voronoi([0, 0, width, height])

                return {
                    delaunay,
                    voronoi,
                }
            }
        ),
        pure
    )(Component)
