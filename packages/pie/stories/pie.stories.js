import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Pie } from '../index'

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: generateProgrammingLanguageStats(true, 9).map(d => ({
        id: d.label,
        ...d,
    })),
    animate: true,
}

const stories = storiesOf('Pie', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', withInfo()(() => <Pie {...commonProperties} />))

stories.add('donut', withInfo()(() => <Pie {...commonProperties} innerRadius={0.6} />))

stories.add(
    'fancy slices',
    withInfo()(() => (
        <Pie
            {...commonProperties}
            innerRadius={0.6}
            padAngle={0.5}
            cornerRadius={5}
            radialLabelsLinkColor="inherit"
            radialLabelsLinkStrokeWidth={3}
            radialLabelsTextColor="inherit:darker(1.2)"
        />
    ))
)

stories.add(
    'custom radial label',
    withInfo()(() => (
        <Pie
            {...commonProperties}
            innerRadius={0.6}
            padAngle={0.5}
            cornerRadius={5}
            radialLabel={d => `${d.id}: ${d.value}`}
            radialLabelsLinkColor="inherit"
            radialLabelsLinkStrokeWidth={3}
            radialLabelsTextColor="inherit:darker(1.2)"
            enableSlicesLabels={false}
        />
    ))
)

stories.add(
    'formatted tooltip values',
    withInfo()(() => (
        <Pie
            {...commonProperties}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
)

stories.add(
    'custom tooltip',
    withInfo()(() => (
        <Pie
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
