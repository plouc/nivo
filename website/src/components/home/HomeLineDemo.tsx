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
                margin={dimensions.margin}
                data={generateDrinkStats(12)}
                yScale={{ type: 'linear', stacked: true }}
                lineWidth={dimensions.lineWidth}
                curve="monotoneX"
                theme={nivoTheme}
                colors={colors}
                animate={false}
                isInteractive={false}
                pointSize={dimensions.pointSize}
                axisLeft={null}
                axisBottom={null}
            />
        </div>
    )
}
