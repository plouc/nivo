import type { Meta, StoryObj } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import {
    Dendogram,
    useNodeMouseEventHandlers,
    NodeComponentProps,
    NodeTooltipProps,
} from '@nivo/dendogram'

const meta: Meta<typeof Dendogram> = {
    title: 'Dendogram',
    component: Dendogram,
    tags: ['autodocs'],
    argTypes: {
        layout: {
            control: 'select',
            options: ['top-to-bottom', 'right-to-left', 'bottom-to-top', 'left-to-right', 'radial'],
        },
        onNodeMouseEnter: { action: 'node mouse enter' },
        onNodeMouseMove: { action: 'node mouse move' },
        onNodeMouseLeave: { action: 'node mouse leave' },
        onNodeClick: { action: 'node clicked' },
    },
    args: {
        layout: 'top-to-bottom',
    },
}

export default meta
type Story = StoryObj<typeof Dendogram>

const generateData = () => {
    const data = generateLibTree()

    return { data }
}

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    ...generateData(),
    identity: 'name',
    value: 'loc',
}

const NodeTooltip = ({ node }: NodeTooltipProps<any>) => {
    return node.path
}

export const Basic: Story = {
    render: args => (
        <Dendogram
            {...commonProperties}
            layout={args.layout}
            onNodeMouseEnter={args.onNodeMouseEnter}
            onNodeMouseMove={args.onNodeMouseMove}
            onNodeMouseLeave={args.onNodeMouseLeave}
            onNodeClick={args.onNodeClick}
        />
    ),
}

export const WithNodeTooltip: Story = {
    render: args => (
        <Dendogram
            {...commonProperties}
            layout={args.layout}
            nodeTooltip={NodeTooltip}
            onNodeMouseEnter={args.onNodeMouseEnter}
            onNodeMouseMove={args.onNodeMouseMove}
            onNodeMouseLeave={args.onNodeMouseLeave}
            onNodeClick={args.onNodeClick}
        />
    ),
}

const CUSTOM_NODE_SIZE = 32
const CustomNode = ({
    node,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: NodeComponentProps) => {
    const eventHandlers = useNodeMouseEventHandlers(node, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    })

    return (
        <rect
            x={node.x - CUSTOM_NODE_SIZE / 2}
            y={node.y - CUSTOM_NODE_SIZE / 2}
            width={CUSTOM_NODE_SIZE}
            height={CUSTOM_NODE_SIZE}
            rx={3}
            ry={3}
            fill="red"
            {...eventHandlers}
        />
    )
}

export const CustomNodeComponent: Story = {
    render: args => (
        <Dendogram
            {...commonProperties}
            layout={args.layout}
            nodeTooltip={NodeTooltip}
            nodeComponent={CustomNode}
            onNodeMouseEnter={args.onNodeMouseEnter}
            onNodeMouseMove={args.onNodeMouseMove}
            onNodeMouseLeave={args.onNodeMouseLeave}
            onNodeClick={args.onNodeClick}
        />
    ),
}
