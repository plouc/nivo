/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Icicles, IciclesComputedDatum, IciclesDirection } from '../src'

interface RawDatum {
    name: string
    loc: number
}

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree() as any,
    id: 'name',
    value: 'loc',
}

const stories = storiesOf('Icicles', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Icicles {...commonProperties} />)

stories.add('with child color modifier', () => (
    <Icicles<RawDatum>
        {...commonProperties}
        childColor={{ from: 'color', modifiers: [['brighter', 0.13]] }}
    />
))

stories.add('with child colors independent of parent', () => (
    <Icicles<RawDatum> {...commonProperties} inheritColorFromParent={false} />
))

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']

stories.add('with custom colors', () => (
    <Icicles<RawDatum> {...commonProperties} colors={customPalette} />
))

stories.add('with custom child colors', () => (
    <Icicles<RawDatum>
        {...commonProperties}
        childColor={(parent, child) => {
            // @ts-expect-error
            return child.data.color
        }}
    />
))

stories.add('with formatted tooltip value', () => (
    <Icicles<RawDatum> {...commonProperties} valueFormat=" >-$,.2f" />
))

const CustomTooltip = ({ id, value, color }: IciclesComputedDatum<unknown>) => {
    const theme = useTheme()

    return (
        <strong style={{ ...theme.tooltip.container, color }}>
            {id}: {value}
        </strong>
    )
}

stories.add('custom tooltip', () => (
    <Icicles<RawDatum>
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
    <Icicles<RawDatum>
        {...commonProperties}
        onMouseEnter={action('onMouseEnter')}
        onMouseLeave={action('onMouseLeave')}
    />
))

stories.add('wheel/contextmenu (check actions)', () => (
    <Icicles<RawDatum>
        {...commonProperties}
        onWheel={action('onWheel')}
        onContextMenu={action('onContextMenu')}
    />
))

stories.add('patterns & gradients', () => (
    <Icicles<RawDatum>
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
                match: node =>
                    ['viz', 'text', 'utils'].includes(
                        (node as unknown as IciclesComputedDatum<RawDatum>).id as string
                    ),
                id: 'gradient',
            },
            {
                match: node =>
                    ['set', 'generators', 'misc'].includes(
                        (node as unknown as IciclesComputedDatum<RawDatum>).id as string
                    ),
                id: 'pattern',
            },
        ]}
    />
))

const flatten = <T extends { children: T[] }>(data: T[]): T[] =>
    data.reduce<T[]>((acc, item) => {
        if (item.children) {
            return [...acc, item, ...flatten(item.children)]
        }

        return [...acc, item]
    }, [])

const findObject = <T extends { name: string }>(data: T[], name: string): T | undefined =>
    data.find(searchedName => searchedName.name === name)

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
const getDrillDownColor = (node: Omit<IciclesComputedDatum<RawDatum>, 'color' | 'fill'>) => {
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
                <Icicles<RawDatum>
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
                    enableRectLabels
                    rectLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 3]],
                    }}
                    data={data}
                    onClick={clickedData => {
                        const foundObject = findObject(
                            flatten(data.children) as any,
                            clickedData.id as string
                        )
                        if (foundObject && (foundObject as any).children) {
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

stories.add('change direction', () => (
    <Icicles<RawDatum>
        {...commonProperties}
        direction={select<IciclesDirection>(
            'direction',
            ['top', 'right', 'bottom', 'left'],
            'bottom'
        )}
        animate={boolean('animate', true)}
        motionConfig={select(
            'motion config',
            ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses'],
            'gentle'
        )}
    />
))
