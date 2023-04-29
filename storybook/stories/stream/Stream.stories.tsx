import type { Meta, StoryObj } from '@storybook/react'
import range from 'lodash/range'
import random from 'lodash/random'
import { areaCurvePropKeys } from '@nivo/core'
import { Stream } from '@nivo/stream'

const meta: Meta<typeof Stream> = {
    title: 'Stream',
    component: Stream,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stream>

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

export const Basic: Story = { render: () => <Stream {...commonProperties} /> }

const labelLookup = {
    al: 'Alabama',
    az: 'Arizona',
    nv: 'Nevada',
}

export const CustomLabel: Story = {
    render: () => (
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
    ),
}

export const FullHeight: Story = {
    argTypes: {
        curve: {
            control: 'select',
            options: areaCurvePropKeys,
        },
    },
    args: {
        curve: 'catmullRom',
    },
    render: args => <Stream {...commonProperties} offsetType="expand" curve={args.curve} />,
}

export const RegularStackedChart: Story = {
    argTypes: {
        curve: {
            control: 'select',
            options: areaCurvePropKeys,
        },
    },
    args: {
        curve: 'catmullRom',
    },
    render: args => (
        <Stream {...commonProperties} offsetType="none" axisLeft={{}} curve={args.curve} />
    ),
}

export const CustomCurve: Story = { render: () => <Stream {...commonProperties} curve="step" /> }

export const FormattingValues: Story = {
    render: () => (
        <Stream
            {...commonProperties}
            valueFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ),
}
