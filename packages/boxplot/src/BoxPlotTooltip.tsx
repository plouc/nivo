import { BoxPlotSummaryFormatted, BoxPlotTooltipProps, BoxPlotSummary } from './types'
import { Chip } from '@nivo/tooltip'
import { memo } from 'react'
import { useTheme } from '@nivo/core'

interface BoxPlotSummaryTooltipProps {
    label: string
    formatted: BoxPlotSummaryFormatted
    color?: string
    enableChip?: boolean
}

export const BoxPlotSummaryTooltip = memo<BoxPlotSummaryTooltipProps>(
    ({ label, formatted, enableChip = false, color }) => {
        const theme = useTheme()

        const quantiles = formatted.quantiles.map((q, i) => (
            <div key={'quantile.' + i}>
                <strong>{q * 100}%: </strong>
                {formatted.values[i]}
            </div>
        ))
        return (
            <div style={theme.tooltip.container}>
                <div>
                    <div style={theme.tooltip.basic}>
                        {enableChip && <Chip color={color ?? ''} style={theme.tooltip.chip} />}
                        {label}
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        <strong>n: </strong>
                        {formatted.n}
                    </div>
                </div>
                <br />
                <div>
                    <div>Values</div>
                    <div>
                        <strong>mean: </strong>
                        {formatted.mean}
                    </div>
                    <div>
                        <strong>min: </strong>
                        {formatted.extrema[0]}
                    </div>
                    <div>
                        <strong>max: </strong>
                        {formatted.extrema[1]}
                    </div>
                </div>
                <br />
                <div>
                    <div>Quantiles</div>
                    {quantiles}
                </div>
            </div>
        )
    }
)

export const BoxPlotTooltip = ({ color, label, formatted }: BoxPlotTooltipProps) => {
    return (
        <BoxPlotSummaryTooltip
            label={label}
            formatted={formatted}
            enableChip={true}
            color={color}
        />
    )
}

export const BoxPlotTooltipLabel = (datum: BoxPlotSummary) => {
    if (datum.subGroup) {
        return datum.group + ' - ' + datum.subGroup
    }
    return datum.group
}
