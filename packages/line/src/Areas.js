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
import { useSprings, animated } from 'react-spring'
import { useMotionConfig, blendModePropType } from '@nivo/core'

const Areas = ({ areaGenerator, areaOpacity, areaBlendMode, lines }) => {
    const { animate, config: springConfig } = useMotionConfig()

    const computedLines = lines.slice(0).reverse()

    const springs = useSprings(
        computedLines.length,
        computedLines.map(line => {
            return {
                path: areaGenerator(line.data.map(d => d.position)),
                color: line.color,
                config: springConfig,
                immediate: !animate,
            }
        })
    )

    return (
        <g>
            {springs.map((animatedProps, index) => {
                const line = computedLines[index]

                return (
                    <animated.path
                        key={line.id}
                        d={animatedProps.path}
                        fill={line.fill ? line.fill : animatedProps.color}
                        fillOpacity={areaOpacity}
                        strokeWidth={0}
                        style={{
                            mixBlendMode: areaBlendMode,
                        }}
                    />
                )
            })}
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
