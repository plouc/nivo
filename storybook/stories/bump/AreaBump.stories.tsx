import type { Meta, StoryObj } from '@storybook/react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { AreaBump, AreaBumpSvgProps } from '@nivo/bump'

const meta: Meta<typeof AreaBump> = {
    title: 'AreaBump',
    component: AreaBump,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AreaBump>

interface Datum {
    x: number
    y: number
    extra: number
}

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 7)

    const series = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [] as Datum[],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
                extra: Math.random(),
            })
        })
    })

    return series
}

const commonProps: AreaBumpSvgProps<any, any> = {
    width: 900,
    height: 360,
    margin: { top: 40, right: 100, bottom: 40, left: 100 },
    data: generateData(),
}

export const AreaWithFillPattern: Story = {
    render: () => (
        <AreaBump<Datum>
            {...commonProps}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'Serie 3',
                    },
                    id: 'lines',
                },
                {
                    match: {
                        id: 'Serie 5',
                    },
                    id: 'dots',
                },
            ]}
        />
    ),
}
