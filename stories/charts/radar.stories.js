import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateSerie, randColor } from 'nivo-generators'
import '../style.css'
import { Radar } from '../../src'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 80, right: 80, bottom: 80, left: 80 },
    facets: ['fruity', 'bitter', 'heavy', 'strong', 'sunny'],
    //colors: 'nivo',
    data: ['chardonay', 'carmenere', 'syrah'].map(id => ({
        id,
        color: randColor(),
        data: generateSerie(5),
    })),
    animate: true,
}

const curveOptions = ['linearClosed', 'basisClosed', 'catmullRomClosed', 'cardinalClosed']

const stories = storiesOf('Radar', module)

stories
    .addDecorator(story =>
        <div className="wrapper">
            {story()}
        </div>
    )
    .addDecorator(withKnobs)

stories.add('default', () => <Radar {...commonProperties} />)

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
