import { BasicTooltip } from '@nivo/tooltip'

const BarTooltip = ({ color, getTooltipLabel, tooltipFormat, ...data }) => {
    return (
        <BasicTooltip
            id={getTooltipLabel(data)}
            value={data.value}
            enableChip={true}
            color={color}
            format={tooltipFormat}
        />
    )
}

export default BarTooltip
