/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import GridLines from './GridLines'
import { computeGridLines } from '../compute'
import { motionPropTypes, defaultMotionDamping, defaultMotionStiffness } from '@nivo/core'

const Grid = ({
    width,
    height,
    xScale,
    yScale,
    theme,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const xLines = xScale
        ? computeGridLines({
              width,
              height,
              scale: xScale,
              axis: 'x',
          })
        : false

    const yLines = yScale
        ? computeGridLines({
              width,
              height,
              scale: yScale,
              axis: 'y',
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

Grid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    xScale: PropTypes.func,
    yScale: PropTypes.func,

    theme: PropTypes.object.isRequired,

    // motion
    ...motionPropTypes,
}

Grid.defaultProps = {
    // motion
    animate: true,
    motionStiffness: defaultMotionStiffness,
    motionDamping: defaultMotionDamping,
}

export default pure(Grid)
