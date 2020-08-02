import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { Waffle } from '../src'
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

const stories = storiesOf('Waffle', module)

stories.add('default', () => <Waffle {...commonProps} />)

stories.add('colors', () => <Waffle {...commonProps} colors={{ scheme: 'category10' }} />)

stories.add('using data color', () => <Waffle {...commonProps} colors={{ datum: 'color' }} />)

stories.add('patterns', () => (
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
        fill={[
            { match: { id: 'men' }, id: 'dots' },
            { match: { id: 'women' }, id: 'lines' },
        ]}
    />
))

stories.add('fill direction', () => (
    <Waffle {...commonProps} width={900} height={400} fillDirection="left" rows={18} columns={24} />
))

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
stories.add('custom cell', () => <Waffle {...commonProps} cellComponent={CustomCell} />)

stories.add('custom tooltip', () => (
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

class WaffleLegendToggle extends Component {
    state = {
        hiddenIds: [],
    }

    toggle = d => {
        const { hiddenIds } = this.state
        if (this.state.hiddenIds.includes(d.id)) {
            this.setState({
                hiddenIds: hiddenIds.filter(id => id !== d.id),
            })
        } else {
            this.setState({
                hiddenIds: [...hiddenIds, d.id],
            })
        }
    }

    render() {
        const { hiddenIds } = this.state

        return (
            <Waffle
                {...commonProps}
                hiddenIds={hiddenIds}
                margin={{ top: 40 }}
                legends={[
                    {
                        anchor: 'top',
                        direction: 'row',
                        translateY: -40,
                        itemsSpacing: 10,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 20,
                        itemTextColor: '#555',
                        onClick: this.toggle,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000',
                                    itemBackground: '#eee',
                                },
                            },
                        ],
                    },
                ]}
            />
        )
    }
}

stories.add('legend toggle', () => <WaffleLegendToggle />)
