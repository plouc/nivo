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
import { computeDimensions } from '../compute'
import {
    DIRECTION_COLUMN,
    DIRECTION_ROW,
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
} from '../constants'
import { legendEffectsProp } from '../props'

const LegendSvg = ({
    data,

    // position/layout
    x,
    y,
    direction,
    padding: _padding,
    justify,

    // items
    itemWidth,
    itemHeight,
    itemDirection,
    itemsSpacing,
    symbolSize,
    symbolSpacing,
    symbolShape,
    symbolBorderWidth,
    symbolBorderColor,
    background,
    textColor,
    opacity,

    effects,

    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { width, height, padding } = computeDimensions({
        itemCount: data.length,
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding: _padding,
    })

    let xStep = 0
    let yStep = 0
    if (direction === DIRECTION_ROW) {
        xStep = itemWidth + itemsSpacing
    } else if (direction === DIRECTION_COLUMN) {
        yStep = itemHeight + itemsSpacing
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {data.map((data, i) => (
                <LegendSvgItem
                    key={i}
                    data={data}
                    x={i * xStep + padding.left}
                    y={i * yStep + padding.top}
                    width={itemWidth}
                    height={itemHeight}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    symbolShape={symbolShape}
                    symbolBorderWidth={symbolBorderWidth}
                    symbolBorderColor={symbolBorderColor}
                    direction={itemDirection}
                    justify={justify}
                    label={data.label}
                    fill={data.fill}
                    background={background}
                    opacity={opacity}
                    textColor={textColor}
                    effects={effects}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            ))}
        </g>
    )
}

LegendSvg.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired,
            fill: PropTypes.string,
        })
    ).isRequired,

    // position/layout
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([DIRECTION_COLUMN, DIRECTION_ROW]).isRequired,
    padding: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
    ]).isRequired,
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
    symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    symbolBorderWidth: PropTypes.number,
    symbolBorderColor: PropTypes.string,
    background: PropTypes.string,
    textColor: PropTypes.string,
    opacity: PropTypes.number,

    effects: legendEffectsProp.isRequired,

    // interactivity
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

LegendSvg.defaultProps = {
    // position/layout
    padding: 0,
    justify: false,

    // items
    itemDirection: DIRECTION_LEFT_TO_RIGHT,
    itemsSpacing: 0,
    textColor: 'black',

    effects: [],
}

export default LegendSvg
