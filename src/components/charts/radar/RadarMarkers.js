/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { positionFromAngle } from '../../../lib/arcUtils'

export default class RadarMarkers extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(PropTypes.number).isRequired,
            })
        ),
        radiusScale: PropTypes.func.isRequired,
        angleStep: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        ...motionPropTypes,
    }

    static defaultProps = {
        size: 6,
        color: 'inherit',
        borderWidth: 0,
        borderColor: 'inherit',

        animate: true,
        motionStiffness: 90,
        motionDamping: 15,
    }

    render() {
        const {
            data,
            radiusScale,
            angleStep,
            size,
            color,
            borderWidth,
            borderColor,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const fillColor = getInheritedColorGenerator(color)
        const strokeColor = getInheritedColorGenerator(borderColor)

        const points = data.reduce((acc, serie) => {
            const { id, data: serieData } = serie

            return [
                ...acc,
                ...serieData.map((d, i) => {
                    return {
                        key: `${id}.${i}`,
                        fill: fillColor(serie),
                        stroke: strokeColor(serie),
                        ...positionFromAngle(angleStep * i - Math.PI / 2, radiusScale(d)),
                    }
                }),
            ]
        }, [])

        let circles
        if (animate === true) {
            const springConfig = {
                motionDamping,
                motionStiffness,
            }

            circles = (
                <TransitionMotion
                    styles={points.map(point => {
                        return {
                            key: point.key,
                            data: {
                                fill: point.fill,
                                stroke: point.stroke,
                            },
                            style: {
                                x: spring(point.x, springConfig),
                                y: spring(point.y, springConfig),
                                size: spring(size, springConfig),
                            },
                        }
                    })}
                >
                    {interpolatedStyles =>
                        <g>
                            {interpolatedStyles.map(({ key, style, data }) =>
                                <circle
                                    key={key}
                                    cx={style.x}
                                    cy={style.y}
                                    r={style.size / 2}
                                    fill={data.fill}
                                    stroke={data.stroke}
                                    strokeWidth={borderWidth}
                                />
                            )}
                        </g>}
                </TransitionMotion>
            )
        } else {
            circles = points.map(point =>
                <circle
                    key={point.key}
                    cx={point.x}
                    cy={point.y}
                    r={size / 2}
                    fill={point.fill}
                    stroke={point.stroke}
                    strokeWidth={borderWidth}
                />
            )
        }

        return (
            <g>
                {circles}
            </g>
        )
    }
}
