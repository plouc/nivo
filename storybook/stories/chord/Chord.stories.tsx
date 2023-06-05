import type { Meta, StoryObj } from '@storybook/react'
import { generateChordData } from '@bitbloom/nivo-generators'
import { TableTooltip, BasicTooltip, Chip } from '@bitbloom/nivo-tooltip'
import { Chord, ArcDatum, ArcTooltipComponentProps, RibbonTooltipComponentProps } from '@bitbloom/nivo-chord'

const meta: Meta<typeof Chord> = {
    title: 'Chord',
    component: Chord,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Chord>

const generateData = (size: number) => {
    const { matrix, keys } = generateChordData({ size })

    return { data: matrix, keys }
}

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    ...generateData(7),
    xPadding: 0.2,
}

export const Basic: Story = {
    render: () => <Chord {...commonProperties} />,
}

export const RadialLabels: Story = {
    render: () => <Chord {...commonProperties} labelRotation={-90} />,
}

const customLabel = (arc: Omit<ArcDatum, 'label' | 'color'>) => `${arc.id} [${arc.value}]`
export const CustomLabelsText: Story = {
    render: () => <Chord {...commonProperties} {...generateData(5)} label={customLabel} />,
}

export const AnglePadding: Story = {
    render: () => <Chord {...commonProperties} labelRotation={-90} padAngle={0.06} />,
}

export const RibbonsOffset: Story = {
    render: () => (
        <Chord {...commonProperties} labelRotation={-90} padAngle={0.02} innerRadiusOffset={0.02} />
    ),
}

export const AlternativeColors: Story = {
    render: () => (
        <Chord
            {...commonProperties}
            labelRotation={-90}
            padAngle={0.02}
            innerRadiusOffset={0.02}
            colors={{ scheme: 'category10' }}
        />
    ),
}

export const PuttingLabelsInsideArcs: Story = {
    render: () => (
        <Chord
            {...commonProperties}
            {...generateData(5)}
            padAngle={0.02}
            innerRadiusRatio={0.8}
            innerRadiusOffset={0.02}
            labelOffset={-30}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        />
    ),
}

export const WithFormattedValues: Story = {
    render: () => (
        <Chord
            {...commonProperties}
            {...generateData(5)}
            valueFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ),
}

const ArcTooltip = ({ arc }: ArcTooltipComponentProps) => (
    <BasicTooltip
        id={`Custom arc tooltip, ${arc.label}`}
        value={arc.formattedValue}
        color={arc.color}
        enableChip={true}
    />
)

const RibbonTooltip = ({ ribbon }: RibbonTooltipComponentProps) => (
    <TableTooltip
        rows={[
            [
                <Chip key="chip" color={ribbon.source.color} />,
                'Source (custom)',
                <strong key="id">{ribbon.source.id}</strong>,
                ribbon.source.value,
            ],
            [
                <Chip key="chip" color={ribbon.target.color} />,
                'Target (custom)',
                <strong key="id">{ribbon.target.id}</strong>,
                ribbon.target.value,
            ],
        ]}
    />
)

export const CustomTooltips: Story = {
    render: () => (
        <Chord
            {...commonProperties}
            {...generateData(5)}
            arcTooltip={ArcTooltip}
            ribbonTooltip={RibbonTooltip}
        />
    ),
}
