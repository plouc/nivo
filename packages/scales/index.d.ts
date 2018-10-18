declare module '@nivo/scales' {
    export interface LinearScale {
        type: 'linear'
        min?: 'auto' | number
        max?: 'auto' | number
        stacked?: boolean
    }

    export interface PointScale {
        type: 'point'
    }

    export interface TimeScale {
        type: 'time'
        format?: string
        precision?: 'millisecond' | 'second' | 'minute' | 'hour' | 'month' | 'year'
    }

    export type Scale = LinearScale | PointScale | TimeScale
}
