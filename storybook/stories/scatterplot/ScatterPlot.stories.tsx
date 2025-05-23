import type { Meta, StoryObj } from '@storybook/react'
import { useState, useCallback, useMemo } from 'react'
import omit from 'lodash/omit.js'
import { area, curveMonotoneX } from 'd3-shape'
import {
    ScatterPlot,
    ResponsiveScatterPlot,
    ScatterPlotNodeProps,
    ScatterPlotLayerProps,
    ScatterPlotNodeData,
} from '@nivo/scatterplot'

const meta: Meta<typeof ScatterPlot> = {
    title: 'ScatterPlot',
    component: ScatterPlot,
    tags: ['autodocs'],
    argTypes: { onClick: { action: 'clicked' } },
    onMouseEnter: { action: 'mouseenter' },
    onMouseLeave: { action: 'mouseleave' },
}

export default meta
type Story = StoryObj<typeof ScatterPlot>

type SampleDatum = {
    id: number
    x: number
    y: number
    z: number
}

const sampleData = [
    {
        id: 'girls low',
        data: [
            { id: 0, x: 0, y: 2.0, z: 1 },
            { id: 1, x: 1, y: 2.1, z: 2 },
            { id: 2, x: 2, y: 2.3, z: 4 },
            { id: 3, x: 3, y: 2.5, z: 1 },
            { id: 4, x: 4, y: 2.7, z: 3 },
            { id: 5, x: 5, y: 2.9, z: 0 },
            { id: 6, x: 6, y: 3.0, z: 1 },
            { id: 7, x: 7, y: 3.2, z: 3 },
            { id: 8, x: 8, y: 3.3, z: 2 },
            { id: 9, x: 9, y: 3.5, z: 3 },
            { id: 10, x: 10, y: 3.6, z: 0 },
            { id: 11, x: 11, y: 3.8, z: 0 },
            { id: 12, x: 12, y: 3.9, z: 4 },
            { id: 13, x: 13, y: 4.0, z: 1 },
        ],
    },
    {
        id: 'girls med',
        data: [
            { id: 0, x: 0, y: 3.2, z: 1 },
            { id: 1, x: 1, y: 3.3, z: 3 },
            { id: 2, x: 2, y: 3.6, z: 4 },
            { id: 3, x: 3, y: 3.8, z: 0 },
            { id: 4, x: 4, y: 4.1, z: 1 },
            { id: 5, x: 5, y: 4.3, z: 1 },
            { id: 6, x: 6, y: 4.6, z: 2 },
            { id: 7, x: 7, y: 4.8, z: 2 },
            { id: 8, x: 8, y: 5.0, z: 3 },
            { id: 9, x: 9, y: 5.2, z: 0 },
            { id: 10, x: 10, y: 5.4, z: 1 },
            { id: 11, x: 11, y: 5.5, z: 1 },
            { id: 12, x: 12, y: 5.7, z: 2 },
            { id: 13, x: 13, y: 5.8, z: 4 },
        ],
    },
    {
        id: 'girls high',
        data: [
            { id: 0, x: 0, y: 4.8, z: 4 },
            { id: 1, x: 1, y: 5.1, z: 3 },
            { id: 2, x: 2, y: 5.4, z: 4 },
            { id: 3, x: 3, y: 5.7, z: 1 },
            { id: 4, x: 4, y: 6.1, z: 0 },
            { id: 5, x: 5, y: 6.5, z: 1 },
            { id: 6, x: 6, y: 6.8, z: 2 },
            { id: 7, x: 7, y: 7.1, z: 3 },
            { id: 8, x: 8, y: 7.3, z: 3 },
            { id: 9, x: 9, y: 7.6, z: 1 },
            { id: 10, x: 10, y: 7.8, z: 1 },
            { id: 11, x: 11, y: 8.1, z: 0 },
            { id: 12, x: 12, y: 8.3, z: 4 },
            { id: 13, x: 13, y: 8.5, z: 1 },
        ],
    },
    {
        id: 'boys low',
        data: [
            { id: 0, x: 0, y: 2.5, z: 3 },
            { id: 1, x: 1, y: 2.6, z: 2 },
            { id: 2, x: 2, y: 2.8, z: 0 },
            { id: 3, x: 3, y: 3.1, z: 0 },
            { id: 4, x: 4, y: 3.3, z: 1 },
            { id: 5, x: 5, y: 3.5, z: 4 },
            { id: 6, x: 6, y: 3.8, z: 4 },
            { id: 7, x: 7, y: 4.0, z: 4 },
            { id: 8, x: 8, y: 4.2, z: 3 },
            { id: 9, x: 9, y: 4.4, z: 2 },
            { id: 10, x: 10, y: 4.5, z: 1 },
            { id: 11, x: 11, y: 4.7, z: 0 },
            { id: 12, x: 12, y: 4.9, z: 0 },
            { id: 13, x: 13, y: 5.0, z: 3 },
        ],
    },
    {
        id: 'boys med',
        data: [
            { id: 0, x: 0, y: 3.3, z: 0 },
            { id: 1, x: 1, y: 3.5, z: 4 },
            { id: 2, x: 2, y: 3.8, z: 3 },
            { id: 3, x: 3, y: 4.1, z: 3 },
            { id: 4, x: 4, y: 4.4, z: 2 },
            { id: 5, x: 5, y: 4.7, z: 2 },
            { id: 6, x: 6, y: 4.9, z: 2 },
            { id: 7, x: 7, y: 5.2, z: 1 },
            { id: 8, x: 8, y: 5.4, z: 1 },
            { id: 9, x: 9, y: 5.6, z: 0 },
            { id: 10, x: 10, y: 5.8, z: 3 },
            { id: 11, x: 11, y: 6.0, z: 4 },
            { id: 12, x: 12, y: 6.2, z: 2 },
            { id: 13, x: 13, y: 6.4, z: 1 },
        ],
    },
    {
        id: 'boys high',
        data: [
            { id: 0, x: 0, y: 5.0, z: 4 },
            { id: 1, x: 1, y: 5.3, z: 3 },
            { id: 2, x: 2, y: 5.6, z: 2 },
            { id: 3, x: 3, y: 6.0, z: 2 },
            { id: 4, x: 4, y: 6.4, z: 1 },
            { id: 5, x: 5, y: 6.8, z: 2 },
            { id: 6, x: 6, y: 7.2, z: 1 },
            { id: 7, x: 7, y: 7.5, z: 3 },
            { id: 8, x: 8, y: 7.8, z: 4 },
            { id: 9, x: 9, y: 8.0, z: 1 },
            { id: 10, x: 10, y: 8.3, z: 0 },
            { id: 11, x: 11, y: 8.5, z: 2 },
            { id: 12, x: 12, y: 8.8, z: 1 },
            { id: 13, x: 13, y: 9.0, z: 4 },
        ],
    },
]

