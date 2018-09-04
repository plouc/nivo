import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { WaffleHtml } from '../index'
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
    width: 900,
    height: 500,
    total,
    data,
    rows: 24,
    columns: 18,
}

const stories = storiesOf('WaffleHtml', module)

stories.add('default', withInfo()(() => <WaffleHtml {...commonProps} />))

stories.add('colors', withInfo()(() => <WaffleHtml {...commonProps} colors="category10" />))

stories.add(
    'using data color',
    withInfo()(() => <WaffleHtml {...commonProps} colorBy={d => d.color} />)
)

stories.add(
    'fill direction',
    withInfo()(() => (
        <WaffleHtml
            {...commonProps}
            width={900}
            height={400}
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
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}) => (
    <div
        style={{
            borderRadius: `${size / 2}px 0 ${size / 2}px 0`,
            position: 'absolute',
            top: y,
            left: x,
            width: size,
            height: size,
            background: color,
            opacity,
            boxSizing: 'content-box',
            borderStyle: 'solid',
            borderWidth: `${borderWidth}px`,
            borderColor,
        }}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={event => {
            onClick({ position, color, x, y, data }, event)
        }}
    />
)
stories.add(
    'custom cell',
    withInfo()(() => <WaffleHtml {...commonProps} cellComponent={CustomCell} />)
)

stories.add(
    'custom tooltip',
    withInfo()(() => (
        <WaffleHtml
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
