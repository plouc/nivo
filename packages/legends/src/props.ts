/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { MouseEvent } from 'react'
import { LegendSymbolShape } from './svg/symbols'

export type LegendDirection = 'row' | 'column'

export type LegendAnchor =
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left'
    | 'center'

export type LegendItemDirection =
    | 'left-to-right'
    | 'right-to-left'
    | 'top-to-bottom'
    | 'bottom-to-top'

export interface LegendEffect {
    on: 'hover'
    style: {
        itemTextColor?: string
        itemBackground?: string
        itemOpacity?: number
        symbolSize?: number
        symbolBorderWidth?: number
        symbolBorderColor?: string
    }
}

export interface LegendDatum {
    id: string | number
    label: string | number
    color: string
    fill?: string
}

export type LegendMouseEventHandler = (data: LegendDatum, event: MouseEvent) => void

export type LegendPadding =
    | number
    | {
          top?: number
          right?: number
          bottom?: number
          left?: number
      }

export interface LegendProp {
    data?: LegendDatum[]
    anchor: LegendAnchor
    translateX?: number
    translateY?: number
    direction: LegendDirection
    itemsSpacing?: number
    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemTextColor?: string
    itemBackground?: string
    itemOpacity?: number
    symbolShape?: LegendSymbolShape
    symbolSize?: number
    symbolSpacing?: number
    symbolBorderWidth?: number
    symbolBorderColor?: string
    onClick?: LegendMouseEventHandler
    onMouseEnter?: LegendMouseEventHandler
    onMouseLeave?: LegendMouseEventHandler
    effects?: LegendEffect[]
}
