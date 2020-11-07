import React, { useState, useCallback, useMemo } from 'react'
import omit from 'lodash/omit'
import { storiesOf } from '@storybook/react'
import { ScatterPlotCanvas, ResponsiveScatterPlotCanvas } from '../src'

const sampleData = [
    {
        id: 'girls low',
        data: [
            { id: 0, x: 0, y: 2.0 },
            { id: 1, x: 1, y: 2.1 },
            { id: 2, x: 2, y: 2.3 },
            { id: 3, x: 3, y: 2.5 },
            { id: 4, x: 4, y: 2.7 },
            { id: 5, x: 5, y: 2.9 },
            { id: 6, x: 6, y: 3.0 },
            { id: 7, x: 7, y: 3.2 },
            { id: 8, x: 8, y: 3.3 },
            { id: 9, x: 9, y: 3.5 },
            { id: 10, x: 10, y: 3.6 },
            { id: 11, x: 11, y: 3.8 },
            { id: 12, x: 12, y: 3.9 },
            { id: 13, x: 13, y: 4.0 },
        ],
    },
    {
        id: 'girls med',
        data: [
            { id: 0, x: 0, y: 3.2 },
            { id: 1, x: 1, y: 3.3 },
            { id: 2, x: 2, y: 3.6 },
            { id: 3, x: 3, y: 3.8 },
            { id: 4, x: 4, y: 4.1 },
            { id: 5, x: 5, y: 4.3 },
            { id: 6, x: 6, y: 4.6 },
            { id: 7, x: 7, y: 4.8 },
            { id: 8, x: 8, y: 5.0 },
            { id: 9, x: 9, y: 5.2 },
            { id: 10, x: 10, y: 5.4 },
            { id: 11, x: 11, y: 5.5 },
            { id: 12, x: 12, y: 5.7 },
            { id: 13, x: 13, y: 5.8 },
        ],
    },
    {
        id: 'girls high',
        data: [
            { id: 0, x: 0, y: 4.8 },
            { id: 1, x: 1, y: 5.1 },
            { id: 2, x: 2, y: 5.4 },
            { id: 3, x: 3, y: 5.7 },
            { id: 4, x: 4, y: 6.1 },
            { id: 5, x: 5, y: 6.5 },
            { id: 6, x: 6, y: 6.8 },
            { id: 7, x: 7, y: 7.1 },
            { id: 8, x: 8, y: 7.3 },
            { id: 9, x: 9, y: 7.6 },
            { id: 10, x: 10, y: 7.8 },
            { id: 11, x: 11, y: 8.1 },
            { id: 12, x: 12, y: 8.3 },
            { id: 13, x: 13, y: 8.5 },
        ],
    },
    {
        id: 'boys low',
        data: [
            { id: 0, x: 0, y: 2.5 },
            { id: 1, x: 1, y: 2.6 },
            { id: 2, x: 2, y: 2.8 },
            { id: 3, x: 3, y: 3.1 },
            { id: 4, x: 4, y: 3.3 },
            { id: 5, x: 5, y: 3.5 },
            { id: 6, x: 6, y: 3.8 },
            { id: 7, x: 7, y: 4.0 },
            { id: 8, x: 8, y: 4.2 },
            { id: 9, x: 9, y: 4.4 },
            { id: 10, x: 10, y: 4.5 },
            { id: 11, x: 11, y: 4.7 },
            { id: 12, x: 12, y: 4.9 },
            { id: 13, x: 13, y: 5.0 },
        ],
    },
    {
        id: 'boys med',
        data: [
            { id: 0, x: 0, y: 3.3 },
            { id: 1, x: 1, y: 3.5 },
            { id: 2, x: 2, y: 3.8 },
            { id: 3, x: 3, y: 4.1 },
            { id: 4, x: 4, y: 4.4 },
            { id: 5, x: 5, y: 4.7 },
            { id: 6, x: 6, y: 4.9 },
            { id: 7, x: 7, y: 5.2 },
            { id: 8, x: 8, y: 5.4 },
            { id: 9, x: 9, y: 5.6 },
            { id: 10, x: 10, y: 5.8 },
            { id: 11, x: 11, y: 6.0 },
            { id: 12, x: 12, y: 6.2 },
            { id: 13, x: 13, y: 6.4 },
        ],
    },
    {
        id: 'boys high',
        data: [
            { id: 0, x: 0, y: 5.0 },
            { id: 1, x: 1, y: 5.3 },
            { id: 2, x: 2, y: 5.6 },
            { id: 3, x: 3, y: 6.0 },
            { id: 4, x: 4, y: 6.4 },
            { id: 5, x: 5, y: 6.8 },
            { id: 6, x: 6, y: 7.2 },
            { id: 7, x: 7, y: 7.5 },
            { id: 8, x: 8, y: 7.8 },
            { id: 9, x: 9, y: 8.0 },
            { id: 10, x: 10, y: 8.3 },
            { id: 11, x: 11, y: 8.5 },
            { id: 12, x: 12, y: 8.8 },
            { id: 13, x: 13, y: 9.0 },
        ],
    },
]

