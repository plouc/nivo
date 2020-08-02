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
import { midAngle, getPolarLabelProps, useTheme } from '@nivo/core'
import { useMotionConfig } from '@nivo/core'

const ChordLabels = ({ arcs, radius, rotation, getColor }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    if (animate !== true) {
        return (
            <>
                {arcs.map(arc => {
                    const color = getColor(arc, theme)
                    const angle = midAngle(arc)
                    const textProps = getPolarLabelProps(radius, angle, rotation)

                    return (
                        <text
                            key={arc.id}
                            transform={`translate(${textProps.x}, ${textProps.y}) rotate(${textProps.rotate})`}
                            style={{
                                ...theme.labels.text,
                                pointerEvents: 'none',
                                fill: color,
                            }}
                            textAnchor={textProps.align}
                            dominantBaseline={textProps.baseline}
                        >
                            {arc.label}
                        </text>
                    )
                })}
            </>
        )
    }

    return (
        <TransitionMotion
            styles={arcs.map(arc => {
                const angle = midAngle(arc)

                return {
                    key: arc.id,
                    data: arc,
                    style: {
                        angle: spring(angle, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: arc }) => {
                        const color = getColor(arc, theme)
                        const textProps = getPolarLabelProps(radius, style.angle, rotation)

                        return (
                            <text
                                key={key}
                                transform={`translate(${textProps.x}, ${textProps.y}) rotate(${textProps.rotate})`}
                                style={{
                                    ...theme.labels.text,
                                    pointerEvents: 'none',
                                    fill: color,
                                }}
                                textAnchor={textProps.align}
                                dominantBaseline={textProps.baseline}
                            >
                                {arc.label}
                            </text>
                        )
                    })}
                </>
            )}
        </TransitionMotion>
    )
}

ChordLabels.propTypes = {
    arcs: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired,
}

export default ChordLabels
