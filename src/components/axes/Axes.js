/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Axis from './Axis'

const horizontalPositions = ['top', 'bottom']
const verticalPositions = ['left', 'right']
const positions = [...horizontalPositions, ...verticalPositions]

const axisPropType = PropTypes.shape({
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    format: PropTypes.func,
})

export default class Axes extends Component {
    static propTypes = {
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired,

        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        axes: PropTypes.shape({
            top: axisPropType,
            right: axisPropType,
            bottom: axisPropType,
            left: axisPropType,
        }).isRequired,

        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {}

    render() {
        const {
            xScale,
            yScale,
            width,
            height,
            axes,
            theme,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        return (
            <g>
                {positions.map(position => {
                    if (!axes[position]) return null

                    const axis = axes[position]
                    if (axis.enabled !== undefined && axis.enabled === false) return null

                    const scale = horizontalPositions.includes(position) ? xScale : yScale

                    return (
                        <Axis
                            theme={theme}
                            {...axis}
                            key={position}
                            width={width}
                            height={height}
                            position={position}
                            scale={scale}
                            animate={animate}
                            motionDamping={motionDamping}
                            motionStiffness={motionStiffness}
                        />
                    )
                })}
            </g>
        )
    }
}
