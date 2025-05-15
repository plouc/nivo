import { InputLink, InputNode } from '@nivo/network'

export const defaultData: {
    nodes: InputNode[]
    links: InputLink[]
} = {
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
    links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'A' },
    ],
}
