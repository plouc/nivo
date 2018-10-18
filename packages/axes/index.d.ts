import * as React from 'react'

declare module '@nivo/axes' {
    export interface Axis {
        // ticksPosition?: 'before' | 'after'
        tickValues?: number | number[] | string[] | Date[]
        tickSize?: number
        tickPadding?: number
        tickRotation?: number
        format?: any // PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        renderTick?: (data: any) => React.ReactNode
        legend?: React.ReactNode
        legendPosition?: 'start' | 'middle' | 'end'
        legendOffset?: number
    }
}
