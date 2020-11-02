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
import { midAngle, positionFromAngle, labelsThemePropType } from '@nivo/core'
import { datumWithArcPropType } from './props'

const sliceStyle = {
    pointerEvents: 'none',
}

export default class PieSliceLabels extends Component {
    static propTypes = {
        dataWithArc: PropTypes.arrayOf(datumWithArcPropType).isRequired,
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
        const { dataWithArc, label, radius, skipAngle, innerRadius, textColor, theme } = this.props

        const centerRadius = innerRadius + (radius - innerRadius) / 2

        return dataWithArc
            .filter(datumWithArc => skipAngle === 0 || datumWithArc.arc.angleDeg > skipAngle)
            .map(datumWithArc => {
                const angle = midAngle(datumWithArc.arc) - Math.PI / 2
                const position = positionFromAngle(angle, centerRadius)

                return (
                    <g
                        key={datumWithArc.id}
                        transform={`translate(${position.x}, ${position.y})`}
                        style={sliceStyle}
                    >
                        <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{
                                ...theme.labels.text,
                                fill: textColor(datumWithArc, theme),
                            }}
                        >
                            {label(datumWithArc)}
                        </text>
                    </g>
                )
            })
    }
}
