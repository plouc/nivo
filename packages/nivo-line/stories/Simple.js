import React, { Fragment } from 'react'
import { withInfo } from '@storybook/addon-info'
import { generatePointsSerie} from '@nivo/generators'
import { LineChartSvg } from '../es'

const margin = { top: 20, right: 160, bottom: 60, left: 80 }
const data = [{
    id: 'default',
    data: generatePointsSerie({
        easing: 'random',
        xStep: 10,
        yRand: 10,
    })
}]

const Simple = () => (
    <LineChartSvg
        width={900}
        height={420}
        margin={margin}
        data={data}
    />
)

const documentation = `
A simple line chart.

You can find the source code of this example [here](https://github.com/plouc/nivo/blob/master/packages/nivo-line/stories/Simple.js).
`

export default withInfo({
    text: documentation,
    source: false,
})(() => <Simple />)
