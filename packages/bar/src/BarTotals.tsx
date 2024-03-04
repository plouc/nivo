import { AnyScale, ScaleBand } from '@nivo/scales'
import { defaultProps } from './props'
import { BarCommonProps, BarDatum, ComputedBarDatum } from './types'

interface BarTotalsProps<RawDatum extends BarDatum> {
    bars: ComputedBarDatum<RawDatum>[]
    xScale: ScaleBand<string> | AnyScale
    yScale: ScaleBand<string> | AnyScale
    layout?: BarCommonProps<RawDatum>['layout']
    groupMode?: BarCommonProps<RawDatum>['groupMode']
}

export const BarTotals = <RawDatum extends BarDatum>({
    bars,
    xScale,
    yScale,
    layout = defaultProps.layout,
    groupMode = defaultProps.groupMode,
}: BarTotalsProps<RawDatum>) => {
    if (bars.length === 0) return <></>
    const totals: JSX.Element[] = []

    const totalsByIndex = new Map<string | number, number>()

    const barWidth = bars[0].width
    const barHeight = bars[0].height
    const yOffsetVertically = -10
    const xOffsetHorizontally = 20
    const fontSize = 12

    const commonProps = {
        fill: '#222222',
        fontWeight: 'bold',
        fontSize,
        textAnchor: 'middle',
        alignmentBaseline: 'middle',
    } as const

    if (groupMode === 'stacked') {
        const totalsPositivesByIndex = new Map<string | number, number>()

        bars.forEach(bar => {
            const { indexValue, value } = bar.data
            updateTotalsByIndex(totalsByIndex, indexValue, Number(value))
            updateTotalsPositivesByIndex(totalsPositivesByIndex, indexValue, Number(value))
        })

        totalsPositivesByIndex.forEach((totalsPositive, indexValue) => {
            let xPosition: number
            let yPosition: number

            if (layout === 'vertical') {
                xPosition = xScale(indexValue)
                yPosition = yScale(totalsPositive)
            } else {
                xPosition = xScale(totalsPositive)
                yPosition = yScale(indexValue)
            }

            totals.push(
                <text
                    key={'total_' + indexValue}
                    x={xPosition + (layout === 'vertical' ? barWidth / 2 : xOffsetHorizontally)}
                    y={yPosition + (layout === 'vertical' ? yOffsetVertically : barHeight / 2)}
                    {...commonProps}
                >
                    {totalsByIndex.get(indexValue)}
                </text>
            )
        })
    }

    if (groupMode === 'grouped') {
        const greatestValueByIndex = new Map<string | number, number>()
        const numberOfBarsByIndex = new Map()

        bars.forEach(bar => {
            const { indexValue, value } = bar.data
            updateTotalsByIndex(totalsByIndex, indexValue, Number(value))
            updateGreatestValueByIndex(greatestValueByIndex, indexValue, Number(value))
            updateNumberOfBarsByIndex(numberOfBarsByIndex, indexValue)
        })

        greatestValueByIndex.forEach((greatestValue, indexValue) => {
            let xPosition: number
            let yPosition: number

            if (layout === 'vertical') {
                xPosition = xScale(indexValue)
                yPosition = yScale(greatestValue)
            } else {
                xPosition = xScale(greatestValue)
                yPosition = yScale(indexValue)
            }

            const indexBarsWidth = numberOfBarsByIndex.get(indexValue) * barWidth
            const indexBarsHeight = numberOfBarsByIndex.get(indexValue) * barHeight

            totals.push(
                <text
                    key={'total_' + indexValue}
                    x={
                        xPosition +
                        (layout === 'vertical' ? indexBarsWidth / 2 : xOffsetHorizontally)
                    }
                    y={
                        yPosition +
                        (layout === 'vertical' ? yOffsetVertically : indexBarsHeight / 2)
                    }
                    {...commonProps}
                >
                    {totalsByIndex.get(indexValue)}
                </text>
            )
        })
    }

    return <>{totals}</>
}

export const updateTotalsByIndex = (
    totalsByIndex: Map<string | number, number>,
    indexValue: string | number,
    value: number
) => {
    const currentIndexValue = totalsByIndex.get(indexValue) || 0
    totalsByIndex.set(indexValue, currentIndexValue + value)
}

export const updateTotalsPositivesByIndex = (
    totalsPositivesByIndex: Map<string | number, number>,
    indexValue: string | number,
    value: number
) => {
    const currentIndexValue = totalsPositivesByIndex.get(indexValue) || 0
    totalsPositivesByIndex.set(indexValue, currentIndexValue + (value > 0 ? value : 0))
}

export const updateGreatestValueByIndex = (
    greatestValueByIndex: Map<string | number, number>,
    indexValue: string | number,
    value: number
) => {
    const currentGreatestValue = greatestValueByIndex.get(indexValue) || 0
    greatestValueByIndex.set(indexValue, Math.max(currentGreatestValue, Number(value)))
}

export const updateNumberOfBarsByIndex = (
    numberOfBarsByIndex: Map<string | number, number>,
    indexValue: string | number
) => {
    const currentNumberOfBars = numberOfBarsByIndex.get(indexValue) || 0
    numberOfBarsByIndex.set(indexValue, currentNumberOfBars + 1)
}
