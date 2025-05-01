import { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { generateCountriesData } from '@nivo/generators'
// @ts-ignore
import { BarDatum, ResponsiveBarCanvas } from '../src'
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
    labelTextColor: 'inherit:darker(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16,
}

const stories = storiesOf('ResponsiveBarCanvas', module)

const Wrapper = props => <div {...props} style={{ height: '300px', width: '600px' }} />

stories.add('custom tooltip', () => (
    <Wrapper>
        <ResponsiveBarCanvas
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
        />
    </Wrapper>
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

    return (
        <Wrapper>
            <ResponsiveBarCanvas {...commonProps} ref={ref} />
        </Wrapper>
    )
})
