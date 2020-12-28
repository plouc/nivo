import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
// @ts-ignore
import { linearGradientDef, patternDotsDef, useTheme } from '@nivo/core'
// @ts-ignore
import { generateLibTree } from '@nivo/generators'
// @ts-ignore
import { Sunburst, ComputedDatum, SunburstCustomLayerProps } from '../src'

interface RawDatum {
    name: string
    loc: number
}

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
    <Sunburst<RawDatum>
        {...commonProperties}
        childColor={{ from: 'color', modifiers: [['brighter', 0.13]] }}
    />
))

stories.add('with child colors independent of parent', () => (
    <Sunburst<RawDatum> {...commonProperties} childColor="noinherit" />
))

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']

stories.add('with custom colors', () => (
    <Sunburst<RawDatum> {...commonProperties} colors={customPalette} />
))

stories.add('with formatted tooltip value', () => (
    <Sunburst<RawDatum> {...commonProperties} valueFormat=" >-$,.2f" />
))

const CustomTooltip = ({ id, value, color }: ComputedDatum<unknown>) => {
    const theme = useTheme()

    return (
        <strong style={{ ...theme.tooltip.container, color }}>
            {id}: {value}
        </strong>
    )
}

stories.add('custom tooltip', () => (
    <Sunburst<RawDatum>
        {...commonProperties}
        tooltip={CustomTooltip}
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
    <Sunburst<RawDatum>
        {...commonProperties}
        onMouseEnter={action('onMouseEnter')}
        onMouseLeave={action('onMouseLeave')}
    />
))

stories.add('patterns & gradients', () => (
    <Sunburst<RawDatum>
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
                size: 2,
                padding: 3,
                stagger: true,
            }),
        ]}
        fill={[
            {
                match: (node: ComputedDatum<RawDatum>) =>
                    ['viz', 'text', 'utils'].includes(node.id),
                id: 'gradient',
            },
            {
                match: (node: ComputedDatum<RawDatum>) =>
                    ['set', 'generators', 'misc'].includes(node.id),
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
                <Sunburst<RawDatum>
                    {...commonProperties}
                    animate={boolean('animate', true)}
                    motionConfig={select(
                        'motion config',
                        ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'],
                        'gentle'
                    )}
                    enableArcLabels
                    arcLabelsSkipAngle={12}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                    }}
                    data={data}
                    transitionMode="pushIn"
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

const CenteredMetric = ({ nodes, centerX, centerY }: SunburstCustomLayerProps<RawDatum>) => {
    const total = nodes.reduce((total, datum) => total + datum.value, 0)

    return (
        <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fontSize: '42px',
                fontWeight: 600,
            }}
        >
            {Number.parseFloat(`${total}`).toExponential(2)}
        </text>
    )
}

stories.add('adding a metric in the center using a custom layer', () => (
    <Sunburst<RawDatum> {...commonProperties} layers={['arcs', 'arcLabels', CenteredMetric]} />
))
