import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Pie } from '../es'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: generateProgrammingLanguageStats(true, 9).map(d => ({
        id: d.label,
        ...d,
    })),
    animate: true,
}

const stories = storiesOf('Pie', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', () => <Pie {...commonProperties} />)

stories.add('donut', () => <Pie {...commonProperties} innerRadius={0.6} />)

stories.add('fancy slices', () => (
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

stories.add('custom radial label', () => (
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

stories.add('with formatted values', () => (
    <Pie
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))
