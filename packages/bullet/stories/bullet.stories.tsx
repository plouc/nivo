import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateBulletData } from '@nivo/generators'
import { Bullet } from '../src'

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
    animate: false,
}

const stories = storiesOf('Bullet', module)

stories.add('default', () => <Bullet {...commonProps} />)

stories.add('vertical', () => (
    <Bullet
        {...commonProps}
        layout="vertical"
        height={500}
        spacing={240}
        margin={{ ...commonProps.margin, top: 70 }}
        titleAlign="start"
        titleOffsetX={0}
        titleOffsetY={-15}
        titleRotation={-90}
    />
))

const CustomRange = ({ x, y, width, height, color, onMouseEnter, onMouseMove, onMouseLeave }) => (
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

stories.add('custom range', () => <Bullet {...commonProps} rangeComponent={CustomRange} />, {
    info: {
        text: `You can customize ranges using the \`rangeComponent\` property.`,
    },
})

const CustomMeasure = ({ x, y, width, height, color, onMouseEnter, onMouseMove, onMouseLeave }) => (
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

stories.add('custom measure', () => <Bullet {...commonProps} measureComponent={CustomMeasure} />, {
    info: {
        text: `You can customize measures using the \`measureComponent\` property.`,
    },
})

const CustomMarker = ({ x, size, color, onMouseEnter, onMouseMove, onMouseLeave }) => (
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

stories.add(
    'custom marker',
    () => <Bullet {...commonProps} markerSize={1} markerComponent={CustomMarker} />,
    {
        info: {
            text: `You can customize markers using the \`markerComponent\` property.`,
        },
    }
)

stories.add('custom title', () => (
    <Bullet
        {...commonProps}
        margin={{ ...commonProps.margin, left: 140 }}
        titleOffsetX={-110}
        data={data.map(d => ({
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
        }))}
    />
))
