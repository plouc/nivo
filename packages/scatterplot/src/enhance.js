/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { withTheme, withColors, withDimensions, withMotion } from '@nivo/core'
import { computeXYScalesForSeries } from '@nivo/scales'
import { getAccessorOrValue } from '@nivo/core'
import { computeMeshPoints, computeMesh } from '@nivo/voronoi'
import { ScatterPlotDefaultProps } from './props'

const commonEnhancers = [
    defaultProps(ScatterPlotDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['symbolSize'], ({ symbolSize }) => ({
        getSymbolSize: getAccessorOrValue(symbolSize),
    })),
    withPropsOnChange(
        ['data', 'xScale', 'yScale', 'width', 'height'],
        ({ data, xScale, yScale, width, height }) => {
            const computedData = computeXYScalesForSeries(data, xScale, yScale, width, height)
            const points = computedData.series.reduce(
                (agg, serie) => [
                    ...agg,
                    ...serie.data.map((d, i) => ({
                        id: `${serie.id}.${i}`,
                        x: d.position.x,
                        y: d.position.y,
                        data: { ...d.data, serie, id: `${serie.id}.${i}` },
                    })),
                ],
                []
            )

            return {
                computedData,
                points,
            }
        }
    ),
]

export const enhanceSvg = Component =>
    compose(
        ...commonEnhancers,
        pure,
        setDisplayName('ScatterPlot')
    )(Component)

export const enhanceCanvas = Component =>
    compose(
        ...commonEnhancers,
        withPropsOnChange(
            ['points', 'width', 'height', 'debugMesh'],
            ({ points, width, height, debugMesh }) => {
                const points2d = computeMeshPoints({
                    points,
                    xAccessor: 'x',
                    yAccessor: 'y',
                }).points

                return computeMesh({ points: points2d, width, height, debug: debugMesh })
            }
        ),
        pure,
        setDisplayName('ScatterPlotCanvas')
    )(Component)
