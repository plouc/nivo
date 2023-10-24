import React, { useMemo } from 'react'
import { Theme } from '@nivo/theming'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { generateXYSeries } from '@nivo/generators'

export const ThemedHeatMap = ({ theme }: { theme: Theme }) => {
    const data = useMemo(
        () =>
            generateXYSeries({
                serieIds: ['A', 'B', 'C', 'D', 'E'],
                x: { values: ['A', 'B', 'C', 'D', 'E'] },
                y: {
                    length: NaN,
                    min: -100,
                    max: 100,
                    round: true,
                },
            }),
        []
    )

    return (
        <ResponsiveHeatMap
            data={data}
            margin={{
                top: 40,
                right: 70,
                bottom: 50,
                left: 50,
            }}
            theme={theme}
            colors={{
                type: 'diverging',
                scheme: 'red_yellow_blue',
                minValue: -100,
                maxValue: 100,
            }}
            inactiveOpacity={0.35}
            animate={false}
            xOuterPadding={0.1}
            yOuterPadding={0.1}
            axisTop={null}
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
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    translateX: 32,
                    length: 140,
                    thickness: 10,
                    ticks: [-100, -75, -50, -25, 0, 25, 50, 75, 100],
                    title: 'Legend Title →',
                },
            ]}
            annotations={[
                {
                    match: { id: 'B.B' },
                    type: 'rect',
                    offset: 3,
                    borderRadius: 3,
                    noteX: 20,
                    noteY: { abs: -10 },
                    note: 'Sample annotation',
                },
            ]}
        />
    )
}
