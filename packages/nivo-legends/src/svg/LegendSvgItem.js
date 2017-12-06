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
import {
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
} from '../constants'

class LegendSvgItem extends Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        symbolSize: PropTypes.number.isRequired,
        symbolSpacing: PropTypes.number.isRequired,

        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fill: PropTypes.string.isRequired,

        direction: PropTypes.oneOf([
            DIRECTION_LEFT_TO_RIGHT,
            DIRECTION_RIGHT_TO_LEFT,
            DIRECTION_TOP_TO_BOTTOM,
            DIRECTION_BOTTOM_TO_TOP,
        ]).isRequired,
        justify: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        direction: DIRECTION_LEFT_TO_RIGHT,
        justify: false,
        symbolSize: 16,
        symbolSpacing: 6,
    }

    render() {
        const {
            x,
            y,
            width,
            height,
            symbolSize,
            symbolSpacing,
            label,
            fill,
            direction,
            justify,
        } = this.props

        let symbolX
        let symbolY

        let labelX
        let labelY
        let labelAnchor
        let labelAlignment

        switch (direction) {
            case DIRECTION_LEFT_TO_RIGHT:
                symbolX = 0
                symbolY = (height - symbolSize) / 2

                labelY = height / 2
                labelAlignment = 'middle'
                if (justify === true) {
                    labelX = width
                    labelAnchor = 'end'
                } else {
                    labelX = symbolSize + symbolSpacing
                    labelAnchor = 'start'
                }
                break

            case DIRECTION_RIGHT_TO_LEFT:
                symbolX = width - symbolSize
                symbolY = (height - symbolSize) / 2

                labelY = height / 2
                labelAlignment = 'middle'
                if (justify === true) {
                    labelX = 0
                    labelAnchor = 'start'
                } else {
                    labelX = width - symbolSize - symbolSpacing
                    labelAnchor = 'end'
                }
                break

            case DIRECTION_TOP_TO_BOTTOM:
                symbolX = (width - symbolSize) / 2
                symbolY = 0

                labelX = width / 2

                labelAnchor = 'middle'
                if (justify === true) {
                    labelY = height
                    labelAlignment = 'baseline'
                } else {
                    labelY = symbolSize + symbolSpacing
                    labelAlignment = 'hanging'
                }
                break

            case DIRECTION_BOTTOM_TO_TOP:
                symbolX = (width - symbolSize) / 2
                symbolY = height - symbolSize

                labelX = width / 2
                labelAnchor = 'middle'
                if (justify === true) {
                    labelY = 0
                    labelAlignment = 'hanging'
                } else {
                    labelY = height - symbolSize - symbolSpacing
                    labelAlignment = 'baseline'
                }
                break
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <rect
                    x={symbolX}
                    y={symbolY}
                    fill="violet"
                    width={symbolSize}
                    height={symbolSize}
                />
                <text
                    textAnchor={labelAnchor}
                    style={{ fill: 'black', alignmentBaseline: labelAlignment }}
                    x={labelX}
                    y={labelY}
                >
                    {label}
                </text>
            </g>
        )
    }
}

export default LegendSvgItem
