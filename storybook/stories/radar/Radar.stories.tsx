import type { Meta, StoryObj } from '@storybook/react'
import { generateWinesTastes } from '@nivo/generators'
import { patternDotsDef, patternSquaresDef } from '@nivo/core'
import { Radar, GridLabelProps } from '@nivo/radar'

const meta: Meta<typeof Radar> = {
    title: 'Radar',
    component: Radar,
    tags: ['autodocs'],
    argTypes: {
        curve: {
            control: 'select',
            options: ['linearClosed', 'basisClosed', 'catmullRomClosed', 'cardinalClosed'],
        },
    },
    args: {
        curve: 'linearClosed',
    },
}

export default meta
type Story = StoryObj<typeof Radar>

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 30, left: 80 },
    ...generateWinesTastes(),
    indexBy: 'taste',
    animate: true,
}

export const Basic: Story = { render: args => <Radar {...commonProperties} curve={args.curve} /> }

export const WithCustomCurve: Story = {
    args: {
        curve: 'catmullRomClosed',
    },
    render: args => <Radar {...commonProperties} gridShape="linear" curve={args.curve} />,
}

export const LinearGridShape: Story = {
    render: args => <Radar {...commonProperties} gridShape="linear" curve={args.curve} />,
}

export const WithDotLabel: Story = {
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            gridShape="linear"
            dotSize={10}
            dotBorderColor="#fff"
            dotBorderWidth={2}
            enableDotLabel={true}
            gridLabelOffset={36}
        />
    ),
}

export const AbusingDots: Story = {
    args: {
        curve: 'catmullRomClosed',
    },
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            dotSize={32}
            enableDotLabel={true}
            dotLabelYOffset={3}
            gridLabelOffset={36}
        />
    ),
}

const CustomSymbol = ({
    size,
    color,
    borderWidth,
    borderColor,
}: {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}) => (
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

export const CustomDotSymbol: Story = {
    args: {
        curve: 'catmullRomClosed',
    },
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            dotSize={18}
            dotSymbol={CustomSymbol}
            dotBorderWidth={1}
            dotBorderColor="inherit:darker(0.3)"
            gridLabelOffset={36}
        />
    ),
}

export const WithFormattedValues: Story = {
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            valueFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ),
}

export const WithFormattedValuesPerKey: Story = {
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            valueFormat={(value, key) => {
                if (key === 'syrah') {
                    return value + ' BitCoins'
                } else {
                    return `${Number(value).toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                    })} ₽`
                }
            }}
        />
    ),
}

const LabelComponent = ({ id, x, y, anchor }: GridLabelProps) => (
    <g transform={`translate(${x}, ${y})`}>
        <g transform={`translate(${anchor === 'end' ? -60 : anchor === 'middle' ? -30 : 0}, -20)`}>
            <text>{id}</text>
            <text
                y={24}
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    fill: '#3a9896',
                }}
            >
                +{Math.round(Math.random() * 100)}%
            </text>
        </g>
    </g>
)

export const CustomLabelComponent: Story = {
    render: args => <Radar {...commonProperties} curve={args.curve} gridLabel={LabelComponent} />,
}

export const CustomLegendLabel: Story = {
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            legends={[
                {
                    data: commonProperties.keys.map(key => ({ id: key, label: `${key} base` })),
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 56,
                    itemHeight: 12,
                    itemsSpacing: 12,
                    itemTextColor: '#333',
                    symbolSize: 6,
                    symbolShape: 'circle',
                },
            ]}
        />
    ),
}

export const WithPatterns: Story = {
    render: args => (
        <Radar
            {...commonProperties}
            curve={args.curve}
            defs={[
                patternDotsDef('dots', {
                    background: '#fc0341',
                    color: 'inherit',
                    size: 4,
                    padding: 2,
                    stagger: true,
                }),
                patternSquaresDef('squares', {
                    background: '#4287f5',
                    color: 'inherit',
                    size: 6,
                    padding: 4,
                    stagger: false,
                }),
            ]}
            fill={[
                {
                    match: node => node.key === commonProperties.keys[0],
                    id: 'dots',
                },
                {
                    match: node => node.key === commonProperties.keys[1],
                    id: 'squares',
                },
            ]}
        />
    ),
}

export const WithRotation: Story = {
    render: args => <Radar {...commonProperties} curve={args.curve} rotation={36} />,
}
