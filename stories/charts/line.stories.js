import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { generateDrinkStats } from 'nivo-generators'
import '../style.css'
import { Line } from '../../src'

const commonProperties = {
    width: 900,
    height: 360,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateDrinkStats(18),
    animate: true,
}

const curveOptions = ['linear', 'monotoneX']

const stories = storiesOf('Line', module)

stories
    .addDecorator(story =>
        <div className="wrapper">
            {story()}
        </div>
    )
    .addDecorator(withKnobs)

stories.add('default', () =>
    <Line {...commonProperties} curve={select('curve', curveOptions, 'linear')} />
)

stories.add('stacked', () =>
    <Line {...commonProperties} stacked={true} curve={select('curve', curveOptions, 'linear')} />
)

stories.add('with custom curve', () =>
    <Line {...commonProperties} stacked={true} curve="monotoneX" />
)

stories.add('with markers label', () =>
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'linear')}
        enableMarkersLabel={true}
        markersSize={10}
        markersBorderColor="#fff"
        markersBorderWidth={2}
    />
)

stories.add('abusing markers label', () =>
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'monotoneX')}
        enableMarkersLabel={true}
        markersSize={26}
        markersLabelYOffset={3}
        axisLeft={{
            tickSize: 10,
        }}
    />
)

stories.add('using data colors', () =>
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'linear')}
        colorBy={d => d.color}
        enableMarkersLabel={true}
        markersSize={10}
        markersBorderColor="#fff"
        markersBorderWidth={2}
    />
)
