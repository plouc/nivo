import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useMemo, useState, Component } from 'react'
import { symbol, symbols, symbolWye } from 'd3-shape'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { Waffle, WaffleHtml, WaffleCanvas, LegendDatum, CellComponentProps } from '@nivo/waffle'
import { nivoTheme } from '../nivo-theme'
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
                <button onClick={gen}>Roll the dice</button>
                <Waffle<Datum>
                    {...commonProps}
                    fillDirection={args.fillDirection}
                    data={data}
                    // {...leftIssue}
                    columns={args.columns}
                    columns={5}
                    rows={6}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    padding={0}
                    motionConfig="gentle"
                    testIdPrefix="waffle"
                />
            </div>
        )
    },
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
                <WaffleHtml<Datum>
                    {...commonProps}
                    width={400}
                    height={300}
                    fillDirection={args.fillDirection}
                    data={data}
                    columns={16}
                    rows={20}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    padding={0}
                    valueFormat={formatValue}
                    forwardLegendData={setLegends}
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

        const [legends, setLegends] = useState<LegendDatum[]>([])

        const formatValue = useCallback((value: number) => `${value} peolpe`, [])

        return (
            <div>
                <button onClick={gen}>Roll the dice</button>
                <WaffleHtml
                    {...commonProps}
                    fillDirection={args.fillDirection}
                    data={data}
                    columns={args.columns}
                    rows={6}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    padding={0}
                    valueFormat={formatValue}
                    forwardLegendData={setLegends}
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

export const DemoCanvas: Story = {
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
                <button onClick={gen}>Roll the dice</button>
                <WaffleCanvas
                    {...commonProps}
                    fillDirection={args.fillDirection}
                    data={data}
                    columns={args.columns}
                    rows={6}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    padding={0}
                    motionConfig="wobbly"
                />
            </div>
        )
    },
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
        />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <Waffle
            {...commonProps}
            fillDirection={args.fillDirection}
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
