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
import { motionPropTypes } from '@nivo/core'
import { SmartMotion } from '@nivo/core'

const LineAreas = ({
    areaGenerator,
    areaOpacity,
    lines,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {lines.map(({ id, color: areaColor, points }) => (
                    <path
                        key={id}
                        d={areaGenerator(points)}
                        fill={areaColor}
                        fillOpacity={areaOpacity}
                        strokeWidth={0}
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
            {lines.map(({ id, color: areaColor, points }) => (
                <SmartMotion
                    key={id}
                    style={spring => ({
                        d: spring(areaGenerator(points), springConfig),
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
                        />
                    )}
                </SmartMotion>
            ))}
        </g>
    )
}

LineAreas.propTypes = {
    areaOpacity: PropTypes.number.isRequired,
    // motion
    ...motionPropTypes,
}

export default pure(LineAreas)
