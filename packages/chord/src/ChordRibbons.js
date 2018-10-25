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
import isFunction from 'lodash/isFunction'
import mapValues from 'lodash/mapValues'
import { TransitionMotion, spring } from 'react-motion'
import { format as d3Format } from 'd3-format'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import {
    colorMotionSpring,
    getInterpolatedColor,
    blendModePropType,
    midAngle,
    TableTooltip,
    Chip,
    motionPropTypes,
} from '@nivo/core'

/**
 * Used to get ribbon angles, instead of using source and target arcs,
 * we sort arcs by value to have smooth transitions, otherwise,
 * if source|target arc value becomes greater than the other,
 * the ribbon will be reversed.
 *
 * @param {Object}  source
 * @param {Object}  target
 * @param {boolean} useMiddleAngle
 * @param {Object}  [springConfig]
 * @return {Object}
 */
const getRibbonAngles = ({ source, target }, useMiddleAngle, springConfig) => {
    let firstArc
    let secondArc
    if (source.startAngle < target.startAngle) {
        firstArc = source
        secondArc = target
    } else {
        firstArc = target
        secondArc = source
    }

    let angles
    if (useMiddleAngle === true) {
        const firstMiddleAngle = midAngle(firstArc)
        const secondMiddleAngle = midAngle(secondArc)

        angles = {
            sourceStartAngle: firstMiddleAngle,
            sourceEndAngle: firstMiddleAngle,
            targetStartAngle: secondMiddleAngle,
            targetEndAngle: secondMiddleAngle,
        }
    } else {
        angles = {
            sourceStartAngle: firstArc.startAngle,
            sourceEndAngle: firstArc.endAngle,
            targetStartAngle: secondArc.startAngle,
            targetEndAngle: secondArc.endAngle,
        }
    }

    if (!springConfig) return angles

    return mapValues(angles, angle => spring(angle, springConfig))
}

const ribbonWillEnter = ({ data: ribbon }) => ({
    ...getRibbonAngles(ribbon, true),
    opacity: 0,
    ...colorMotionSpring(ribbon.source.color),
})

const ribbonWillLeave = springConfig => ({ data: ribbon }) => ({
    ...getRibbonAngles(ribbon, true, springConfig),
    opacity: 0,
    ...colorMotionSpring(ribbon.source.color, springConfig),
})

const ChordRibbons = ({
    ribbons,
    shapeGenerator,
    borderWidth,
    getBorderColor,
    getOpacity,
    blendMode,
    theme,
    tooltipFormat,
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
                        <Chip key="chip" color={ribbon.source.color} />,
                        <strong key="id">{ribbon.source.id}</strong>,
                        tooltipFormat ? tooltipFormat(ribbon.source.value) : ribbon.source.value,
                    ],
                    [
                        <Chip key="chip" color={ribbon.target.color} />,
                        <strong key="id">{ribbon.target.id}</strong>,
                        tooltipFormat ? tooltipFormat(ribbon.target.value) : ribbon.target.value,
                    ],
                ]}
            />
        )

        return {
            strokeWidth: borderWidth,
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
                            stroke={getBorderColor({ ...ribbon, color: ribbon.source.color })}
                            strokeOpacity={opacity}
                            style={{ mixBlendMode: blendMode }}
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
        precision: 0.001,
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
                        ...getRibbonAngles(ribbon, false, springConfig),
                        opacity: spring(getOpacity(ribbon), springConfig),
                        ...colorMotionSpring(ribbon.source.color, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style, data: ribbon }) => {
                        const color = getInterpolatedColor(style)

                        return (
                            <path
                                key={key}
                                d={shapeGenerator({
                                    source: {
                                        startAngle: style.sourceStartAngle,
                                        endAngle: Math.max(
                                            style.sourceEndAngle,
                                            style.sourceStartAngle
                                        ),
                                    },
                                    target: {
                                        startAngle: style.targetStartAngle,
                                        endAngle: Math.max(
                                            style.targetEndAngle,
                                            style.targetStartAngle
                                        ),
                                    },
                                })}
                                fill={color}
                                fillOpacity={style.opacity}
                                stroke={getBorderColor({ ...ribbon, color })}
                                strokeOpacity={style.opacity}
                                style={{ mixBlendMode: blendMode }}
                                {...commonProps(ribbon)}
                            />
                        )
                    })}
                </g>
            )}
        </TransitionMotion>
    )
}

ChordRibbons.propTypes = {
    ribbons: PropTypes.array.isRequired,
    shapeGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    getOpacity: PropTypes.func.isRequired,
    blendMode: blendModePropType.isRequired,
    setCurrent: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    ...motionPropTypes,
}

const enhance = compose(
    withPropsOnChange(['tooltipFormat'], ({ tooltipFormat }) => {
        if (!tooltipFormat || isFunction(tooltipFormat)) return { tooltipFormat }
        return { tooltipFormat: d3Format(tooltipFormat) }
    }),
    pure
)

export default enhance(ChordRibbons)
