import { FunctionComponent, AriaAttributes } from 'react'
import { SpringConfig, SpringValues } from '@react-spring/web'
import { Theme, Dimensions, Box, ModernMotionProps, SpringConfigPresetName } from '@nivo/core'
import { AxisProps, CanvasAxisProp, GridValues } from '@nivo/axes'
import { ScaleBand } from '@nivo/scales'
import { InheritedColorConfig } from '@nivo/colors'
import { BarCanvasLayer, RenderBarProps } from '@nivo/bar'

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
    scale: ScaleBand<string>
    ticks: WaffleGridAxisTickX[]
    y1: number
    y2: number
}
export interface WaffleGridAxisDataY {
    scale: ScaleBand<string>
    ticks: WaffleGridAxisTickY[]
    x1: number
    x2: number
}

export type WaffleGridLayerId = 'grid' | 'axes' | 'cells'

export interface WaffleGridCustomLayerProps {
    blankCells: WaffleGridCellData[]
    valueCells: WaffleGridCellData[]
}
export type WaffleGridCustomLayer = FunctionComponent<WaffleGridCustomLayerProps>

export type WaffleGridCommonProps = {
    maxValue: 'auto' | number
    margin: Box
    spacing: number
    cellSpacing: number
    enableBlankCells: boolean

    theme: Theme
    blankCellColor: InheritedColorConfig<Omit<WaffleGridCellData, 'color'>>
    valueCellColor: InheritedColorConfig<Omit<WaffleGridCellData, 'color'>>

    enableGridX: boolean
    enableGridY: boolean

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

export interface WaffleGridCellsMotion {
    config: SpringConfigPresetName | SpringConfig
    staggeredDelay: number
    positionOffsetIn: [number, number]
    randomizePositionOffsetIn: boolean
    positionOffsetOut: [number, number]
    randomizePositionOffsetOut: boolean
}

export type WaffleGridMotionProps = ModernMotionProps & {
    blankCellsMotion: Partial<WaffleGridCellsMotion>
    valueCellsMotion: Partial<WaffleGridCellsMotion>
}

export type WaffleGridSvgProps = Partial<WaffleGridCommonProps> &
    WaffleGridDataProps &
    Dimensions &
    Partial<{
        axisBottom: AxisProps
        axisLeft: AxisProps
        axisRight: AxisProps
        axisTop: AxisProps
    }> &
    Partial<WaffleGridMotionProps>
