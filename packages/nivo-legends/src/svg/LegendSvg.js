/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import LegendSvgItem from './LegendSvgItem'
import {
    DIRECTION_COLUMN,
    DIRECTION_ROW,
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
} from '../constants'

const LegendSvg = ({
    data,

    // position/layout
    x,
    y,
    width,
    height,
    direction,
    justify,

    // items
    itemWidth,
    itemHeight,
    itemDirection,
    itemsSpacing,
    symbolSize,
    symbolSpacing,
}) => {
    let xStep = 0
    let yStep = 0
    if (direction === DIRECTION_ROW) {
        xStep = itemWidth
    } else if (direction === DIRECTION_COLUMN) {
        yStep = itemHeight
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <rect fill="white" stroke="black" width={width} height={height} />
            {data.map((d, i) => (
                <LegendSvgItem
                    key={i}
                    x={i * xStep}
                    y={i * yStep}
                    width={itemWidth}
                    height={itemHeight}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    direction={itemDirection}
                    justify={justify}
                    label={d}
                />
            ))}
        </g>
    )
}

LegendSvg.propTypes = {
    data: PropTypes.array.isRequired,

    // position/layout
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([DIRECTION_COLUMN, DIRECTION_ROW]).isRequired,
    justify: PropTypes.bool.isRequired,

    // items
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        DIRECTION_LEFT_TO_RIGHT,
        DIRECTION_RIGHT_TO_LEFT,
        DIRECTION_TOP_TO_BOTTOM,
        DIRECTION_BOTTOM_TO_TOP,
    ]).isRequired,
    itemsSpacing: PropTypes.number.isRequired,
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
}

LegendSvg.defaultProps = {
    // position/layout
    direction: DIRECTION_COLUMN,
    justify: false,

    // items
    itemDirection: DIRECTION_LEFT_TO_RIGHT,
    itemsSpacing: 0,
}

export default LegendSvg
