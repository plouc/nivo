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
                {q}%: <strong>{formatted.values[i]}</strong>
            </div>
        ))
        return (
            <div style={theme.tooltip.container}>
                <div style={theme.tooltip.basic}>
                    {enableChip && <Chip color={color ?? ''} style={theme.tooltip.chip} />}
                    {label}
                </div>
                <div style={{ display: 'flex', marginTop: '1rem' }}>
                    <div style={{ marginRight: '2rem' }}>
                        <div>
                            n: <strong>{formatted.n}</strong>
                        </div>
                        <div style={{ marginTop: '1rem' }}>Values</div>
                        <div>
                            mean: <strong>{formatted.mean}</strong>
                        </div>
                        <div>
                            min: <strong>{formatted.extrema[0]}</strong>
                        </div>
                        <div>
                            max: <strong>{formatted.extrema[1]}</strong>
                        </div>
                    </div>
                    <div>
                        <div>Quantiles</div>
                        {quantiles}
                    </div>
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
