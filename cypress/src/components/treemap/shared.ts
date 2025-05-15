export interface Datum {
    id: string
    value?: number
    children?: Datum[]
}

export const defaultData: Datum = {
    id: 'nivo',
    children: [
        {
            id: 'bar',
            children: [
                { id: 'bar-svg', value: 12 },
                { id: 'bar-canvas', value: 34 },
                { id: 'bar-html', value: 2 },
            ],
        },
        {
            id: 'line',
            children: [
                { id: 'line-svg', value: 43 },
                { id: 'line-canvas', value: 27 },
            ],
        },
        {
            id: 'pie',
            children: [
                { id: 'pie-svg', value: 17 },
                { id: 'pie-canvas', value: 23 },
            ],
        },
    ],
}
