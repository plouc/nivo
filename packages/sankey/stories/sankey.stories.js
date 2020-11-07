import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateSankeyData, randColor } from '@nivo/generators'
import { Sankey } from '../src'

const sankeyData = generateSankeyData({ nodeCount: 11, maxIterations: 2 })
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 0, right: 80, bottom: 0, left: 80 },
    data: sankeyData,
    colors: { scheme: 'category10' },
}

const stories = storiesOf('Sankey', module)

stories.add('default', () => <Sankey {...commonProperties} />)

stories.add('custom align (end)', () => <Sankey {...commonProperties} align="end" />)

stories.add('outside labels', () => <Sankey {...commonProperties} labelPosition="outside" />)

stories.add('vertical labels', () => (
    <Sankey {...commonProperties} labelOrientation="vertical" labelPadding={20} />
))

stories.add('nodes x padding', () => (
    <Sankey {...commonProperties} nodePaddingX={6} nodeWidth={24} nodeBorderWidth={0} />
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
        nodeTooltip={node => <span>Custom tooltip for node: {node.label}</span>}
        linkTooltip={node => (
            <span>
                Custom tooltip for link: {node.source.label} to {node.target.label}
            </span>
        )}
    />
))

stories.add('with formatted values', () => (
    <Sankey
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

const dataWithRandLinkColors = data => {
    return {
        nodes: data.nodes.map(node => ({
            ...node,
            nodeColor: 'blue',
        })),
        links: data.links.map(link => ({
            ...link,
            startColor: randColor(),
            endColor: randColor(),
        })),
    }
}

const randColorProperties = {
    width: commonProperties.width,
    height: commonProperties.height,
    margin: commonProperties.margin,
    data: dataWithRandLinkColors(sankeyData),
    colors: commonProperties.colors,
}

stories.add('with custom node & link coloring', () => (
    <Sankey {...randColorProperties} enableLinkGradient={true} colorBy={node => node.nodeColor} />
))

const minNodeValueOnTop = (nodeA, nodeB) => {
    if (nodeA.value < nodeB.value) return -1
    if (nodeA.value > nodeB.value) return 1
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
                { id: 'foo_left', color: '#ff0000' },
                { id: 'bar_left', color: '#0000ff' },
                { id: 'baz_left', color: '#00ff00' },
                { id: 'foo_right', color: '#ff0000' },
                { id: 'bar_right', color: '#0000ff' },
                { id: 'baz_right', color: '#00ff00' },
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
        colors={d => d.color ?? ''}
        sort="input"
        enableLinkGradient
    />
))
