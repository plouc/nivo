/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Theme } from '@nivo/core'
import { LegendSvgItem } from './LegendSvgItem'
import {
    datumPropType,
    symbolPropTypes,
    interactivityPropTypes,
    Direction,
    LegendDirection,
    LegendItemDirection,
    LegendDatum,
    LegendEffect,
    LegendSymbolShapeProp,
    LegendMouseHandler,
} from '../props'
import { computeDimensions } from '../compute'

export interface LegendSvgProps {
    data: LegendDatum[]
    x: number
    y: number
    direction: LegendDirection
    padding?:
        | number
        | {
              top?: number
              right?: number
              bottom?: number
              left?: number
          }
    justify?: boolean
    effects?: LegendEffect[]
    itemsSpacing?: number
    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemTextColor?: string
    itemBackground?: string
    itemOpacity?: number
    symbolShape?: LegendSymbolShapeProp
    symbolSize?: number
    symbolSpacing?: number
    symbolBorderWidth?: number
    symbolBorderColor?: string
    onClick?: LegendMouseHandler
    onMouseEnter?: LegendMouseHandler
    onMouseLeave?: LegendMouseHandler
    theme: Theme
}

export const LegendSvg: React.SFC<LegendSvgProps> = ({
    data,
    x,
    y,
    direction,
    padding: _padding = 0,
    justify = false,
    effects,
    itemWidth,
    itemHeight,
    itemDirection = Direction.LeftToRight,
    itemsSpacing = 0,
    itemTextColor = '#000000',
    itemBackground = 'transparent',
    itemOpacity = 1,
    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,
    onClick,
    onMouseEnter,
    onMouseLeave,
    theme,
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
    if (direction === Direction.Row) {
        xStep = itemWidth + itemsSpacing
    } else if (direction === Direction.Column) {
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
                    direction={itemDirection as LegendItemDirection}
                    justify={justify}
                    effects={effects}
                    textColor={itemTextColor}
                    background={itemBackground}
                    opacity={itemOpacity}
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
            ))}
        </g>
    )
}

LegendSvg.propTypes = {
    data: PropTypes.arrayOf(datumPropType).isRequired as React.Requireable<LegendDatum[]>,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([Direction.Row, Direction.Column]).isRequired as React.Requireable<
        LegendDirection
    >,
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
    effects: PropTypes.arrayOf(PropTypes.object) as React.Validator<LegendEffect[]>,
    itemsSpacing: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        Direction.LeftToRight,
        Direction.RightToLeft,
        Direction.TopToBottom,
        Direction.BottomToTop,
    ]).isRequired as React.Requireable<LegendItemDirection>,
    itemTextColor: PropTypes.string.isRequired,
    itemBackground: PropTypes.string.isRequired,
    itemOpacity: PropTypes.number.isRequired,
    ...symbolPropTypes,
    ...interactivityPropTypes,
    theme: PropTypes.object.isRequired as React.Requireable<Theme>,
}
