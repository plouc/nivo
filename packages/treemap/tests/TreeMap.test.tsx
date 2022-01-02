import { mount } from 'enzyme'
import { Globals } from '@react-spring/web'
import {
    TreeMap,
    TreeMapSvgProps,
    DefaultTreeMapDatum,
    NodeProps,
    svgDefaultProps,
    TooltipProps,
    // @ts-ignore
} from '../src'

const nodes = [
    { id: 'root', sum: 100 },
    { id: 'A', value: 50 },
    { id: 'B', sum: 50 },
    { id: 'B.0', value: 25 },
    { id: 'B.1', value: 25 },
]
const sampleData: DefaultTreeMapDatum = {
    ...nodes[0],
    children: [
        nodes[1],
        {
            ...nodes[2],
            children: [nodes[3], nodes[4]],
        },
    ],
}

const baseProps: TreeMapSvgProps<DefaultTreeMapDatum> = {
    width: 400,
    height: 400,
    data: sampleData,
    animate: false,
}

beforeAll(() => {
    Globals.assign({ skipAnimation: true })
})

afterAll(() => {
    Globals.assign({ skipAnimation: false })
})

it('should render a basic treemap chart', () => {
    const wrapper = mount(<TreeMap {...baseProps} />)

    nodes.forEach(node => {
        const nodeElement = wrapper.find(`rect[data-testid='node.${node.id}']`)
        expect(nodeElement.exists()).toBeTruthy()

        if (node.value !== undefined) {
            const label = wrapper.find(`text[data-testid='label.${node.id}']`)
            expect(label.exists()).toBeTruthy()
            expect(label.text()).toEqual(`${node.value}`)
        } else {
            const parentLabel = wrapper.find(`text[data-testid='parentLabel.${node.id}']`)
            expect(parentLabel.exists()).toBeTruthy()
            expect(parentLabel.text()).toEqual(node.id)
        }
    })
})

describe('nodes', () => {
    it('custom node component', () => {
        const CustomNode = ({ node }: NodeProps<DefaultTreeMapDatum>) => (
            <g data-testid={`node.${node.id}.custom`} />
        )
        const wrapper = mount(<TreeMap {...baseProps} nodeComponent={CustomNode} />)

        nodes.forEach(node => {
            expect(wrapper.find(`g[data-testid='node.${node.id}.custom']`).exists()).toBeTruthy()
        })
    })
})

describe('tooltip', () => {
    it('default node tooltip', () => {
        const wrapper = mount(<TreeMap {...baseProps} />)

        nodes.forEach(node => {
            const nodeElement = wrapper.find(`rect[data-testid='node.${node.id}']`)

            nodeElement.simulate('mouseenter')

            const tooltip = wrapper.find(svgDefaultProps.tooltip).childAt(0).childAt(0)
            expect(tooltip.exists()).toBeTruthy()

            if (node.value !== undefined) {
                expect(tooltip.text()).toEqual(`${node.id}: ${node.value}`)
            } else {
                expect(tooltip.text()).toEqual(`${node.id}: ${node.sum}`)
            }

            nodeElement.simulate('mouseleave')
            expect(wrapper.find(svgDefaultProps.tooltip).children()).toHaveLength(0)
        })
    })

    it('disabled if non interactive', () => {
        const wrapper = mount(<TreeMap {...baseProps} isInteractive={false} />)

        nodes.forEach(node => {
            const nodeElement = wrapper.find(`rect[data-testid='node.${node.id}']`)

            nodeElement.simulate('mouseenter')

            expect(wrapper.find(svgDefaultProps.tooltip).children()).toHaveLength(0)
        })
    })

    it('custom tooltip', () => {
        const CustomTooltip = ({ node }: TooltipProps<DefaultTreeMapDatum>) => (
            <div>Custom: {node.id}</div>
        )
        const wrapper = mount(<TreeMap {...baseProps} tooltip={CustomTooltip} />)

        nodes.forEach(node => {
            const nodeElement = wrapper.find(`rect[data-testid='node.${node.id}']`)

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
        const wrapper = mount(<TreeMap {...baseProps} onClick={onClick} />)

        nodes.forEach(node => {
            wrapper.find(`rect[data-testid='node.${node.id}']`).simulate('click')

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onClick.mockClear()
        })
    })

    it('onMouseEnter', () => {
        const onMouseEnter = jest.fn()
        const wrapper = mount(<TreeMap {...baseProps} onMouseEnter={onMouseEnter} />)

        nodes.forEach(node => {
            wrapper.find(`rect[data-testid='node.${node.id}']`).simulate('mouseenter')

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onMouseEnter.mockClear()
        })
    })

    it('onMouseMove handler', () => {
        const onMouseMove = jest.fn()
        const wrapper = mount(<TreeMap {...baseProps} onMouseMove={onMouseMove} />)

        nodes.forEach(node => {
            wrapper.find(`rect[data-testid='node.${node.id}']`).simulate('mousemove')

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual(node.id)

            onMouseMove.mockClear()
        })
    })

    it('onMouseLeave handler', () => {
        const onMouseLeave = jest.fn()
        const wrapper = mount(<TreeMap {...baseProps} onMouseLeave={onMouseLeave} />)

        nodes.forEach(node => {
            wrapper.find(`rect[data-testid='node.${node.id}']`).simulate('mouseleave')

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
            <TreeMap
                {...baseProps}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                isInteractive={false}
            />
        )

        nodes.forEach(node => {
            const nodeElement = wrapper.find(`rect[data-testid='node.${node.id}']`)

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
    it('custom layer', () => {
        const CustomLayer = () => null
        const wrapper = mount(<TreeMap {...baseProps} layers={[CustomLayer]} />)

        const customLayer = wrapper.find(CustomLayer)
        expect(customLayer.exists()).toBeTruthy()

        const customLayerProps = customLayer.props()
        expect(customLayerProps).toHaveProperty('nodes')
    })
})

describe('accessibility', () => {
    it('aria properties', () => {
        const wrapper = mount(
            <TreeMap
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
