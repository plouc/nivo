import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateSankeyData } from '@nivo/generators'
import { Sankey } from '@nivo/sankey'

const commonProperties = {
    width: 1100,
    height: 700,
    margin: { top: 0, right: 80, bottom: 0, left: 80 },
    data: generateSankeyData({ nodeCount: 11, maxIterations: 2 }),
    colors: 'd320b',
}

const stories = storiesOf('Sankey', module).addDecorator(story => (
    <div className="wrapper">{story()}</div>
))

stories.add('default', () => <Sankey {...commonProperties} />)

stories.add('custom align (right)', () => <Sankey {...commonProperties} align="right" />)

stories.add('outside labels', () => <Sankey {...commonProperties} labelPosition="outside" />)

stories.add('vertical labels', () => (
    <Sankey {...commonProperties} labelOrientation="vertical" labelPadding={20} />
))

stories.add('nodes x padding', () => (
    <Sankey {...commonProperties} nodePaddingX={6} nodeWidth={24} nodeBorderWidth={0} />
))

stories.add('contracting links', () => <Sankey {...commonProperties} linkContract={10} />)

stories.add('click listener (console)', () => (
    // eslint-disable-next-line no-console
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
