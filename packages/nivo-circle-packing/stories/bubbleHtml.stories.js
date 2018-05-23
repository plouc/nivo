import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { BubbleHtml } from '../index'
import { withInfo } from '@storybook/addon-info'

const commonProperties = {
    width: 600,
    height: 600,
    root: generateLibTree(),
    identity: 'name',
    value: 'loc',
    label: 'name',
    labelSkipRadius: 16,
}

storiesOf('BubbleHtml', module)
    .addDecorator(story => <div className="wrapper">{story()}</div>)
    .add('default', () => <BubbleHtml {...commonProperties} />)
    .add('rendering leaves only', () => <BubbleHtml {...commonProperties} leavesOnly={true} />)
    .add('with formatted values', () => (
        <BubbleHtml
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
    .add(
        'custom tooltip',
        withInfo()(() => (
            <BubbleHtml
                {...commonProperties}
                tooltip={({ id, value, color }) => (
                    <strong style={{ color }}>
                        {id}: {value}
                    </strong>
                )}
                theme={{
                    tooltip: {
                        container: {
                            background: '#333'
                        },
                    },
                }}
            />
        ))
    )
