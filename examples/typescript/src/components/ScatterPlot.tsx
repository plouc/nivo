import * as React from 'react'
import { ResponsiveScatterPlot, ScatterPlotDatum } from '@nivo/scatterplot'

export default class ScatterPlot extends React.Component {
    public render() {
        return (
            <div
                style={{
                    height: 400,
                }}
            >
                <ResponsiveScatterPlot
                    data={[
                        {
                            id: 'group A',
                            data: [{ x: 0, y: 0 }, { x: 2, y: 7 }, { x: 7, y: 23 }],
                        },
                        {
                            id: 'group B',
                            data: [{ x: 3, y: 13 }, { x: 5, y: 7 }, { x: 6, y: 19 }],
                        },
                    ]}
                    xScale={{
                        type: 'linear',
                        min: 0,
                        max: 'auto',
                    }}
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max: 30,
                    }}
                    theme={{
                        grid: {
                            line: {
                                stroke: '#fdd',
                                strokeDasharray: '8 4 1 4',
                            },
                        },
                    }}
                    margin={{
                        top: 60,
                        right: 100,
                        bottom: 60,
                        left: 100,
                    }}
                    enableGridX={true}
                    enableGridY={true}
                    symbolSize={12}
                    symbolShape="circle"
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'size',
                        legendPosition: 'middle',
                        legendOffset: -60,
                        format: (v: number) => `${v}x`,
                    }}
                    legends={[
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
                    ]}
                    markers={[
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
                    ]}
                    isInteractive={true}
                    animate={false}
                    motionStiffness={150}
                    motionDamping={15}
                    onClick={(data: ScatterPlotDatum) => {
                        console.log(data)
                    }}
                />
            </div>
        )
    }
}
