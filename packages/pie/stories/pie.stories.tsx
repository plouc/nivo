import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { animated } from 'react-spring'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Pie } from '../src'

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
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
            {
                on: 'hover',
                style: {
                    itemTextColor: '#000',
                },
            },
        ],
    },
]

const stories = storiesOf('Pie', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
    <Pie {...commonProperties} legends={boolean('legends', false) ? legends : []} />
))

stories.add('donut', () => <Pie {...commonProperties} innerRadius={0.6} />)

stories.add('fancy slices', () => (
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
))

stories.add('custom arc link label', () => (
    <Pie
        {...commonProperties}
        innerRadius={0.6}
        padAngle={0.5}
        cornerRadius={5}
        arcLinkLabel={d => `${d.id}: ${d.value}`}
        arcLinkLabelsColor={{
            from: 'color',
        }}
        radialLabelsLinkStrokeWidth={3}
        radialLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 1.2]],
        }}
        enableArcLabels={false}
    />
))

stories.add(
    'using colors from data',
    () => <Pie {...commonProperties} colors={{ datum: 'data.color' }} />,
    {
        info: {
            text: `
            It is possible to use colors coming from the provided dataset instead of using
            a color scheme, to do so, you should pass:
            
            \`\`\`
            colors={{ datum: 'data.color' }}
            \`\`\`
            
            given that each data point you pass has a \`color\` property.
            
            It's also possible to pass a function if you want to handle more advanced computation:
            
            \`\`\`
            colors={(datum) => datum.color }}
            \`\`\`
        `,
        },
    }
)

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
                fontWeight: '600',
            }}
        >
            {total}
        </text>
    )
}

stories.add('adding a metric in the center using a custom layer', () => (
    <Pie
        {...commonProperties}
        innerRadius={0.8}
        enableSliceLabels={false}
        radialLabel={d => `${d.id} (${d.formattedValue})`}
        activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
        layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
    />
))

stories.add('formatted values', () => (
    <Pie
        {...commonProperties}
        sliceLabelsRadiusOffset={0.7}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
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
))

stories.add('enter/leave (check console)', () => (
    <Pie
        {...commonProperties}
        onMouseEnter={(data, e) => {
            console.log({ is: 'mouseenter', data, event: e }) // eslint-disable-line
        }}
        onMouseLeave={(data, e) => {
            console.log({ is: 'mouseleave', data, event: e }) // eslint-disable-line
        }}
    />
))

stories.add('custom arc label component', () => (
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
        arcLabelComponent={({ datum, label, style }) => (
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
))
