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
                {q * 100}%: <strong>{formatted.values[i]}</strong>
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
                <div style={{ display: 'flex' }}>
                    <span style={{ marginRight: '2rem' }}>
                        <div>
                            n: <strong>{formatted.n}</strong>
                        </div>
                        <br />
                        <div>Values</div>
                        <div>
                            mean: <strong>{formatted.mean}</strong>
                        </div>
                        <div>
                            min: <strong>{formatted.extrema[0]}</strong>
                        </div>
                        <div>
                            max: <strong>{formatted.extrema[1]}</strong>
                        </div>
                    </span>
                    <span>
                        <div>Quantiles</div>
                        {quantiles}
                    </span>
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
