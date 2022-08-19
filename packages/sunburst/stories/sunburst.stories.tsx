import { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
// @ts-ignore
import { linearGradientDef, patternDotsDef, useTheme } from '@nivo/core'
// @ts-ignore
import { generateLibTree } from '@nivo/generators'
import { colorSchemes } from '@nivo/colors'
// @ts-ignore
import { Sunburst, ComputedDatum, SunburstCustomLayerProps } from '../src'

interface RawDatum {
    name: string
    loc: number
}

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    id: 'name',
    value: 'loc',
}

const stories = storiesOf('Sunburst', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Sunburst {...commonProperties} />)

stories.add('with child color modifier', () => (
    <Sunburst<RawDatum>
        {...commonProperties}
        childColor={{ from: 'color', modifiers: [['brighter', 0.13]] }}
    />
))

stories.add('with child colors independent of parent', () => (
    <Sunburst<RawDatum> {...commonProperties} inheritColorFromParent={false} />
))

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']

stories.add('with custom colors', () => (
    <Sunburst<RawDatum> {...commonProperties} colors={customPalette} />
))

stories.add('with custom child colors', () => (
    <Sunburst<RawDatum>
        {...commonProperties}
        childColor={(parent, child) => {
            // @ts-expect-error
            return child.data.color
        }}
    />
))

stories.add('with formatted tooltip value', () => (
    <Sunburst<RawDatum> {...commonProperties} valueFormat=" >-$,.2f" />
))

const CustomTooltip = ({ id, value, color }: ComputedDatum<unknown>) => {
    const theme = useTheme()

    return (
        <strong style={{ ...theme.tooltip.container, color }}>
            {id}: {value}
        </strong>
    )
}

stories.add('custom tooltip', () => (
    <Sunburst<RawDatum>
        {...commonProperties}
        tooltip={CustomTooltip}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
    />
))

stories.add('enter/leave (check actions)', () => (
    <Sunburst<RawDatum>
        {...commonProperties}
        onMouseEnter={action('onMouseEnter')}
        onMouseLeave={action('onMouseLeave')}
    />
))

stories.add('patterns & gradients', () => (
    <Sunburst<RawDatum>
        {...commonProperties}
        defs={[
            linearGradientDef('gradient', [
                { offset: 0, color: '#ffffff' },
                { offset: 15, color: 'inherit' },
                { offset: 100, color: 'inherit' },
            ]),
            patternDotsDef('pattern', {
                background: 'inherit',
                color: '#ffffff',
                size: 2,
                padding: 3,
                stagger: true,
            }),
        ]}
        fill={[
            {
                match: (node: ComputedDatum<RawDatum>) =>
                    ['viz', 'text', 'utils'].includes(node.id),
                id: 'gradient',
            },
            {
                match: (node: ComputedDatum<RawDatum>) =>
                    ['set', 'generators', 'misc'].includes(node.id),
                id: 'pattern',
            },
        ]}
    />
))

const flatten = data =>
    data.reduce((acc, item) => {
        if (item.children) {
            return [...acc, item, ...flatten(item.children)]
        }

        return [...acc, item]
    }, [])

const findObject = (data, name) => data.find(searchedName => searchedName.name === name)

const drillDownColors = colorSchemes.brown_blueGreen[7]
const drillDownColorMap = {
    viz: drillDownColors[0],
    colors: drillDownColors[1],
    utils: drillDownColors[2],
    generators: drillDownColors[3],
    set: drillDownColors[4],
    text: drillDownColors[5],
    misc: drillDownColors[6],
}
const getDrillDownColor = (node: Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>) => {
    const category = [...node.path].reverse()[1] as keyof typeof drillDownColorMap

    return drillDownColorMap[category]
}

stories.add(
    'children drill down',
    () => {
        const [data, setData] = useState(commonProperties.data)

        return (
            <>
                <button onClick={() => setData(commonProperties.data)}>Reset</button>
                <Sunburst<RawDatum>
                    {...commonProperties}
                    colors={getDrillDownColor}
                    inheritColorFromParent={false}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.6]],
                    }}
                    animate={boolean('animate', true)}
                    motionConfig={select(
                        'motion config',
                        ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'],
                        'gentle'
                    )}
                    enableArcLabels
                    arcLabelsSkipAngle={12}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 3]],
                    }}
                    data={data}
                    transitionMode="pushIn"
                    onClick={clickedData => {
                        const foundObject = findObject(flatten(data.children), clickedData.id)
                        if (foundObject && foundObject.children) {
                            setData(foundObject)
                        }
                    }}
                />
            </>
        )
    },
    {
        info: {
            text: `
            You can drill down into individual children by clicking on them
        `,
        },
    }
)

stories.add('adding a metric in the center using a custom layer', () => {
    const CenteredMetric = ({ nodes, centerX, centerY }: SunburstCustomLayerProps<RawDatum>) => {
        const total = nodes.reduce((total, datum) => total + datum.value, 0)
        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '42px',
                    fontWeight: 600,
                }}
            >
                {Number.parseFloat(`${total}`).toExponential(2)}
            </text>
        )
    }
    return (
        <Sunburst<RawDatum> {...commonProperties} layers={['arcs', 'arcLabels', CenteredMetric]} />
    )
})

stories.add('radial labels using custom layer', () => {
    function CustomArcLabels(ctx) {
        const arcLabelSkip = 10
        return (
            <g>
                {ctx.nodes.map(node => {
                    console.log(ctx, node, node.data.name)
                    const nodeArc = node.arc
                    const startAngle = (nodeArc.startAngle * 180) / Math.PI
                    let endAngle = (nodeArc.endAngle * 180) / Math.PI

                    if (endAngle - startAngle < arcLabelSkip) return <></>
                    if (startAngle === 0 && endAngle > 359) endAngle = 90

                    const radius = (nodeArc.innerRadius + nodeArc.outerRadius) / 2
                    let dName = describeArc(ctx.centerX, ctx.centerY, radius, startAngle, endAngle)

                    const avgAngle = (startAngle + endAngle) / 2
                    if (avgAngle > 90 && avgAngle < 270) {
                        dName = describeArc(
                            ctx.centerX,
                            ctx.centerY,
                            radius,
                            endAngle,
                            startAngle,
                            true
                        )
                    }

                    return (
                        <g pointerEvents={'none'} key={node.data.name}>
                            <path fill="transparent" id={node.data.name} d={dName} />
                            <text textAnchor="middle">
                                <textPath startOffset={'50%'} href={`#${node.data.name}`}>
                                    {node.data.name}
                                </textPath>
                            </text>
                        </g>
                    )
                })}
            </g>
        )
    }

    function describeArc(x, y, radius, startAngle, endAngle, invert = false) {
        const start = polarToCartesian(x, y, radius, startAngle)
        const end = polarToCartesian(x, y, radius, endAngle)

        const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1'

        const d = [
            'M',
            start.x,
            start.y,
            'A',
            radius,
            radius,
            0,
            largeArcFlag,
            invert ? 0 : 1,
            end.x,
            end.y,
        ].join(' ')

        return d
    }

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        }
    }

    return <Sunburst<RawDatum> {...commonProperties} layers={['arcs', CustomArcLabels]} />
})
