import { mount } from 'enzyme'
import { Globals } from '@react-spring/web'
import { Annotation } from '@nivo/annotations'
import {
    Network,
    NetworkSvgProps,
    InputNode,
    InputLink,
    svgDefaultProps,
    ComputedNode,
    LinkProps,
    NodeProps,
    // @ts-ignore
} from '../src'

const sampleData: NetworkSvgProps<InputNode, InputLink>['data'] = {
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
    links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'A' },
    ],
}

const baseProps: NetworkSvgProps<InputNode, InputLink> = {
    width: 600,
    height: 600,
    data: sampleData,
    animate: false,
}

beforeAll(() => {
    Globals.assign({ skipAnimation: true })
})

afterAll(() => {
    Globals.assign({ skipAnimation: false })
})

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
            <Network<{ id: string; index: number }, InputLink>
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

    it('custom node component', () => {
        const CustomNode = ({ node }: NodeProps<InputNode>) => (
            <g data-testid={`node.${node.id}.custom`} />
        )

        const wrapper = mount(<Network {...baseProps} nodeComponent={CustomNode} />)

        sampleData.nodes.forEach(node => {
            expect(wrapper.find(`g[data-testid='node.${node.id}.custom']`).exists()).toBeTruthy()
        })
    })
})

describe('active/inactive nodes', () => {
    it('styles depending on nodes status', () => {
        const wrapper = mount(
            <Network {...baseProps} nodeSize={10} activeNodeSize={20} inactiveNodeSize={0} />
        )

        sampleData.nodes.forEach(activeNode => {
            wrapper.find(`circle[data-testid='node.${activeNode.id}']`).simulate('mouseenter')

            expect(
                wrapper.find(`circle[data-testid='node.${activeNode.id}']`).parent().prop('r').get()
            ).toEqual(10)

            sampleData.nodes
                .filter(node => node.id !== activeNode.id)
                .forEach(otherNode => {
                    expect(
                        wrapper
                            .find(`circle[data-testid='node.${otherNode.id}']`)
                            .parent()
                            .prop('r')
                            .get()
                    ).toEqual(0)
                })
        })
    })

    it('default active node ids', () => {
        const activeIds = ['A', 'C']
        const wrapper = mount(
            <Network
                {...baseProps}
                nodeSize={10}
                activeNodeSize={20}
                inactiveNodeSize={0}
                defaultActiveNodeIds={activeIds}
            />
        )

        sampleData.nodes.forEach(node => {
            const nodeElement = wrapper.find(`circle[data-testid='node.${node.id}']`)

            if (activeIds.includes(node.id)) {
                expect(nodeElement.prop('r')).toEqual(10)
            } else {
                expect(nodeElement.prop('r')).toEqual(0)
            }
        })
    })

    it('ignored if non interactive', () => {
        const wrapper = mount(
            <Network
                {...baseProps}
                nodeSize={10}
                activeNodeSize={20}
                inactiveNodeSize={0}
                defaultActiveNodeIds={['B', 'D']}
                isInteractive={false}
            />
        )

        sampleData.nodes.forEach(node => {
            expect(wrapper.find(`circle[data-testid='node.${node.id}']`).prop('r')).toEqual(5)
        })
    })
})

