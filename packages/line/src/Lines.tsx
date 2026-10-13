import { memo } from 'react'
import { LineSeries, ComputedSeries, LineGenerator, LineSvgProps } from './types'
import { LinesItem } from './LinesItem'

export const NonMemoizedLines = <Series extends LineSeries>({
    series,
    lineGenerator,
    lineWidth,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaDisabled,
}: {
    series: readonly ComputedSeries<Series>[]
    lineGenerator: LineGenerator
    lineWidth: number
    ariaLabel?: LineSvgProps<Series>['lineAriaLabel']
    ariaLabelledBy?: LineSvgProps<Series>['lineAriaLabelledBy']
    ariaDescribedBy?: LineSvgProps<Series>['lineAriaDescribedBy']
    ariaHidden?: LineSvgProps<Series>['lineAriaHidden']
    ariaDisabled?: LineSvgProps<Series>['lineAriaDisabled']
}) => {
    return (
        <>
            {series
                .slice(0)
                .reverse()
                .map(seriesItem => (
                    <LinesItem
                        key={seriesItem.id}
                        points={seriesItem.data.map(d => d.position)}
                        lineGenerator={lineGenerator}
                        color={seriesItem.color}
                        thickness={lineWidth}
                        ariaLabel={ariaLabel ? ariaLabel(seriesItem) : undefined}
                        ariaLabelledBy={ariaLabelledBy ? ariaLabelledBy(seriesItem) : undefined}
                        ariaDescribedBy={ariaDescribedBy ? ariaDescribedBy(seriesItem) : undefined}
                        ariaHidden={ariaHidden ? ariaHidden(seriesItem) : undefined}
                        ariaDisabled={ariaDisabled ? ariaDisabled(seriesItem) : undefined}
                    />
                ))}
        </>
    )
}

export const Lines = memo(NonMemoizedLines) as typeof NonMemoizedLines
