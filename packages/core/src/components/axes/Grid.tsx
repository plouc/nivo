/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { defaultMotionDamping, defaultMotionStiffness } from '../../defaults'
import { GridLines } from './GridLines'
import { computeGridLines } from '../../lib/cartesian/axes'
import { motionPropTypes } from '../../props'
import { Theme } from '../../theming'

export interface GridProps {
    width: number
    height: number
    xScale?: any
    yScale?: any
    xValues?: Array<number | string | Date>
    yValues?: Array<number | string | Date>
    theme: Theme
    animate?: boolean
    motionStiffness?: number
    motionDamping?: number
}

const Grid: React.SFC<GridProps> = React.memo(
    ({
        width,
        height,
        xScale,
        yScale,
        xValues,
        yValues,
        theme,
        animate = true,
        motionStiffness = defaultMotionStiffness,
        motionDamping = defaultMotionDamping,
    }) => {
        const xLines = xScale
            ? computeGridLines({
                  width,
                  height,
                  scale: xScale,
                  axis: 'x',
                  values: xValues,
              })
            : false

        const yLines = yScale
            ? computeGridLines({
                  width,
                  height,
                  scale: yScale,
                  axis: 'y',
                  values: yValues,
              })
            : false

        return (
            <g>
                {xLines && (
                    <GridLines
                        type="x"
                        lines={xLines}
                        theme={theme}
                        animate={animate}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                )}
                {yLines && (
                    <GridLines
                        type="y"
                        lines={yLines}
                        theme={theme}
                        animate={animate}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                )}
            </g>
        )
    }
)

export default Grid

Grid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    yValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    theme: PropTypes.object.isRequired as React.Requireable<Theme>,
    ...motionPropTypes,
}
