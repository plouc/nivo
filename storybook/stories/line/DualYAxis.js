import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { LineSvg } from '@nivo/line'
import { defaultTheme } from '@nivo/core'
import { Scales } from '@nivo/scales'
import { Grid, XAxis, YAxis } from '@nivo/axes'
import { LegendSvg } from '@nivo/legends'

const dataA = [
    { x: 0, y: 13 },
    { x: 10, y: 27 },
    { x: 20, y: 42 },
    { x: 30, y: 36 },
    { x: 40, y: 64 },
    { x: 50, y: 83 },
    { x: 60, y: 79 },
]

const dataB = [
    { x: 0, y: 3 },
    { x: 10, y: 4 },
    { x: 20, y: 7 },
    { x: 30, y: 11 },
    { x: 40, y: 9 },
    { x: 50, y: 3 },
    { x: 60, y: 2 },
]

const outerWidth = 900
const outerHeight = 420
const margin = { top: 20, right: 160, bottom: 60, left: 80 }
const width = outerWidth - margin.left - margin.right
const height = outerHeight - margin.top - margin.bottom

const DualYAxis = () => (
    <Scales
        scales={[
            { id: 'x', type: 'linear', data: [dataA, dataB], property: 'x', range: [0, width] },
            { id: 'yA', type: 'linear', data: [dataA], property: 'y', range: [height, 0], min: 0 },
            { id: 'yB', type: 'linear', data: [dataB], property: 'y', range: [height, 0], min: 0 },
        ]}
    >
        {scales => (
            <svg width={outerWidth} height={outerHeight}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <Grid xScale={scales.x} width={width} height={height} theme={defaultTheme} />
                    <XAxis
                        width={width}
                        height={height}
                        scale={scales.x}
                        position="bottom"
                        theme={defaultTheme}
                    />
                    <YAxis
                        width={width}
                        height={height}
                        scale={scales.yA}
                        position="left"
                        theme={defaultTheme}
                    />
                    <YAxis
                        width={width}
                        height={height}
                        scale={scales.yB}
                        position="right"
                        theme={defaultTheme}
                    />
                    <LineSvg
                        data={dataA}
                        xScale={scales.x}
                        yScale={scales.yA}
                        style={{ stroke: '#f47560' }}
                    />
                    <LineSvg
                        data={dataB}
                        xScale={scales.x}
                        yScale={scales.yB}
                        style={{ stroke: '#61cdbb' }}
                    />
                    <LegendSvg
                        x={width + 60}
                        y={0}
                        direction="column"
                        itemWidth={100}
                        itemHeight={16}
                        itemsSpacing={6}
                        data={[
                            { label: 'group A', fill: '#f47560' },
                            { label: 'group B', fill: '#61cdbb' },
                        ]}
                    />
                </g>
            </svg>
        )}
    </Scales>
)

const documentation = `
Sometimes it may be useful to have 2 different axes for the same dimension.

This can be achieved by defining 2 different y scales and using each of them
for left and right axis.

You can find the source code of this example [here](https://github.com/plouc/nivo/blob/master/packages/nivo-line/stories/DualYAxis.js).
`

export default withInfo({
    text: documentation,
    source: false,
})(() => <DualYAxis />)
