import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { line, curveLinearClosed } from 'd3-shape'
import { Voronoi, VoronoiCustomLayerProps } from '@nivo/voronoi'

const meta: Meta<typeof Voronoi> = {
    title: 'Voronoi',
    component: Voronoi,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Voronoi>

const lineGenerator = line<[number, number]>().curve(curveLinearClosed)

const nekoSize = 75
const nekoHalfSize = nekoSize / 2

const Neko = ({ x, y }: { x: number; y: number }) => {
    const points: [number, number][] = [
        [x, y - nekoHalfSize + nekoSize * 0.2],

        // right ear
        [x + nekoSize * 0.25, y - nekoHalfSize + nekoSize * 0.2],
        [x + nekoHalfSize, y - nekoHalfSize],

        // jaw right
        [x + nekoHalfSize, y + nekoHalfSize * 0.35],
        [x + nekoSize * 0.1, y + nekoHalfSize],

        [x, y + nekoHalfSize],

        // jaw left
        [x - nekoSize * 0.1, y + nekoHalfSize],
        [x - nekoHalfSize, y + nekoHalfSize * 0.35],

        // left ear
        [x - nekoHalfSize, y],
        [x - nekoHalfSize, y - nekoHalfSize],
        [x - nekoHalfSize + nekoSize * 0.25, y - nekoHalfSize + nekoSize * 0.2],
        [x, y - nekoHalfSize + nekoSize * 0.2],
    ]

    return (
        <>
            <path
                d={lineGenerator(points) ?? undefined}
                fill="black"
                stroke="black"
                strokeWidth={5}
                strokeLinejoin="round"
            />
            <path
                fill="#de83cd"
                stroke="#de83cd"
                strokeWidth={6}
                strokeLinejoin="round"
                d={`
                    M${x - nekoSize * 0.06},${y + nekoSize * 0.1}
                    L${x + nekoSize * 0.06},${y + nekoSize * 0.1}
                    L${x},${y + nekoSize * 0.14}
                    Z
                `}
            />
            <circle
                fill="#c7bd61"
                cx={x - nekoSize * 0.22}
                cy={y - nekoSize * 0.05}
                r={nekoSize * 0.13}
                stroke="black"
                strokeWidth={2}
            />
            <circle
                fill="black"
                cx={x - nekoSize * 0.22}
                cy={y - nekoSize * 0.05}
                r={nekoSize * 0.06}
            />
            <circle
                fill="white"
                cx={x - nekoSize * 0.18}
                cy={y - nekoSize * 0.09}
                r={nekoSize * 0.03}
            />
            <circle
                fill="#c7bd61"
                cx={x + nekoSize * 0.22}
                cy={y - nekoSize * 0.05}
                r={nekoSize * 0.13}
                stroke="black"
                strokeWidth={2}
            />
            <circle
                fill="black"
                cx={x + nekoSize * 0.22}
                cy={y - nekoSize * 0.05}
                r={nekoSize * 0.06}
            />
            <circle
                fill="white"
                cx={x + nekoSize * 0.26}
                cy={y - nekoSize * 0.09}
                r={nekoSize * 0.03}
            />
            <path
                d={`
                    M${x + nekoSize * 0.12},${y + nekoSize * 0.18}
                    L${x + nekoSize * 0.7},${y + nekoSize * 0.05}
                    M${x + nekoSize * 0.14},${y + nekoSize * 0.21}
                    L${x + nekoSize * 0.8},${y + nekoSize * 0.15}
                    M${x + nekoSize * 0.12},${y + nekoSize * 0.26}
                    L${x + nekoSize * 0.6},${y + nekoSize * 0.3}
                    M${x - nekoSize * 0.12},${y + nekoSize * 0.18}
                    L${x - nekoSize * 0.7},${y + nekoSize * 0.05}
                    M${x - nekoSize * 0.14},${y + nekoSize * 0.21}
                    L${x - nekoSize * 0.8},${y + nekoSize * 0.15}
                    M${x - nekoSize * 0.12},${y + nekoSize * 0.26}
                    L${x - nekoSize * 0.6},${y + nekoSize * 0.3}
                `}
                stroke="black"
                strokeWidth={2}
            />
        </>
    )
}

const Layer = ({ points, voronoi }: VoronoiCustomLayerProps) => {
    const width = 500
    const height = 500

    return (
        <>
            {points.map((point, i) => {
                if (point.data.id === 'mice') {
                    return <circle cx={point.x} cy={point.y} r={10} fill="red" />
                }

                const poly = Array.from(voronoi.cellPolygon(i)) as [number, number][]
                const maskId = `${point.data.id}.mask`

                return (
                    <g key={point.data.id}>
                        <mask id={maskId}>
                            <path d={lineGenerator(poly) ?? undefined} fill="white" />
                        </mask>
                        <g mask={`url(#${maskId})`}>
                            <rect width={width} height={height} fill="#222" />
                            <Neko x={point.x} y={point.y} />
                        </g>
                    </g>
                )
            })}
        </>
    )
}

const randColor = () => '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)

const NekoronoiComponent = () => {
    const [data, setData] = useState([
        {
            id: 'cat_00',
            x: 25,
            y: 25,
            color: randColor(),
        },
        {
            id: 'cat_01',
            x: 50,
            y: 12.5,
            color: randColor(),
        },
        {
            id: 'cat_02',
            x: 75,
            y: 25,
            color: randColor(),
        },
        {
            id: 'cat_03',
            x: 87.5,
            y: 50,
            color: randColor(),
        },
        {
            id: 'cat_04',
            x: 75,
            y: 75,
            color: randColor(),
        },
        {
            id: 'cat_05',
            x: 50,
            y: 87.5,
            color: randColor(),
        },
        {
            id: 'cat_06',
            x: 25,
            y: 75,
            color: randColor(),
        },
        {
            id: 'cat_07',
            x: 12.5,
            y: 50,
            color: randColor(),
        },
        {
            id: 'mice',
            x: 50,
            y: 50,
            color: randColor(),
        },
    ])
    useEffect(() => {
        const scheduler = setTimeout(() => {
            setData(prevData =>
                prevData.map(d => ({
                    ...d,
                    x: d.x + Math.random() * 20 - 10,
                    y: d.y + Math.random() * 20 - 10,
                }))
            )
        }, 2000)
        return () => clearTimeout(scheduler)
    })

    return (
        <Voronoi
            width={500}
            height={500}
            data={data}
            xDomain={[0, 100]}
            yDomain={[0, 100]}
            enableLinks={false}
            enablePoints={true}
            enableCells={false}
            layers={['points', Layer]}
        />
    )
}

export const Nekoronoi: Story = {
    render: () => <NekoronoiComponent />,
}
