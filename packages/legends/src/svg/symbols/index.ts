/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { FunctionComponent } from 'react'
import { LegendDatum } from '../../props'
import { SymbolCircle } from './SymbolCircle'
import { SymbolDiamond } from './SymbolDiamond'
import { SymbolSquare } from './SymbolSquare'
import { SymbolTriangle } from './SymbolTriangle'

export * from './SymbolCircle'
export * from './SymbolDiamond'
export * from './SymbolSquare'
export * from './SymbolTriangle'

export const symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    square: SymbolSquare,
    triangle: SymbolTriangle,
}

export interface LegendSymbolProps {
    id: LegendDatum['id']
    x: number
    y: number
    size: number
    fill: string
    borderWidth: number
    borderColor: string
}

export type LegendCustomSymbol = FunctionComponent<LegendSymbolProps>

export type LegendSymbolShape = keyof typeof symbolByShape | LegendCustomSymbol
