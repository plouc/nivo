/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import Nivo                            from '../../Nivo'
import GridLines                       from './GridLines'
import GridLine                        from './GridLine'


const center = scale => {
    let offset = scale.bandwidth() / 2
    if (scale.round()) offset = Math.round(offset)

    return d => scale(d) + offset
}


class Grid extends Component {
    render() {
        const {
            width, height,
            xScale, yScale,
            animate,
            motionStiffness, motionDamping,
        } = this.props

        let xValues
        if (xScale.ticks) {
            xValues = xScale.ticks()
        } else {
            xValues = xScale.domain()
        }

        const xPosition = (xScale.bandwidth ? center(xScale) : xScale)

        let yValues
        if (yScale.ticks) {
            yValues = yScale.ticks()
        } else {
            yValues = yScale.domain()
        }

        const yPosition = (yScale.bandwidth ? center(yScale) : yScale)

        const xLines = xValues.map(v => {
            return {
                key: `${v}`,
                x1:  xPosition(v),
                x2:  xPosition(v),
                y2:  height,
            }
        })

        const yLines = yValues.map(v => {
            return {
                key: `${v}`,
                x2:  width,
                y1:  yPosition(v),
                y2:  yPosition(v),
            }
        })

        return (
            <g className="nivo_grid">
                <GridLines
                    type="x"
                    lines={xLines}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
                <GridLines
                    type="y"
                    lines={yLines}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            </g>
        )
    }
}

Grid.propTypes = {
    width:           PropTypes.number.isRequired,
    height:          PropTypes.number.isRequired,
    xScale:          PropTypes.any.isRequired,
    yScale:          PropTypes.any.isRequired,
    // motion
    animate:         PropTypes.bool.isRequired,
    motionStiffness: PropTypes.number.isRequired,
    motionDamping:   PropTypes.number.isRequired,
}

Grid.defaultProps = {
    // motion
    animate:         true,
    motionStiffness: Nivo.defaults.motionStiffness,
    motionDamping:   Nivo.defaults.motionDamping,
}



export default Grid
