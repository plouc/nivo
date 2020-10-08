import type { Meta, StoryObj } from '@storybook/react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { Bump, BumpPoint, BumpSvgProps } from '@bitbloom/nivo-bump'

const meta: Meta<typeof Bump> = {
    title: 'Bump',
    component: Bump,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Bump>

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

const commonProps: BumpSvgProps<any, any> = {
    width: 900,
    height: 360,
    margin: { top: 40, right: 100, bottom: 40, left: 100 },
    data: generateData(),
}

export const Basic: Story = {
    render: () => <Bump {...commonProps} />,
}

const CustomPointComponent = ({ point }: { point: BumpPoint<any, any> }) => {
    return (
        <g transform={`translate(${point.x}, ${point.y})`} style={{ pointerEvents: 'none' }}>
            <rect
                x={point.size * -0.5 - 4}
                y={point.size * -0.5 + 4}
                width={point.size + point.borderWidth}
                height={point.size + point.borderWidth}
                fill="rgba(0, 0, 0, .07)"
            />
            <rect
                x={point.size * -0.5}
                y={point.size * -0.5}
                width={point.size}
                height={point.size}
                fill={point.color}
                stroke={point.borderColor}
                strokeWidth={point.borderWidth}
            />
            {point.isActive && (
                <text textAnchor="middle" y={4} fill={point.borderColor}>
                    A
                </text>
            )}
            {point.isInactive && (
                <text textAnchor="middle" y={4} fill={point.borderColor}>
                    I
                </text>
            )}
        </g>
    )
}

export const CustomPoints: Story = {
    render: () => (
        <Bump<Datum>
            {...commonProps}
            pointComponent={CustomPointComponent}
            pointSize={20}
            activePointSize={24}
            inactivePointSize={16}
            pointBorderWidth={2}
            activePointBorderWidth={4}
            inactivePointBorderWidth={1}
            pointColor="#ffffff"
            pointBorderColor={{ from: 'serie.color' }}
        />
    ),
}

export const MissingData: Story = {
    render: () => (
        <Bump<{ x: number; y: number | null }>
            {...commonProps}
            pointSize={12}
            activePointSize={16}
            inactivePointSize={8}
            data={[
                {
                    id: 'Serie A',
                    data: [
                        // missing data at the beginning
                        { x: 0, y: null },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                        { x: 3, y: 2 },
                        { x: 4, y: 2 },
                    ],
                },
                {
                    id: 'Serie B',
                    data: [
                        { x: 0, y: 1 },
                        { x: 1, y: 2 },
                        // missing data in the middle
                        { x: 2, y: null },
                        { x: 3, y: 3 },
                        { x: 4, y: 3 },
                    ],
                },
                {
                    id: 'Serie C',
                    data: [
                        { x: 0, y: 3 },
                        { x: 1, y: 3 },
                        { x: 2, y: 3 },
                        { x: 3, y: 1 },
                        // missing data at the end
                        { x: 4, y: null },
                    ],
                },
            ]}
        />
    ),
}

export const MoreSeriesThanRanks: Story = {
    render: () => (
        <Bump<{ x: number; y: number | null }>
            {...commonProps}
            data={generateData().map(series => ({
                ...series,
                data: series.data.map(datum => ({
                    x: datum.x,
                    y: datum.y >= 5 ? null : datum.y,
                })),
            }))}
        />
    ),
}
