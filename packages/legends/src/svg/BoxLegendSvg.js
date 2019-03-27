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
import LegendSvg from './LegendSvg'
import { datumPropType, symbolPropTypes, interactivityPropTypes } from '../props'
import { computeDimensions, computePositionFromAnchor } from '../compute'
import {
    DIRECTION_ROW,
    DIRECTION_COLUMN,
    DIRECTION_BOTTOM_TO_TOP,
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    ANCHOR_TOP_LEFT,
    ANCHOR_CENTER,
} from '../constants'

const BoxLegendSvg = ({
    data,

    containerWidth,
    containerHeight,
    translateX,
    translateY,
    anchor,
    direction,
    padding,
    justify,

    itemsSpacing,
    itemWidth,
    itemHeight,
    itemDirection,
    itemTextColor,
    itemBackground,
    itemOpacity,

    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,

    onClick,
    onMouseEnter,
    onMouseLeave,

    effects,
}) => {
    const { width, height } = computeDimensions({
        itemCount: data.length,
        itemsSpacing,
        itemWidth,
        itemHeight,
        direction,
        padding,
    })

    const { x, y } = computePositionFromAnchor({
        anchor,
        translateX,
        translateY,
        containerWidth,
        containerHeight,
        width,
        height,
    })

    return (
        <LegendSvg
            data={data}
            x={x}
            y={y}
            direction={direction}
            padding={padding}
            justify={justify}
            effects={effects}
            itemsSpacing={itemsSpacing}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            itemDirection={itemDirection}
            itemTextColor={itemTextColor}
            itemBackground={itemBackground}
            itemOpacity={itemOpacity}
            symbolShape={symbolShape}
            symbolSize={symbolSize}
            symbolSpacing={symbolSpacing}
            symbolBorderWidth={symbolBorderWidth}
            symbolBorderColor={symbolBorderColor}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}

BoxLegendSvg.propTypes = {
    data: PropTypes.arrayOf(datumPropType).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    anchor: PropTypes.oneOf([
        ANCHOR_TOP,
        ANCHOR_TOP_RIGHT,
        ANCHOR_RIGHT,
        ANCHOR_BOTTOM_RIGHT,
        ANCHOR_BOTTOM,
        ANCHOR_BOTTOM_LEFT,
        ANCHOR_LEFT,
        ANCHOR_TOP_LEFT,
        ANCHOR_CENTER,
    ]).isRequired,
    direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,
    padding: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
    ]).isRequired,
    justify: PropTypes.bool,

    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        DIRECTION_LEFT_TO_RIGHT,
        DIRECTION_RIGHT_TO_LEFT,
        DIRECTION_TOP_TO_BOTTOM,
        DIRECTION_BOTTOM_TO_TOP,
    ]),
    itemsSpacing: PropTypes.number.isRequired,
    itemTextColor: PropTypes.string,
    itemBackground: PropTypes.string,
    itemOpacity: PropTypes.number,

    ...symbolPropTypes,
    ...interactivityPropTypes,
}

BoxLegendSvg.defaultProps = {
    translateX: 0,
    translateY: 0,
    itemsSpacing: LegendSvg.defaultProps.itemsSpacing,
    padding: LegendSvg.defaultProps.padding,
}

export default BoxLegendSvg
