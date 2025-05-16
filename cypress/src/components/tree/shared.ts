export interface Datum {
    id: string
    children?: Datum[]
}

export const defaultData: Datum = {
    id: 'A',
    children: [
        { id: '0' },
        {
            id: '1',
            children: [{ id: 'A' }, { id: 'B' }],
        },
        { id: '2' },
    ],
}
