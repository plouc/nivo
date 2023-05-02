import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useState } from 'react'
import { Component } from 'react'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { Waffle, WaffleHtml } from '@nivo/waffle'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof Waffle> = {
    title: 'Waffle',
    component: Waffle,
    tags: ['autodocs'],
    argTypes: {
        fillDirection: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
        },
    },
    args: {
        fillDirection: 'bottom',
    },
}

export default meta
type Story = StoryObj<typeof Waffle>

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

export const Basic: Story = {
    render: args => <Waffle {...commonProps} fillDirection={args.fillDirection} />,
}

const generateData = () => [
    {
        id: 'men',
        label: 'men',
        value: Math.round(Math.random() * 100),
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: Math.round(Math.random() * 100),
        color: '#a053f0',
    },
]

const leftIssue = {
    fillDirection: 'right',
    data: [
        {
            id: 'men',
            label: 'men',
            value: 78,
            color: '#468df3',
        },
        {
            id: 'women',
            label: 'women',
            value: 31,
            color: '#a053f0',
        },
    ],
}

export const Demo: Story = {
    argTypes: {
        columns: {
            control: 'number',
        },
    },
    args: {
        columns: commonProps.columns,
    },
    render: args => {
        const [data, setData] = useState(() => generateData())
        const gen = useCallback(() => {
            setData(generateData())
        }, [setData])

        // console.log(JSON.stringify(data, null, '  '))

        return (
            <div>
                <button onClick={gen}>YAY</button>
                <Waffle
                    {...commonProps}
                    fillDirection={args.fillDirection}
                    data={data}
                    {...leftIssue}
                    // columns={args.columns}
                    columns={4}
                    rows={6}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    padding={0}
                    motionConfig="wobbly"
                    testIdPrefix="waffle_"
                />
            </div>
        )
    },
}

export const DemoHtml: Story = {
    argTypes: {
        columns: {
            control: 'number',
        },
    },
    args: {
        columns: commonProps.columns,
    },
    render: args => {
        const [data, setData] = useState(() => generateData())
        const gen = useCallback(() => {
            setData(generateData())
        }, [setData])

        // console.log(JSON.stringify(data, null, '  '))

        return (
            <div>
                <button onClick={gen}>YAY</button>
                <WaffleHtml
                    {...commonProps}
                    fillDirection={args.fillDirection}
                    data={data}
                    {...leftIssue}
                    // columns={args.columns}
                    columns={4}
                    rows={6}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    padding={0}
                    motionConfig="wobbly"
                    testIdPrefix="waffle_"
                />
            </div>
        )
    },
}

export const Colors: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            fillDirection={args.fillDirection}
            colors={{ scheme: 'category10' }}
        />
    ),
}

export const UsingDataColor: Story = {
    render: args => (
        <Waffle {...commonProps} fillDirection={args.fillDirection} colors={{ datum: 'color' }} />
    ),
}

export const Patterns: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            fillDirection={args.fillDirection}
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
    ),
}

export const FillDirection: Story = {
    args: {
        fillDirection: 'left',
    },
    render: args => (
        <Waffle
            {...commonProps}
            width={900}
            height={400}
            fillDirection={args.fillDirection}
            rows={18}
            columns={24}
        />
    ),
}

const CustomCellComponent = ({
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
export const CustomCell: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            fillDirection={args.fillDirection}
            cellComponent={CustomCellComponent}
        />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            fillDirection={args.fillDirection}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
            tooltip={CustomTooltipComponent}
        />
    ),
}

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

export const LegendToggle: Story = {
    render: () => <WaffleLegendToggle />,
}
