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
import { TransitionMotion, spring } from 'react-motion'
import pure from 'recompose/pure'
import { motionPropTypes } from '../../../props'
import { positionFromAngle, radiansToDegrees } from '../../../lib/arcUtils'

const textAnchorFromAngle = _angle => {
    const angle = radiansToDegrees(_angle) + 90
    if (angle <= 10 || angle >= 350 || (angle >= 170 && angle <= 190)) return 'middle'
    if (angle > 180) return 'end'
    return 'start'
}

const RadarGridLabels = ({
    radius,
    angles,
    facets,
    labelOffset,

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

    const labels = facets.map((facet, i) => {
        const position = positionFromAngle(angles[i], radius + labelOffset)
        const textAnchor = textAnchorFromAngle(angles[i])

        return {
            key: `label.${i}`,
            label: facet,
            textAnchor,
            ...position,
        }
    })

    if (animate !== true) {
        return (
            <g>
                {labels.map(label =>
                    <text
                        style={{
                            fill: theme.axis.textColor,
                            fontSize: theme.axis.fontSize,
                        }}
                        dy="0.5em"
                        {...label}
                    >
                        {label.label}
                    </text>
                )}
            </g>
        )
    }

    return (
        <TransitionMotion
            styles={labels.map(label => ({
                key: label.key,
                data: {
                    label: label.label,
                    textAnchor: label.textAnchor,
                },
                style: {
                    x: spring(label.x, springConfig),
                    y: spring(label.y, springConfig),
                },
            }))}
        >
            {interpolatedStyles =>
                <g>
                    {interpolatedStyles.map(({ key, style, data }) =>
                        <text
                            key={key}
                            dy="0.5em"
                            textAnchor={data.textAnchor}
                            style={{
                                fill: theme.axis.textColor,
                                fontSize: theme.axis.fontSize,
                            }}
                            {...style}
                        >
                            {data.label}
                        </text>
                    )}
                </g>}
        </TransitionMotion>
    )
}

RadarGridLabels.propTypes = {
    radius: PropTypes.number.isRequired,
    angles: PropTypes.arrayOf(PropTypes.number).isRequired,

    facets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    labelOffset: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    // motion
    ...motionPropTypes,
}

export default pure(RadarGridLabels)
