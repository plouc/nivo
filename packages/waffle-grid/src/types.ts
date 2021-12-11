import { FunctionComponent, AriaAttributes } from 'react'
import { SpringConfig, SpringValues } from '@react-spring/web'
import { Theme, Dimensions, Box, ModernMotionProps, SpringConfigPresetName } from '@nivo/core'

export interface WaffleGridDataProps {
    data: number[][]
    xRange: string[]
    yRange: string[]
    cellValue: number
}

export interface WaffleGridCellData {
    key: string
    index: number
    x: number
    y: number
    size: number
    hasValue: boolean
    color: string
}

export interface WaffleGridCellProps {
    cell: WaffleGridCellData
    style: SpringValues<{
        x: number
        y: number
        radius: number
        color: string
        opacity: number
    }>
}
export type WaffleGridCellComponent = FunctionComponent<WaffleGridCellProps>

export interface WaffleGridAxisTickX {
    id: string
    x: number
    width: number
}
export interface WaffleGridAxisTickY {
    id: string
    y: number
    height: number
}
export interface WaffleGridAxisDataX {
    ticks: WaffleGridAxisTickX[]
    y: number
}
export interface WaffleGridAxisDataY {
    ticks: WaffleGridAxisTickY[]
    x: number
}

export type WaffleGridLayerId = 'grid' | 'axes' | 'cells'

export interface WaffleGridCustomLayerProps {
    blankCells: WaffleGridCellData[]
    valueCells: WaffleGridCellData[]
}
export type WaffleGridCustomLayer = FunctionComponent<WaffleGridCustomLayerProps>

export type WaffleGridCommonProps = {
    margin: Box
    spacing: number
    enableBlankCells: boolean

    theme: Theme

    layers: (WaffleGridLayerId | WaffleGridCustomLayer)[]
    blankCellComponent: WaffleGridCellComponent
    valueCellComponent: WaffleGridCellComponent

    isInteractive: boolean

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type WaffleGridSvgProps = Partial<WaffleGridCommonProps> &
    WaffleGridDataProps &
    Dimensions &
    ModernMotionProps & {
        blankCellsMotionConfig?: SpringConfigPresetName | SpringConfig
        blankCellsStaggeredDelay?: number
        valueCellsMotionConfig?: SpringConfigPresetName | SpringConfig
        valueCellsStaggeredDelay?: number
    }
