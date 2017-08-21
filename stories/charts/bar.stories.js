import React from 'react'

import { storiesOf } from '@storybook/react'
import { generateCountriesData } from 'nivo-generators'
import '../style.css'
import { Bar } from '../../src'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProperties = {
    width: 900,
    height: 460,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 7 }),
    indexBy: 'country',
    keys,
    xPadding: 0.2,
}

const stories = storiesOf('Bar', module).addDecorator(story =>
    <div className="wrapper">
        {story()}
    </div>
)

stories.add('stacked', () => <Bar {...commonProperties} />)

stories.add('stacked horizontal', () =>
    <Bar {...commonProperties} layout="horizontal" enableGridY={false} enableGridX={true} />
)

stories.add('grouped', () => <Bar {...commonProperties} groupMode="grouped" />)

stories.add('grouped horizontal', () =>
    <Bar
        {...commonProperties}
        groupMode="grouped"
        layout="horizontal"
        enableGridY={false}
        enableGridX={true}
    />
)

stories.add('with marker', () =>
    <Bar
        {...commonProperties}
        xPadding={0.4}
        markers={[
            {
                axis: 'y',
                value: 300,
                style: { stroke: '#b0413e', strokeWidth: 2 },
                legend: 'y marker at 300',
                legendOrientation: 'vertical',
            },
        ]}
    />
)

stories.add('using custom colorBy', () =>
    <Bar {...commonProperties} colorBy={({ id, data }) => data[`${id}Color`]} />
)
