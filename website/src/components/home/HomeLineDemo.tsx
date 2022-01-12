import React from 'react'
import { generateDrinkStats } from '@nivo/generators'
import { Line } from '@nivo/line'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeLineDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="line">
            <Line
                width={dimensions.width}
                height={dimensions.height}
                margin={{ top: 10, bottom: 15, left: 24, right: 10 }}
                data={generateDrinkStats(12)}
                yScale={{ type: 'linear', stacked: true }}
                lineWidth={4}
                curve="monotoneX"
                theme={nivoTheme}
                colors={colors}
                animate={false}
                isInteractive={false}
                pointSize={16}
                axisLeft={null}
                axisBottom={null}
            />
        </div>
    )
}
