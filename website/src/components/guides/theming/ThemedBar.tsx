import React from 'react'
import { Theme } from '@nivo/theming'
import { ResponsiveBar } from '@nivo/bar'
import { colorSchemes } from '@nivo/colors'

export const ThemedBar = ({ theme }: { theme: Theme }) => {
    return (
        <ResponsiveBar
            margin={{
                top: 40,
                right: 20,
                bottom: 50,
                left: 50,
            }}
            data={[
                { id: 'A', value: 12 },
                { id: 'B', value: 17 },
                { id: 'C', value: 9 },
                { id: 'D', value: 15 },
                { id: 'E', value: 23 },
            ]}
            theme={theme}
            colorBy="indexValue"
            animate={false}
            enableGridX={true}
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
                    anchor: 'top',
                    translateY: -28,
                    itemWidth: 40,
                    itemHeight: 12,
                    symbolSize: 12,
                    direction: 'row',
                    data: [
                        {
                            id: 'A',
                            label: 'A',
                            color: colorSchemes.nivo[0],
                        },
                        {
                            id: 'B',
                            label: 'B',
                            color: colorSchemes.nivo[1],
                        },
                        {
                            id: 'C',
                            label: 'C',
                            color: colorSchemes.nivo[2],
                        },
                        {
                            id: 'D',
                            label: 'D',
                            color: colorSchemes.nivo[3],
                        },
                        {
                            id: 'E',
                            label: 'E',
                            color: colorSchemes.nivo[4],
                        },
                    ],
                },
            ]}
        />
    )
}
