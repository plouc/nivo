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
import { computeMeshPoints, computeMesh } from '@nivo/voronoi'
import { ScatterPlotDefaultProps } from './props'

export const enhanceCanvas = Component =>
    compose(
        withPropsOnChange(
            ['points', 'width', 'height', 'debugMesh'],
            ({ points, width, height, debugMesh }) => {
                const points2d = computeMeshPoints({ points })

                return computeMesh({ points: points2d, width, height, debug: debugMesh })
            }
        ),
        pure,
        setDisplayName('ScatterPlotCanvas')
    )(Component)
