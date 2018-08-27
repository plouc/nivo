import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { withInfo } from '@storybook/addon-info'
import { TreeMap } from '../index'

const commonProperties = {
    width: 900,
    height: 400,
    root: generateLibTree(),
    identity: 'name',
    value: 'loc',
    label: 'name',
    labelSkipRadius: 16,
}

storiesOf('TreeMap', module)
    .addDecorator(story => <div className="wrapper">{story()}</div>)
    .add(
        'custom tooltip',
        withInfo()(() => (
            <TreeMap
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
