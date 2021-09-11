import { useEffect, useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Theme } from '@nivo/core'
import { categoricalColorSchemes } from '@nivo/colors'
// @ts-ignore
import { RadialBar, RadialBarSvgProps, RadialBarCustomLayerProps, svgDefaultProps } from '../src'

export default {
    component: RadialBar,
    title: 'RadialBar',
    decorators: [withKnobs],
} as Meta

const simpleData: RadialBarSvgProps['data'] = [
    {
        id: 'Supermarket',
        data: [
            {
                x: 'Vegetables',
                y: 55,
            },
        ],
    },
    {
        id: 'Combini',
        data: [
            {
                x: 'Vegetables',
                y: 251,
            },
        ],
    },
    {
        id: 'Online',
        data: [
            {
                x: 'Vegetables',
                y: 15,
            },
        ],
    },
    {
        id: 'Marché',
        data: [
            {
                x: 'Vegetables',
                y: 180,
            },
        ],
    },
]

const multipleCategoriesData: RadialBarSvgProps['data'] = [
    {
        id: 'Supermarket',
        data: [
            {
                x: 'Vegetables',
                y: 55,
            },
            {
                x: 'Fruits',
                y: 200,
            },
            {
                x: 'Meat',
                y: 269,
            },
        ],
    },
    {
        id: 'Combini',
        data: [
            {
                x: 'Vegetables',
                y: 251,
            },
            {
                x: 'Fruits',
                y: 23,
            },
            {
                x: 'Meat',
                y: 100,
            },
        ],
    },
    {
        id: 'Online',
        data: [
            {
                x: 'Vegetables',
                y: 15,
            },
            {
                x: 'Fruits',
                y: 37,
            },
            {
                x: 'Meat',
                y: 285,
            },
        ],
    },
    {
        id: 'Marché',
        data: [
            {
                x: 'Vegetables',
                y: 180,
            },
            {
                x: 'Fruits',
                y: 154,
            },
            {
                x: 'Meat',
                y: 197,
            },
        ],
    },
]

const commonProperties: RadialBarSvgProps = {
    width: 400,
    height: 400,
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    data: multipleCategoriesData,
}

export const Default = () => <RadialBar {...commonProperties} />

const CustomLayer = ({ center }: RadialBarCustomLayerProps) => {
    return (
        <g transform={`translate(${center[0]}, ${center[1]})`}>
            <text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: 52,
                    fontWeight: 800,
                    fill: '#eeeeee',
                }}
            >
                YAY
            </text>
        </g>
    )
}

const groupColorScheme = categoricalColorSchemes.accent
const colorByGroupId = {
    Supermarket: groupColorScheme[0],
    Combini: groupColorScheme[1],
    Online: groupColorScheme[2],
    Marché: groupColorScheme[3],
}

const demoPhases: {
    description: string
    props: RadialBarSvgProps
}[] = [
    {
        description: 'Defaults',
        props: {
            ...commonProperties,
            data: simpleData,
            innerRadius: 0.2,
        },
    },
    {
        description: 'Multiple dimensions',
        props: {
            ...commonProperties,
        },
    },
    {
        description: 'Start & end angles',
        props: {
            ...commonProperties,
            startAngle: 180,
            endAngle: 450,
            innerRadius: 0.2,
        },
    },
    {
        description: 'Inner radius',
        props: {
            ...commonProperties,
            startAngle: 180,
            endAngle: 450,
            innerRadius: 0.66,
        },
    },
    {
        description: 'Custom colors',
        props: {
            ...commonProperties,
            data: simpleData,
            colors: d => colorByGroupId[d.groupId as keyof typeof colorByGroupId],
            startAngle: 180,
            endAngle: 450,
            innerRadius: 0.4,
        },
    },
    {
        description: 'Custom layer',
        props: {
            ...commonProperties,
            startAngle: 180,
            endAngle: 450,
            innerRadius: 0.66,
            layers: [...svgDefaultProps.layers, CustomLayer],
        },
    },
    {
        description: 'Start/End radial axes',
        props: {
            ...commonProperties,
            startAngle: 250,
            endAngle: 470,
            innerRadius: 0.4,
            radialAxisEnd: {},
        },
    },
    {
        description: 'Inner/Outer circular axes',
        props: {
            ...commonProperties,
            startAngle: 180,
            endAngle: 450,
            innerRadius: 0.66,
            radialAxisEnd: {},
            circularAxisInner: {},
        },
    },
    {
        description: 'Labels',
        props: {
            ...commonProperties,
            startAngle: 90,
            endAngle: 360,
            innerRadius: 0.3,
            enableLabels: true,
        },
    },
]

const demoTheme: Theme = {
    axis: {
        domain: {
            line: {
                strokeWidth: 1,
                stroke: '#666666',
            },
        },
        ticks: {
            line: {
                strokeWidth: 1,
                stroke: '#eeeeee',
            },
            text: {
                fill: '#eeeeee',
                fontSize: 11,
            },
        },
    },
    labels: {
        text: {
            fontWeight: 800,
            fill: '#000000',
        },
    },
    grid: {
        line: {
            stroke: '#666666',
        },
    },
}

const RadialBarDemo = () => {
    const [phaseIndex, setPhaseIndex] = useState(0)
    const phase = useMemo(() => demoPhases[phaseIndex], [phaseIndex])

    useEffect(() => {
        const timer = setTimeout(() => {
            setPhaseIndex(currentPhaseIndex => {
                if (currentPhaseIndex < demoPhases.length - 1) return currentPhaseIndex + 1
                return 0
            })
        }, 1400)
        return () => clearTimeout(timer)
    }, [phaseIndex, setPhaseIndex])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#222',
                width: '400px',
            }}
        >
            <div style={{ padding: '24px 0', color: '#eeeeee', fontSize: '16px' }}>
                {phase.description}
            </div>
            <RadialBar
                {...phase.props}
                tracksColor="rgba(0, 0, 0, .5)"
                theme={demoTheme}
                motionConfig="slow"
            />
        </div>
    )
}

export const Demo = () => <RadialBarDemo />
