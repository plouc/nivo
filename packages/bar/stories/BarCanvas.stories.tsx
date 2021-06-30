import { BarCanvas, BarCanvasLayer, BarCanvasProps, BarDatum, canvasDefaultProps } from '../src'
import { Meta, Story } from '@storybook/react'
import { generateCountriesData } from '@nivo/generators'
import { useRef } from 'react'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 7 }) as BarDatum[],
    indexBy: 'country',
    keys,
    padding: 0.2,
    labelSkipWidth: 16,
    labelSkipHeight: 16,
}

export default {
    title: 'BarCanvas',
    component: BarCanvas,
    args: commonProps,
    parameters: {
        controls: {
            hideNoControlsWarning: true,
            include: [],
            sort: 'alpha',
        },
    },
} as Meta

const Template: Story<BarCanvasProps<BarDatum>> = args => <BarCanvas {...commonProps} {...args} />

export const Default: Story<BarCanvasProps<BarDatum>> = Template.bind({})

export const CustomLayer: Story<BarCanvasProps<BarDatum>> = args => (
    <BarCanvas
        {...commonProps}
        {...args}
        layers={[
            ...(canvasDefaultProps.layers as BarCanvasLayer<BarDatum>[]).filter(layer =>
                args.layers.includes(layer)
            ),
            (ctx, props) => {
                const total = props.bars
                    .reduce((acc, bar) => acc + bar.data.value, 0)
                    .toLocaleString()

                ctx.save()

                ctx.textAlign = 'right'
                ctx.font = 'bold 20px san-serif'
                ctx.fillStyle = '#2a2a2a'

                ctx.fillText(`Grand Total: ${total}`, props.width - 100, -10)

                ctx.restore()
            },
        ]}
    />
)

CustomLayer.argTypes = {
    layers: {
        control: { type: 'check' },
        options: canvasDefaultProps.layers,
    },
}

CustomLayer.args = {
    layers: canvasDefaultProps.layers as BarCanvasLayer<BarDatum>[],
    legends: [
        {
            anchor: 'bottom',
            dataFrom: 'keys',
            direction: 'row',
            itemHeight: 20,
            itemWidth: 110,
            translateY: 50,
        },
    ],
}

CustomLayer.parameters = {
    controls: { include: ['layers'] },
}

export const CustomBarRenderer: Story<BarCanvasProps<BarDatum>> = Template.bind({})

CustomBarRenderer.args = {
    innerPadding: 4,
    renderBar: (ctx, { bar: { x, y, width, height, color } }) => {
        ctx.beginPath()

        ctx.fillStyle = color

        ctx.arc(
            x + width / 2,
            y + height / 2,
            Math.abs(Math.min(width, height) / 2),
            0,
            2 * Math.PI
        )

        ctx.fill()
    },
}

export const CustomTooltip: Story<BarCanvasProps<BarDatum>> = Template.bind({})

CustomTooltip.args = {
    tooltip: ({ id, value, color }) => (
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
    ),
    legendLabel: datum => `${datum.id} (${datum.value})`,
    legends: [
        {
            anchor: 'bottom',
            dataFrom: 'keys',
            direction: 'row',
            itemHeight: 20,
            itemWidth: 110,
            toggleSerie: true,
            translateY: 50,
        },
    ],
}

export const WithAnnotations: Story<BarCanvasProps<BarDatum>> = Template.bind({})

WithAnnotations.args = {
    annotations: [
        {
            type: 'circle',
            match: { key: 'fries.AE' },
            noteX: 25,
            noteY: 25,
            offset: 3,
            noteTextOffset: -3,
            noteWidth: 5,
            note: 'an annotation',
            size: 40,
        },
    ],
    borderRadius: 10,
}

export const DownloadChart: Story<BarCanvasProps<BarDatum>> = args => {
    const ref = useRef<HTMLCanvasElement | null>(null)

    return (
        <>
            <button
                onClick={() => {
                    const canvas = ref.current
                    const link = document.createElement('a')
                    link.download = 'chart.png'
                    link.href = canvas.toDataURL('image/png')
                    link.click()
                }}
            >
                Download Image
            </button>
            <BarCanvas {...commonProps} ref={ref} />
        </>
    )
}

DownloadChart.storyName = 'Get Canvas - Download The Chart'
