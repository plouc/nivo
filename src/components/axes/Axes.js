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
import { motionPropTypes } from '../../props'
import Axis, { axisPropType } from './Axis'

const horizontalPositions = ['top', 'bottom']
const verticalPositions = ['left', 'right']
const positions = [...horizontalPositions, ...verticalPositions]

export default class Axes extends Component {
    static propTypes = {
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired,

        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        top: axisPropType,
        right: axisPropType,
        bottom: axisPropType,
        left: axisPropType,

        theme: PropTypes.object.isRequired,

        // motion
        ...motionPropTypes,
    }

    static defaultProps = {}

    render() {
        const {
            xScale,
            yScale,
            width,
            height,
            top,
            right,
            bottom,
            left,
            theme,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const axes = { top, right, bottom, left }

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
