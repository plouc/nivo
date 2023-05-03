import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useState, Component } from 'react'
import { symbol, symbolWye } from 'd3-shape'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { Waffle, WaffleHtml, LegendDatum, CellComponentProps } from '@nivo/waffle'
import { nivoTheme } from '../nivo-theme'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof Waffle> = {
    title: 'Waffle',
    component: Waffle,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'click' },
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

interface Datum {
    id: string
    label: string
    value: number
    color: string
}

const data: Datum[] = [
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
    padding: 2,
    theme: nivoTheme,
}

export const Basic: Story = {
    render: args => (
        <Waffle {...commonProps} fillDirection={args.fillDirection} onClick={args.onClick} />
    ),
}

/**
 * With the `forwardLegendData` property, it is possible to get the computed legends
 * from the chart to render the legend outside the chart using plain HTML for example,
 * rather than being limited to SVG.
 */
export const CustomLegend: Story = {
    render: args => {
        const [legends, setLegends] = useState<LegendDatum<Datum>[]>([])

        const formatValue = useCallback((value: number) => `${value} peolpe`, [])

        return (
            <div>
                <WaffleHtml
                    {...commonProps}
                    width={400}
                    height={300}
                    fillDirection={args.fillDirection}
                    data={data}
                    columns={16}
                    rows={20}
                    padding={1}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    valueFormat={formatValue}
                    forwardLegendData={setLegends}
                    onClick={args.onClick}
                    motionConfig="wobbly"
                    testIdPrefix="waffle"
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
                            {legends.map(legend => {
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
    },
}

export const UsingDataColor: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            fillDirection={args.fillDirection}
            colors={{ datum: 'color' }}
            onClick={args.onClick}
            testIdPrefix="waffle"
        />
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
            onClick={args.onClick}
            testIdPrefix="waffle"
        />
    ),
}

const CustomCellComponent = ({ cell, cellSize }: CellComponentProps<Datum>) => {
    return (
        <path
            transform={`translate(${cell.x + cellSize / 2},${cell.y + cellSize / 2})`}
            d={`${symbol().type(symbolWye).size(340)()}`}
            fill={cell.color}
        />
    )
}

export const CustomCell: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            columns={12}
            rows={16}
            padding={0}
            fillDirection={args.fillDirection}
            cellComponent={CustomCellComponent}
            onClick={args.onClick}
            testIdPrefix="waffle"
        />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            tooltip={CustomTooltipComponent}
            onClick={args.onClick}
            testIdPrefix="waffle"
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
