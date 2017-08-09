import React from 'react'

import { storiesOf } from '@storybook/react'
import { generateDrinkStats } from 'nivo-generators'
import '../style.css'
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
        <div className="wrapper">
            {story()}
        </div>
    )
    .add('stacked', () => <Bar {...commonProperties} />)
    .add('grouped', () => <Bar {...commonProperties} groupMode="grouped" />)
    .add('using data serie color', () => <Bar {...commonProperties} colorBy={d => d.serie.color} />)
    .add('using data datum color', () => <Bar {...commonProperties} colorBy={d => d.color} />)
