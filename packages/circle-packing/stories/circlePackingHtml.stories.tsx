import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { CirclePackingHtml } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    padding: 2,
    id: 'name',
    value: 'loc',
}

const stories = storiesOf('CirclePackingHtml', module)

stories.add('default', () => <CirclePackingHtml {...commonProperties} />)

stories.add('rendering leaves only', () => <CirclePackingHtml {...commonProperties} leavesOnly />)

stories.add('with formatted values', () => (
    <CirclePackingHtml
        {...commonProperties}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
    <CirclePackingHtml
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

stories.add('zoom on click', () => {
    const [zoomedId, setZoomedId] = useState<string | null>(null)

    return (
        <CirclePackingHtml
            {...commonProperties}
            enableLabels
            labelsSkipRadius={16}
            labelsFilter={label => label.node.height === 0}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
            }}
            zoomedId={zoomedId}
            motionConfig="slow"
            onClick={node => {
                setZoomedId(zoomedId === node.id ? null : node.id)
            }}
        />
    )
})
