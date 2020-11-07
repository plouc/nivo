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
import { useSpring, animated } from 'react-spring'
import { useAnimatedPath, useMotionConfig, blendModePropType } from '@nivo/core'

const AreaPath = ({ areaBlendMode, areaOpacity, color, fill, path }) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedPath = useAnimatedPath(path)
    const animatedProps = useSpring({
        color,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedPath}
            fill={fill ? fill : animatedProps.color}
            fillOpacity={areaOpacity}
            strokeWidth={0}
            style={{
                mixBlendMode: areaBlendMode,
            }}
        />
    )
}

AreaPath.propTypes = {
    areaBlendMode: blendModePropType.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    color: PropTypes.string,
    fill: PropTypes.string,
    path: PropTypes.string.isRequired,
}

const Areas = ({ areaGenerator, areaOpacity, areaBlendMode, lines }) => {
    const computedLines = lines.slice(0).reverse()

    return (
        <g>
            {computedLines.map(line => (
                <AreaPath
                    key={line.id}
                    path={areaGenerator(line.data.map(d => d.position))}
                    {...{ areaOpacity, areaBlendMode, ...line }}
                />
            ))}
        </g>
    )
}

Areas.propTypes = {
    areaGenerator: PropTypes.func.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    areaBlendMode: blendModePropType.isRequired,
    lines: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(Areas)
