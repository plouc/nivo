/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import mapValues from 'lodash/mapValues'
import { TransitionMotion, spring } from 'react-motion'
import { blendModePropType, midAngle, useMotionConfig } from '@nivo/core'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import ChordRibbon from './ChordRibbon'

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
    ...interpolateColor(ribbon.source.color),
})

const ribbonWillLeave = springConfig => ({ data: ribbon }) => ({
    ...getRibbonAngles(ribbon, true, springConfig),
    opacity: 0,
    ...interpolateColor(ribbon.source.color, springConfig),
})

const ChordRibbons = memo(
    ({
        ribbons,
        ribbonGenerator,
        borderWidth,
        getBorderColor,
        getOpacity,
        blendMode,
        isInteractive,
        setCurrent,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }) => {
        const { animate, springConfig: _springConfig } = useMotionConfig()

        if (animate !== true) {
            return (
                <g>
                    {ribbons.map(ribbon => {
                        return (
                            <ChordRibbon
                                key={ribbon.id}
                                ribbon={ribbon}
                                ribbonGenerator={ribbonGenerator}
                                sourceStartAngle={ribbon.source.startAngle}
                                sourceEndAngle={ribbon.source.endAngle}
                                targetStartAngle={ribbon.target.startAngle}
                                targetEndAngle={ribbon.target.endAngle}
                                color={ribbon.source.color}
                                blendMode={blendMode}
                                opacity={getOpacity(ribbon)}
                                borderWidth={borderWidth}
                                getBorderColor={getBorderColor}
                                isInteractive={isInteractive}
                                setCurrent={setCurrent}
                                onMouseEnter={onMouseEnter}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                                onClick={onClick}
                                tooltip={tooltip}
                            />
                        )
                    })}
                </g>
            )
        }

        const springConfig = {
            ..._springConfig,
            precision: 0.001,
        }

        return (
            <TransitionMotion
                willEnter={ribbonWillEnter}
                willLeave={ribbonWillLeave(springConfig)}
                styles={ribbons.map(ribbon => {
                    return {
                        key: ribbon.id,
                        data: ribbon,
                        style: {
                            ...getRibbonAngles(ribbon, false, springConfig),
                            opacity: spring(getOpacity(ribbon), springConfig),
                            ...interpolateColor(ribbon.source.color, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data: ribbon }) => {
                            const color = getInterpolatedColor(style)

                            return (
                                <ChordRibbon
                                    key={key}
                                    ribbon={ribbon}
                                    ribbonGenerator={ribbonGenerator}
                                    sourceStartAngle={style.sourceStartAngle}
                                    sourceEndAngle={Math.max(
                                        style.sourceEndAngle,
                                        style.sourceStartAngle
                                    )}
                                    targetStartAngle={style.targetStartAngle}
                                    targetEndAngle={Math.max(
                                        style.targetEndAngle,
                                        style.targetStartAngle
                                    )}
                                    color={color}
                                    blendMode={blendMode}
                                    opacity={style.opacity}
                                    borderWidth={borderWidth}
                                    getBorderColor={getBorderColor}
                                    isInteractive={isInteractive}
                                    setCurrent={setCurrent}
                                    onMouseEnter={onMouseEnter}
                                    onMouseMove={onMouseMove}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                    tooltip={tooltip}
                                />
                            )
                        })}
                    </>
                )}
            </TransitionMotion>
        )
    }
)

ChordRibbons.displayName = 'ChordRibbons'
ChordRibbons.propTypes = {
    ribbons: PropTypes.array.isRequired,
    ribbonGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    getOpacity: PropTypes.func.isRequired,
    blendMode: blendModePropType.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    setCurrent: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default ChordRibbons
