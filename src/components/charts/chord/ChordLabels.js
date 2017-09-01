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
import { TransitionMotion, spring } from 'react-motion'
import { midAngle, getPolarLabelProps } from '../../../lib/polar'

const ChordLabels = ({
    arcs,
    radius,
    rotation,
    getLabel,
    getColor,
    theme,

    // motion
    animate,
    motionDamping,
    motionStiffness,
}) => {
    if (animate !== true) {
        return (
            <g>
                {arcs.map(arc => {
                    const color = getColor(arc, theme)
                    const angle = midAngle(arc)
                    const props = getPolarLabelProps(radius, angle, rotation)

                    return (
                        <text
                            key={arc.key}
                            transform={`translate(${props.x}, ${props.y}) rotate(${props.rotate})`}
                            style={{ pointerEvents: 'none', fill: color }}
                            textAnchor={props.align}
                            alignmentBaseline={props.baseline}
                        >
                            {getLabel(arc)}
                        </text>
                    )
                })}
            </g>
        )
    }

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return (
        <TransitionMotion
            styles={arcs.map(arc => {
                const angle = midAngle(arc)

                return {
                    key: arc.key,
                    data: arc,
                    style: {
                        angle: spring(angle, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles =>
                <g>
                    {interpolatedStyles.map(({ key, style, data: arc }) => {
                        const color = getColor(arc, theme)
                        const props = getPolarLabelProps(radius, style.angle, rotation)

                        return (
                            <text
                                key={key}
                                transform={`translate(${props.x}, ${props.y}) rotate(${props.rotate})`}
                                style={{ pointerEvents: 'none', fill: color }}
                                textAnchor={props.align}
                                alignmentBaseline={props.baseline}
                            >
                                {getLabel(arc)}
                            </text>
                        )
                    })}
                </g>}
        </TransitionMotion>
    )
}

ChordLabels.propTypes = {
    arcs: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    getLabel: PropTypes.func.isRequired,
    getColor: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

export default ChordLabels
