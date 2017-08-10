import React from 'react'
import { range, random } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import '../style.css'
import { Stream, areaCurvePropKeys } from '../../src'

const keys = ['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']

const commonProperties = {
    width: 900,
    height: 360,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    keys,
    data: range(16).map(() =>
        keys.reduce((layer, key) => {
            layer[key] = random(10, 200)
            return layer
        }, {})
    ),
    animate: true,
}

const stories = storiesOf('Stream', module)

stories
    .addDecorator(story =>
        <div className="wrapper">
            {story()}
        </div>
    )
    .addDecorator(withKnobs)

stories.add('default', () => <Stream {...commonProperties} />)

stories.add('full height (expand offset)', () =>
    <Stream
        {...commonProperties}
        offsetType="expand"
        curve={select('curve', areaCurvePropKeys, 'catmullRom')}
    />
)

stories.add('regular stacked chart', () =>
    <Stream
        {...commonProperties}
        offsetType="none"
        axisLeft={{}}
        curve={select('curve', areaCurvePropKeys, 'catmullRom')}
    />
)

stories.add('custom curve', () => <Stream {...commonProperties} curve="step" />)

/*
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
*/
