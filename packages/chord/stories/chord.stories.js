import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateChordData } from '@nivo/generators'
import { TableTooltip, BasicTooltip, Chip } from '@nivo/tooltip'
import { Chord } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    ...generateChordData({ size: 7 }),
    xPadding: 0.2,
}

const stories = storiesOf('Chord', module)

stories.add('default', () => <Chord {...commonProperties} />)

stories.add('radial labels', () => <Chord {...commonProperties} labelRotation={-90} />)

const customLabel = d => `${d.id} [${d.value}]`
stories.add('custom labels text', () => (
    <Chord {...commonProperties} {...generateChordData({ size: 5 })} label={customLabel} />
))

stories.add('angle padding', () => (
    <Chord {...commonProperties} labelRotation={-90} padAngle={0.06} />
))

stories.add('ribbons offset', () => (
    <Chord {...commonProperties} labelRotation={-90} padAngle={0.02} innerRadiusOffset={0.02} />
))

stories.add('alternative colors', () => (
    <Chord
        {...commonProperties}
        labelRotation={-90}
        padAngle={0.02}
        innerRadiusOffset={0.02}
        colors={{ scheme: 'category10' }}
    />
))

stories.add('putting labels inside arcs', () => (
    <Chord
        {...commonProperties}
        {...generateChordData({ size: 5 })}
        padAngle={0.02}
        innerRadiusRatio={0.8}
        innerRadiusOffset={0.02}
        labelOffset={-30}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    />
))

stories.add('with formatted values', () => (
    <Chord
        {...commonProperties}
        {...generateChordData({ size: 5 })}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

const ArcTooltip = ({ arc }) => (
    <BasicTooltip
        id={`Custom arc tooltip, ${arc.label}`}
        value={arc.formattedValue}
        color={arc.color}
        enableChip={true}
    />
)

const RibbonTooltip = ({ ribbon }) => (
    <TableTooltip
        rows={[
            [
                <Chip key="chip" color={ribbon.source.color} />,
                'Source (custom)',
                <strong key="id">{ribbon.source.id}</strong>,
                ribbon.source.value,
            ],
            [
                <Chip key="chip" color={ribbon.target.color} />,
                'Target (custom)',
                <strong key="id">{ribbon.target.id}</strong>,
                ribbon.target.value,
            ],
        ]}
    />
)

stories.add('custom tooltips', () => (
    <Chord
        {...commonProperties}
        {...generateChordData({ size: 5 })}
        arcTooltip={ArcTooltip}
        ribbonTooltip={RibbonTooltip}
    />
))
