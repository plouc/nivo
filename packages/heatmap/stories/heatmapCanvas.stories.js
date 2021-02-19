import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateCountriesData } from '@nivo/generators'
import { HeatMapCanvas } from '../src'

const keys = [
    'hot dogs',
    'burgers',
    'sandwich',
    'kebab',
    'fries',
    'donut',
    'junk',
    'sushi',
    'ramen',
    'curry',
    'udon',
    'bagel',
]
const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 9, min: 0, max: 100 }),
    indexBy: 'country',
    keys,
}

const stories = storiesOf('HeatMapCanvas', module)

stories.add('default', () => <HeatMapCanvas {...commonProperties} />)

stories.add('square cells', () => (
    <HeatMapCanvas
        {...commonProperties}
        forceSquare={true}
        axisTop={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -55,
            legend: '',
            legendOffset: 36,
        }}
    />
))

stories.add('circle cells', () => (
    <HeatMapCanvas {...commonProperties} cellShape="circle" padding={2} enableGridY={true} />
))

stories.add('alternative colors', () => <HeatMapCanvas {...commonProperties} colors="BrBG" />)

stories.add('variable cell size', () => (
    <HeatMapCanvas
        {...commonProperties}
        colors="BuPu"
        cellShape="circle"
        padding={2}
        sizeVariation={0.6}
        enableGridX={true}
        enableGridY={true}
    />
))

stories.add('with formatted values', () => (
    <HeatMapCanvas
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('with formatted labels', () => (
    <HeatMapCanvas
        {...commonProperties}
        label={(datum, key) =>
            `${Number(datum[key]).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
    <HeatMapCanvas
        {...commonProperties}
        tooltip={({ xKey, yKey, value, color }) => (
            <strong style={{ color }}>
                {xKey} / {yKey}: {value}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: 'gray',
                },
            },
        }}
    />
))
