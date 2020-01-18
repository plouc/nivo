/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ComponentProps, FunctionComponent, MouseEvent } from 'react'
import { InheritedColor, OrdinalColorScale } from '@nivo/colors'
import { Container } from '@nivo/core'

export interface WaffleDatum {
    id: string | number
    label: string | number
    value: number
}

export interface EnhancedWaffleDatum extends WaffleDatum {
    groupIndex: number
    startAt: number
    endAt: number
    color: string
    fill?: string
}

export interface WaffleCell {
    position: number
    row: number
    column: number
    x: number
    y: number
    color: string
}

export interface WaffleDataCell extends WaffleCell {
    data: EnhancedWaffleDatum
    groupIndex: number
}

export const isWaffleDataCell = (cell: WaffleCell | WaffleDataCell): cell is WaffleDataCell =>
    'data' in cell

export type WaffleCellMouseHandler = (cell: WaffleCell | WaffleDataCell, event: MouseEvent) => void

export interface WaffleCellProps {
    position: number
    size: number
    x: number
    y: number
    color: string
    fill?: string
    opacity: number
    borderWidth: number
    borderColor: string
    data?: EnhancedWaffleDatum
    onMouseHover?: WaffleCellMouseHandler
    onMouseLeave?: WaffleCellMouseHandler
    onClick?: WaffleCellMouseHandler
}

export type WaffleCellComponent = FunctionComponent<WaffleCellProps>

export type WaffleFillDirection = 'top' | 'right' | 'bottom' | 'left'

export interface BaseWaffleProps extends ComponentProps<typeof Container> {
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    data: WaffleDatum[]
    total: number
    rows: number
    columns: number
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<WaffleDatum>
    emptyColor?: string
    emptyOpacity: number
    borderWidth?: number
    borderColor?: InheritedColor
    // tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // tooltip: PropTypes.func,
    hiddenIds?: Array<string | number>
    onMouseHover?: WaffleCellMouseHandler
    onMouseLeave?: WaffleCellMouseHandler
    onClick?: WaffleCellMouseHandler
}

export const waffleDefaults = {
    pixelRatio:
        (global as any).window && (global as any).window.devicePixelRatio
            ? ((global as any).window.devicePixelRatio as number)
            : 1,
    fillDirection: 'bottom' as WaffleFillDirection,
    padding: 1,
    colors: { scheme: 'nivo' } as OrdinalColorScale<any>,
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] } as InheritedColor,
    hiddenIds: [],
    legends: [],
    defs: [],
    fill: [],
}
