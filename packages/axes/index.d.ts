import * as React from 'react'

declare module '@nivo/axes' {
    export type TickFormatter = (value: number | string | Date) => string | number

    export interface AxisProps {
        orient?: 'top' | 'right' | 'bottom' | 'left'
        tickValues?: number | number[] | string[] | Date[] | string
        tickSize?: number
        tickPadding?: number
        tickRotation?: number
        format?: string | TickFormatter
        renderTick?: (data: any) => React.ReactNode
        legend?: React.ReactNode
        legendPosition?: 'start' | 'middle' | 'end'
        legendOffset?: number
    }

    export type Axis = any
}
