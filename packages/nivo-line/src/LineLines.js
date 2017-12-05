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

const LineLines = ({
    lines,
    lineGenerator,
    lineWidth,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {lines.map(({ id, color: lineColor, points }) => (
                    <path
                        key={id}
                        d={lineGenerator(points)}
                        fill="none"
                        strokeWidth={lineWidth}
                        stroke={lineColor}
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
            {lines.map(({ id, color: lineColor, points }) => (
                <SmartMotion
                    key={id}
                    style={spring => ({
                        d: spring(lineGenerator(points), springConfig),
                        stroke: spring(lineColor, springConfig),
                    })}
                >
                    {style => (
                        <path
                            key={id}
                            d={style.d}
                            fill="none"
                            strokeWidth={lineWidth}
                            stroke={style.stroke}
                        />
                    )}
                </SmartMotion>
            ))}
        </g>
    )
}

LineLines.propTypes = {
    lineWidth: PropTypes.number.isRequired,
    // motion
    ...motionPropTypes,
}

export default pure(LineLines)
