import { AnyScale, ScaleBand } from '@nivo/scales'
import { defaultProps } from '../props'
import { BarCommonProps, BarDatum, ComputedBarDatum } from '../types'

export interface BarTotalsData {
    key: string
    x: number
    y: number
    value: number
}

export const computeBarTotals = <RawDatum extends BarDatum>(
    bars: ComputedBarDatum<RawDatum>[],
    xScale: ScaleBand<string> | AnyScale,
    yScale: ScaleBand<string> | AnyScale,
    layout: BarCommonProps<RawDatum>['layout'] = defaultProps.layout,
    groupMode: BarCommonProps<RawDatum>['groupMode'] = defaultProps.groupMode,
    totalsOffset: number
) => {
    const totals = [] as BarTotalsData[]

    if (bars.length === 0) return totals

    const totalsByIndex = new Map<string | number, number>()

    const barWidth = bars[0].width
    const barHeight = bars[0].height

    if (groupMode === 'stacked') {
        const totalsPositivesByIndex = new Map<string | number, number>()

        bars.forEach(bar => {
            const { indexValue, value } = bar.data
            updateTotalsByIndex(totalsByIndex, indexValue, Number(value))
            updateTotalsPositivesByIndex(totalsPositivesByIndex, indexValue, Number(value))
        })

        totalsPositivesByIndex.forEach((totalsPositive, indexValue) => {
            const indexTotal = totalsByIndex.get(indexValue) || 0

            let xPosition: number
            let yPosition: number

            if (layout === 'vertical') {
                xPosition = xScale(indexValue)
                yPosition = yScale(totalsPositive)
            } else {
                xPosition = xScale(totalsPositive)
                yPosition = yScale(indexValue)
            }

            xPosition += layout === 'vertical' ? barWidth / 2 : totalsOffset
            yPosition += layout === 'vertical' ? -totalsOffset : barHeight / 2

            totals.push({
                key: 'total_' + indexValue,
                x: xPosition,
                y: yPosition,
                value: indexTotal,
            })
        })
    } else if (groupMode === 'grouped') {
        const greatestValueByIndex = new Map<string | number, number>()
        const numberOfBarsByIndex = new Map()

        bars.forEach(bar => {
            const { indexValue, value } = bar.data
            updateTotalsByIndex(totalsByIndex, indexValue, Number(value))
            updateGreatestValueByIndex(greatestValueByIndex, indexValue, Number(value))
            updateNumberOfBarsByIndex(numberOfBarsByIndex, indexValue)
        })

        greatestValueByIndex.forEach((greatestValue, indexValue) => {
            const indexTotal = totalsByIndex.get(indexValue) || 0

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

            xPosition += layout === 'vertical' ? indexBarsWidth / 2 : totalsOffset
            yPosition += layout === 'vertical' ? -totalsOffset : indexBarsHeight / 2

            totals.push({
                key: 'total_' + indexValue,
                x: xPosition,
                y: yPosition,
                value: indexTotal,
            })
        })
    }
    return totals
}

// this function is used to compute the total value for the indexes. The total value is later rendered on the chart
export const updateTotalsByIndex = (
    totalsByIndex: Map<string | number, number>,
    indexValue: string | number,
    value: number
) => {
    const currentIndexValue = totalsByIndex.get(indexValue) || 0
    totalsByIndex.set(indexValue, currentIndexValue + value)
}

// this function is used to compute only the positive values of the indexes. Useful to position the text right above the last stacked bar. It prevents overlapping in case of negative values
export const updateTotalsPositivesByIndex = (
    totalsPositivesByIndex: Map<string | number, number>,
    indexValue: string | number,
    value: number
) => {
    const currentIndexValue = totalsPositivesByIndex.get(indexValue) || 0
    totalsPositivesByIndex.set(indexValue, currentIndexValue + (value > 0 ? value : 0))
}

// this function is used to keep track of the highest value for the indexes. Useful to position the text above the longest grouped bar
export const updateGreatestValueByIndex = (
    greatestValueByIndex: Map<string | number, number>,
    indexValue: string | number,
    value: number
) => {
    const currentGreatestValue = greatestValueByIndex.get(indexValue) || 0
    greatestValueByIndex.set(indexValue, Math.max(currentGreatestValue, Number(value)))
}

// this function is used to save the number of bars for the indexes. Useful to position the text in the middle of the grouped bars
export const updateNumberOfBarsByIndex = (
    numberOfBarsByIndex: Map<string | number, number>,
    indexValue: string | number
) => {
    const currentNumberOfBars = numberOfBarsByIndex.get(indexValue) || 0
    numberOfBarsByIndex.set(indexValue, currentNumberOfBars + 1)
}
