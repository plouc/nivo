import React from 'react'
import { storiesOf } from '@storybook/react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { Bump } from '../src'

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 7)

    const series = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
            })
        })
    })

    return series
}

const commonProps = {
    width: 900,
    height: 360,
    margin: { top: 40, right: 100, bottom: 40, left: 100 },
    titleOffsetX: -80,
    data: generateData(),
    spacing: 80,
}

const stories = storiesOf('Bump', module)

stories.add('default', () => <Bump {...commonProps} />)

stories.add('Custom points', () => <Bump {...commonProps} />)

stories.add('Missing data', () => <Bump {...commonProps} />)
