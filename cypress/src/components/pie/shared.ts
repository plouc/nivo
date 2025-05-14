export interface Datum {
    id: string
    value: number
    color: string
}

export const defaultData: Datum[] = [
    {
        id: 'A',
        value: 30,
        color: '#ff5500',
    },
    {
        id: 'B',
        value: 20,
        color: '#ffdd00',
    },
    {
        id: 'C',
        value: 50,
        color: '#99cc44',
    },
]
