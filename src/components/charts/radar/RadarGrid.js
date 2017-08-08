/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { positionFromAngle } from '../../../lib/arcUtils'
import RadialGridLabels from './RadarGridLabels'
import RadarGridLevels from './RadarGridLevels'

export default class RadarGrid extends Component {
    static propTypes = {
        facets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
        radius: PropTypes.number.isRequired,
        angleStep: PropTypes.number.isRequired,

        labelOffset: PropTypes.number.isRequired,

        theme: PropTypes.object.isRequired,

        // motion
        ...motionPropTypes,
    }

    render() {
        const {
            facets,
            levels,
            shape,
            radius,
            angleStep,
            labelOffset,

            theme,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const radii = range(levels).map(i => radius / levels * (i + 1)).reverse()
        const angles = range(facets.length).map(i => i * angleStep - Math.PI / 2)

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <g>
                {angles.map((angle, i) => {
                    const position = positionFromAngle(angle, radius)
                    return (
                        <line
                            key={`axis.${i}`}
                            x1={0}
                            y1={0}
                            x2={position.x}
                            y2={position.y}
                            {...theme.grid}
                        />
                    )
                })}
                <RadarGridLevels
                    shape={shape}
                    radii={radii}
                    angleStep={angleStep}
                    dataLength={facets.length}
                    theme={theme}
                    {...motionProps}
                />
                <RadialGridLabels
                    radius={radius}
                    angles={angles}
                    facets={facets}
                    labelOffset={labelOffset}
                    theme={theme}
                    {...motionProps}
                />
            </g>
        )
    }
}
