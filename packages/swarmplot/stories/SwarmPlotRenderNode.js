/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import { generateSwarmPlotData } from '@nivo/generators'
import { useOrdinalColorScale } from '../../colors/src'
import { usePie } from '../../pie/src'
import { SwarmPlot } from '../src'

const CustomNode = d => {
    const getArcColor = useOrdinalColorScale({ scheme: 'purple_orange' }, v => v)
    const { arcs, arcGenerator } = usePie({
        data: d.node.data.categories,
        radius: d.size / 2,
        innerRadius: (d.size / 2) * 0.7,
        sortByValue: true,
    })

    return (
        <g transform={`translate(${d.x},${d.y})`}>
            <circle r={d.size / 2} stroke="rgb(216, 218, 235)" strokeWidth={12} />
            <circle r={d.size / 2} fill="rgb(45, 0, 75)" stroke="rgb(45, 0, 75)" strokeWidth={6} />
            {arcs.map((arc, i) => {
                return <path key={i} d={arcGenerator(arc)} fill={getArcColor(i)} />
            })}
            {d.size > 52 && (
                <text
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: 14,
                        fontWeight: 800,
                    }}
                >
                    {d.node.value}
                </text>
            )}
        </g>
    )
}

const shadowsLayer = ({ nodes }) => {
    return nodes.map(node => (
        <circle
            key={node.id}
            cx={node.x}
            cy={node.y + node.size * 0.4}
            r={node.size * 0.55}
            fill="rgba(45, 0, 75, .15)"
        />
    ))
}

const theme = {
    background: 'rgb(216, 218, 235)',
    axis: {
        ticks: {
            line: {
                stroke: 'rgb(84, 39, 136)',
            },
            text: {
                fill: 'rgb(84, 39, 136)',
                fontWeight: 600,
            },
        },
        legend: {
            text: {
                fill: 'rgb(84, 39, 136)',
                fontSize: 15,
            },
        },
    },
    grid: {
        line: {
            stroke: 'rgb(128, 115, 172)',
            strokeDasharray: '2 4',
            strokeWidth: 2,
        },
    },
}

const SwarmPlotRenderNode = () => {
    const data = useMemo(
        () => generateSwarmPlotData(['group'], { min: 32, max: 32, categoryCount: 9 }),
        []
    )

    return (
        <SwarmPlot
            width={1000}
            height={400}
            margin={{
                top: 30,
                right: 60,
                bottom: 80,
                left: 60,
            }}
            data={data.data}
            groups={data.groups}
            groupBy="group"
            identity="id"
            value="price"
            valueScale={{
                type: 'linear',
                min: 0,
                max: 500,
            }}
            size={{
                key: 'volume',
                values: [4, 20],
                sizes: [30, 80],
            }}
            spacing={12}
            enableGridY={false}
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            axisBottom={{
                legend: `custom node rendering with donut charts using usePie() React hook from @nivo/pie package`,
                legendPosition: 'middle',
                legendOffset: 50,
            }}
            renderNode={props => <CustomNode {...props} />}
            layers={['grid', 'axes', shadowsLayer, 'nodes']}
            layout="horizontal"
            theme={theme}
        />
    )
}

export default SwarmPlotRenderNode
