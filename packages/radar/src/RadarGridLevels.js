/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { lineRadial, curveLinearClosed } from 'd3-shape'
import { animated, useSpring, to } from 'react-spring'
import { useTheme, useAnimatedPath, useMotionConfig } from '@nivo/core'

const RadarGridLevelCircular = memo(({ radius }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        radius,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            fill="none"
            r={to(animatedProps.radius, value => Math.max(value, 0))}
            {...theme.grid.line}
        />
    )
})

RadarGridLevelCircular.displayName = 'RadarGridLevelCircular'
RadarGridLevelCircular.propTypes = {
    radius: PropTypes.number.isRequired,
}

const RadarGridLevelLinear = memo(({ radius, angleStep, dataLength }) => {
    const theme = useTheme()

    const radarLineGenerator = useMemo(
        () =>
            lineRadial()
                .angle(i => i * angleStep)
                .radius(radius)
                .curve(curveLinearClosed),
        [angleStep, radius]
    )

    const points = Array.from({ length: dataLength }, (_, i) => i)
    const animatedPath = useAnimatedPath(radarLineGenerator(points))

    return <animated.path fill="none" d={animatedPath} {...theme.grid.line} />
})

RadarGridLevelLinear.displayName = 'RadarGridLevelLinear'
RadarGridLevelLinear.propTypes = {
    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired,
}

const RadarGridLevels = memo(({ shape, ...props }) => {
    return shape === 'circular' ? (
        <RadarGridLevelCircular radius={props.radius} />
    ) : (
        <RadarGridLevelLinear {...props} />
    )
})

RadarGridLevels.displayName = 'RadarGridLevels'
RadarGridLevels.propTypes = {
    shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired,
}

export default RadarGridLevels
