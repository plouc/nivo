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
import pure from 'recompose/pure'
import { motionPropTypes, SmartMotion, blendModePropType } from '@nivo/core'

const LineAreas = ({
    areaGenerator,
    areaOpacity,
    areaBlendMode,
    lines,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {lines
                    .slice(0)
                    .reverse()
                    .map(({ id, data, color: areaColor }) => (
                        <path
                            key={id}
                            d={areaGenerator(data.map(d => d.position))}
                            fill={areaColor}
                            fillOpacity={areaOpacity}
                            strokeWidth={0}
                            style={{
                                mixBlendMode: areaBlendMode,
                            }}
                        />
                    ))}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {lines
                .slice(0)
                .reverse()
                .map(({ id, data, color: areaColor }) => (
                    <SmartMotion
                        key={id}
                        style={spring => ({
                            d: spring(areaGenerator(data.map(d => d.position)), springConfig),
                            fill: spring(areaColor, springConfig),
                        })}
                    >
                        {style => (
                            <path
                                key={id}
                                d={style.d}
                                fill={areaColor}
                                fillOpacity={areaOpacity}
                                strokeWidth={0}
                                style={{ mixBlendMode: areaBlendMode }}
                            />
                        )}
                    </SmartMotion>
                ))}
        </g>
    )
}

LineAreas.propTypes = {
    areaOpacity: PropTypes.number.isRequired,
    areaBlendMode: blendModePropType.isRequired,
    ...motionPropTypes,
}

export default pure(LineAreas)
