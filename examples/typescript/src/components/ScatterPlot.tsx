import * as React from 'react'
import { CartesianMarkerProps } from '@nivo/core'
import { AxisProps } from '@nivo/axes'
import { Scale } from '@nivo/scales'
import { LegendProps } from '@nivo/legends'
import {
    ResponsiveScatterPlot,
    ResponsiveScatterPlotCanvas,
    ScatterPlotDatum,
} from '@nivo/scatterplot'

export default class ScatterPlot extends React.Component {
    public render() {
        const data = [
            {
                id: 'group A',
                data: [
                    { x: 0, y: 0 },
                    { x: 2, y: 7 },
                    { x: 7, y: 23 },
                ],
            },
            {
                id: 'group B',
                data: [
                    { x: 3, y: 13 },
                    { x: 5, y: 7 },
                    { x: 6, y: 19 },
                ],
            },
        ]

        const xScale: Scale = {
            type: 'linear',
            min: 0,
            max: 'auto',
        }
        const yScale: Scale = {
            type: 'linear',
            min: 0,
            max: 30,
        }

        const theme = {
            grid: {
                line: {
                    stroke: '#fdd',
                    strokeDasharray: '8 4 1 4',
                },
            },
        }

        const margin = {
            top: 60,
            right: 100,
            bottom: 60,
            left: 100,
        }

        const axisBottom: AxisProps = {
            tickValues: 8,
        }
        const axisLeft: AxisProps = {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'size',
            legendPosition: 'middle',
            legendOffset: -60,
            format: (v: number) => `${v}x`,
        }

        const legends: LegendProps[] = [
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: -20,
                translateY: -20,
                itemWidth: 80,
                itemHeight: 24,
                itemsSpacing: 5,
                itemBackground: '#fff',
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        },
                    },
                ],
            },
        ]

        const markers: CartesianMarkerProps[] = [
            {
                axis: 'x',
                value: 4,
                legend: 'X marker a 4',
                lineStyle: {
                    stroke: 'blue',
                },
                textStyle: {
                    fill: 'blue',
                },
            },
            {
                axis: 'y',
                value: 20,
                legend: 'Y marker at 20',
                lineStyle: {
                    stroke: 'red',
                },
                textStyle: {
                    fill: 'red',
                },
            },
        ]

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridColumnGap: 30,
                }}
            >
                <div style={{ height: 400 }}>
                    <ResponsiveScatterPlot
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        theme={theme}
                        margin={margin}
                        enableGridX={true}
                        enableGridY={true}
                        symbolSize={12}
                        symbolShape="circle"
                        axisBottom={axisBottom}
                        axisLeft={axisLeft}
                        legends={legends}
                        markers={markers}
                        isInteractive={true}
                        animate={false}
                        motionStiffness={150}
                        motionDamping={15}
                        onClick={(d: ScatterPlotDatum) => {
                            console.log(d)
                        }}
                    />
                </div>
                <div style={{ height: 400 }}>
                    <ResponsiveScatterPlotCanvas
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        theme={theme}
                        margin={margin}
                        enableGridX={true}
                        enableGridY={true}
                        symbolSize={12}
                        symbolShape="circle"
                        axisBottom={axisBottom}
                        axisLeft={axisLeft}
                        legends={legends}
                        onClick={(d: ScatterPlotDatum) => {
                            console.log(d)
                        }}
                    />
                </div>
            </div>
        )
    }
}
