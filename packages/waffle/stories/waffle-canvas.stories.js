import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { WaffleCanvas } from '../index'
import CustomTooltip from './CustomTooltip'

const total = 200
const data = [
    {
        id: 'men',
        label: 'men',
        value: 64,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: 72,
        color: '#a053f0',
    },
]
const commonProps = {
    width: 900,
    height: 500,
    total,
    data,
    rows: 48,
    columns: 36,
}

const stories = storiesOf('WaffleCanvas', module)

stories.add('default', withInfo()(() => <WaffleCanvas {...commonProps} />))

stories.add('colors', withInfo()(() => <WaffleCanvas {...commonProps} colors="category10" />))

stories.add(
    'using data color',
    withInfo()(() => <WaffleCanvas {...commonProps} colorBy={d => d.color} />)
)

stories.add(
    'fill direction',
    withInfo()(() => (
        <WaffleCanvas
            {...commonProps}
            width={900}
            height={400}
            fillDirection="left"
            rows={36}
            columns={48}
        />
    ))
)

stories.add(
    'custom tooltip',
    withInfo()(() => (
        <WaffleCanvas
            {...commonProps}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
            tooltip={CustomTooltip}
        />
    ))
)
