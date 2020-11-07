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
import { midAngle, positionFromAngle, radiansToDegrees, labelsThemePropType } from '@nivo/core'

const sliceStyle = {
    pointerEvents: 'none',
}

export default class SunburstLabels extends Component {
    static propTypes = {
        nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        label: PropTypes.func.isRequired,
        skipAngle: PropTypes.number.isRequired,
        textColor: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            labels: labelsThemePropType.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        skipAngle: 0,
    }

    render() {
        const { nodes, label, skipAngle, textColor, theme } = this.props

        let centerRadius = false

        return (
            <Fragment>
                {nodes
                    .filter(node => node.depth === 1)
                    .map(node => {
                        if (!centerRadius) {
                            const innerRadius = Math.sqrt(node.y0)
                            const outerRadius = Math.sqrt(node.y1)
                            centerRadius = innerRadius + (outerRadius - innerRadius) / 2
                        }

                        const startAngle = node.x0
                        const endAngle = node.x1
                        const angle = Math.abs(endAngle - startAngle)
                        const angleDeg = radiansToDegrees(angle)

                        if (angleDeg <= skipAngle) return null

                        const middleAngle = midAngle({ startAngle, endAngle }) - Math.PI / 2
                        const position = positionFromAngle(middleAngle, centerRadius)

                        return (
                            <g
                                key={node.data.id}
                                transform={`translate(${position.x}, ${position.y})`}
                                style={sliceStyle}
                            >
                                <text
                                    textAnchor="middle"
                                    style={{
                                        ...theme.labels.text,
                                        fill: textColor(node.data, theme),
                                    }}
                                >
                                    {label(node.data)}
                                </text>
                            </g>
                        )
                    })}
            </Fragment>
        )
    }
}
