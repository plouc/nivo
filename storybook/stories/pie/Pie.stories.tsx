import { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { animated } from '@react-spring/web'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { LegendDatum, Pie } from '@nivo/pie'
import { nivoTheme } from '../nivo-theme'

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
    theme: nivoTheme,
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

/**
 * It is possible to use colors coming from the provided dataset instead of using
 * a color scheme, to do so, you should pass:
 *
 * ```
 * colors={{ datum: 'data.color' }}
 * ```
 *
 * given that each data point you pass has a `color` property.
 *
 * It's also possible to pass a function if you want to handle more advanced computation:
 *
 * ```
 * colors={(datum) => datum.color}
 * ```
 */
export const UsingColorsFromData: Story = {
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

const controlledPieProps = {
    ...commonProperties,
    width: 400,
    height: 400,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    innerRadius: 0.4,
    padAngle: 0.3,
    cornerRadius: 3,
    activeOuterRadiusOffset: 12,
    activeInnerRadiusOffset: 12,
    arcLinkLabelsDiagonalLength: 10,
    arcLinkLabelsStraightLength: 10,
}

const ControlledPies = () => {
    const [activeId, setActiveId] = useState<string>(commonProperties.data[1].id)

    return (
        <div
            style={{
                width: '800px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
            }}
        >
            <Pie {...controlledPieProps} activeId={activeId} onActiveIdChange={setActiveId} />
            <Pie {...controlledPieProps} activeId={activeId} onActiveIdChange={setActiveId} />
        </div>
    )
}

export const ControlledActiveId: Story = {
    render: () => <ControlledPies />,
}

const PieWithCustomLegend = () => {
    const [customLegends, setCustomLegends] = useState<LegendDatum<SampleDatum>[]>([])

    const valueFormat = useCallback(
        (value: number) =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`,
        []
    )

    return (
        <div>
            <Pie
                {...commonProperties}
                width={500}
                margin={{
                    top: 100,
                    right: 100,
                    bottom: 100,
                    left: 100,
                }}
                valueFormat={valueFormat}
                forwardLegendData={setCustomLegends}
            />
            <div>
                <table className="Table">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>ID</th>
                            <th>Value</th>
                            <th>Formatted Value</th>
                            <th>Label</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customLegends.map(legend => {
                            return (
                                <tr key={legend.id}>
                                    <td>
                                        <span
                                            className="Chip"
                                            style={{ backgroundColor: legend.color }}
                                        />
                                    </td>
                                    <td>
                                        <em>{legend.id}</em>
                                    </td>
                                    <td>
                                        <em>{legend.data.value}</em>
                                    </td>
                                    <td>{legend.data.formattedValue}</td>
                                    <td>{legend.label}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const CustomLegend: Story = {
    render: () => <PieWithCustomLegend />,
}
