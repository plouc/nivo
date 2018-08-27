import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { generateLibTree } from '@nivo/generators'
import { Bubble } from '../index'

const commonProperties = {
    width: 900,
    height: 500,
    root: generateLibTree(),
    identity: 'name',
    value: 'loc',
    label: 'name',
    labelSkipRadius: 16,
}

storiesOf('Bubble', module)
    .addDecorator(story => <div className="wrapper">{story()}</div>)
    .add('default', withInfo()(() => <Bubble {...commonProperties} />))
    .add(
        'rendering leaves only',
        withInfo()(() => <Bubble {...commonProperties} leavesOnly={true} />)
    )
    .add(
        'with formatted values',
        withInfo()(() => (
            <Bubble
                {...commonProperties}
                tooltipFormat={value =>
                    `${Number(value).toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                    })} ₽`
                }
            />
        ))
    )
    .add(
        'custom tooltip',
        withInfo()(() => (
            <Bubble
                {...commonProperties}
                tooltip={({ id, value, color }) => (
                    <strong style={{ color }}>
                        {id}: {value}
                    </strong>
                )}
                theme={{
                    tooltip: {
                        container: {
                            background: '#333',
                        },
                    },
                }}
            />
        ))
    )
