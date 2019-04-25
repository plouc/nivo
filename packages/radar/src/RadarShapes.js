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
import { useMotionConfig, SmartMotion, useTheme, blendModePropType } from '@nivo/core'
import { useInheritedColor, inheritedColorPropType } from '@nivo/colors'
import { lineRadial } from 'd3-shape'

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
        const { animate, springConfig } = useMotionConfig()
        const getBorderColor = useInheritedColor(borderColor, theme)
        const lineGenerator = useMemo(() => {
            return lineRadial()
                .radius(d => radiusScale(d))
                .angle((d, i) => i * angleStep)
                .curve(curveInterpolator)
        }, [radiusScale, angleStep, curveInterpolator])

        if (animate !== true) {
            return (
                <g>
                    {keys.map(key => {
                        return (
                            <path
                                key={key}
                                d={lineGenerator(data.map(d => d[key]))}
                                fill={colorByKey[key]}
                                fillOpacity={fillOpacity}
                                stroke={getBorderColor({ key, color: colorByKey[key] })}
                                strokeWidth={borderWidth}
                                style={{ mixBlendMode: blendMode }}
                            />
                        )
                    })}
                </g>
            )
        }

        return (
            <g>
                {keys.map(key => {
                    return (
                        <SmartMotion
                            key={key}
                            style={spring => ({
                                d: spring(lineGenerator(data.map(d => d[key])), springConfig),
                                fill: spring(colorByKey[key], springConfig),
                                stroke: spring(
                                    getBorderColor({ key, color: colorByKey[key] }),
                                    springConfig
                                ),
                            })}
                        >
                            {style => (
                                <path
                                    fillOpacity={fillOpacity}
                                    strokeWidth={borderWidth}
                                    style={{ mixBlendMode: blendMode }}
                                    {...style}
                                />
                            )}
                        </SmartMotion>
                    )
                })}
            </g>
        )
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
