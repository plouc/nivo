import React from 'react'

import { storiesOf } from '@storybook/react'
import { generateDrinkStats } from 'nivo-generators'
import { Bar } from '../../src'

const commonProperties = {
    width: 900,
    height: 360,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateDrinkStats(18),
    xPadding: 0.2,
}

storiesOf('Bar', module)
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
    .add('stacked', () => <Bar {...commonProperties} />)
    .add('grouped', () => <Bar {...commonProperties} groupMode="grouped" />)
