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
import { defaultMotionDamping, defaultMotionStiffness } from '../../defaults'
import GridLines from './GridLines'
import { motionPropTypes } from '../../props'

const center = scale => {
    let offset = scale.bandwidth() / 2
    if (scale.round()) offset = Math.round(offset)

    return d => scale(d) + offset
}

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
    let xLines
    if (xScale) {
        let xValues
        if (xScale.ticks) {
            xValues = xScale.ticks()
        } else {
            xValues = xScale.domain()
        }

        const xPosition = xScale.bandwidth ? center(xScale) : xScale

        xLines = xValues.map(v => {
            return {
                key: `${v}`,
                x1: xPosition(v),
                x2: xPosition(v),
                y2: height,
            }
        })
    }

    let yLines
    if (yScale) {
        let yValues
        if (yScale.ticks) {
            yValues = yScale.ticks()
        } else {
            yValues = yScale.domain()
        }

        const yPosition = yScale.bandwidth ? center(yScale) : yScale

        yLines = yValues.map(v => ({
            key: `${v}`,
            x2: width,
            y1: yPosition(v),
            y2: yPosition(v),
        }))
    }

    return (
        <g>
            {xLines &&
                <GridLines
                    type="x"
                    lines={xLines}
                    theme={theme}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />}
            {yLines &&
                <GridLines
                    type="y"
                    lines={yLines}
                    theme={theme}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />}
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
