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
import pure from 'recompose/pure'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import ChordArcTooltip from './ChordArcTooltip'

const ChordArcs = ({
    arcs,
    borderWidth,
    getBorderColor,
    getOpacity,
    shapeGenerator,
    theme,
    setCurrent,
    showTooltip,
    hideTooltip,

    // motion
    animate,
    motionDamping,
    motionStiffness,
}) => {
    const commonProps = arc => {
        const arcTooltip = <ChordArcTooltip arc={arc} theme={theme} />

        return {
            strokeWidth: borderWidth,
            onMouseEnter: e => {
                setCurrent(arc)
                showTooltip(arcTooltip, e)
            },
            onMouseMove: e => {
                showTooltip(arcTooltip, e)
            },
            onMouseLeave: () => {
                setCurrent(null)
                hideTooltip()
            },
        }
    }

    if (animate !== true) {
        return (
            <g>
                {arcs.map(arc => {
                    const opacity = getOpacity(arc)

                    return (
                        <path
                            key={arc.key}
                            d={shapeGenerator(arc)}
                            fill={arc.color}
                            fillOpacity={opacity}
                            stroke={getBorderColor(arc)}
                            strokeOpacity={opacity}
                            {...commonProps(arc)}
                        />
                    )
                })}
            </g>
        )
    }

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
        precision: 0.001,
    }

    return (
        <TransitionMotion
            styles={arcs.map(arc => {
                return {
                    key: arc.key,
                    data: arc,
                    style: {
                        startAngle: spring(arc.startAngle, springConfig),
                        endAngle: spring(arc.endAngle, springConfig),
                        opacity: spring(getOpacity(arc), springConfig),
                        ...colorMotionSpring(arc.color, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style, data: arc }) => {
                        const color = getInterpolatedColor(style)

                        return (
                            <path
                                key={key}
                                d={shapeGenerator({
                                    startAngle: style.startAngle,
                                    endAngle: style.endAngle,
                                })}
                                fill={color}
                                fillOpacity={style.opacity}
                                stroke={getBorderColor({ ...arc, color })}
                                strokeOpacity={style.opacity}
                                {...commonProps(arc)}
                            />
                        )
                    })}
                </g>
            )}
        </TransitionMotion>
    )
}

ChordArcs.propTypes = {
    arcs: PropTypes.array.isRequired,
    shapeGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getOpacity: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(ChordArcs)