const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 24, right: 24, bottom: 80, left: 80 },
    nodeSize: 10,
    blendMode: 'multiply' as const,
    xFormat: (x: number) => `week ${x}`,
    yFormat: (y: number) => `${y} kg`,
    axisBottom: {
        format: (x: number) => `week ${x}`,
    },
    axisLeft: {
        format: (y: number) => `${y} kg`,
    },
    data: sampleData,
    legends: [
        {
            anchor: 'bottom-left' as const,
            direction: 'row' as const,
            translateY: 60,
            itemWidth: 130,
            itemHeight: 12,
            symbolSize: 12,
            symbolShape: 'circle' as const,
        },
    ],
}

export const Basic: Story = {
    render: () => <ScatterPlot<SampleDatum> {...commonProps} data={[sampleData[1]]} />,
}

export const MutlipleSeries: Story = { render: () => <ScatterPlot<SampleDatum> {...commonProps} /> }

export const AlternativeColors: Story = {
    render: () => <ScatterPlot<SampleDatum> {...commonProps} colors={{ scheme: 'category10' }} />,
}

export const UsingTimeScales: Story = {
    render: () => (
        <ScatterPlot<{ x: string; y: number }>
            {...commonProps}
            data={[
                {
                    id: 'apples',
                    data: [
                        { x: '2018-01-01', y: 7 },
                        { x: '2018-01-02', y: 5 },
                        { x: '2018-01-03', y: 11 },
                        { x: '2018-01-04', y: 9 },
                        { x: '2018-01-05', y: 12 },
                        { x: '2018-01-06', y: 16 },
                        { x: '2018-01-07', y: 13 },
                        { x: '2018-01-08', y: 13 },
                    ],
                },
                {
                    id: 'oranges',
                    data: [
                        { x: '2018-01-04', y: 14 },
                        { x: '2018-01-05', y: 14 },
                        { x: '2018-01-06', y: 15 },
                        { x: '2018-01-07', y: 11 },
                        { x: '2018-01-08', y: 10 },
                        { x: '2018-01-09', y: 12 },
                        { x: '2018-01-10', y: 9 },
                        { x: '2018-01-11', y: 7 },
                    ],
                },
            ]}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d',
                precision: 'day',
            }}
            xFormat="time:%Y-%m-%d"
            axisBottom={{
                format: '%b %d',
                tickValues: 'every 2 days',
            }}
        />
    ),
}

