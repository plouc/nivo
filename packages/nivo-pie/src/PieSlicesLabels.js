/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { midAngle, positionFromAngle } from '@nivo/core'

const sliceStyle = {
    pointerEvents: 'none',
}

export default class PieSlicesLabels extends Component {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        skipAngle: PropTypes.number.isRequired,
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

    static defaultProps = {
        skipAngle: 0,
    }

    render() {
        const { data, label, radius, skipAngle, innerRadius, textColor, theme } = this.props

        const centerRadius = innerRadius + (radius - innerRadius) / 2

        return (
            <Fragment>
                {data.filter(d => skipAngle === 0 || d.angleDeg > skipAngle).map(d => {
                    const angle = midAngle(d) - Math.PI / 2
                    const position = positionFromAngle(angle, centerRadius)

                    return (
                        <g
                            key={d.data.id}
                            transform={`translate(${position.x}, ${position.y})`}
                            style={sliceStyle}
                        >
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
            </Fragment>
        )
    }
}
