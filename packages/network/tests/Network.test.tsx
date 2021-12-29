import { mount } from 'enzyme'
// @ts-ignore
import { Network, NetworkSvgProps, NetworkInputNode } from '../src'

const baseProps: NetworkSvgProps<NetworkInputNode> = {
    width: 600,
    height: 600,
    data: {
        nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
        links: [
            { source: 'A', target: 'B' },
            { source: 'B', target: 'C' },
            { source: 'C', target: 'D' },
            { source: 'D', target: 'E' },
            { source: 'E', target: 'A' },
        ],
    },
    animate: false,
}
