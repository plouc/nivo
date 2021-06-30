import { Bullet, BulletSvgProps } from '../src'
import { Meta, Story } from '@storybook/react'
import { generateBulletData } from '@nivo/generators'

type BulletStoryProps = BulletSvgProps &
    Partial<{
        minValueAuto: boolean
        minValueValue: number
        maxValueAuto: boolean
        maxValueValue: number
    }>

const data = [
    generateBulletData('volume', 200, { measureCount: 2 }),
    generateBulletData('cost', 10000, { markerCount: 2 }),
    generateBulletData('revenue', 2, { float: true }),
]

const commonProps = {
    width: 900,
    height: 360,
    margin: { top: 10, right: 30, bottom: 50, left: 110 },
    titleOffsetX: -80,
    data,
    spacing: 80,
    animate: true,
    layout: 'horizontal',
} as const

export default {
    title: 'Bullet',
    component: Bullet,
    args: commonProps,
    argTypes: {
        maxValueAuto: {
            name: 'maxValue.auto',
            defaultValue: false,
            description: `Passes 'auto' to maxValue.`,
            control: {
                type: 'boolean',
            },
        },
        maxValueValue: {
            name: 'maxValue.value',
            defaultValue: 100,
            description: `Passes value to maxValue if 'maxValue.auto' is false.`,
            control: {
                type: 'range',
                min: 40,
                max: 100,
                step: 1,
            },
        },
        minValueAuto: {
            name: 'minValue.auto',
            defaultValue: true,
            description: `Passes 'auto' to minValue.`,
            control: {
                type: 'boolean',
            },
        },
        minValueValue: {
            name: 'minValue.value',
            defaultValue: 0,
            description: `Passes value to minValue if 'minValue.auto' is false.`,
            control: {
                type: 'range',
                min: 0,
                max: 10,
                step: 1,
            },
        },
    },
    parameters: {
        controls: { include: ['animate', 'layout'] },
    },
} as Meta

const Template: Story<BulletStoryProps> = ({
    maxValueAuto,
    maxValueValue,
    minValueAuto,
    minValueValue,
    ...args
}) => (
    <Bullet
        {...commonProps}
        {...args}
        maxValue={maxValueAuto ? 'auto' : maxValueValue}
        minValue={minValueAuto ? 'auto' : minValueValue}
    />
)

export const Default = Template.bind({})

export const Layout = Template.bind({})

Layout.args = {
    layout: 'vertical',
    height: 500,
    spacing: 240,
    margin: { ...commonProps.margin, top: 70 },
    titleAlign: 'start',
    titleOffsetX: 0,
    titleOffsetY: -15,
    titleRotation: -90,
}

const RangeComponent = ({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}) => (
    <rect
        x={x + 2}
        y={y + 2}
        rx={5}
        ry={5}
        width={width - 4}
        height={height - 4}
        fill={color}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
    />
)

export const CustomRange = Template.bind({})

CustomRange.args = {
    rangeComponent: RangeComponent,
}

CustomRange.parameters = {
    docs: {
        description: {
            story: 'You can customize ranges using the `rangeComponent` property.',
        },
    },
}

const MeasureComponent = ({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}) => (
    <rect
        x={x + 2}
        y={y + 2}
        rx={height / 2}
        ry={height / 2}
        width={width - 4}
        height={height - 4}
        fill={color}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
    />
)

export const CustomMeasure = Template.bind({})

CustomMeasure.args = {
    measureComponent: MeasureComponent,
}

CustomMeasure.parameters = {
    docs: {
        description: {
            story: 'You can customize measures using the `measureComponent` property.',
        },
    },
}

const MarkerComponent = ({ x, size, color, onMouseEnter, onMouseMove, onMouseLeave }) => (
    <g
        transform={`translate(${x},0)`}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
    >
        <line
            x1={0}
            x2={0}
            y1={0}
            y2={size}
            stroke={color}
            strokeWidth={2}
            strokeDasharray="2,3"
            fill="none"
        />
        <path d="M0 -10 L 10 0 L 0 10 L -10 0 Z" fill={color} />
        <path transform={`translate(0,${size})`} d="M0 -10 L 10 0 L 0 10 L -10 0 Z" fill={color} />
    </g>
)

export const CustomMarker = Template.bind({})

CustomMarker.args = {
    markerComponent: MarkerComponent,
    markerSize: 1,
}

CustomMarker.parameters = {
    docs: {
        description: {
            story: 'You can customize markers using the `markerComponent` property.',
        },
    },
}

export const CustomTitle: Story<BulletStoryProps> = Template.bind({})

CustomTitle.args = {
    data: data.map(d => ({
        ...d,
        title: (
            <text dy={-12}>
                <tspan
                    style={{
                        fill: '#000',
                        fontWeight: 500,
                        fontSize: '14px',
                    }}
                >
                    {d.id}
                </tspan>
                <tspan
                    x={0}
                    dy={18}
                    style={{
                        fill: '#999',
                        fontSize: '12px',
                    }}
                >
                    description
                </tspan>
                <tspan
                    x={0}
                    dy={16}
                    style={{
                        fill: '#999',
                        fontSize: '12px',
                    }}
                >
                    for {d.id}
                </tspan>
            </text>
        ),
    })),
    margin: { ...commonProps.margin, left: 140 },
    titleOffsetX: -110,
}

export const MinMaxValue: Story<BulletStoryProps> = Template.bind({})

MinMaxValue.storyName = 'Support minValue/maxValue Property'

MinMaxValue.args = {
    data: [
        {
            id: 'temperature',
            ranges: [30, 45],
            measures: [34, 36, 40, 42],
            markers: [37],
        },
    ],
    height: 120,
    minValueAuto: true,
    minValueValue: 0,
    maxValueAuto: false,
    maxValueValue: 100,
}

MinMaxValue.parameters = {
    controls: {
        include: [
            'animate',
            'layout',
            'minValueAuto',
            'minValueValue',
            'maxValueAuto',
            'maxValueValue',
        ],
    },
}
