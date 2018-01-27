import React, { Component, Fragment } from 'react'
import { ResponsiveLineChartSvg } from '@nivo/line'

export default class TimeScale extends Component {
    render() {
        return (
            <Fragment>
                <h2>Time scale</h2>
                <div style={{ height: 360 }}>
                    <ResponsiveLineChartSvg
                        margin={{ left: 10, bottom: 40, right: 10, top: 30 }}
                        data={[
                            {
                                id: 'complete',
                                data: [
                                    { x: '2017-10-01', y: 3 },
                                    { x: '2017-10-02', y: 5 },
                                    { x: '2017-10-03', y: 8 },
                                    { x: '2017-10-04', y: 12 },
                                    { x: '2017-10-05', y: 9 },
                                    { x: '2017-10-06', y: 8 },
                                    { x: '2017-10-07', y: 6 },
                                ],
                            },
                            {
                                id: 'truncated',
                                data: [
                                    { x: '2017-10-01', y: 5 },
                                    { x: '2017-10-02', y: 7 },
                                    { x: '2017-10-03', y: 10 },
                                    { x: '2017-10-04', y: 14 },
                                ],
                            },
                            {
                                id: 'empty values (null)',
                                data: [
                                    { x: '2017-10-01', y: 7 },
                                    { x: '2017-10-02', y: 9 },
                                    { x: '2017-10-03', y: 12 },
                                    { x: '2017-10-04', y: 16 },
                                    { x: '2017-10-05', y: null },
                                    { x: '2017-10-06', y: 12 },
                                    { x: '2017-10-07', y: 10 },
                                ],
                            },
                        ]}
                        xScale={{ type: 'time' }}
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
