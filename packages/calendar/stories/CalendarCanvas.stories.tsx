import { CalendarCanvas, CalendarCanvasProps, CalendarTooltipProps } from '../src'
import { Meta, Story } from '@storybook/react'
import { generateDayCounts } from '@nivo/generators'
import { scaleQuantize } from 'd3-scale'

const from = new Date(2013, 0, 1)
const to = new Date(2019, 11, 31)
const data = generateDayCounts(from, to)

export default {
    component: CalendarCanvas,
    parameters: {
        controls: { include: [] },
    },
    title: 'CalendarCanvas',
} as Meta

const Template: Story<CalendarCanvasProps> = args => (
    <CalendarCanvas
        data={data}
        direction="horizontal"
        from={from.toISOString()}
        height={1560}
        margin={{ bottom: 10, left: 50, right: 10, top: 50 }}
        to={to.toISOString()}
        width={1500}
        {...args}
    />
)

export const Default: Story<CalendarCanvasProps> = Template.bind({})

const CustomTooltipComponent = (data: CalendarTooltipProps) => {
    if (data.value === undefined) return null
    return (
        <span style={{ color: data.color, backgroundColor: 'black', padding: '10px' }}>
            {data.day} : {data.value}
        </span>
    )
}

export const CustomTooltip: Story<CalendarCanvasProps> = Template.bind({})

CustomTooltip.args = {
    tooltip: CustomTooltipComponent,
}

export const Spacing: Story<CalendarCanvasProps> = Template.bind({})

Spacing.argTypes = ['dayBorderWidth', 'daySpacing', 'monthSpacing'].reduce(
    (acc, key) => ({
        ...acc,
        [key]: {
            control: {
                max: 100,
                min: 0,
                step: 1,
                type: 'range',
            },
        },
    }),
    {}
)

Spacing.args = {
    dayBorderWidth: 2,
    daySpacing: 5,
    monthSpacing: 50,
}

Spacing.parameters = {
    controls: {
        include: Object.keys(Spacing.args),
    },
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
    const colorScale = value => {
        return defaultColorScale(value) + '33' //adding alpha channel
    }
    colorScale.ticks = count => {
        return defaultColorScale.ticks(count)
    }
    return colorScale
}

export const CustomColorScale: Story<CalendarCanvasProps> = Template.bind({})

CustomColorScale.args = {
    colorScale: createColorScale(data, 'auto', 'auto'),
}

export const CustomFormatters: Story<CalendarCanvasProps> = Template.bind({})

CustomFormatters.args = {
    legendFormat: value => value.toFixed(1) + ' hours',
    legends: [
        {
            anchor: 'top-right',
            direction: 'column',
            itemCount: 4,
            itemDirection: 'left-to-right',
            itemHeight: 40,
            itemWidth: 100,
            itemsSpacing: 20,
            symbolShape: 'diamond',
            translateX: 130,
        },
    ],
    margin: { top: 50, right: 130, bottom: 50, left: 60 },
    valueFormat: '2f',
}
