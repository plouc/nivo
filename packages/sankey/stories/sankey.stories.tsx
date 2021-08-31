import { storiesOf } from '@storybook/react'
import { generateSankeyData, randColor } from '@nivo/generators'
import { SankeyNodeMinimal } from 'd3-sankey'
// @ts-ignore
import { Sankey } from '../src'

const sankeyData = generateSankeyData({ nodeCount: 11, maxIterations: 2 })
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 0, right: 80, bottom: 0, left: 80 },
    data: sankeyData,
    colors: { scheme: 'category10' as const },
}

const stories = storiesOf('Sankey', module)

stories.add('default', () => <Sankey {...commonProperties} />)

stories.add('custom align (end)', () => <Sankey {...commonProperties} align="end" />)

stories.add('outside labels', () => <Sankey {...commonProperties} labelPosition="outside" />)

stories.add('vertical labels', () => (
    <Sankey {...commonProperties} labelOrientation="vertical" labelPadding={20} />
))

stories.add('contracting links', () => <Sankey {...commonProperties} linkContract={10} />)

stories.add('click listener (console)', () => (
    <Sankey {...commonProperties} onClick={(data, event) => console.log({ data, event })} />
))

stories.add('label formatter', () => (
    <Sankey {...commonProperties} label={node => `${node.id} 😁`} />
))

stories.add('custom tooltip', () => (
    <Sankey
        {...commonProperties}
        nodeTooltip={({ node }) => <span>Custom tooltip for node: {node.label}</span>}
        linkTooltip={({ link }) => (
            <span>
                Custom tooltip for link: {link.source.label} to {link.target.label}
            </span>
        )}
    />
))

stories.add('with formatted values', () => (
    <Sankey
        {...commonProperties}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

const dataWithRandLinkColors = (data: typeof sankeyData) => ({
    nodes: data.nodes.map(node => ({
        ...node,
        nodeColor: 'blue',
    })),
    links: data.links.map(link => ({
        ...link,
        startColor: randColor(),
        endColor: randColor(),
    })),
})

stories.add('with custom node & link coloring', () => (
    <Sankey
        {...commonProperties}
        data={dataWithRandLinkColors(sankeyData)}
        enableLinkGradient={true}
        colors={node => node.nodeColor}
    />
))

const minNodeValueOnTop = (
    nodeA: SankeyNodeMinimal<any, any>,
    nodeB: SankeyNodeMinimal<any, any>
) => {
    if (nodeA.value! < nodeB.value!) return -1
    if (nodeA.value! > nodeB.value!) return 1
    return 0
}

stories.add('with reverse sort ordering (min node value on top)', () => (
    <Sankey {...commonProperties} sort={minNodeValueOnTop} />
))

stories.add('sort links by input', () => (
    <Sankey
        {...commonProperties}
        data={{
            nodes: [
                { id: 'foo_left', nodeColor: '#ff0000' },
                { id: 'bar_left', nodeColor: '#0000ff' },
                { id: 'baz_left', nodeColor: '#00ff00' },
                { id: 'foo_right', nodeColor: '#ff0000' },
                { id: 'bar_right', nodeColor: '#0000ff' },
                { id: 'baz_right', nodeColor: '#00ff00' },
            ],
            links: [
                { source: 'foo_left', target: 'bar_right', value: 5 },
                { source: 'foo_left', target: 'baz_right', value: 5 },
                { source: 'bar_left', target: 'foo_right', value: 5 },
                { source: 'bar_left', target: 'bar_right', value: 5 },
                { source: 'bar_left', target: 'baz_right', value: 5 },
                { source: 'baz_left', target: 'bar_right', value: 5 },
            ],
        }}
        colors={node => node.nodeColor}
        sort="input"
        enableLinkGradient
    />
))
