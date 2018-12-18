import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { generateCountriesData } from '@nivo/generators'
import { HeatMap } from '../index'

const CustomCell = ({
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    textColor,
}) => (
    <g transform={`translate(${x}, ${y})`}>
        <path
            transform={`rotate(${value < 50 ? 180 : 0})`}
            fill={color}
            fillOpacity={opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            d={`
                M0 -${Math.round(height / 2)}
                L${Math.round(width / 2)} ${Math.round(height / 2)}
                L-${Math.round(width / 2)} ${Math.round(height / 2)}
                L0 -${Math.round(height / 2)}
            `}
        />
        <text
            alignmentBaseline="central"
            textAnchor="middle"
            style={{ fill: textColor }}
            dy={value < 50 ? -6 : 6}
        >
            {value}
        </text>
    </g>
)

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

const stories = storiesOf('HeatMap', module).addDecorator(story => (
    <div className="wrapper">{story()}</div>
))

stories.add('default', withInfo()(() => <HeatMap {...commonProperties} />))

stories.add(
    'square cells',
    withInfo()(() => (
        <HeatMap
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
)

stories.add(
    'circle cells',
    withInfo()(() => (
        <HeatMap {...commonProperties} cellShape="circle" padding={2} enableGridY={true} />
    ))
)

stories.add('alternative colors', withInfo()(() => <HeatMap {...commonProperties} colors="BrBG" />))

stories.add(
    'variable cell size',
    withInfo()(() => (
        <HeatMap
            {...commonProperties}
            colors="BuPu"
            cellShape="circle"
            padding={2}
            sizeVariation={0.6}
            enableGridX={true}
            enableGridY={true}
        />
    ))
)

stories.add(
    'Custom cell component',
    withInfo()(() => (
        <HeatMap
            {...commonProperties}
            cellShape={CustomCell}
            padding={4}
            colors="GnBu"
            labelTextColor="inherit:darker(1.6)"
        />
    ))
)

stories.add(
    'with formatted values',
    withInfo()(() => (
        <HeatMap
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
)

stories.add(
    'with default highlighted cells',
    withInfo()(() => (
        <HeatMap {...commonProperties} defaultCurrentNode={{ xKey: 'donut', yKey: 'AI' }} />
    ))
)

stories.add(
    'custom tooltip',
    withInfo()(() => (
        <HeatMap
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
)
