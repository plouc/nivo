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

// The datum plus custom properties used to compute the waffle layout
export interface EnhancedWaffleDatum extends WaffleDatum {
    groupIndex: number
    // Position of the starting cell
    startAt: number
    // Position of the ending cell
    endAt: number
    color: string
    // fill might be populated depending on `defs` and `fill`,
    // used for patterns and gradients
    fill?: string
}

// used for cells without data, considered empty
export interface WaffleEmptyCell {
    position: number
    row: number
    column: number
    x: number
    y: number
    color: string
}

// used for cells having data
export interface WaffleDataCell extends WaffleEmptyCell {
    data: EnhancedWaffleDatum
    groupIndex: number
}

export type WaffleCell = WaffleEmptyCell | WaffleDataCell

export const isWaffleDataCell = <Datum extends WaffleDatum>(
    cell: WaffleCell
): cell is WaffleDataCell => 'data' in cell

export type WaffleCellMouseHandler = (cell: WaffleCell, event: MouseEvent) => void

export interface WaffleCellProps<Datum extends WaffleDatum> {
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

export type WaffleCellComponent<Datum extends WaffleDatum> = FunctionComponent<
    WaffleCellProps<Datum>
>

export type WaffleFillDirection = 'top' | 'right' | 'bottom' | 'left'

export interface BaseWaffleProps<Datum extends WaffleDatum>
    extends ComponentProps<typeof Container> {
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    data: Datum[]
    total: number
    rows: number
    columns: number
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<Datum>
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
