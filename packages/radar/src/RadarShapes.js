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
import { useSprings, animated } from 'react-spring'
import { lineRadial } from 'd3-shape'
import { useMotionConfig, useTheme, blendModePropType } from '@nivo/core'
import { useInheritedColor, inheritedColorPropType } from '@nivo/colors'

const RadarShapes = memo(
    ({
        data,
        keys,
        colorByKey,
        radiusScale,
        angleStep,
        curveInterpolator,
        borderWidth,
        borderColor,
        fillOpacity,
        blendMode,
    }) => {
        const theme = useTheme()
        const getBorderColor = useInheritedColor(borderColor, theme)

        const lineGenerator = useMemo(() => {
            return lineRadial()
                .radius(d => radiusScale(d))
                .angle((d, i) => i * angleStep)
                .curve(curveInterpolator)
        }, [radiusScale, angleStep, curveInterpolator])

        const { animate, config: springConfig } = useMotionConfig()
        const springs = useSprings(
            keys.length,
            keys.map(key => ({
                path: lineGenerator(data.map(d => d[key])),
                fill: colorByKey[key],
                stroke: getBorderColor({ key, color: colorByKey[key] }),
                config: springConfig,
                immediate: !animate,
            }))
        )

        return springs.map((animatedProps, index) => {
            const key = keys[index]

            return (
                <animated.path
                    key={key}
                    d={animatedProps.path}
                    fill={animatedProps.fill}
                    fillOpacity={fillOpacity}
                    stroke={animatedProps.stroke}
                    strokeWidth={borderWidth}
                    style={{ mixBlendMode: blendMode }}
                />
            )
        })
    }
)

RadarShapes.displayName = 'RadarShapes'
RadarShapes.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    colorByKey: PropTypes.object.isRequired,

    radiusScale: PropTypes.func.isRequired,
    angleStep: PropTypes.number.isRequired,

    curveInterpolator: PropTypes.func.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,

    fillOpacity: PropTypes.number.isRequired,
    blendMode: blendModePropType.isRequired,
}

export default RadarShapes
