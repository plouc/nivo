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
import { midAngle, positionFromAngle, labelsThemePropType } from '@nivo/core'
import { arcPropType } from './props'

const sliceStyle = {
    pointerEvents: 'none',
}

export default class PieSlicesLabels extends Component {
    static propTypes = {
        arcs: PropTypes.arrayOf(arcPropType).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        skipAngle: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        innerRadius: PropTypes.number.isRequired,
        textColor: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            labels: labelsThemePropType.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        skipAngle: 0,
    }

    render() {
        const { arcs, label, radius, skipAngle, innerRadius, textColor, theme } = this.props

        const centerRadius = innerRadius + (radius - innerRadius) / 2

        return (
            <Fragment>
                {arcs
                    .filter(arc => skipAngle === 0 || arc.angleDeg > skipAngle)
                    .map(arc => {
                        const angle = midAngle(arc) - Math.PI / 2
                        const position = positionFromAngle(angle, centerRadius)

                        return (
                            <g
                                key={arc.data.id}
                                transform={`translate(${position.x}, ${position.y})`}
                                style={sliceStyle}
                            >
                                <text
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    style={{
                                        ...theme.labels.text,
                                        fill: textColor(arc.data, theme),
                                    }}
                                >
                                    {label(arc.data)}
                                </text>
                            </g>
                        )
                    })}
            </Fragment>
        )
    }
}
