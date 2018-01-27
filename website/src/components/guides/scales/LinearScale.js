import React, { Component, Fragment } from 'react'
import { ResponsiveLineChartSvg } from '@nivo/line'

export default class LinearScale extends Component {
    render() {
        return (
            <Fragment>
                <h2>Linear scale</h2>
                <div style={{ height: 360 }}>
                    <ResponsiveLineChartSvg
                        margin={{ left: 10, bottom: 40, right: 10, top: 30 }}
                        data={[
                            {
                                id: 'complete',
                                data: [
                                    { x: 0, y: 3 },
                                    { x: 10, y: 5 },
                                    { x: 20, y: 8 },
                                    { x: 30, y: 12 },
                                    { x: 40, y: 9 },
                                    { x: 50, y: 8 },
                                    { x: 60, y: 6 },
                                ],
                            },
                            {
                                id: 'truncated',
                                data: [
                                    { x: 0, y: 5 },
                                    { x: 10, y: 7 },
                                    { x: 20, y: 10 },
                                    { x: 30, y: 14 },
                                ],
                            },
                            {
                                id: 'empty values (null)',
                                data: [
                                    { x: 0, y: 7 },
                                    { x: 10, y: 9 },
                                    { x: 20, y: 12 },
                                    { x: 30, y: 16 },
                                    { x: 40, y: null },
                                    { x: 50, y: 12 },
                                    { x: 60, y: 10 },
                                ],
                            },
                        ]}
                        enableGridY={false}
                        axisBottom={{}}
                        legends={[
                            {
                                anchor: 'top-left',
                                direction: 'row',
                                translateY: -30,
                                itemWidth: 110,
                                itemHeight: 12,
                                symbolSize: 12,
                                symbolShape: 'circle',
                            },
                        ]}
                        dotSize={8}
                        dotColor="#ffffff"
                        dotBorderWidth={2}
                    />
                </div>
            </Fragment>
        )
    }
}
