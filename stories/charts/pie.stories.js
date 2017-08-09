import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateProgrammingLanguageStats } from 'nivo-generators'
import '../style.css'
import { Pie } from '../../src'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: generateProgrammingLanguageStats(true, 9).map(d => ({
        id: d.label,
        ...d,
    })),
    animate: true,
}

const stories = storiesOf('Pie', module)

stories
    .addDecorator(story =>
        <div className="wrapper">
            {story()}
        </div>
    )
    .addDecorator(withKnobs)

stories.add('default', () => <Pie {...commonProperties} />)

stories.add('donut', () => <Pie {...commonProperties} innerRadius={0.6} />)

stories.add('fancy slices', () =>
    <Pie
        {...commonProperties}
        innerRadius={0.6}
        padAngle={0.5}
        cornerRadius={5}
        radialLabelsLinkColor="inherit"
        radialLabelsLinkStrokeWidth={3}
        radialLabelsTextColor="inherit:darker(1.2)"
    />
)

stories.add('custom radial label', () =>
    <Pie
        {...commonProperties}
        innerRadius={0.6}
        padAngle={0.5}
        cornerRadius={5}
        radialLabel={d => `${d.id}: ${d.value}`}
        radialLabelsLinkColor="inherit"
        radialLabelsLinkStrokeWidth={3}
        radialLabelsTextColor="inherit:darker(1.2)"
        enableSlicesLabels={false}
    />
)

/*
stories.add('with custom curve', () =>
    <Radar {...commonProperties} gridShape="linear" curve="catmullRomClosed" />
)

stories.add('linear grid shape', () =>
    <Radar
        {...commonProperties}
        gridShape="linear"
        curve={select('curve', curveOptions, 'linearClosed')}
    />
)

stories.add('with markers label', () =>
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'linearClosed')}
        gridShape="linear"
        markersSize={10}
        markersBorderColor="#fff"
        markersBorderWidth={2}
        enableMarkersLabel={true}
        gridLabelOffset={36}
    />
)

stories.add('abusing markers label', () =>
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        markersSize={32}
        markersLabelYOffset={3}
        enableMarkersLabel={true}
        gridLabelOffset={36}
    />
)
*/
