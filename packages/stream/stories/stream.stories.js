import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { areaCurvePropKeys } from '@nivo/core'
import { Stream } from '../index'

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

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', withInfo()(() => <Stream {...commonProperties} />))

stories.add(
    'full height (expand offset)',
    withInfo()(() => (
        <Stream
            {...commonProperties}
            offsetType="expand"
            curve={select('curve', areaCurvePropKeys, 'catmullRom')}
        />
    ))
)

stories.add(
    'regular stacked chart',
    withInfo()(() => (
        <Stream
            {...commonProperties}
            offsetType="none"
            axisLeft={{}}
            curve={select('curve', areaCurvePropKeys, 'catmullRom')}
        />
    ))
)

stories.add('custom curve', withInfo()(() => <Stream {...commonProperties} curve="step" />))

stories.add(
    'formatting tooltip values',
    withInfo()(() => (
        <Stream
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
)
