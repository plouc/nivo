import { storiesOf } from '@storybook/react'
import { generateXYSeries } from '@nivo/generators'
// @ts-ignore
import { HeatMapCanvas } from '../src'
// @ts-ignore
import { CustomTooltip } from './CustomTooltip'

const sampleData = generateXYSeries({
    serieIds: ['Japan', 'France', 'US', 'Germany', 'Norway', 'Iceland', 'UK', 'Vietnam'],
    x: {
        values: ['Train', 'Subway', 'Bus', 'Car', 'Boat', 'Moto', 'Moped', 'Bicycle', 'Others'],
    },
    y: {
        length: NaN,
        min: -100_000,
        max: 100_000,
        round: true,
    },
})

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: sampleData,
}

const stories = storiesOf('HeatMapCanvas', module)

stories.add('default', () => <HeatMapCanvas<any, Record<string, unknown>> {...commonProperties} />)

stories.add('Variable Cell Size', () => (
    <HeatMapCanvas<any, Record<string, unknown>>
        {...commonProperties}
        valueFormat=">-.2s"
        renderCell="circle"
        sizeVariation={{
            sizes: [0.6, 1],
        }}
        forceSquare
        enableGridX={true}
        enableGridY={true}
    />
))

stories.add('Custom Tooltip', () => (
    <HeatMapCanvas<any, Record<string, unknown>>
        {...commonProperties}
        valueFormat=">-.2s"
        colors={{
            type: 'quantize',
            scheme: 'red_yellow_blue',
            steps: 7,
        }}
        tooltip={CustomTooltip}
    />
))
