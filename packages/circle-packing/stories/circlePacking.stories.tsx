import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@bitbloom/nivo-generators'
import { CirclePacking, CirclePackingHtml } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    padding: 2,
    id: 'name',
    value: 'loc',
    labelsSkipRadius: 16,
}

const stories = storiesOf('CirclePacking', module)

stories.add('default', () => <CirclePacking {...commonProperties} />)

stories.add('rendering leaves only', () => <CirclePacking {...commonProperties} leavesOnly />)

stories.add('with formatted values', () => (
    <CirclePacking
        {...commonProperties}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
    <CirclePacking
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
        <CirclePacking
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