describe('links', () => {
    it('static link thickness', () => {
        const wrapper = mount(<Network {...baseProps} linkThickness={3} />)

        sampleData.links.forEach(link => {
            expect(
                wrapper
                    .find(`line[data-testid='link.${link.source}.${link.target}']`)
                    .prop('strokeWidth')
            ).toEqual(3)
        })
    })

    it('dynamic link thickness', () => {
        const wrapper = mount(<Network {...baseProps} linkThickness={link => 1 + link.index} />)

        sampleData.links.forEach((link, index) => {
            expect(
                wrapper
                    .find(`line[data-testid='link.${link.source}.${link.target}']`)
                    .prop('strokeWidth')
            ).toEqual(1 + index)
        })
    })

    it('static link color', () => {
        const color = 'rgba(255, 0, 0, 1)'
        const wrapper = mount(<Network {...baseProps} linkColor={color} />)

        sampleData.links.forEach(link => {
            expect(
                wrapper
                    .find(`line[data-testid='link.${link.source}.${link.target}']`)
                    .prop('stroke')
            ).toEqual(color)
        })
    })

    it('dynamic link color', () => {
        const wrapper = mount(
            <Network {...baseProps} linkColor={link => `rgba(${link.index * 10}, 0, 0, 1)`} />
        )

        sampleData.links.forEach((link, index) => {
            expect(
                wrapper
                    .find(`line[data-testid='link.${link.source}.${link.target}']`)
                    .prop('stroke')
            ).toEqual(`rgba(${index * 10}, 0, 0, 1)`)
        })
    })

    it('link color from source node color', () => {
        const color = 'rgba(125, 255, 125, 1)'
        const wrapper = mount(
            <Network
                {...baseProps}
                nodeColor={color}
                linkColor={{
                    from: 'source.color',
                }}
            />
        )

        sampleData.links.forEach(link => {
            expect(
                wrapper
                    .find(`line[data-testid='link.${link.source}.${link.target}']`)
                    .prop('stroke')
            ).toEqual(color)
        })
    })

    it('link color from target node color', () => {
        const color = 'rgba(125, 125, 255, 1)'
        const wrapper = mount(
            <Network
                {...baseProps}
                nodeColor={color}
                linkColor={{
                    from: 'target.color',
                }}
            />
        )

        sampleData.links.forEach(link => {
            expect(
                wrapper
                    .find(`line[data-testid='link.${link.source}.${link.target}']`)
                    .prop('stroke')
            ).toEqual(color)
        })
    })

    it('link blend mode', () => {
        const wrapper = mount(<Network {...baseProps} linkBlendMode="multiply" />)

        sampleData.links.forEach(link => {
            expect(
                wrapper.find(`line[data-testid='link.${link.source}.${link.target}']`).prop('style')
            ).toEqual({ mixBlendMode: 'multiply' })
        })
    })

    it('custom link component', () => {
        const CustomLink = ({ link }: LinkProps<InputNode, InputLink>) => (
            <g data-testid={`link.${link.source.id}.${link.target.id}.custom`} />
        )

        const wrapper = mount(<Network {...baseProps} linkComponent={CustomLink} />)

        sampleData.links.forEach(link => {
            expect(
                wrapper.find(`g[data-testid='link.${link.source}.${link.target}.custom']`).exists()
            ).toBeTruthy()
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

    it('disabled if non interactive', () => {
        const wrapper = mount(<Network {...baseProps} isInteractive={false} />)

        sampleData.nodes.forEach(node => {
            const nodeElement = wrapper.find(`circle[data-testid='node.${node.id}']`)

            nodeElement.simulate('mouseenter')

            expect(wrapper.find(svgDefaultProps.nodeTooltip).children()).toHaveLength(0)
        })
    })

    it('custom node tooltip', () => {
        const CustomTooltip = ({ node }: { node: ComputedNode<InputNode> }) => (
            <div>Custom: {node.id}</div>
        )
        const wrapper = mount(<Network {...baseProps} nodeTooltip={CustomTooltip} />)

        sampleData.nodes.forEach(node => {
            const nodeElement = wrapper.find(`circle[data-testid='node.${node.id}']`)

            nodeElement.simulate('mouseenter')

            const tooltip = wrapper.find(CustomTooltip)
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual(`Custom: ${node.id}`)

            nodeElement.simulate('mouseleave')
            expect(wrapper.find(CustomTooltip).exists()).toBeFalsy()
        })
    })
})

describe('interactivity', () => {
    it('onClick', () => {
        const onClick = jest.fn()
        const wrapper = mount(<Network {...baseProps} onClick={onClick} />)

        sampleData.nodes.forEach(node => {
            wrapper.find(`circle[data-testid='node.${node.id}']`).simulate('click')

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onClick.mockClear()
        })
    })

    it('onMouseEnter', () => {
        const onMouseEnter = jest.fn()
        const wrapper = mount(<Network {...baseProps} onMouseEnter={onMouseEnter} />)

        sampleData.nodes.forEach(node => {
            wrapper.find(`circle[data-testid='node.${node.id}']`).simulate('mouseenter')

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onMouseEnter.mockClear()
        })
    })

    it('onMouseMove handler', () => {
        const onMouseMove = jest.fn()
        const wrapper = mount(<Network {...baseProps} onMouseMove={onMouseMove} />)

        sampleData.nodes.forEach(node => {
            wrapper.find(`circle[data-testid='node.${node.id}']`).simulate('mousemove')

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onMouseMove.mockClear()
        })
    })

    it('onMouseLeave handler', () => {
        const onMouseLeave = jest.fn()
        const wrapper = mount(<Network {...baseProps} onMouseLeave={onMouseLeave} />)

        sampleData.nodes.forEach(node => {
            wrapper.find(`circle[data-testid='node.${node.id}']`).simulate('mouseleave')

            expect(onMouseLeave).toHaveBeenCalledTimes(1)
            const [datum] = onMouseLeave.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onMouseLeave.mockClear()
        })
    })

    it('disabled if non interactive', () => {
        const onClick = jest.fn()
        const onMouseEnter = jest.fn()
        const onMouseMove = jest.fn()
        const onMouseLeave = jest.fn()

        const wrapper = mount(
            <Network
                {...baseProps}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                isInteractive={false}
            />
        )

        sampleData.nodes.forEach(node => {
            const nodeElement = wrapper.find(`circle[data-testid='node.${node.id}']`)

            nodeElement.simulate('mouseenter')
            expect(onMouseEnter).not.toHaveBeenCalled()

            nodeElement.simulate('mousemove')
            expect(onMouseMove).not.toHaveBeenCalled()

            nodeElement.simulate('mouseleave')
            expect(onMouseLeave).not.toHaveBeenCalled()

            nodeElement.simulate('click')
            expect(onClick).not.toHaveBeenCalled()
        })
    })
})

describe('layers', () => {
    it('custom order', () => {
        const wrapper = mount(<Network {...baseProps} layers={['nodes', 'links']} />)

        const layers = wrapper.find('svg > g').children()
        expect(layers.at(0).is('NetworkNodes')).toBeTruthy()
        expect(layers.at(1).is('NetworkLinks')).toBeTruthy()
    })

    it('custom layer', () => {
        const CustomLayer = () => null
        const wrapper = mount(<Network {...baseProps} layers={[CustomLayer]} />)

        const customLayer = wrapper.find(CustomLayer)
        expect(customLayer.exists()).toBeTruthy()

        const customLayerProps = customLayer.props()
        expect(customLayerProps).toHaveProperty('nodes')
        expect(customLayerProps).toHaveProperty('links')
        expect(customLayerProps).toHaveProperty('activeNodeIds')
        expect(customLayerProps).toHaveProperty('setActiveNodeIds')
    })
})

describe('annotations', () => {
    it('circle annotation using id', () => {
        const annotatedNodeId = 'C'
        const wrapper = mount(
            <Network
                {...baseProps}
                annotations={[
                    {
                        type: 'circle',
                        match: {
                            id: annotatedNodeId,
                        },
                        note: 'Note',
                        noteX: 160,
                        noteY: 36,
                    },
                ]}
            />
        )

        const annotation = wrapper.find(Annotation)
        expect(annotation.exists()).toBeTruthy()

        const annotatedNode = wrapper.find(`circle[data-testid='node.${annotatedNodeId}']`)
        const [nodeX, nodeY] = Array.from(
            annotatedNode.prop('transform').match(/translate\(([0-9.]+),([0-9.]+)\)/)
        )
            .slice(1)
            .map(Number)

        expect(annotation.find('circle').first().prop('cx')).toEqual(nodeX)
        expect(annotation.find('circle').first().prop('cy')).toEqual(nodeY)
    })
})

describe('accessibility', () => {
    it('aria properties', () => {
        const wrapper = mount(
            <Network
                {...baseProps}
                ariaLabel="AriaLabel"
                ariaLabelledBy="AriaLabelledBy"
                ariaDescribedBy="AriaDescribedBy"
            />
        )

        const svg = wrapper.find('svg')

        expect(svg.prop('aria-label')).toBe('AriaLabel')
        expect(svg.prop('aria-labelledby')).toBe('AriaLabelledBy')
        expect(svg.prop('aria-describedby')).toBe('AriaDescribedBy')
    })
})
