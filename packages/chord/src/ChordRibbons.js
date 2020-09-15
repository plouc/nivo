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
import { blendModePropType, midAngle, useMotionConfig } from '@nivo/core'
import ChordRibbon from './ChordRibbon'
import { interpolate, useTransition } from 'react-spring'

/**
 * Used to get ribbon angles, instead of using source and target arcs,
 * we sort arcs by value to have smooth transitions, otherwise,
 * if source|target arc value becomes greater than the other,
 * the ribbon will be reversed.
 *
 * @param {Object}  source
 * @param {Object}  target
 * @param {boolean} useMiddleAngle
 * @return {Object}
 */
const getRibbonAngles = ({ source, target }, useMiddleAngle) => {
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

    return angles
}

const ChordRibbons = ({
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
    const { animate, config: springConfig } = useMotionConfig()
    const transitions = useTransition(ribbons, ribbon => ribbon.id, {
        initial: ribbon => ({
            ...getRibbonAngles(ribbon, false),
            opacity: getOpacity(ribbon),
            color: ribbon.source.color,
        }),
        from: ribbon => ({
            ...getRibbonAngles(ribbon, true),
            opacity: 0,
            color: ribbon.source.color,
        }),
        enter: ribbon => ({
            ...getRibbonAngles(ribbon, false),
            opacity: getOpacity(ribbon),
            color: ribbon.source.color,
        }),
        update: ribbon => ({
            ...getRibbonAngles(ribbon, false),
            opacity: getOpacity(ribbon),
            color: ribbon.source.color,
        }),
        leave: ribbon => ({
            ...getRibbonAngles(ribbon, true),
            opacity: 0,
            color: ribbon.source.color,
        }),
        unique: true,
        config: springConfig,
        immediate: !animate,
    })

    return transitions.map(({ key, item: ribbon, props }) => {
        const path = interpolate(
            [
                props.sourceStartAngle,
                props.sourceEndAngle,
                props.targetStartAngle,
                props.targetEndAngle,
            ],
            (sourceStartAngle, sourceEndAngle, targetStartAngle, targetEndAngle) =>
                ribbonGenerator({
                    source: {
                        startAngle: sourceStartAngle,
                        endAngle: Math.max(sourceEndAngle, sourceStartAngle),
                    },
                    target: {
                        startAngle: targetStartAngle,
                        endAngle: Math.max(targetEndAngle, targetStartAngle),
                    },
                })
        )

        return (
            <ChordRibbon
                key={key}
                ribbon={ribbon}
                animatedProps={{
                    path,
                    opacity: props.opacity,
                    color: props.color,
                }}
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
    })
}

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

export default memo(ChordRibbons)