const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 20, right: 20, bottom: 80, left: 80 },
    nodeSize: 10,
    axisBottom: {
        format: d => `week ${d}`,
    },
    axisLeft: {
        format: d => `${d} kg`,
    },
    data: sampleData,
    useMesh: true,
    legends: [
        {
            anchor: 'bottom-left',
            direction: 'row',
            translateY: 60,
            itemWidth: 130,
            itemHeight: 12,
            nodeSize: 12,
            symbolShape: 'circle',
        },
    ],
}

const stories = storiesOf('ScatterPlotCanvas', module)

stories.add('default', () => <ScatterPlotCanvas {...commonProps} data={[sampleData[1]]} />)

stories.add('multiple series', () => <ScatterPlotCanvas {...commonProps} />)

stories.add('alternative colors', () => (
    <ScatterPlotCanvas {...commonProps} colors={{ scheme: 'category10' }} />
))

stories.add('using time scales', () => (
    <ScatterPlotCanvas
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
        axisBottom={{
            format: '%b %d',
        }}
    />
))

stories.add('using logarithmic scales', () => (
    <ScatterPlotCanvas
        {...commonProps}
        data={[
            {
                id: 'apples',
                data: [
                    { x: 10, y: 2 },
                    { x: 220, y: 4 },
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
        yScale={{
            type: 'log',
            base: 2,
        }}
        axisBottom={{
            tickValues: [10, 100, 1000, 1000, 10000, 100000, 1000000, 10000000],
        }}
        axisLeft={{
            tickValues: [2, 4, 8, 16, 32, 64],
        }}
    />
))

stories.add('using symmetric logarithmic scales', () => (
    <ScatterPlotCanvas
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
))

stories.add('symbol size', () => <ScatterPlotCanvas {...commonProps} nodeSize={24} />)

stories.add('varying symbol size', () => (
    <ScatterPlotCanvas {...commonProps} nodeSize={d => d.x + d.y * 2} />
))

const SyncCharts = () => {
    const [nodeId, setNodeId] = useState(null)
    const handleMouseMove = useCallback(node => setNodeId(node.id), [setNodeId])
    const handleMouseLeave = useCallback(() => setNodeId(null), [setNodeId])
    const getNodeSize = useMemo(
        () => node => {
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
                <ResponsiveScatterPlotCanvas
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
                <ResponsiveScatterPlotCanvas
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

stories.add('synchronizing charts', () => <SyncCharts />, {
    info: {
        text: `
            You can synchronize several charts using mouse handlers.
            This example wraps 2 scatterplots in a parent component and
            store current symbol id in a state which is then used to
            determine symbol size, using \`onMouseMove\`, \`onMouseLeave\`
            and a custom function for \`nodeSize\`.
            
            Note that \`debugMesh\` is enabled on this example
            hence the extra red lines displayed on the chart.
            
            The parent component hooks should look like this:
            
            \`\`\`
            const [nodeId, setNodeId] = useState(null)
            const handleMouseMove = useCallback((node) => setNodeId(node.id), [setNodeId])
            const handleMouseLeave = useCallback(() => setNodeId(null), [setNodeId])
            const getNodeSize = useMemo(
                () => node => {
                    if (nodeId !== null && nodeId === node.id) return 46
                    return 8
                },
                [nodeId]
            )        
            \`\`\`
            
            and the two scatterplots share those properties:
            
            \`\`\`
            <ResponsiveScatterPlotCanvas
                {/* other required props */}
                nodeSize={getNodeSize}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            \`\`\`
            
            This approach can also be used to synchronize another chart type.
        `,
    },
})

stories.add('custom tooltip', () => (
    <ScatterPlotCanvas
        {...commonProps}
        tooltip={({ node }) => (
            <div
                style={{
                    color: node.style.color,
                    background: '#333',
                    padding: '12px 16px',
                }}
            >
                <strong>
                    {node.id} ({node.serieId})
                </strong>
                <br />
                {`x: ${node.data.formattedX}`}
                <br />
                {`y: ${node.data.formattedY}`}
            </div>
        )}
    />
))
