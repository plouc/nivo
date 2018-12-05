/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { CSSProperties } from 'react'

export interface AxisDomainTheme {
    line: Partial<CSSProperties>
}

export interface AxisTicksTheme {
    line: Partial<CSSProperties>
    text: Partial<CSSProperties>
}

export interface AxisLegendTheme {
    text: Partial<CSSProperties>
}

export interface AxisTheme {
    domain: AxisDomainTheme
    ticks: AxisTicksTheme
    legend: AxisLegendTheme
}

export interface GridTheme {
    line: Partial<CSSProperties>
}

export interface LegendsTheme {
    text: Partial<CSSProperties>
}

export interface LabelsTheme {
    text: Partial<CSSProperties>
}

export interface MarkersTheme {
    lineColor: string
    lineStrokeWidth: number
    textColor: string
    fontSize: string | 0
}

export interface DotsTheme {
    text: Partial<CSSProperties>
}

export interface TooltipTheme {
    container: Partial<CSSProperties>
    basic: Partial<CSSProperties>
    table: Partial<CSSProperties>
    tableCell: Partial<CSSProperties>
}

export interface Theme {
    background: string
    axis: AxisTheme
    grid: GridTheme
    legends: LegendsTheme
    labels: LabelsTheme
    markers: MarkersTheme
    dots: DotsTheme
    tooltip: TooltipTheme
}

export interface PartialTheme {
    background?: string
    axis?: {
        domain?: Partial<AxisDomainTheme>
        ticks?: Partial<AxisTicksTheme>
        legend?: Partial<AxisLegendTheme>
    }
    grid?: Partial<GridTheme>
    legends?: Partial<LegendsTheme>
    labels?: Partial<LabelsTheme>
    markers?: Partial<MarkersTheme>
    dots?: Partial<DotsTheme>
    tooltip?: Partial<TooltipTheme>
}

export * from './propTypes'
export * from './defaultTheme'
