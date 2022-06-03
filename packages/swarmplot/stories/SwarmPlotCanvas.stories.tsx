import { storiesOf } from '@storybook/react'
import { generateSwarmPlotData } from '@nivo/generators'
import { SwarmPlotCanvas } from '../src'

const commonProps = {
    width: 700,
    height: 360,
    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    groupBy: 'group',
    identity: 'id',
    value: 'price',
    valueScale: {
        type: 'linear' as const,
        min: 0,
        max: 500,
    },
    size: 8,
    ...generateSwarmPlotData(
        ['group A', 'group B', 'group C', 'group D', 'group E', 'group F', 'group G'],
        { min: 40, max: 60 }
    ),
}

const stories = storiesOf('SwarmPlotCanvas', module)

stories.add('default', () => <SwarmPlotCanvas {...commonProps} />)

stories.add('using annotations', () => (
    <SwarmPlotCanvas
        {...commonProps}
        annotations={[
            {
                type: 'circle',
                match: { index: 100 },
                noteX: 40,
                noteY: 40,
                offset: 4,
                note: 'Node at index: 100',
            },
            {
                type: 'rect',
                match: { index: 200 },
                noteX: -40,
                noteY: -40,
                offset: 4,
                note: 'Node at index: 200',
            },
            {
                type: 'dot',
                match: { index: 300 },
                noteX: 0,
                noteY: { abs: -20 },
                size: 6,
                note: 'Node at index: 300',
            },
        ]}
    />
))

stories.add('using log scale', () => {
    // ensure that dataset has price as a non-negative value
    const data = commonProps.data.map(datum => ({
        ...datum,
        price: Math.max(1, datum.price),
    }))
    return (
        <SwarmPlotCanvas
            {...commonProps}
            data={data}
            margin={{ top: 40, right: 120, bottom: 60, left: 100 }}
            value="price"
            valueScale={{
                type: 'log' as const,
            }}
            size={6}
            enableGridY={true}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 10,
                tickValues: [1, 10, 100, 1000],
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price',
                legendPosition: 'middle',
                legendOffset: -50,
            }}
            axisBottom={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'groups',
                legendPosition: 'middle',
                legendOffset: 40,
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    itemHeight: 20,
                    itemWidth: 80,
                    translateY: 0,
                    translateX: 100,
                },
            ]}
        />
    )
})
