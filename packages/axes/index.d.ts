import * as React from 'react'
import { Dimensions } from '@nivo/core'
import { Scale } from '@nivo/scales'

declare module '@nivo/axes' {
    export type TickFormatter = (value: number | string | Date) => string | number

    type GridValuesBuilder<T> = T extends number
        ? number[]
        : T extends string
        ? string[]
        : T extends Date
        ? Date[]
        : never

    export type GridValues<T extends number | string | Date> = number | GridValuesBuilder<T>

    export type Orient = 'top' | 'right' | 'bottom' | 'left'

    type AxisPositions = { [K in Orient]: AxisProps }

    interface Scales {
        xScale?: Scale
        yScale?: Scale
    }

    export interface AxesProps extends Dimensions, AxisPositions, Scales {}

    export interface AxisProps {
        orient?: Orient
        tickValues?: GridValues<number | string | Date> | string
        tickSize?: number
        tickPadding?: number
        tickRotation?: number
        format?: string | TickFormatter
        renderTick?: <T>(data: T) => React.ReactNode
        legend?: React.ReactNode
        legendPosition?: 'start' | 'middle' | 'end'
        legendOffset?: number
        ariaHidden?: boolean
    }

    export interface GridProps extends Dimensions, Scales {
        xValues?: GridValues<number | string | Date>
        yValues?: GridValues<number | string | Date>
    }

    export const Axes: React.FC<AxesProps>
    export const Axis: React.FC<AxisProps>
    export const Grid: React.FC<GridProps>
}
