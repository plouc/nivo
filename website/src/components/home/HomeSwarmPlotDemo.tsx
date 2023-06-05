import React, { useMemo } from 'react'
import { generateSwarmPlotData } from '@bitbloom/nivo-generators'
import { SwarmPlot } from '@bitbloom/nivo-swarmplot'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeSwarmPlotDemo = () => {
    const { colors, reversedColors, nivoTheme } = useHomeTheme()
    const data = useMemo(() => generateSwarmPlotData(['thing'], { min: 50, max: 50 }), [])

    return (
        <div id="swarmplot">
            <SwarmPlot
                width={dimensions.width}
                height={dimensions.height}
                margin={{
                    ...dimensions.margin,
                    left: dimensions.margin.left * 3,
                    right: dimensions.margin.right * 3,
                }}
                data={data.data}
                groups={data.groups}
                groupBy="group"
                id="id"
                value="price"
                layout="horizontal"
                valueScale={{
                    type: 'linear',
                    min: 0,
                    max: 500,
                }}
                size={{
                    key: 'volume',
                    values: [4, 20],
                    sizes: [10, 60],
                }}
                theme={nivoTheme}
                colors={reversedColors}
                borderWidth={1}
                borderColor={colors[3]}
                spacing={3}
                enableGridY={false}
                colorBy="id"
                animate={false}
                isInteractive={false}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
            />
        </div>
    )
}
