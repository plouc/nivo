import { useMemo, useState } from 'react'
import { generateSwarmPlotData } from '@nivo/generators'
import { PatternLines } from '@nivo/core'
import { SwarmPlot, SwarmPlotCustomLayerProps } from '@nivo/swarmplot'

const BackgroundLayer = ({ xScale, innerHeight }: SwarmPlotCustomLayerProps<unknown>) => (
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

export const SwarmPlotExtraLayers = () => {
    const data = useMemo(() => generateSwarmPlotData(['group'], { min: 60, max: 60 }), [])
    const [, setCurrentIndex] = useState(13)

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
            id="id"
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
            layers={['grid', 'axes', BackgroundLayer, 'circles', 'annotations']}
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
