import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { PieCanvas } from '@nivo/pie'
import { nivoTheme } from '../nivo-theme'

const meta: Meta<typeof PieCanvas> = {
    title: 'PieCanvas',
    component: PieCanvas,
    tags: ['autodocs'],
    argTypes: {
        legends: {
            control: 'boolean',
        },
    },
    args: {
        legends: false,
    },
}

export default meta
type Story = StoryObj<typeof PieCanvas>

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: generateProgrammingLanguageStats(true, 9).map(({ label, ...d }) => ({
        id: label,
        ...d,
    })),
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
    render: args => <PieCanvas {...commonProperties} legends={args.legends ? legends : []} />,
}

export const Donut: Story = {
    render: () => <PieCanvas {...commonProperties} innerRadius={0.6} />,
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
    render: () => <PieCanvas {...commonProperties} colors={{ datum: 'data.color' }} />,
}

export const FormattedValues: Story = {
    render: () => (
        <PieCanvas
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
        <PieCanvas
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
            <PieCanvas {...controlledPieProps} activeId={activeId} onActiveIdChange={setActiveId} />
            <PieCanvas {...controlledPieProps} activeId={activeId} onActiveIdChange={setActiveId} />
        </div>
    )
}

export const ControlledActiveId: Story = {
    render: () => <ControlledPies />,
}
