import type { Meta, StoryObj } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { useTheme } from '@nivo/core'
import {
    Tree,
    useNodeMouseEventHandlers,
    NodeComponentProps,
    NodeTooltipProps,
    LinkTooltipProps,
    TreeSvgProps,
} from '@nivo/tree'

const meta: Meta<typeof Tree> = {
    title: 'Tree',
    component: Tree,
    tags: ['autodocs'],
    argTypes: {
        mode: {
            control: 'select',
            options: ['tree', 'dendogram'],
        },
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
        mode: 'dendogram',
        layout: 'top-to-bottom',
    },
}

export default meta
type Story = StoryObj<typeof Tree>

const generateData = () => {
    const data = generateLibTree()

    return { data }
}

const commonProperties: Partial<TreeSvgProps<any>> = {
    width: 900,
    height: 500,
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    ...generateData(),
    identity: 'name',
    activeNodeSize: 20,
    linkThickness: 2,
    activeLinkThickness: 6,
}

const NodeTooltip = ({ node }: NodeTooltipProps<any>) => {
    const theme = useTheme()

    return (
        <div style={theme.tooltip.container}>
            id: <strong>{node.id}</strong>
            <br />
            path:{' '}
            <strong>
                {node.ancestorIds.join(' > ')} &gt; {node.id}
            </strong>
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
        <Tree
            {...commonProperties}
            mode={args.mode}
            layout={args.layout}
            onNodeClick={args.onNodeClick}
            onLinkClick={args.onLinkClick}
        />
    ),
}

export const WithNodeTooltip: Story = {
    render: args => (
        <Tree
            {...commonProperties}
            mode={args.mode}
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
        <Tree
            {...commonProperties}
            useMesh={false}
            linkThickness={12}
            activeLinkThickness={20}
            mode={args.mode}
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
    setCurrentNode,
    tooltip,
}: NodeComponentProps<any>) => {
    const eventHandlers = useNodeMouseEventHandlers(node, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
        setCurrentNode,
    })

    return (
        <g
            transform={`translate(${node.x - CUSTOM_NODE_SIZE / 2}, ${
                node.y - CUSTOM_NODE_SIZE / 2
            })`}
        >
            <rect
                y={node.isActive ? 7 : 3}
                width={CUSTOM_NODE_SIZE}
                height={CUSTOM_NODE_SIZE}
                rx={3}
                ry={3}
                fill="black"
                opacity={0.1}
            />
            <rect
                width={CUSTOM_NODE_SIZE}
                height={CUSTOM_NODE_SIZE}
                rx={3}
                ry={3}
                fill="white"
                strokeWidth={node.isActive ? 2 : 1}
                stroke={node.color}
                {...eventHandlers}
            />
            <text
                dx={CUSTOM_NODE_SIZE / 2}
                dy={CUSTOM_NODE_SIZE / 2}
                dominantBaseline="central"
                textAnchor="middle"
                fill={node.color}
                style={{
                    fontWeight: 800,
                }}
            >
                {node.id[0].toUpperCase()}
            </text>
        </g>
    )
}

export const CustomNodeComponent: Story = {
    render: args => (
        <Tree
            {...commonProperties}
            mode={args.mode}
            layout={args.layout}
            linkColor={{ from: 'source.color' }}
            nodeTooltip={NodeTooltip}
            nodeComponent={CustomNode}
            onNodeMouseEnter={args.onNodeMouseEnter}
            onNodeMouseMove={args.onNodeMouseMove}
            onNodeMouseLeave={args.onNodeMouseLeave}
            onNodeClick={args.onNodeClick}
        />
    ),
}
