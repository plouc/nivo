import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { generateLibTree } from '@nivo/generators'
// @ts-ignore
import { linearGradientDef, patternDotsDef } from '@nivo/core'
import { Sunburst } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    id: 'name',
    value: 'loc',
}

const stories = storiesOf('Sunburst', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Sunburst {...commonProperties} />)

stories.add('with child color modifier', () => (
    <Sunburst
        {...commonProperties}
        childColor={{ from: 'color', modifiers: [['brighter', 0.13]] }}
    />
))

stories.add('with child colors independent of parent', () => (
    <Sunburst {...commonProperties} childColor="noinherit" />
))

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']

stories.add('with custom colors', () => (
    <Sunburst
        {...commonProperties}
        colors={({ value }) => customPalette[value % (customPalette.length - 1)]}
        childColor="noinherit"
    />
))

stories.add('with formatted tooltip value', () => (
    <Sunburst
        {...commonProperties}
        tooltipFormat={value => {
            return `~${typeof value === 'number' ? Math.floor(value) : value}%`
        }}
    />
))

stories.add('custom tooltip', () => (
    <Sunburst
        {...commonProperties}
        tooltip={({ id, value, color }) => (
            <strong style={{ color }}>
                {id}: {value}
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

stories.add('enter/leave (check actions)', () => (
    <Sunburst
        {...commonProperties}
        onMouseEnter={action('onMouseEnter')}
        onMouseLeave={action('onMouseLeave')}
    />
))

stories.add('patterns & gradients', () => (
    <Sunburst
        {...commonProperties}
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
                match: node => ['viz', 'text', 'utils'].includes(node.data.id),
                id: 'gradient',
            },
            {
                match: node => ['set', 'generators', 'misc'].includes(node.data.id),
                id: 'pattern',
            },
        ]}
    />
))

const flatten = data =>
    data.reduce((acc, item) => {
        if (item.children) {
            return [...acc, item, ...flatten(item.children)]
        }

        return [...acc, item]
    }, [])

const findObject = (data, name) => data.find(searchedName => searchedName.name === name)

stories.add(
    'children drill down',
    () => {
        const [data, setData] = useState(commonProperties.data)

        return (
            <>
                <button onClick={() => setData(commonProperties.data)}>Reset</button>
                <Sunburst
                    {...commonProperties}
                    animate={boolean('animate', false)}
                    motionConfig={select(
                        'motion config',
                        ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'],
                        'gentle'
                    )}
                    data={data}
                    onClick={clickedData => {
                        const foundObject = findObject(flatten(data.children), clickedData.id)
                        if (foundObject && foundObject.children) {
                            setData(foundObject)
                        }
                    }}
                />
            </>
        )
    },
    {
        info: {
            text: `
            You can drill down into individual children by clicking on them
        `,
        },
    }
)
