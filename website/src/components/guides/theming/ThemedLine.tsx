import React from 'react'
import { CompleteTheme } from '@nivo/core'
import { ResponsiveLine } from '@nivo/line'

export const ThemedLine = ({ theme }: { theme: CompleteTheme }) => {
    return (
        <ResponsiveLine
            margin={{
                top: 40,
                right: 20,
                bottom: 50,
                left: 50,
            }}
            data={[
                {
                    id: 'Serie 0',
                    data: [
                        { x: 'A', y: 12 },
                        { x: 'B', y: 17 },
                        { x: 'C', y: 9 },
                        { x: 'D', y: 15 },
                        { x: 'E', y: 23 },
                    ],
                },
                {
                    id: 'Serie 1',
                    data: [
                        { x: 'A', y: 3 },
                        { x: 'B', y: 7 },
                        { x: 'C', y: 6 },
                        { x: 'D', y: 12 },
                        { x: 'E', y: 16 },
                    ],
                },
                {
                    id: 'Serie 2',
                    data: [
                        { x: 'A', y: 1 },
                        { x: 'B', y: 2 },
                        { x: 'C', y: 2 },
                        { x: 'D', y: 5 },
                        { x: 'E', y: 7 },
                    ],
                },
            ]}
            enablePoints
            enablePointLabel
            pointSize={10}
            theme={theme}
            animate={false}
            axisBottom={{
                legend: 'X axis legend',
                legendPosition: 'middle',
                legendOffset: 34,
            }}
            axisLeft={{
                legend: 'Y axis legend',
                legendPosition: 'middle',
                legendOffset: -36,
            }}
        />
    )
}
