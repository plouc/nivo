import type { Meta, StoryObj } from '@storybook/react'
import { WaffleHtml } from '@nivo/waffle'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof WaffleHtml> = {
    title: 'WaffleHtml',
    component: WaffleHtml,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof WaffleHtml>

const total = 200
const data = [
    {
        id: 'men',
        label: 'men',
        value: 64,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: 72,
        color: '#a053f0',
    },
]
const commonProps = {
    width: 900,
    height: 500,
    total,
    data,
    rows: 24,
    columns: 18,
}

export const Basic: Story = {
    render: () => <WaffleHtml {...commonProps} />,
}

export const Colors: Story = {
    render: () => <WaffleHtml {...commonProps} colors={{ scheme: 'category10' }} />,
}

export const UsingDataColor: Story = {
    render: () => <WaffleHtml {...commonProps} colors={{ datum: 'color' }} />,
}

export const FillDirection: Story = {
    render: () => (
        <WaffleHtml
            {...commonProps}
            width={900}
            height={400}
            fillDirection="left"
            rows={18}
            columns={24}
        />
    ),
}

const CustomCellComponent = ({
    position,
    size,
    x,
    y,
    color,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}) => (
    <div
        style={{
            borderRadius: `${size / 2}px 0 ${size / 2}px 0`,
            position: 'absolute',
            top: y,
            left: x,
            width: size,
            height: size,
            background: color,
            opacity,
            boxSizing: 'content-box',
            borderStyle: 'solid',
            borderWidth: `${borderWidth}px`,
            borderColor,
        }}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={event => {
            onClick({ position, color, x, y, data }, event)
        }}
    />
)
export const CustomCell: Story = {
    render: () => <WaffleHtml {...commonProps} cellComponent={CustomCellComponent} />,
}

export const CustomTooltip: Story = {
    render: () => (
        <WaffleHtml
            {...commonProps}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
            tooltip={CustomTooltipComponent}
        />
    ),
}
