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
import { merge } from 'lodash'
import { Motion, TransitionMotion, spring } from 'react-motion'
import { midAngle, positionFromAngle } from '../../../ArcUtils'

export default class PieSlicesLabels extends Component {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        radius: PropTypes.number.isRequired,
        innerRadius: PropTypes.number.isRequired,
        textColor: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            axis: PropTypes.shape({
                textColor: PropTypes.string.isRequired,
                fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
        }).isRequired,
    }

    static defaultProps = {}

    render() {
        const { data, label, radius, innerRadius, textColor, theme } = this.props

        const centerRadius = innerRadius + (radius - innerRadius) / 2

        return (
            <g>
                {data.map(d => {
                    const angle = midAngle(d) - Math.PI / 2
                    const position = positionFromAngle(angle, centerRadius)

                    return (
                        <g key={d.data.id} transform={`translate(${position.x}, ${position.y})`}>
                            <text
                                textAnchor="middle"
                                style={{
                                    fill: textColor(d.data, theme),
                                    fontSize: theme.axis.fontSize,
                                }}
                            >
                                {label(d.data)}
                            </text>
                        </g>
                    )
                })}
            </g>
        )
    }
}
