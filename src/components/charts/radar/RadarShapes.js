/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range, max, maxBy, sumBy, uniq } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { Motion } from 'react-motion'
import { motionPropTypes, curvePropMapping, closedCurvePropType } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import SmartMotion from '../../SmartMotion'
import { lineRadial } from 'd3-shape'

export default class RadarShapes extends Component {
    static propTypes = {
        // data
        facets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(PropTypes.number).isRequired,
            })
        ).isRequired,

        radiusScale: PropTypes.func.isRequired,

        curve: closedCurvePropType.isRequired,

        // border
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // theming
        fillOpacity: PropTypes.number.isRequired,

        // motion
        ...motionPropTypes,
    }

    render() {
        const {
            facets,
            data,
            radiusScale,

            curve,

            // border
            borderWidth,
            borderColor: _borderColor,

            // theming
            fillOpacity,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const borderColor = getInheritedColorGenerator(_borderColor)

        const angleStep = Math.PI * 2 / facets.length

        const radarLineGenerator = lineRadial()
            .radius(d => radiusScale(d))
            .angle((d, i) => i * angleStep)
            .curve(curvePropMapping[curve])

        if (animate !== true) {
            return (
                <g>
                    {data.map(serie => {
                        const { id, color, data: serieData } = serie

                        return (
                            <g key={id}>
                                <path
                                    d={radarLineGenerator(serieData)}
                                    fill={color}
                                    fillOpacity={fillOpacity}
                                    stroke={borderColor(serie)}
                                    strokeWidth={borderWidth}
                                />
                            </g>
                        )
                    })}
                </g>
            )
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <g>
                {data.map(serie => {
                    const { id, color, data: serieData } = serie

                    return (
                        <SmartMotion
                            key={id}
                            style={spring => ({
                                d: spring(radarLineGenerator(serieData), springConfig),
                                fill: spring(color, springConfig),
                                stroke: spring(borderColor(serie), springConfig),
                            })}
                        >
                            {style =>
                                <path
                                    fillOpacity={fillOpacity}
                                    strokeWidth={borderWidth}
                                    {...style}
                                />}
                        </SmartMotion>
                    )
                })}
            </g>
        )
    }
}
