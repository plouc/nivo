import type { Meta, StoryObj } from '@storybook/react'
import {
    generateParallelCoordinatesData,
    generateGroupedParallelCoordinatesData,
} from '@nivo/generators'
import { ParallelCoordinates, ParallelCoordinatesProps } from '@nivo/parallel-coordinates'
import { nivoTheme } from '../nivo-theme'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof ParallelCoordinates> = {
    title: 'ParallelCoordinates',
    component: ParallelCoordinates,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ParallelCoordinates>

const variables = [
    {
        id: 'temp',
        label: 'temperature',
        value: 'temp',
        range: [-10, 40] as [number, number],
        legendOffset: 16,
        legendPosition: 'start' as const,
    },
    {
        id: 'cost',
        value: 'cost',
        range: [200, 40000] as [number, number],
        min: 0,
        legendOffset: 16,
        legendPosition: 'start' as const,
    },
    {
        id: 'weight',
        value: 'weight',
        range: [10, 300] as [number, number],
        legendOffset: 16,
        legendPosition: 'start' as const,
    },
    {
        id: 'volume',
        value: 'volume',
        range: [0.2, 7.6] as [number, number],
        min: 0,
        legendOffset: 16,
        legendPosition: 'start' as const,
    },
]
const data = generateParallelCoordinatesData({
    ids: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }, { id: 'F' }],
    variables,
})

const groupedVariables = [
    {
        id: 'width',
        value: 'width',
        min: 0,
        max: 100,
        range: [0, 100] as [number, number],
        legendOffset: 16,
    },
    {
        id: 'height',
        value: 'height',
        min: 0,
        max: 100,
        range: [0, 100] as [number, number],
        legendOffset: 16,
    },
    {
        id: 'depth',
        value: 'depth',
        min: 0,
        max: 100,
        range: [0, 100] as [number, number],
        legendOffset: 16,
    },
    {
        id: 'weight',
        value: 'weight',
        min: 0,
        max: 1000,
        range: [0, 1000] as [number, number],
        legendOffset: 16,
    },
    {
        id: 'price',
        value: 'price',
        min: 0,
        max: 10,
        range: [0, 10] as [number, number],
        legendOffset: 16,
    },
]
const groupedData = generateGroupedParallelCoordinatesData({
    ids: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }, { id: 'F' }],
    groups: [
        { id: 'group_00' },
        { id: 'group_01' },
        { id: 'group_02' },
        { id: 'group_03' },
        { id: 'group_04' },
        { id: 'group_05' },
        { id: 'group_06' },
    ],
    variables: groupedVariables,
})

const commonProperties: ParallelCoordinatesProps<any, any> = {
    width: 800,
    height: 500,
    margin: {
        top: 10,
        right: 30,
        bottom: 10,
        left: 50,
    },
    theme: {
        ...nivoTheme,
        text: {
            ...nivoTheme.text,
            outlineWidth: 2,
            outlineColor: '#ffffff',
        },
        axis: {
            ticks: {
                line: {
                    strokeWidth: 1,
                    strokeLinecap: 'square',
                },
            },
            domain: {
                line: {
                    stroke: 'rgb(119, 119, 119)',
                    strokeWidth: 1,
                    strokeLinecap: 'square',
                },
            },
            legend: {
                text: {
                    fontWeight: 'bold',
                },
            },
        },
    },
    data,
    variables,
}

export const Basic: Story = {
    render: () => <ParallelCoordinates {...commonProperties} />,
}

export const FormattedValues: Story = {
    render: () => (
        <ParallelCoordinates
            {...commonProperties}
            variables={[
                {
                    ...variables[0],
                    tickFormat: (value: number) => `${value} °C`,
                },
                {
                    ...variables[1],
                    tickFormat: (value: number) => `$${value}`,
                },
                {
                    ...variables[2],
                    tickFormat: (value: number) => `${value} kg`,
                },
                {
                    ...variables[3],
                    tickFormat: (value: number) => `${value} L`,
                },
            ]}
        />
    ),
}

export const Grouped: Story = {
    render: () => {
        return (
            <ParallelCoordinates
                {...commonProperties}
                data={groupedData}
                variables={groupedVariables}
                groupBy="group"
                curve="monotoneX"
            />
        )
    },
}

export const CustomTooltip: Story = {
    render: () => {
        return (
            <ParallelCoordinates
                {...commonProperties}
                data={data}
                variables={variables}
                tooltip={CustomTooltipComponent}
            />
        )
    },
}
