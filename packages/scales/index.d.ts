declare module '@nivo/scales' {
    export type LinearScale = {
        type: 'linear'
        min?: 'auto' | number
        max?: 'auto' | number
        stacked?: boolean
    }

    export type PointScale = {
        type: 'point'
    }

    export type TimeScale = {
        type: 'time'
        format?: string
        precision?:
            'millisecond' |
            'second' |
            'minute' |
            'hour' |
            'month' |
            'year'
    }

    export type Scale = LinearScale | PointScale | TimeScale
}