export const UsingLogarithmicScales: Story = {
    render: () => (
        <ScatterPlot<{ x: number; y: number }>
            {...commonProps}
            data={[
                {
                    id: 'apples',
                    data: [
                        { x: 10, y: 2 },
                        { x: 100, y: 4 },
                        { x: 1000, y: 8 },
                        { x: 10000, y: 16 },
                        { x: 100000, y: 32 },
                        { x: 1000000, y: 64 },
                    ],
                },
            ]}
            xScale={{
                type: 'log',
                base: 10,
            }}
            xFormat={undefined}
            yScale={{
                type: 'log',
                base: 2,
            }}
            yFormat={undefined}
            axisBottom={{
                tickValues: [10, 100, 1000, 1000, 10000, 100000, 1000000, 10000000],
            }}
            axisLeft={{
                tickValues: [2, 4, 8, 16, 32, 64],
            }}
        />
    ),
}

export const UsingSymmetricLogarithmicScales: Story = {
    render: () => (
        <ScatterPlot<{ x: number; y: number }>
            {...commonProps}
            data={[
                {
                    id: 'apples',
                    data: [
                        { x: 1, y: 1 },
                        { x: 2, y: 3 },
                        { x: 4, y: 32 },
                        { x: 5, y: 8 },
                        { x: 2, y: 38 },
                        { x: 3, y: 45 },
                    ],
                },
            ]}
            xScale={{
                type: 'linear',
            }}
            xFormat={undefined}
            yScale={{
                type: 'symlog',
            }}
            yFormat={undefined}
            axisBottom={{
                tickValues: [0, 1, 2, 3, 4, 5],
            }}
        />
    ),
}

export const NodeSize: Story = {
    render: () => <ScatterPlot<SampleDatum> {...commonProps} nodeSize={24} />,
}

export const VaryingNodeSize: Story = {
    render: () => (
        <ScatterPlot<SampleDatum>
            {...commonProps}
            nodeSize={{ key: 'data.z', values: [0, 4], sizes: [9, 32] }}
        />
    ),
}

export const CustomTooltip: Story = {
    render: () => (
        <ScatterPlot<SampleDatum>
            {...commonProps}
            tooltip={({ node }) => (
                <div
                    style={{
                        color: node.color,
                        background: '#333',
                        padding: '12px 16px',
                    }}
                >
                    <strong>
                        {node.id} ({node.serieId})
                    </strong>
                    <br />
                    {`x: ${node.formattedX}`}
                    <br />
                    {`y: ${node.formattedY}`}
                </div>
            )}
        />
    ),
}

