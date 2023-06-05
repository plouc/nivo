import type { Meta, StoryObj } from '@storybook/react'
import { scaleQuantize } from 'd3-scale'
import { generateDayCounts } from '@bitbloom/nivo-generators'
import { CalendarCanvas, CalendarTooltipProps } from '@bitbloom/nivo-calendar'

const meta: Meta<typeof CalendarCanvas> = {
    title: 'CalendarCanvas',
    component: CalendarCanvas,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CalendarCanvas>

const from = new Date(2013, 0, 1)
const to = new Date(2019, 11, 31)
const data = generateDayCounts(from, to)

const commonProps = {
    width: 1500,
    height: 1560,
    margin: {
        top: 50,
        right: 10,
        bottom: 10,
        left: 50,
    },
    from: from.toISOString(),
    to: to.toISOString(),
    direction: 'horizontal',
    data,
} as const

const CustomTooltipComponent = (data: CalendarTooltipProps) => {
    if (data.value === undefined) return null
    return (
        <span style={{ color: data.color, backgroundColor: 'black', padding: '10px' }}>
            {data.day} : {data.value}
        </span>
    )
}

export const CustomTooltip: Story = {
    render: () => <CalendarCanvas tooltip={CustomTooltipComponent} {...commonProps} />,
}

export const Spacing: Story = {
    render: () => (
        <CalendarCanvas {...commonProps} daySpacing={5} monthSpacing={50} dayBorderWidth={2} />
    ),
}

const createColorScale = (data, minValue, maxValue) => {
    const computeDomain = (data, minSpec, maxSpec) => {
        const allValues = data.map(d => d.value)
        const minValue = minSpec === 'auto' ? Math.min(...allValues) : minSpec
        const maxValue = maxSpec === 'auto' ? Math.max(...allValues) : maxSpec
        return [minValue, maxValue]
    }
    const colors = ['#a1cfff', '#468df3', '#a053f0', '#9629f0', '#8428d8']
    const domain = computeDomain(data, minValue, maxValue)
    const defaultColorScale = scaleQuantize<string>().domain(domain).range(colors)
    const colorScale = (value: number) => {
        return defaultColorScale(value) + '33' // adding alpha channel
    }
    colorScale.ticks = (count: number) => {
        return defaultColorScale.ticks(count)
    }
    return colorScale
}

const customColorScale = createColorScale(data, 'auto', 'auto')

export const CustomColorSpaceFunction: Story = {
    render: () => <CalendarCanvas {...commonProps} colorScale={customColorScale} />,
}

export const CustomValueAndLegendFormatters: Story = {
    render: () => (
        <CalendarCanvas
            {...commonProps}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            valueFormat="2f"
            legendFormat={value => value.toFixed(1) + ' hours'}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    symbolShape: 'diamond',
                    translateX: 130,
                    itemCount: 4,
                    itemWidth: 100,
                    itemHeight: 40,
                    itemsSpacing: 20,
                    itemDirection: 'left-to-right',
                },
            ]}
        />
    ),
}
