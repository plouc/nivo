import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { TreeMapHtml } from '../src'

const commonProperties = {
    width: 900,
    height: 400,
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    valueFormat: '.02s',
    label: 'name',
    labelSkipRadius: 16,
}

storiesOf('TreeMapHtml', module).add('custom tooltip', () => (
    <TreeMapHtml
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
