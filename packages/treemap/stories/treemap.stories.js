import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { linearGradientDef, patternDotsDef } from '@nivo/core'
import { TreeMap } from '../src'

const commonProperties = {
    width: 900,
    height: 400,
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    valueFormat: '.02s',
    labelSkipSize: 16,
}

const stories = storiesOf('TreeMap', module)

stories.add('custom tooltip', () => (
    <TreeMap
        {...commonProperties}
        tooltip={({ node }) => (
            <strong style={{ color: node.color }}>
                {node.pathComponents.join(' / ')}: {node.formattedValue}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
    />
))

stories.add('patterns & gradients', () => (
    <TreeMap
        {...commonProperties}
        nodeOpacity={1}
        labelTextColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        parentLabelTextColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        defs={[
            linearGradientDef('gradient', [
                { offset: 0, color: '#ffffff' },
                { offset: 15, color: 'inherit' },
                { offset: 100, color: 'inherit' },
            ]),
            patternDotsDef('pattern', {
                background: 'inherit',
                color: '#ffffff',
                size: 1,
                padding: 4,
                stagger: true,
            }),
        ]}
        fill={[
            {
                match: node => ['viz', 'text', 'utils'].includes(node.pathComponents[1]),
                id: 'gradient',
            },
            {
                match: node => ['set', 'generators', 'misc'].includes(node.pathComponents[1]),
                id: 'pattern',
            },
        ]}
    />
))
