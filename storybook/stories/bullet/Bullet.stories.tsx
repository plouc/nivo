import type { Meta, StoryObj } from '@storybook/react'
import { generateBulletData } from '@nivo/generators'
import { BasicTooltip } from '@nivo/tooltip'
// import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import { Bullet, BulletMarkersItemProps, BulletRectsItemProps } from '@nivo/bullet'

const meta: Meta<typeof Bullet> = {
    title: 'Bullet',
    component: Bullet,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Bullet>

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

export const Basic: Story = {
    render: () => <Bullet {...commonProps} />,
}

export const Vertical: Story = {
    render: () => (
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
    ),
}

const CustomRangeComponent = ({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: BulletRectsItemProps) => (
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

export const CustomRange: Story = {
    // You can customize ranges using the \`rangeComponent\` property.
    render: () => <Bullet {...commonProps} rangeComponent={CustomRangeComponent} />,
}

const CustomMeasureComponent = ({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: BulletRectsItemProps) => (
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

/**
 * You can customize measures using the \`measureComponent\` property.
 */
export const CustomMeasure: Story = {
    render: () => <Bullet {...commonProps} measureComponent={CustomMeasureComponent} />,
}

const CustomMarkerComponent = ({
    x,
    size,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: BulletMarkersItemProps) => (
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

/**
 * You can customize markers using the \`markerComponent\` property.
 */
export const CustomMarker: Story = {
    render: () => (
        <Bullet {...commonProps} markerSize={1} markerComponent={CustomMarkerComponent} />
    ),
}

export const CustomTitle: Story = {
    render: () => (
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
    ),
}

/*
export const SupportMinMaxValue: Story = {
    // support min/max value property
    render: () => (
        <Bullet
            {...commonProps}
            height={120}
            data={[
                {
                    id: 'temperature',
                    ranges: [30, 45],
                    measures: [34, 36, 40, 42],
                    markers: [37],
                },
            ]}
            maxValue={
                boolean('maxValue.auto', false)
                    ? 'auto'
                    : number('maxValue.value', 100, { min: 40, max: 100 })
            }
            minValue={
                boolean('minValue.auto', true)
                    ? 'auto'
                    : number('minValue.value', 0, { min: 0, max: 40 })
            }
        />
    ),
}
*/

const CustomTooltipComponent = ({ v0, v1, color }: { color: string; v0: number; v1?: number }) => (
    <BasicTooltip
        id={
            v1 ? (
                <span style={{ color: 'peachpuff' }}>
                    <strong>{v0}</strong> to <strong>{v1}</strong>
                </span>
            ) : (
                <strong style={{ color: 'rosybrown' }}>{v0}</strong>
            )
        }
        enableChip={true}
        color={color}
    />
)

export const CustomTooltip: Story = {
    render: () => (
        <Bullet
            {...commonProps}
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
