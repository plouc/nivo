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
    Layout,
    LabelsPosition,
    TreeMode,
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

const minimalData = {
    id: 'R',
    children: [
        {
            id: 'A',
            children: [{ id: '00' }, { id: '01' }, { id: '02' }],
        },
        {
            id: 'B',
        },
        {
            id: 'C',
            children: [{ id: '00' }, { id: '01' }, { id: '02' }],
        },
    ],
}

const commonProperties: Pick<
    TreeSvgProps<any>,
    | 'width'
    | 'height'
    | 'margin'
    | 'data'
    | 'identity'
    | 'activeNodeSize'
    | 'nodeColor'
    | 'fixNodeColorAtDepth'
    | 'linkThickness'
    | 'activeLinkThickness'
    | 'linkColor'
    | 'theme'
> = {
    width: 900,
    height: 600,
    margin: { top: 70, right: 70, bottom: 70, left: 70 },
    ...generateData(),
    identity: 'name',
    activeNodeSize: 20,
    nodeColor: { scheme: 'tableau10' },
    fixNodeColorAtDepth: 1,
    linkThickness: 2,
    activeLinkThickness: 6,
    linkColor: { from: 'target.color', modifiers: [['opacity', 0.4]] },
    theme: {
        labels: {
            text: {
                outlineWidth: 2,
                outlineColor: '#ffffff',
            },
        },
    },
}

const NodeTooltip = ({ node }: NodeTooltipProps<any>) => {
    const theme = useTheme()

    return (
        <div
            style={{
                ...theme.tooltip.container,
                backgroundColor: node.color,
                color: '#ffffff',
            }}
        >
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
            enableLabel={false}
        />
    ),
}

interface LabelsPositionConfig {
    layout: Layout
    labelsPosition: LabelsPosition
    orientLabel: boolean
}

const LabelsPositionDemo = ({ config, mode }: { config: LabelsPositionConfig; mode: TreeMode }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #999',
                borderRadius: '4px',
                boxShadow: '0 3px 3px rgba(0,0,0,.08)',
            }}
        >
            <div
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '6px 9px',
                    display: 'grid',
                    gridTemplateColumns: '90px auto',
                    rowGap: '3px',
                    fontSize: '12px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid #ddd',
                }}
            >
                <span>layout</span>
                <strong>{config.layout}</strong>
                <span>labelsPosition</span>
                <strong>{config.labelsPosition}</strong>
                <span>orientLabel</span>
                <strong>{config.orientLabel ? 'true' : 'false'}</strong>
            </div>
            <Tree
                data={minimalData}
                height={180}
                width={180}
                margin={{
                    top: 24,
                    right: 24,
                    bottom: 24,
                    left: 24,
                }}
                mode={mode}
                nodeSize={6}
                activeNodeSize={12}
                nodeColor={{ scheme: 'dark2' }}
                fixNodeColorAtDepth={1}
                linkThickness={2}
                activeLinkThickness={4}
                linkColor={{ from: 'target.color', modifiers: [['opacity', 0.4]] }}
                labelOffset={4}
                theme={{
                    labels: {
                        text: {
                            outlineWidth: 2,
                            outlineColor: '#ffffff',
                        },
                    },
                }}
                {...config}
            />
        </div>
    )
}

const layouts: Layout[] = ['top-to-bottom', 'bottom-to-top', 'left-to-right', 'right-to-left']
const labelsPositions: LabelsPosition[] = ['outward', 'inward', 'layout', 'layout-opposite']

const getLabelsPositionConfigs = (): LabelsPositionConfig[] => {
    const configs: LabelsPositionConfig[] = []

    layouts.forEach(layout => {
        const isVertical = layout.includes('top')

        labelsPositions.forEach(labelsPosition => {
            const config: LabelsPositionConfig = {
                layout,
                labelsPosition,
                orientLabel: false,
            }
            configs.push(config)

            // Orienting labels only affects vertical layouts.
            if (isVertical) configs.push({ ...config, orientLabel: true })
        })
    })

    return configs
}

export const LabelsPositionDemos: Story = {
    render: args => {
        const labelsPositionConfigs = getLabelsPositionConfigs()

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: '12px',
                    rowGap: '12px',
                }}
            >
                {labelsPositionConfigs.map((config, index) => (
                    <LabelsPositionDemo key={index} config={config} mode={args.mode!} />
                ))}
            </div>
        )
    },
}
