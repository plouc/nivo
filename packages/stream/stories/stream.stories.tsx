import range from 'lodash/range'
import random from 'lodash/random'
import { Meta } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
// @ts-ignore
import { areaCurvePropKeys } from '@nivo/core'
// @ts-ignore
import { Stream } from '../src'

export default {
    component: Stream,
    title: 'Stream',
    decorators: [withKnobs],
} as Meta

const keys = ['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']

const commonProperties = {
    width: 900,
    height: 360,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    keys,
    data: range(16).map(() =>
        keys.reduce((layer, key) => {
            layer[key] = random(10, 200)
            return layer
        }, {} as any)
    ),
    animate: true,
}

export const Default = () => <Stream {...commonProperties} />

const labelLookup = {
    al: 'Alabama',
    az: 'Arizona',
    nv: 'Nevada',
}

export const CustomLabel = () => (
    <Stream
        {...commonProperties}
        data={range(16).map(() =>
            Object.keys(labelLookup).reduce((layer, key) => {
                layer[key] = random(10, 200)
                return layer
            }, {} as any)
        )}
        keys={Object.keys(labelLookup)}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        label={d => labelLookup[d.id as keyof typeof labelLookup]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                        },
                    },
                ],
            },
        ]}
    />
)

export const fullHeight = () => (
    <Stream
        {...commonProperties}
        offsetType="expand"
        curve={select('curve', areaCurvePropKeys, 'catmullRom')}
    />
)

export const regularStackedChart = () => (
    <Stream
        {...commonProperties}
        offsetType="none"
        axisLeft={{}}
        curve={select('curve', areaCurvePropKeys, 'catmullRom')}
    />
)

export const CustomCurve = () => <Stream {...commonProperties} curve="step" />

export const formattingValues = () => (
    <Stream
        {...commonProperties}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
)
