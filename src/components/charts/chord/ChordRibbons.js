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
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import { midAngle } from '../../../lib/arcUtils'
import TableTooltip from '../../tooltip/TableTooltip'
import Chip from '../../tooltip/Chip'

const ribbonWillEnter = ({ data: ribbon }) => {
    const sourceMidAngle = midAngle(ribbon.source)
    const targetMidAngle = midAngle(ribbon.target)

    return {
        sourceStartAngle: sourceMidAngle,
        sourceEndAngle: sourceMidAngle,
        targetStartAngle: targetMidAngle,
        targetEndAngle: targetMidAngle,
        opacity: 0,
        ...colorMotionSpring(ribbon.source.color),
    }
}

const ribbonWillLeave = springConfig => ({ data: ribbon }) => {
    const sourceMidAngle = midAngle(ribbon.source)
    const targetMidAngle = midAngle(ribbon.target)

    return {
        sourceStartAngle: spring(sourceMidAngle, springConfig),
        sourceEndAngle: spring(sourceMidAngle, springConfig),
        targetStartAngle: spring(targetMidAngle, springConfig),
        targetEndAngle: spring(targetMidAngle, springConfig),
        opacity: 0,
        ...colorMotionSpring(ribbon.source.color, springConfig),
    }
}

const ChordRibbons = ({
    ribbons,
    shapeGenerator,
    ribbonBorderWidth,
    getOpacity,
    theme,
    setCurrent,
    showTooltip,
    hideTooltip,

    // motion
    animate,
    motionDamping,
    motionStiffness,
}) => {
    const commonProps = ribbon => {
        const ribbonTooltip = (
            <TableTooltip
                theme={theme}
                rows={[
                    [
                        <Chip color={ribbon.source.color} />,
                        <strong>
                            {ribbon.source.id}
                        </strong>,
                        ribbon.source.value,
                    ],
                    [
                        <Chip color={ribbon.target.color} />,
                        <strong>
                            {ribbon.target.id}
                        </strong>,
                        ribbon.target.value,
                    ],
                ]}
            />
        )

        return {
            strokeWidth: ribbonBorderWidth,
            onMouseEnter: e => {
                setCurrent(ribbon)
                showTooltip(ribbonTooltip, e)
            },
            onMouseMove: e => {
                showTooltip(ribbonTooltip, e)
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
                {ribbons.map(ribbon => {
                    const opacity = getOpacity(ribbon)

                    return (
                        <path
                            key={ribbon.key}
                            d={shapeGenerator(ribbon)}
                            fill={ribbon.source.color}
                            fillOpacity={opacity}
                            stroke={ribbon.source.color}
                            strokeOpacity={opacity}
                            {...commonProps(ribbon)}
                        />
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
            willEnter={ribbonWillEnter}
            willLeave={ribbonWillLeave(springConfig)}
            styles={ribbons.map(ribbon => {
                return {
                    key: ribbon.key,
                    data: ribbon,
                    style: {
                        sourceStartAngle: spring(ribbon.source.startAngle, springConfig),
                        sourceEndAngle: spring(ribbon.source.endAngle, springConfig),
                        targetStartAngle: spring(ribbon.target.startAngle, springConfig),
                        targetEndAngle: spring(ribbon.target.endAngle, springConfig),
                        opacity: spring(getOpacity(ribbon), springConfig),
                        ...colorMotionSpring(ribbon.source.color, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles =>
                <g>
                    {interpolatedStyles.map(({ key, style, data: ribbon }) => {
                        const color = getInterpolatedColor(style)

                        return (
                            <path
                                key={key}
                                d={shapeGenerator({
                                    source: {
                                        startAngle: style.sourceStartAngle,
                                        endAngle: style.sourceEndAngle,
                                    },
                                    target: {
                                        startAngle: style.targetStartAngle,
                                        endAngle: style.targetEndAngle,
                                    },
                                })}
                                fill={color}
                                fillOpacity={style.opacity}
                                stroke={color}
                                strokeOpacity={style.opacity}
                                {...commonProps(ribbon)}
                            />
                        )
                    })}
                </g>}
        </TransitionMotion>
    )
}

ChordRibbons.propTypes = {
    ribbons: PropTypes.array.isRequired,
    shapeGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getOpacity: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default ChordRibbons
