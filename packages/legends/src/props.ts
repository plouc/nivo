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

export type LegendPadding = number | Box

export enum LegendSymbolShape {
    Circle = 'circle',
    Diamond = 'diamond',
    Square = 'square',
    Triangle = 'triangle',
}

export type LegendSymbolShapeProp = LegendSymbolShape | any

export interface LegendDatum {
    id: string | number
    label: string | number
    color: string
    fill?: string
}

export interface LegendConfig {
    data?: LegendDatum[]
    anchor: LegendAnchor
    direction: LegendDirection
    justify?: boolean
    padding?: LegendPadding
    translateX?: number
    translateY?: number
    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemsSpacing?: number
    itemBackground?: string
    itemTextColor?: string
    itemOpacity?: number
    symbolSize?: number
    symbolSpacing?: number
    symbolShape?: LegendSymbolShape | any
    textColor?: string
    onClick?: LegendMouseHandler
    onMouseEnter?: LegendMouseHandler
    onMouseLeave?: LegendMouseHandler
    effects?: LegendEffect[]
}

export interface LegendProps {
    data?: Array<{
        id: string | number
        value: number
        color?: string
        fill?: string
    }>
    anchor: LegendAnchor
    direction: LegendDirection
    justify?: boolean
    padding?: LegendPadding
    translateX?: number
    translateY?: number
    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemsSpacing?: number
    itemBackground?: string
    itemTextColor?: string
    itemOpacity?: number
    symbolSize?: number
    symbolSpacing?: number
    symbolShape?: LegendSymbolShape | any
    textColor?: string
    onClick?: LegendMouseHandler
    onMouseEnter?: LegendMouseHandler
    onMouseLeave?: LegendMouseHandler
    effects?: LegendEffect[]
}

export enum LegendAnchor {
    Top = 'top',
    TopRight = 'top-right',
    Right = 'right',
    BottomRight = 'bottom-right',
    Bottom = 'bottom',
    BottomLeft = 'bottom-left',
    Left = 'left',
    TopLeft = 'top-left',
    Center = 'center',
}

export enum LegendDirection {
    Row = 'row',
    Column = 'column',
}

export enum LegendItemDirection {
    LeftToRight = 'left-to-right',
    RightToLeft = 'right-to-left',
    TopToBottom = 'top-to-bottom',
    BottomToTop = 'bottom-to-top',
}

export type Box = Partial<{
    bottom: number
    left: number
    right: number
    top: number
}>

export type LegendMouseHandler = (data: LegendDatum, event: React.MouseEvent<any>) => void

export type LegendEffectStyle = Partial<{
    itemTextColor: string
    itemBackground: string
    itemOpacity: number
    symbolSize: number
    symbolBorderWidth: number
    symbolBorderColor: string
}>

export interface LegendEffect {
    on: 'hover'
    style: LegendEffectStyle
}

export const legendEffectPropType = PropTypes.shape({
    on: PropTypes.oneOfType([PropTypes.oneOf(['hover'])]).isRequired,
    style: PropTypes.shape({
        itemTextColor: PropTypes.string,
        itemBackground: PropTypes.string,
        itemOpacity: PropTypes.number,
        symbolSize: PropTypes.number,
        symbolBorderWidth: PropTypes.number,
        symbolBorderColor: PropTypes.string,
    }).isRequired,
})

export const symbolPropTypes = {
    symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
    symbolBorderWidth: PropTypes.number,
    symbolBorderColor: PropTypes.string,
}

export const interactivityPropTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export const datumPropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
    fill: PropTypes.string,
})

/**
 * The prop type is exported as a simple object instead of `PropTypes.shape`
 * to be able to add extra properties.
 *
 * @example
 * ```javascript
 * import { LegendPropShape } from '@nivo/legends'
 *
 * const customLegendPropType = PropTypes.shape({
 *     ...LegendPropShape,
 *     extra: PropTypes.any.isRequired,
 * })
 * ```
 */
export const LegendPropShape = {
    data: PropTypes.arrayOf(datumPropType),
    anchor: PropTypes.oneOf([
        LegendAnchor.Top,
        LegendAnchor.TopRight,
        LegendAnchor.Right,
        LegendAnchor.BottomRight,
        LegendAnchor.Bottom,
        LegendAnchor.BottomLeft,
        LegendAnchor.Left,
        LegendAnchor.TopLeft,
        LegendAnchor.Center,
    ]).isRequired,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    direction: PropTypes.oneOf([LegendDirection.Row, LegendDirection.Column]).isRequired,
    itemsSpacing: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        LegendItemDirection.LeftToRight,
        LegendItemDirection.RightToLeft,
        LegendItemDirection.TopToBottom,
        LegendItemDirection.BottomToTop,
    ]),
    itemTextColor: PropTypes.string,
    itemBackground: PropTypes.string,
    itemOpacity: PropTypes.number,
    ...symbolPropTypes,
    ...interactivityPropTypes,
    effects: PropTypes.arrayOf(legendEffectPropType),
}