const SyncCharts = () => {
    const [nodeId, setNodeId] = useState(null)
    const handleMouseMove = useCallback(node => setNodeId(node.id), [setNodeId])
    const handleMouseLeave = useCallback(() => setNodeId(null), [setNodeId])

    // dynamic size function, the size of the node is bigger if the node is active
    const getNodeSize = useMemo(
        () => (node: Omit<ScatterPlotNodeData<SampleDatum>, 'size' | 'color'>) => {
            if (nodeId !== null && nodeId === node.id) return 46
            return 8
        },
        [nodeId]
    )

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
            }}
        >
            <div style={{ height: 400 }}>
                <ResponsiveScatterPlot<SampleDatum>
                    {...omit(commonProps, ['width', 'height', 'legends'])}
                    useMesh={true}
                    debugMesh={true}
                    colors={{ scheme: 'nivo' }}
                    nodeSize={getNodeSize}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    axisBottom={{
                        tickRotation: -90,
                        format: d => `week ${d}`,
                    }}
                />
            </div>
            <div style={{ height: 400 }}>
                <ResponsiveScatterPlot<SampleDatum>
                    {...omit(commonProps, ['width', 'height', 'legends'])}
                    useMesh={true}
                    debugMesh={true}
                    colors={{ scheme: 'accent' }}
                    nodeSize={getNodeSize}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    axisLeft={null}
                    axisBottom={{
                        tickRotation: -90,
                        format: d => `week ${d}`,
                    }}
                />
            </div>
        </div>
    )
}

/**
 * You can synchronize several charts using mouse handlers.
 * This example wraps 2 scatterplots in a parent component and
 * store current symbol id in a state which is then used to
 * determine symbol size, using `onMouseMove`, `onMouseLeave`
 * and a custom function for `nodeSize`.
 *
 * Note that `useMesh` `debugMesh` are enabled on this example
 * hence the extra red lines displayed on the chart.
 *
 * The parent component hooks should look like this:
 *
 * ```
 * const [nodeId, setNodeId] = useState(null)
 * const handleMouseMove = useCallback((node) => setNodeId(node.id), [setNodeId])
 * const handleMouseLeave = useCallback(() => setNodeId(null), [setNodeId])
 * const getNodeSize = useMemo(
 *     () => node => {
 *         if (nodeId !== null && nodeId === node.id) return 46
 *         return 8
 *     },
 *     [nodeId]
 * )
 * ```
 *
 * and the two scatterplots share those properties:
 *
 * ```
 * <ResponsiveScatterPlot
 *     nodeSize={getNodeSize}
 *     onMouseMove={handleMouseMove}
 *     onMouseLeave={handleMouseLeave}
 * />
 * ```
 *
 * This approach can also be used to synchronize another chart type.
 */
export const SynchronizingCharts: Story = {
    render: () => <SyncCharts />,
}

export const UsingMouseEnterLeave: Story = {
    render: args => (
        <ScatterPlot
            {...commonProps}
            onMouseEnter={args.onMouseEnter}
            onMouseLeave={args.onMouseLeave}
        />
    ),
}

