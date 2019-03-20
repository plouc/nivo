import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { Bubble } from '../src'

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
    .add('default', () => <Bubble {...commonProperties} />)
    .add('rendering leaves only', () => <Bubble {...commonProperties} leavesOnly={true} />)
    .add('with formatted values', () => (
        <Bubble
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
    .add('custom tooltip', () => (
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
