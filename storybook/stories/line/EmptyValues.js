import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { LineSvg, LineAreaSvg } from '@nivo/line'
import { defaultTheme } from '@nivo/core'
import { Scales } from '@nivo/scales'
import { Grid, XAxis, YAxis } from '@nivo/axes'

const dataA = [
    { x: 0, y: 13 },
    { x: 10, y: 27 },
    { x: 20, y: 29 },
    { x: 30, y: 27 },
    { x: 40, y: null },
    { x: 50, y: 21 },
    { x: 60, y: 17 },
    { x: 70, y: 15 },
]

const dataB = [
    { x: 0, y: 7 },
    { x: 10, y: 4 },
    { x: 20, y: null },
    { x: 30, y: 6 },
    { x: 40, y: 9 },
    { x: 50, y: 14 },
    { x: 60, y: 22 },
    { x: 70, y: 25 },
]

const outerWidth = 900
const outerHeight = 420
const margin = { top: 20, right: 80, bottom: 60, left: 80 }
const width = outerWidth - margin.left - margin.right
const height = outerHeight - margin.top - margin.bottom

const EmptyValues = () => (
    <Scales
        scales={[
            { id: 'x', type: 'linear', data: [dataA, dataB], property: 'x', range: [0, width] },
            {
                id: 'y',
                type: 'linear',
                data: [dataA, dataB],
                property: 'y',
                range: [height, 0],
                min: 0,
                max: 30,
            },
        ]}
    >
        {scales => (
            <svg width={outerWidth} height={outerHeight}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <Grid
                        xScale={scales.x}
                        yScale={scales.y}
                        width={width}
                        height={height}
                        theme={defaultTheme}
                    />
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
                        scale={scales.y}
                        position="left"
                        theme={defaultTheme}
                    />
                    <LineAreaSvg
                        data={dataA}
                        xScale={scales.x}
                        yScale={scales.y}
                        height={height}
                        style={{ fill: '#f47560', fillOpacity: 0.15 }}
                    />
                    <LineAreaSvg
                        data={dataB}
                        xScale={scales.x}
                        yScale={scales.y}
                        height={height}
                        style={{ fill: '#61cdbb', fillOpacity: 0.15 }}
                    />
                    <LineSvg
                        data={dataA}
                        xScale={scales.x}
                        yScale={scales.y}
                        style={{ stroke: '#f47560' }}
                    />
                    <LineSvg
                        data={dataB}
                        xScale={scales.x}
                        yScale={scales.y}
                        style={{ stroke: '#61cdbb' }}
                    />
                </g>
            </svg>
        )}
    </Scales>
)

const documentation = `
In order to deal with empty values, you must explicitly set each datum's *y* value to *0*,
otherwise the line will be connected from latest known datum to next defined one.

You can find the source code of this example [here](https://github.com/plouc/nivo/blob/master/packages/nivo-line/stories/EmptyValues.js).
`

export default withInfo({
    text: documentation,
    source: false,
})(() => <EmptyValues />)
