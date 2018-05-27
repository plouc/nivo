import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { Waffle } from '../index'
import CustomTooltip from './CustomTooltip'

const total = 200
const data = [
    {
        id: 'men',
        label: 'men',
        value: 64,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: 72,
        color: '#a053f0',
    },
]
const commonProps = {
    width: 460,
    height: 600,
    total,
    data,
    rows: 24,
    columns: 18,
}

const stories = storiesOf('Waffle', module)

stories.add('default', withInfo()(() => <Waffle {...commonProps} />))

stories.add('colors', withInfo()(() => <Waffle {...commonProps} colors="d320b" />))

stories.add(
    'using data color',
    withInfo()(() => <Waffle {...commonProps} colorBy={d => d.color} />)
)

stories.add(
    'patterns',
    withInfo()(() => (
        <Waffle
            {...commonProps}
            defs={[
                patternDotsDef('dots', {
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                }),
                patternLinesDef('lines', {
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                }),
            ]}
            fill={[{ match: { id: 'men' }, id: 'dots' }, { match: { id: 'women' }, id: 'lines' }]}
        />
    ))
)

stories.add(
    'fill direction',
    withInfo()(() => (
        <Waffle
            {...commonProps}
            width={600}
            height={460}
            fillDirection="left"
            rows={18}
            columns={24}
        />
    ))
)

const CustomCell = ({
    position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}) => (
    <circle
        r={size / 2}
        cx={x + size / 2}
        cy={y + size / 2}
        fill={fill || color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        opacity={opacity}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={event => {
            onClick({ position, color, x, y, data }, event)
        }}
    />
)
stories.add('custom cell', withInfo()(() => <Waffle {...commonProps} cellComponent={CustomCell} />))

stories.add(
    'custom tooltip',
    withInfo()(() => (
        <Waffle
            {...commonProps}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
            tooltip={CustomTooltip}
        />
    ))
)
