import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from 'nivo-generators'
import { Bubble } from '../es'

const commonProperties = {
    width: 600,
    height: 600,
    root: generateLibTree(),
    identity: 'name',
    value: 'loc',
    label: 'name',
    labelSkipRadius: 16,
}

storiesOf('Bubble', module)
    .addDecorator(story => <div className="wrapper">{story()}</div>)
    .add('default', () => <Bubble {...commonProperties} />)
    .add('rendering leaves only', () => <Bubble {...commonProperties} leavesOnly={true} />)
    .add('with formatted values', () => (
        <Bubble
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`}
        />
    ))
