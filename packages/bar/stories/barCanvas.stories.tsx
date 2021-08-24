import { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { generateCountriesData } from '@nivo/generators'
// @ts-ignore
import { BarCanvas, BarCanvasLayer, BarDatum, canvasDefaultProps } from '../src'
import { button } from '@storybook/addon-knobs'

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

const stories = storiesOf('BarCanvas', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <BarCanvas {...commonProps} />)

stories.add('custom layer', () => {
    const layers = canvasDefaultProps.layers.filter(layer =>
        boolean(`layer.${layer}`, true)
    ) as BarCanvasLayer<BarDatum>[]

    return (
        <BarCanvas
            {...commonProps}
            layers={[
                ...layers,
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
            legends={[
                {
                    anchor: 'bottom',
                    dataFrom: 'keys',
                    direction: 'row',
                    itemHeight: 20,
                    itemWidth: 110,
                    translateY: 50,
                },
            ]}
        />
    )
})

stories.add('custom bar renderer', () => (
    <BarCanvas
        {...commonProps}
        innerPadding={4}
        renderBar={(ctx, { bar: { x, y, width, height, color } }) => {
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
        }}
    />
))

stories.add('custom tooltip', () => (
    <BarCanvas
        {...commonProps}
        tooltip={({ id, value, color }) => (
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
        legendLabel={datum => `${datum.id} (${datum.value})`}
        legends={[
            {
                anchor: 'bottom',
                dataFrom: 'keys',
                direction: 'row',
                itemHeight: 20,
                itemWidth: 110,
                toggleSerie: true,
                translateY: 50,
            },
        ]}
    />
))

stories.add('with annotations', () => (
    <BarCanvas
        {...commonProps}
        borderRadius={10}
        annotations={[
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
        ]}
    />
))

stories.add('Get canvas - download the chart', () => {
    const ref = useRef(undefined)

    button('Download image', () => {
        const canvas = ref.current
        const link = document.createElement('a')
        link.download = 'chart.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
    })

    return <BarCanvas {...commonProps} ref={ref} />
})
