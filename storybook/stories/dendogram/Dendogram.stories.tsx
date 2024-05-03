import type { Meta, StoryObj } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { useTheme } from '@nivo/core'
import {
    Dendogram,
    useNodeMouseEventHandlers,
    NodeComponentProps,
    NodeTooltipProps,
    LinkTooltipProps,
} from '@nivo/dendogram'

const meta: Meta<typeof Dendogram> = {
    title: 'Dendogram',
    component: Dendogram,
    tags: ['autodocs'],
    argTypes: {
        layout: {
            control: 'select',
            options: ['top-to-bottom', 'right-to-left', 'bottom-to-top', 'left-to-right'],
        },
        onNodeMouseEnter: { action: 'node mouse enter' },
        onNodeMouseMove: { action: 'node mouse move' },
        onNodeMouseLeave: { action: 'node mouse leave' },
        onNodeClick: { action: 'node clicked' },
        onLinkMouseEnter: { action: 'link mouse enter' },
        onLinkMouseMove: { action: 'link mouse move' },
        onLinkMouseLeave: { action: 'link mouse leave' },
        onLinkClick: { action: 'link clicked' },
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
    const theme = useTheme()

    return (
        <div style={theme.tooltip.container}>
            id: <strong>{node.id}</strong>
            <br />
            path: <strong>{node.pathComponents.join(' > ')}</strong>
            <br />
            uid: <strong>{node.uid}</strong>
        </div>
    )
}

const LinkTooltip = ({ link }: LinkTooltipProps<any>) => {
    const theme = useTheme()

    return (
        <div style={theme.tooltip.container}>
            id: <strong>{link.id}</strong>
            <br />
            source: <strong>{link.source.id}</strong>
            <br />
            target: <strong>{link.target.id}</strong>
        </div>
    )
}

export const Basic: Story = {
    render: args => (
        <Dendogram
            {...commonProperties}
            layout={args.layout}
            onNodeClick={args.onNodeClick}
            onLinkClick={args.onLinkClick}
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

export const WithLinkTooltip: Story = {
    render: args => (
        <Dendogram
            {...commonProperties}
            linkThickness={12}
            layout={args.layout}
            linkTooltip={LinkTooltip}
            onLinkMouseEnter={args.onLinkMouseEnter}
            onLinkMouseMove={args.onLinkMouseMove}
            onLinkMouseLeave={args.onLinkMouseLeave}
            onLinkClick={args.onLinkClick}
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
        <g
            transform={`translate(${node.x - CUSTOM_NODE_SIZE / 2}, ${
                node.y - CUSTOM_NODE_SIZE / 2
            })`}
        >
            <rect
                y={5}
                width={CUSTOM_NODE_SIZE}
                height={CUSTOM_NODE_SIZE}
                rx={3}
                ry={3}
                fill="black"
                opacity={0.15}
            />
            <rect
                width={CUSTOM_NODE_SIZE}
                height={CUSTOM_NODE_SIZE}
                rx={3}
                ry={3}
                fill="white"
                strokeWidth={1}
                stroke="red"
                {...eventHandlers}
            />
        </g>
    )
}

export const CustomNodeComponent: Story = {
    render: args => (
        <Dendogram
            {...commonProperties}
            layout={args.layout}
            linkThickness={4}
            nodeTooltip={NodeTooltip}
            nodeComponent={CustomNode}
            onNodeMouseEnter={args.onNodeMouseEnter}
            onNodeMouseMove={args.onNodeMouseMove}
            onNodeMouseLeave={args.onNodeMouseLeave}
            onNodeClick={args.onNodeClick}
        />
    ),
}
