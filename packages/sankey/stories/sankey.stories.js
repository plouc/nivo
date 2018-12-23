import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { generateSankeyData, randColor } from '@nivo/generators'
import { Sankey } from '../index'

const sankeyData = generateSankeyData({ nodeCount: 11, maxIterations: 2 })
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 0, right: 80, bottom: 0, left: 80 },
    data: sankeyData,
    colors: 'category10',
}

const stories = storiesOf('Sankey', module).addDecorator(story => (
    <div className="wrapper">{story()}</div>
))

stories.add('default', withInfo()(() => <Sankey {...commonProperties} />))

stories.add(
    'custom align (right)',
    withInfo()(() => <Sankey {...commonProperties} align="right" />)
)

stories.add(
    'outside labels',
    withInfo()(() => <Sankey {...commonProperties} labelPosition="outside" />)
)

stories.add(
    'vertical labels',
    withInfo()(() => <Sankey {...commonProperties} labelOrientation="vertical" labelPadding={20} />)
)

stories.add(
    'nodes x padding',
    withInfo()(() => (
        <Sankey {...commonProperties} nodePaddingX={6} nodeWidth={24} nodeBorderWidth={0} />
    ))
)

stories.add(
    'contracting links',
    withInfo()(() => <Sankey {...commonProperties} linkContract={10} />)
)

stories.add(
    'click listener (console)',
    withInfo()(() => (
        <Sankey {...commonProperties} onClick={(data, event) => console.log({ data, event })} />
    ))
)

stories.add(
    'label formatter',
    withInfo()(() => <Sankey {...commonProperties} label={node => `${node.id} 😁`} />)
)

stories.add(
    'custom tooltip',
    withInfo()(() => (
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
)

stories.add(
    'with formatted values',
    withInfo()(() => (
        <Sankey
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
)

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

stories.add(
    'with custom node & link coloring',
    withInfo()(() => (
        <Sankey
            {...randColorProperties}
            enableLinkGradient={true}
            colorBy={node => node.nodeColor}
        />
    ))
)
