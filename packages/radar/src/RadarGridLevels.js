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
import { lineRadial, curveBasisClosed, curveLinearClosed } from 'd3-shape'
import { animated } from 'react-spring'
import { useTheme, useAnimatedPath } from '@nivo/core'

const RadarGridLevels = memo(({ shape, radius, angleStep, dataLength }) => {
    const theme = useTheme()

    const radarLineGenerator = useMemo(
        () =>
            lineRadial()
                .angle(i => i * angleStep)
                .curve(shape === 'linear' ? curveLinearClosed : curveBasisClosed),
        [angleStep, shape]
    )

    const points = Array.from({ length: dataLength }, (_, i) => i)
    const animatedPath = useAnimatedPath(radarLineGenerator.radius(radius)(points))

    return <animated.path fill="none" d={animatedPath} {...theme.grid.line} />
})

RadarGridLevels.displayName = 'RadarGridLevels'
RadarGridLevels.propTypes = {
    shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired,
}

export default RadarGridLevels
