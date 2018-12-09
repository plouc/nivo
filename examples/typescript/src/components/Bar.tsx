import * as React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { AxisLegendPosition } from '@nivo/axes'
import { LegendAnchor, LegendDirection } from '@nivo/legends'

interface BarDatum {
    id: string
    a: number
    b: number
    c: number
}

export default class Bar extends React.Component {
    public render() {
        return (
            <div
                style={{
                    height: 400,
                }}
            >
                <ResponsiveBar<BarDatum>
                    data={[
                        {
                            id: 'thing A',
                            a: 1.1,
                            b: 1.2,
                            c: 1.4,
                        },
                        {
                            id: 'thing B',
                            a: 1.1,
                            b: 1.2,
                            c: 1.4,
                        },
                        {
                            id: 'thing C',
                            a: 1.1,
                            b: 1.2,
                            c: 1.4,
                        },
                    ]}
                    indexBy="id"
                    keys={['a', 'b', 'c']}
                    maxValue={4}
                    layout="vertical"
                    reverse={false}
                    margin={{
                        top: 10,
                        right: 120,
                        bottom: 40,
                        left: 40,
                    }}
                    padding={0.3}
                    axisLeft={{
                        tickValues: 5,
                    }}
                    axisBottom={{
                        legend: 'THINGS',
                        legendPosition: AxisLegendPosition.Middle,
                        legendOffset: 36,
                    }}
                    markers={[]}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: LegendAnchor.BottomRight,
                            direction: LegendDirection.Column,
                            itemWidth: 100,
                            itemHeight: 32,
                            translateX: 120,
                            itemTextColor: '#999999',
                            itemOpacity: 0.8,
                            onClick: d => {
                                console.log(d)
                            },
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000000',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    onClick={(d: any) => {
                        console.log(d)
                    }}
                />
            </div>
        )
    }
}
