import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { linearGradientDef, patternDotsDef, useTheme } from '@nivo/core'
import { generateLibTree } from '@nivo/generators'
import { colorSchemes } from '@nivo/colors'
import { Sunburst, ComputedDatum, SunburstCustomLayerProps } from '@nivo/sunburst'

const meta: Meta<typeof Sunburst> = {
    title: 'Sunburst',
    component: Sunburst,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
        onMouseEnter: { action: 'mouseenter' },
        onMouseLeave: { action: 'mouseleave' },
    },
}

export default meta
type Story = StoryObj<typeof Sunburst>

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

export const Basic: Story = {
    render: () => <Sunburst {...commonProperties} />,
}

export const WithChildColorModifier: Story = {
    render: () => (
        <Sunburst<RawDatum>
            {...commonProperties}
            childColor={{ from: 'color', modifiers: [['brighter', 0.13]] }}
        />
    ),
}

export const WithColorsIndependentFromParent: Story = {
    render: () => <Sunburst<RawDatum> {...commonProperties} inheritColorFromParent={false} />,
}

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']
export const WithCustomColors: Story = {
    render: () => <Sunburst<RawDatum> {...commonProperties} colors={customPalette} />,
}

export const WithCustomChildColors: Story = {
    render: () => (
        <Sunburst<RawDatum>
            {...commonProperties}
            childColor={(parent, child) => {
                return child.data.color
            }}
        />
    ),
}

export const WithFormattedTooltipValue: Story = {
    render: () => <Sunburst<RawDatum> {...commonProperties} valueFormat=" >-$,.2f" />,
}

const CustomTooltipComponent = ({ id, value, color }: ComputedDatum<unknown>) => {
    const theme = useTheme()

    return (
        <strong style={{ ...theme.tooltip.container, color }}>
            {id}: {value}
        </strong>
    )
}

export const CustomTooltip: Story = {
    render: () => (
        <Sunburst<RawDatum>
            {...commonProperties}
            tooltip={CustomTooltipComponent}
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

export const MouseEvents: Story = {
    render: args => (
        <Sunburst<RawDatum>
            {...commonProperties}
            onClick={args.onClick}
            onMouseEnter={args.onMouseEnter}
            onMouseLeave={args.onMouseLeave}
        />
    ),
}

export const PatternsAndGradients: Story = {
    render: args => (
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
    ),
}

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

/**
 * You can drill down into individual children by clicking on them
 */
export const ChildrenDrillDown: Story = {
    argTypes: {
        animate: {
            control: 'boolean',
        },
        motionConfig: {
            control: 'select',
            options: ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'],
        },
    },
    args: {
        animate: true,
        motionConfig: 'gentle',
    },
    render: args => {
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
                    animate={args.animate}
                    motionConfig={args.motionConfig}
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
}

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

export const AddingAMetricInTheCenterUsingACustomLayer: Story = {
    render: () => (
        <Sunburst<RawDatum> {...commonProperties} layers={['arcs', 'arcLabels', CenteredMetric]} />
    ),
}
