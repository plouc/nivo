import type { Meta, StoryObj } from '@storybook/react'
import { animated } from '@react-spring/web'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Pie } from '@nivo/pie'

const meta: Meta<typeof Pie> = {
    title: 'Pie',
    component: Pie,
    tags: ['autodocs'],
    argTypes: {
        legends: {
            control: 'boolean',
        },
        onMouseEnter: { action: 'mouseenter' },
        onMouseLeave: { action: 'mouseleave' },
    },
    args: {
        legends: false,
    },
}

export default meta
type Story = StoryObj<typeof Pie>

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: generateProgrammingLanguageStats(true, 9).map(({ label, ...d }) => ({
        id: label,
        ...d,
    })),
    animate: true,
    activeOuterRadiusOffset: 8,
}

const legends = [
    {
        anchor: 'bottom' as const,
        direction: 'row' as const,
        toggleSerie: true,
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'circle' as const,
        effects: [
            {
                on: 'hover' as const,
                style: {
                    itemTextColor: '#000',
                },
            },
        ],
    },
]

export const Basic: Story = {
    render: args => <Pie {...commonProperties} legends={args.legends ? legends : []} />,
}

export const Donut: Story = {
    render: () => <Pie {...commonProperties} innerRadius={0.6} />,
}

export const FancySlices: Story = {
    render: () => (
        <Pie
            {...commonProperties}
            innerRadius={0.6}
            padAngle={0.5}
            cornerRadius={5}
            arcLinkLabelsColor={{
                from: 'color',
            }}
            arcLinkLabelsThickness={3}
            arcLinkLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 1.2]],
            }}
        />
    ),
}

export const CustomArcLinkLabel: Story = {
    render: () => (
        <Pie
            {...commonProperties}
            innerRadius={0.6}
            padAngle={0.5}
            cornerRadius={5}
            arcLinkLabel={d => `${d.id}: ${d.value}`}
            arcLinkLabelsColor={{
                from: 'color',
            }}
            enableArcLabels={false}
        />
    ),
}

export const UsingColorsFromData: Story = {
    // It is possible to use colors coming from the provided dataset instead of using
    // a color scheme, to do so, you should pass:
    //
    // ```
    // colors={{ datum: 'data.color' }}
    // ```
    //
    // given that each data point you pass has a `color` property.
    //
    // It's also possible to pass a function if you want to handle more advanced computation:
    //
    // ```
    // colors={(datum) => datum.color}
    // ```
    render: () => <Pie {...commonProperties} colors={{ datum: 'data.color' }} />,
}

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0
    dataWithArc.forEach(datum => {
        total += datum.value
    })

    return (
        <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fontSize: '52px',
                fontWeight: 600,
            }}
        >
            {total}
        </text>
    )
}

export const AddingAMetricInTheCenterUsingACustomLayer: Story = {
    render: () => (
        <Pie
            {...commonProperties}
            innerRadius={0.8}
            enableArcLabels={false}
            arcLinkLabel={d => `${d.id} (${d.formattedValue})`}
            activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
        />
    ),
}

export const FormattedValues: Story = {
    render: () => (
        <Pie
            {...commonProperties}
            arcLabelsRadiusOffset={0.7}
            valueFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ),
}

export const CustomTooltip: Story = {
    render: () => (
        <Pie
            {...commonProperties}
            tooltip={({ datum: { id, value, color } }) => (
                <div
                    style={{
                        padding: 12,
                        color,
                        background: '#222222',
                    }}
                >
                    <span>Look, I'm custom :)</span>
                    <br />
                    <strong>
                        {id}: {value}
                    </strong>
                </div>
            )}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
        />
    ),
}

export const EnterLeaveEvents: Story = {
    render: args => (
        <Pie
            {...commonProperties}
            onMouseEnter={args.onMouseEnter}
            onMouseLeave={args.onMouseLeave}
        />
    ),
}

export const CustomArcLabelComponent: Story = {
    render: () => (
        <Pie
            {...commonProperties}
            innerRadius={0.2}
            cornerRadius={3}
            arcLabelsSkipAngle={20}
            arcLabelsRadiusOffset={0.55}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 0.6]],
            }}
            arcLinkLabelsOffset={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsThickness={3}
            arcLabelsComponent={({ datum, label, style }) => (
                <animated.g transform={style.transform} style={{ pointerEvents: 'none' }}>
                    <circle fill={style.textColor} cy={6} r={15} />
                    <circle fill="#ffffff" stroke={datum.color} strokeWidth={2} r={16} />
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={style.textColor}
                        style={{
                            fontSize: 10,
                            fontWeight: 800,
                        }}
                    >
                        {label}
                    </text>
                </animated.g>
            )}
        />
    ),
}
