/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useState } from 'react'
import { generateSwarmPlotData } from '@nivo/generators'
import { PatternLines } from '../../core/src'
import { SwarmPlot } from '../src'

const backgroundLayer = ({ xScale, innerHeight }) => (
    <>
        <defs>
            <PatternLines
                id="linesPattern"
                spacing={10}
                rotation={-45}
                background="rgb(199, 234, 229)"
                color="rgb(128, 205, 193)"
                lineWidth={4}
            />
        </defs>
        <rect
            x={xScale(150)}
            y={0}
            width={xScale(300) - xScale(150)}
            height={innerHeight}
            fill="url(#linesPattern)"
        />
        <text
            x={xScale(225)}
            y={26}
            textAnchor="middle"
            stroke="rgb(199, 234, 229)"
            strokeWidth={4}
            style={{
                fontSize: 14,
                fontWeight: 800,
            }}
        >
            the sweet spot
        </text>
        <text
            x={xScale(225)}
            y={26}
            textAnchor="middle"
            fill="rgb(0, 60, 48)"
            style={{
                fontSize: 14,
                fontWeight: 800,
            }}
        >
            the sweet spot
        </text>
    </>
)

const Annotations = ({ nodes, margin, innerWidth, currentIndex }) => {
    const node = nodes[currentIndex]
    const radius = node.size * 0.6
    const labelBefore = node.x > innerWidth / 2
    const labelX = labelBefore ? node.x - 140 : node.x + 140
    const linePath = `
        M${node.x},${node.y - radius}
        L${node.x},${margin.top * -0.5}
        L${labelX},${margin.top * -0.5}
    `

    return (
        <g style={{ pointerEvents: 'none' }}>
            <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill="none"
                strokeWidth={6}
                stroke="rgb(199, 234, 229)"
            />
            <path fill="none" strokeWidth={5} stroke="rgb(199, 234, 229)" d={linePath} />
            <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill="none"
                strokeWidth={2}
                stroke="rgb(1, 88, 82)"
            />
            <path fill="none" strokeWidth={1} stroke="rgb(1, 88, 82)" d={linePath} />
            <text
                x={labelX}
                y={margin.top * -0.5 - 10}
                fill="rgb(0, 60, 48)"
                textAnchor={labelBefore ? 'start' : 'end'}
                style={{
                    fontSize: 12,
                    fontWeight: 600,
                }}
            >
                Annotation
            </text>
        </g>
    )
}

const SwarmPlotLayers = () => {
    const data = useMemo(() => generateSwarmPlotData(['group'], { min: 60, max: 60 }), [])
    const [currentIndex, setCurrentIndex] = useState(13)

    return (
        <SwarmPlot
            width={800}
            height={400}
            margin={{
                top: 120,
                right: 40,
                bottom: 40,
                left: 40,
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
                sizes: [18, 32],
            }}
            spacing={2}
            layers={[
                'grid',
                'axes',
                backgroundLayer,
                'nodes',
                props => <Annotations {...props} currentIndex={currentIndex} />,
            ]}
            theme={{ background: 'rgb(199, 234, 229)' }}
            colors={{ scheme: 'brown_blueGreen' }}
            colorBy="id"
            borderWidth={4}
            borderColor="rgb(199, 234, 229)"
            onClick={node => setCurrentIndex(node.index)}
            enableGridY={false}
            axisLeft={null}
            axisRight={null}
            layout="horizontal"
        />
    )
}

export default SwarmPlotLayers
