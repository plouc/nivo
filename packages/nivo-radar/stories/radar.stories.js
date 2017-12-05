import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateWinesTastes } from '@nivo/generators'
import { Radar } from '../es'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 80, right: 80, bottom: 80, left: 80 },
    ...generateWinesTastes(),
    indexBy: 'taste',
    animate: true,
}

const curveOptions = ['linearClosed', 'basisClosed', 'catmullRomClosed', 'cardinalClosed']

const stories = storiesOf('Radar', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', () => <Radar {...commonProperties} />)

stories.add('with custom curve', () => (
    <Radar {...commonProperties} gridShape="linear" curve="catmullRomClosed" />
))

stories.add('linear grid shape', () => (
    <Radar
        {...commonProperties}
        gridShape="linear"
        curve={select('curve', curveOptions, 'linearClosed')}
    />
))

stories.add('with dot label', () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'linearClosed')}
        gridShape="linear"
        dotSize={10}
        dotBorderColor="#fff"
        dotBorderWidth={2}
        enableDotLabel={true}
        gridLabelOffset={36}
    />
))

stories.add('abusing dots', () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        dotSize={32}
        enableDotLabel={true}
        dotLabelYOffset={3}
        gridLabelOffset={36}
    />
))

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <rect
        transform={`rotate(45) translate(${size * -0.5}, ${size * -0.5})`}
        width={size}
        height={size}
        fill={color}
        strokeWidth={borderWidth}
        fillOpacity={1}
        stroke={borderColor}
    />
)

stories.add('custom dot symbol', () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        dotSize={18}
        dotSymbol={CustomSymbol}
        dotBorderWidth={1}
        dotBorderColor="inherit:darker(0.3)"
        gridLabelOffset={36}
    />
))

stories.add('with formatted values', () => (
    <Radar
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))
