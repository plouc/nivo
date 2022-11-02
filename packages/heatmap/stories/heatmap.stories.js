import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateCountriesData } from '@bitbloom/nivo-generators'
import { HeatMap } from '../src'

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
            dominantBaseline="central"
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

const stories = storiesOf('HeatMap', module)

stories.add('default', () => <HeatMap {...commonProperties} />)

stories.add('square cells', () => (
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

stories.add('circle cells', () => (
    <HeatMap {...commonProperties} cellShape="circle" padding={2} enableGridY={true} />
))

stories.add('alternative colors', () => <HeatMap {...commonProperties} colors="BrBG" />)

stories.add('variable cell size', () => (
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

stories.add('Custom cell component', () => (
    <HeatMap
        {...commonProperties}
        cellShape={CustomCell}
        padding={4}
        colors="GnBu"
        labelTextColor="inherit:darker(1.6)"
    />
))

stories.add('with formatted values', () => (
    <HeatMap
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
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

stories.add('large tooltip', () => (
    <div style={{ backgroundColor: 'pink', overflow: 'hidden' }} className='tooltip-clip'>
        <div
            style={{ overflow: 'auto', position: 'relative', backgroundColor: 'greenyellow' }}
            className='tooltip-clip'
        >
            <div
                style={{
                    display: 'inline-block',
                    float: 'right',
                    backgroundColor: 'skyblue',
                    overflow: 'hidden',
                    width: '100%',
                }}
            >
                <HeatMap
                    {...commonProperties}
                    tooltip={({ xKey, yKey, value, color }) => (
                        <strong style={{ color }}>
                            ⭐-------------------------------- {xKey} / {yKey}: {value}{' '}
                            --------------------------------⭐
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
            </div>
        </div>
        <div
            style={{ overflow: 'auto', position: 'relative', backgroundColor: 'greenyellow' }}
            className='tooltip-clip'
        >
            <div style={{ width: '200vw' }}>
                <div
                    style={{
                        position: 'relative',
                        marginLeft: '40vw',
                        marginRight: '40vw',
                        backgroundColor: 'skyblue',
                    }}
                >
                    <HeatMap
                        {...commonProperties}
                        tooltip={({ xKey, yKey, value, color }) => (
                            <strong style={{ color }}>
                                ⭐-------------------------------- {xKey} / {yKey}: {value}{' '}
                                --------------------------------⭐
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
                </div>
            </div>
        </div>
        <HeatMap
            {...commonProperties}
            tooltip={({ xKey, yKey, value, color }) => (
                <strong style={{ color }}>
                    ⭐-------------------------------- {xKey} / {yKey}: {value}{' '}
                    --------------------------------⭐
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
    </div>
))
