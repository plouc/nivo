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
import { Direction, Anchor } from '../definitions'

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

    theme,
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
            theme={theme}
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
        Anchor.Top,
        Anchor.TopRight,
        Anchor.Right,
        Anchor.BottomRight,
        Anchor.Bottom,
        Anchor.BottomLeft,
        Anchor.Left,
        Anchor.TopLeft,
        Anchor.Center,
    ]).isRequired,
    direction: PropTypes.oneOf([Direction.Row, Direction.Column]).isRequired,
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
        Direction.LeftToRight,
        Direction.RightToLeft,
        Direction.TopToBottom,
        Direction.BottomToTop,
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
