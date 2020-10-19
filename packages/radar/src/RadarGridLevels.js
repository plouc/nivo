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
import { useTransition, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

const RadarGridLevels = memo(({ shape, radii, angleStep, dataLength }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()
    let transitions

    const radarLineGenerator = useMemo(
        () =>
            lineRadial()
                .angle(i => i * angleStep)
                .curve(curveLinearClosed),
        [angleStep]
    )

    if (shape === 'circular') {
        transitions = useTransition(radii, (_, i) => `level.${i}`, {
            enter: radius => ({ radius }),
            update: radius => ({ radius }),
            leave: { radius: 0 },
            config: springConfig,
            immediate: !animate,
        })

        return transitions.map(({ props: animatedProps, key }) => (
            <animated.circle
                key={key}
                fill="none"
                r={animatedProps.radius.interpolate(v => Math.max(v, 0))}
                {...theme.grid.line}
            />
        ))
    }

    const points = Array.from({ length: dataLength }, (_, i) => i)

    transitions = useTransition(radii, (_, i) => `level.${i}`, {
        enter: radius => ({ path: radarLineGenerator.radius(radius)(points) }),
        update: radius => ({ path: radarLineGenerator.radius(radius)(points) }),
        leave: { path: radarLineGenerator.radius(0)(points) },
        config: springConfig,
        immediate: !animate,
    })

    return transitions.map(({ props: animatedProps, key }) => (
        <animated.path key={key} fill="none" d={animatedProps.path} {...theme.grid.line} />
    ))
})

RadarGridLevels.displayName = 'RadarGridLevels'
RadarGridLevels.propTypes = {
    shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
    radii: PropTypes.arrayOf(PropTypes.number).isRequired,
    angleStep: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired,
}

export default RadarGridLevels
