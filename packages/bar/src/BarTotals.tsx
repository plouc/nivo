import { useTheme } from '@nivo/core'
import { BarTotalsData } from './compute/totals'

interface Props {
    barTotals: BarTotalsData[]
}

export const BarTotals = ({ barTotals }: Props) => {
    const theme = useTheme()
    return (
        <>
            {barTotals.map(barTotal => (
                <text
                    key={barTotal.key}
                    x={barTotal.x}
                    y={barTotal.y}
                    fill={theme.text.fill}
                    fontSize={theme.labels.text.fontSize}
                    fontFamily={theme.labels.text.fontFamily}
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {barTotal.value}
                </text>
            ))}
        </>
    )
}
