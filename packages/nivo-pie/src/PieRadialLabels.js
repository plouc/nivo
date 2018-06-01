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
import { line } from 'd3-shape'

const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)

export default class PieRadialLabels extends Component {
    static propTypes = {
        label: PropTypes.func.isRequired,
        skipAngle: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        linkOffset: PropTypes.number.isRequired,
        linkDiagonalLength: PropTypes.number.isRequired,
        linkHorizontalLength: PropTypes.number.isRequired,
        linkStrokeWidth: PropTypes.number.isRequired,
        textXOffset: PropTypes.number.isRequired,
        textColor: PropTypes.func.isRequired,
        linkColor: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            axis: PropTypes.shape({
                tickColor: PropTypes.string.isRequired,
                fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
        }).isRequired,
    }

    static defaultProps = {
        skipAngle: 0,
        linkOffset: 0,
        linkDiagonalLength: 16,
        linkHorizontalLength: 24,
        linkStrokeWidth: 1,
        textXOffset: 6,
    }

    render() {
        const {
            data,
            label,
            radius,
            skipAngle,
            linkOffset,
            linkDiagonalLength,
            linkHorizontalLength,
            linkStrokeWidth,
            textXOffset,
            textColor,
            linkColor,
            theme,
        } = this.props

        return (
            <Fragment>
                {data.filter(d => skipAngle === 0 || d.angleDeg > skipAngle).map(d => {
                    const angle = midAngle(d) - Math.PI / 2
                    const positionA = positionFromAngle(angle, radius + linkOffset)
                    const positionB = positionFromAngle(
                        angle,
                        radius + linkOffset + linkDiagonalLength
                    )
                    let positionC
                    let labelPosition
                    let textAnchor
                    if (angle + Math.PI / 2 < Math.PI) {
                        positionC = { x: positionB.x + linkHorizontalLength, y: positionB.y }
                        labelPosition = {
                            x: positionB.x + linkHorizontalLength + textXOffset,
                            y: positionB.y,
                        }
                        textAnchor = 'start'
                    } else {
                        positionC = { x: positionB.x - linkHorizontalLength, y: positionB.y }
                        labelPosition = {
                            x: positionB.x - linkHorizontalLength - textXOffset,
                            y: positionB.y,
                        }
                        textAnchor = 'end'
                    }

                    return (
                        <Fragment key={d.data.id}>
                            <path
                                d={lineGenerator([positionA, positionB, positionC])}
                                fill="none"
                                style={{ fill: 'none', stroke: linkColor(d, theme) }}
                                strokeWidth={linkStrokeWidth}
                            />
                            <g transform={`translate(${labelPosition.x}, ${labelPosition.y})`}>
                                <text
                                    textAnchor={textAnchor}
                                    dy="0.3em"
                                    style={{
                                        fill: textColor(d.data, theme),
                                        fontSize: theme.axis.fontSize,
                                    }}
                                >
                                    {label(d.data)}
                                </text>
                            </g>
                        </Fragment>
                    )
                })}
            </Fragment>
        )
    }
}
