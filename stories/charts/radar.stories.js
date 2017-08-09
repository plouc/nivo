import React from 'react'

import { storiesOf } from '@storybook/react'
import { generateSerie, randColor } from 'nivo-generators'
import { Radar } from '../../src'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 60, right: 60, bottom: 60, left: 60 },
    facets: ['fruity', 'bitter', 'heavy', 'strong', 'sunny'],
    //colors: 'nivo',
    data: ['chardonay', 'carmenere', 'syrah'].map(id => ({
        id,
        color: randColor(),
        data: generateSerie(5),
    })),
}

storiesOf('Radar', module)
    .addDecorator(story =>
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {story()}
        </div>
    )
    .add('default', () => <Radar {...commonProperties} />)
    .add('linear grid shape', () => <Radar {...commonProperties} gridShape="linear" />)
