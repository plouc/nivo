import { mount } from 'enzyme'
// @ts-ignore
import { Network, NetworkSvgProps, NetworkInputNode, svgDefaultProps } from '../src'
import { InputNode } from '../dist/types'

const sampleData: NetworkSvgProps<InputNode>['data'] = {
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
    links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'A' },
    ],
}

const baseProps: NetworkSvgProps<NetworkInputNode> = {
    width: 600,
    height: 600,
    data: sampleData,
    animate: false,
}

it('should render a basic network chart', () => {
    const wrapper = mount(<Network {...baseProps} />)

    sampleData.nodes.forEach(node => {
        const nodeElement = wrapper.find(`circle[data-testid='node.${node.id}']`)
        expect(nodeElement.exists()).toBeTruthy()
    })

    sampleData.links.forEach(link => {
        const linkElement = wrapper.find(`line[data-testid='link.${link.source}.${link.target}']`)
        expect(linkElement.exists()).toBeTruthy()
    })
})

describe('nodes', () => {
    it('static node color', () => {
        const color = 'rgba(255, 0, 255, 1)'
        const wrapper = mount(<Network {...baseProps} nodeColor={color} />)

        sampleData.nodes.forEach(node => {
            expect(wrapper.find(`circle[data-testid='node.${node.id}']`).prop('fill')).toEqual(
                color
            )
        })
    })

    it('static node size', () => {
        const size = 32
        const wrapper = mount(<Network {...baseProps} nodeSize={size} />)

        sampleData.nodes.forEach(node => {
            expect(wrapper.find(`circle[data-testid='node.${node.id}']`).prop('r')).toEqual(
                size / 2
            )
        })
    })

    it('dynamic node size', () => {
        const computeSize = (node: { id: string; index: number }) => 10 + node.index * 2
        const nodesWithIndex = sampleData.nodes.map((node, index) => ({
            ...node,
            index,
        }))
        const wrapper = mount(
            <Network<{ id: string; index: number }>
                {...baseProps}
                data={{
                    nodes: nodesWithIndex,
                    links: sampleData.links,
                }}
                nodeSize={computeSize}
            />
        )

        nodesWithIndex.forEach(node => {
            expect(wrapper.find(`circle[data-testid='node.${node.id}']`).prop('r')).toEqual(
                computeSize(node) / 2
            )
        })
    })
})

describe('tooltip', () => {
    it('default node tooltip', () => {
        const wrapper = mount(<Network {...baseProps} />)

        sampleData.nodes.forEach(node => {
            const nodeElement = wrapper.find(`circle[data-testid='node.${node.id}']`)

            nodeElement.simulate('mouseenter')

            const tooltip = wrapper.find(svgDefaultProps.nodeTooltip).childAt(0).childAt(0)
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual(node.id)

            nodeElement.simulate('mouseleave')
            expect(wrapper.find(svgDefaultProps.nodeTooltip).children()).toHaveLength(0)
        })
    })
})
