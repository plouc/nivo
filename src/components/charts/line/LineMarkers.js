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
import { motion as motionPropTypes } from '../../../PropTypes'

export default class LineMarkers extends Component {
    static propTypes = {
        lines: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
            })
        ),
        size: PropTypes.number.isRequired,
        color: PropTypes.func.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.func.isRequired,
        ...motionPropTypes,
    }

    static defaultProps = {
        animate: true,
        motionStiffness: 90,
        motionDamping: 15,
    }

    render() {
        const {
            lines,
            size,
            color,
            borderWidth,
            borderColor,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const points = lines.reduce((acc, line) => {
            const { id, points } = line

            return [
                ...acc,
                ...points.map(point => ({
                    key: `${id}.${point.x}`,
                    x: point.x,
                    y: point.y,
                    fill: color(line),
                    stroke: borderColor(line),
                })),
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
