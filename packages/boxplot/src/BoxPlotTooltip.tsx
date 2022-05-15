import { BoxPlotSummaryFormatted, BoxPlotTooltipProps, BoxPlotSummary } from './types'
import { Chip } from '@nivo/tooltip'
import { memo } from 'react'
import { useTheme, CompleteTheme } from '@nivo/core'

interface BoxPlotSummaryTooltipProps {
    label: string
    formatted: BoxPlotSummaryFormatted
    color?: string
    enableChip?: boolean
}

interface Translation {
    [key: string]: number | string
}

export const defaultTranslation = {
    n: 'n',
    mean: 'mean',
    min: 'min',
    max: 'max',
    Summary: 'Summary',
    Quantiles: 'Quantiles',
}

type ExtendedTheme = CompleteTheme & {
    translation: Translation
}

const hasTranslation = (theme: CompleteTheme | ExtendedTheme): theme is ExtendedTheme => {
    return 'translation' in theme
}

export const BoxPlotSummaryTooltip = memo<BoxPlotSummaryTooltipProps>(
    ({ label, formatted, enableChip = false, color }) => {
        const theme = useTheme()
        let translation = defaultTranslation
        if (hasTranslation(theme)) {
            translation = {
                ...defaultTranslation,
                ...theme.translation,
            }
        }

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
                            {translation.n}: <strong>{formatted.n}</strong>
                        </div>
                        <div style={{ marginTop: '1rem' }}>{translation.Summary}</div>
                        <div>
                            {translation.mean}: <strong>{formatted.mean}</strong>
                        </div>
                        <div>
                            {translation.min}: <strong>{formatted.extrema[0]}</strong>
                        </div>
                        <div>
                            {translation.max}: <strong>{formatted.extrema[1]}</strong>
                        </div>
                    </div>
                    <div>
                        <div>{translation.Quantiles}</div>
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