const CustomNodeComponent = ({
    node,
    blendMode,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: ScatterPlotNodeProps<{ x: number; y: number }>) => {
    if (node.serieId === 'A') {
        return (
            <g transform={`translate(${node.x},${node.y})`}>
                <circle
                    r={node.size / 2}
                    fill={node.color}
                    style={{ mixBlendMode: blendMode }}
                    onMouseEnter={event => onMouseEnter?.(node, event)}
                    onMouseMove={event => onMouseMove?.(node, event)}
                    onMouseLeave={event => onMouseLeave?.(node, event)}
                    onClick={event => onClick?.(node, event)}
                />
            </g>
        )
    }

    if (node.serieId === 'B') {
        return (
            <g transform={`translate(${node.x},${node.y}) rotate(45)`}>
                <rect
                    x={node.size * -0.5}
                    y={node.size * -0.5}
                    width={node.size}
                    height={node.size}
                    fill={node.color}
                    style={{ mixBlendMode: blendMode }}
                    onMouseEnter={event => onMouseEnter?.(node, event)}
                    onMouseMove={event => onMouseMove?.(node, event)}
                    onMouseLeave={event => onMouseLeave?.(node, event)}
                    onClick={event => onClick?.(node, event)}
                />
            </g>
        )
    }

    return (
        <g transform={`translate(${node.x},${node.y})`}>
            <rect
                x={node.size * -0.5}
                y={node.size * -0.5}
                width={node.size}
                height={node.size}
                fill={node.color}
                style={{ mixBlendMode: blendMode }}
                onMouseEnter={event => onMouseEnter?.(node, event)}
                onMouseMove={event => onMouseMove?.(node, event)}
                onMouseLeave={event => onMouseLeave?.(node, event)}
                onClick={event => onClick?.(node, event)}
            />
        </g>
    )
}

export const CustomNode: Story = {
    render: () => (
        <ScatterPlot<{ x: number; y: number }>
            {...commonProps}
            colors={{ scheme: 'set2' }}
            nodeSize={32}
            data={[
                {
                    id: 'A',
                    data: [
                        { x: 0, y: 2 },
                        { x: 1, y: 4 },
                        { x: 2, y: 9 },
                        { x: 3, y: 7 },
                        { x: 4, y: 15 },
                        { x: 5, y: 12 },
                        { x: 6, y: 9 },
                    ],
                },
                {
                    id: 'B',
                    data: [
                        { x: 0, y: 1 },
                        { x: 1, y: 5 },
                        { x: 2, y: 7 },
                        { x: 3, y: 3 },
                        { x: 4, y: 9 },
                        { x: 5, y: 17 },
                        { x: 6, y: 5 },
                    ],
                },
                {
                    id: 'C',
                    data: [
                        { x: 0, y: 0 },
                        { x: 1, y: 7 },
                        { x: 2, y: 8 },
                        { x: 3, y: 11 },
                        { x: 4, y: 8 },
                        { x: 5, y: 3 },
                        { x: 6, y: 1 },
                    ],
                },
            ]}
            nodeComponent={CustomNodeComponent}
        />
    ),
}

const AreaLayer = ({
    nodes,
    xScale,
    yScale,
}: ScatterPlotLayerProps<{ x: number; y: number; low: number; high: number }>) => {
    const areaGenerator = area<
        ScatterPlotNodeData<{ x: number; y: number; low: number; high: number }>
    >()
        .x(d => xScale(d.data.x))
        .y0(d => yScale(d.data.low))
        .y1(d => yScale(d.data.high))
        .curve(curveMonotoneX)

    return <path d={areaGenerator(nodes) as string} fill="rgba(232, 193, 160, .65)" />
}

export const AddingExtraLayers: Story = {
    render: () => (
        <ScatterPlot<{ x: number; y: number; low: number; high: number }>
            {...commonProps}
            data={[
                {
                    id: 'things',
                    data: [
                        { x: 0, y: 3.3, low: 2.3, high: 4.2 },
                        { x: 1, y: 3.5, low: 2.7, high: 4.1 },
                        { x: 2, y: 3.8, low: 3.1, high: 4.6 },
                        { x: 3, y: 4.1, low: 2.9, high: 4.5 },
                        { x: 4, y: 4.4, low: 3.2, high: 5.1 },
                        { x: 5, y: 4.7, low: 3.7, high: 5.4 },
                        { x: 6, y: 4.9, low: 3.2, high: 5.8 },
                        { x: 7, y: 5.2, low: 4.2, high: 6.1 },
                        { x: 8, y: 5.4, low: 3.8, high: 6.7 },
                        { x: 9, y: 5.6, low: 3.5, high: 7.1 },
                        { x: 10, y: 5.8, low: 3.2, high: 6.8 },
                        { x: 11, y: 6.0, low: 4, high: 7.2 },
                        { x: 12, y: 6.2, low: 4.2, high: 9.1 },
                        { x: 13, y: 6.4, low: 3.9, high: 9 },
                    ],
                },
            ]}
            yScale={{
                type: 'linear',
                max: 10,
            }}
            legends={[]}
            layers={[
                'grid',
                'axes',
                AreaLayer,
                'nodes',
                'markers',
                'mesh',
                'legends',
                'annotations',
            ]}
            annotations={[
                {
                    type: 'circle',
                    match: { index: 10 },
                    noteX: 50,
                    noteY: 50,
                    offset: 3,
                    noteTextOffset: -3,
                    noteWidth: 10,
                    note: 'an annotation',
                },
            ]}
        />
    ),
}
