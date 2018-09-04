/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '@nivo/core'
import { lineRadial, curveLinearClosed } from 'd3-shape'

const levelWillEnter = () => ({ r: 0 })

const RadarGridLevels = ({
    shape,
    radii,
    angleStep,
    dataLength,

    theme,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const springConfig = {
        motionDamping,
        motionStiffness,
    }

    const levelsTransitionProps = {
        willEnter: levelWillEnter,
        willLeave: () => ({ r: spring(0, springConfig) }),
        styles: radii.map((r, i) => ({
            key: `level.${i}`,
            style: {
                r: spring(r, springConfig),
            },
        })),
    }

    if (shape === 'circular') {
        if (animate !== true) {
            return (
                <g>
                    {radii.map((r, i) => (
                        <circle key={`level.${i}`} fill="none" r={r} {...theme.grid.line} />
                    ))}
                </g>
            )
        }

        return (
            <TransitionMotion {...levelsTransitionProps}>
                {interpolatedStyles => (
                    <g>
                        {interpolatedStyles.map(({ key, style }) => (
                            <circle key={key} fill="none" r={style.r} {...theme.grid.line} />
                        ))}
                    </g>
                )}
            </TransitionMotion>
        )
    }

    const radarLineGenerator = lineRadial()
        .angle(i => i * angleStep)
        .curve(curveLinearClosed)

    const points = range(dataLength)

    if (animate !== true) {
        return (
            <g>
                {radii.map((radius, i) => (
                    <path
                        key={`level.${i}`}
                        fill="none"
                        d={radarLineGenerator.radius(radius)(points)}
                        {...theme.grid}
                    />
                ))}
            </g>
        )
    }

    return (
        <TransitionMotion {...levelsTransitionProps}>
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style }) => (
                        <path
                            key={key}
                            fill="none"
                            d={radarLineGenerator.radius(style.r)(points)}
                            {...theme.grid}
                        />
                    ))}
                </g>
            )}
        </TransitionMotion>
    )
}

RadarGridLevels.propTypes = {
    shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
    radii: PropTypes.arrayOf(PropTypes.number).isRequired,
    angleStep: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    // motion
    ...motionPropTypes,
}

export default pure(RadarGridLevels)
