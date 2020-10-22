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
import { useSpring, animated } from 'react-spring'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'

export const Part = ({ part, areaGenerator, borderGenerator }) => {
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedAreaPath = useAnimatedPath(areaGenerator(part.areaPoints))
    const animatedBorderPath = useAnimatedPath(borderGenerator(part.borderPoints))
    const animatedProps = useSpring({
        areaColor: part.color,
        borderWidth: part.borderWidth,
        borderColor: part.borderColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <>
            {part.borderWidth > 0 && (
                <animated.path
                    d={animatedBorderPath}
                    stroke={animatedProps.borderColor}
                    strokeWidth={animatedProps.borderWidth}
                    strokeOpacity={part.borderOpacity}
                    fill="none"
                />
            )}
            <animated.path
                d={animatedAreaPath}
                fill={animatedProps.areaColor}
                fillOpacity={part.fillOpacity}
                onMouseEnter={part.onMouseEnter}
                onMouseLeave={part.onMouseLeave}
                onMouseMove={part.onMouseMove}
                onClick={part.onClick}
            />
        </>
    )
}

Part.propTypes = {
    part: PropTypes.shape({
        areaPoints: PropTypes.array.isRequired,
        borderPoints: PropTypes.array.isRequired,
        color: PropTypes.string.isRequired,
        fillOpacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        borderOpacity: PropTypes.number.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseMove: PropTypes.func,
        onClick: PropTypes.func,
    }).isRequired,
    areaGenerator: PropTypes.func.isRequired,
    borderGenerator: PropTypes.func.isRequired,
}
