import { Datum, TooltipProps } from '@bitbloom/nivo-waffle'

export const CustomTooltip = ({ data }: TooltipProps<Datum>) => (
    <div
        style={{
            backgroundColor: '#eeeeee',
            padding: '12px',
            borderRadius: '3px',
            color: data.color,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '12px',
            boxShadow: '2px 5px 5px #00000033',
        }}
    >
        <span style={{ fontWeight: 600 }}>label</span>
        <span>{data.label}</span>
        <span style={{ fontWeight: 600 }}>id</span>
        <span>{data.id}</span>
        <span style={{ fontWeight: 600 }}>value</span>
        <span>{data.value}</span>
        <span style={{ fontWeight: 600 }}>groupIndex</span>
        <span>{data.groupIndex}</span>
        <span style={{ fontWeight: 600 }}>color</span>
        <span>{data.color}</span>
    </div>
)
