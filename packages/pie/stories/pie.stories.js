import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Pie } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: generateProgrammingLanguageStats(true, 9).map(({ label, ...d }) => ({
        id: label,
        ...d,
    })),
    animate: true,
}

const legends = [
    {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
            {
                on: 'hover',
                style: {
                    itemTextColor: '#000',
                },
            },
        ],
    },
]

const stories = storiesOf('Pie', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
    <Pie {...commonProperties} legends={boolean('legends', false) ? legends : []} />
))

stories.add('donut', () => <Pie {...commonProperties} innerRadius={0.6} />)

stories.add('fancy slices', () => (
    <Pie
        {...commonProperties}
        innerRadius={0.6}
        padAngle={0.5}
        cornerRadius={5}
        radialLabelsLinkColor="inherit"
        radialLabelsLinkStrokeWidth={3}
        radialLabelsTextColor="inherit:darker(1.2)"
    />
))

stories.add('custom radial label', () => (
    <Pie
        {...commonProperties}
        innerRadius={0.6}
        padAngle={0.5}
        cornerRadius={5}
        radialLabel={d => `${d.id}: ${d.value}`}
        radialLabelsLinkColor="inherit"
        radialLabelsLinkStrokeWidth={3}
        radialLabelsTextColor="inherit:darker(1.2)"
        enableSlicesLabels={false}
    />
))

stories.add('formatted tooltip values', () => (
    <Pie
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
    <Pie
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

stories.add('enter/leave (check console)', () => (
    <Pie
        {...commonProperties}
        onMouseEnter={(data, e) => {
            console.log({ is: 'mouseenter', data, event: e }) // eslint-disable-line
        }}
        onMouseLeave={(data, e) => {
            console.log({ is: 'mouseleave', data, event: e }) // eslint-disable-line
        }}
    />
))
