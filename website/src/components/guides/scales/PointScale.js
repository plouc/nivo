import React, { Component, Fragment } from 'react'
import { ResponsiveLineChartSvg } from '@nivo/line'

export default class PointScale extends Component {
    render() {
        return (
            <Fragment>
                <h2>Point scale</h2>
                <div style={{ height: 360 }}>
                    <ResponsiveLineChartSvg
                        margin={{ left: 10, bottom: 40, right: 10, top: 30 }}
                        data={[
                            {
                                id: 'complete',
                                data: [
                                    { x: 'A', y: 3 },
                                    { x: 'B', y: 5 },
                                    { x: 'C', y: 8 },
                                    { x: 'D', y: 12 },
                                    { x: 'E', y: 9 },
                                    { x: 'F', y: 8 },
                                    { x: 'G', y: 6 },
                                ],
                            },
                            {
                                id: 'truncated',
                                data: [
                                    { x: 'A', y: 5 },
                                    { x: 'B', y: 7 },
                                    { x: 'C', y: 10 },
                                    { x: 'D', y: 14 },
                                ],
                            },
                            {
                                id: 'empty values (null)',
                                data: [
                                    { x: 'A', y: 7 },
                                    { x: 'B', y: 9 },
                                    { x: 'C', y: 12 },
                                    { x: 'D', y: 16 },
                                    { x: 'E', y: null },
                                    { x: 'F', y: 12 },
                                    { x: 'G', y: 10 },
                                ],
                            },
                        ]}
                        xScale={{ type: 'point' }}
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
