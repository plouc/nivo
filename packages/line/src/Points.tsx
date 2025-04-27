import { createElement, memo } from 'react'
// @ts-ignore
import { getLabelGenerator } from '@nivo/core'
import { DotsItem, Margin } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { LineSeries, LineSvgPropsWithDefaults, Point } from './types'

const NonMemoizedPoints = <Series extends LineSeries>({
    points,
    symbol,
    size,
    borderWidth,
    enableLabel,
    label,
    labelYOffset,
    isFocusable,
    setCurrentPoint,
    tooltip,
    margin,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaDisabled,
}: {
    points: readonly Point<Series>[]
    symbol: LineSvgPropsWithDefaults<Series>['pointSymbol']
    size: number
    borderWidth: LineSvgPropsWithDefaults<Series>['pointBorderWidth']
    enableLabel: LineSvgPropsWithDefaults<Series>['enablePointLabel']
    label: LineSvgPropsWithDefaults<Series>['pointLabel']
    labelYOffset: LineSvgPropsWithDefaults<Series>['pointLabelYOffset']
    isFocusable: LineSvgPropsWithDefaults<Series>['isFocusable']
    setCurrentPoint: (point: Point<Series> | null) => void
    tooltip: LineSvgPropsWithDefaults<Series>['tooltip']
    margin: Margin
    ariaLabel: LineSvgPropsWithDefaults<Series>['pointAriaLabel']
    ariaLabelledBy: LineSvgPropsWithDefaults<Series>['pointAriaLabelledBy']
    ariaDescribedBy: LineSvgPropsWithDefaults<Series>['pointAriaDescribedBy']
    ariaHidden: LineSvgPropsWithDefaults<Series>['pointAriaHidden']
    ariaDisabled: LineSvgPropsWithDefaults<Series>['pointAriaDisabled']
}) => {
    const getLabel = getLabelGenerator(label)

    const { showTooltipAt, hideTooltip } = useTooltip()

    // We sort the points so that the lower series are drawn on top of the higher ones.
    const mappedPoints = points
        .slice(0)
        .sort((a, b) => a.indexInSeries - b.indexInSeries)
        .sort((a, b) => b.seriesIndex - a.seriesIndex)
        .map(point => {
            return {
                id: point.id,
                x: point.x,
                y: point.y,
                datum: point.data,
                fill: point.color,
                stroke: point.borderColor,
                label: enableLabel ? getLabel(point) : null,
                ariaLabel: ariaLabel ? ariaLabel(point) : undefined,
                ariaLabelledBy: ariaLabelledBy ? ariaLabelledBy(point) : undefined,
                ariaDescribedBy: ariaDescribedBy ? ariaDescribedBy(point) : undefined,
                ariaHidden: ariaHidden ? ariaHidden(point) : undefined,
                ariaDisabled: ariaDisabled ? ariaDisabled(point) : undefined,
                onFocus: isFocusable
                    ? () => {
                          setCurrentPoint(point)
                          showTooltipAt(
                              createElement(tooltip, { point }),
                              [margin.left + point.x, margin.top + point.y],
                              'top'
                          )
                      }
                    : undefined,
                onBlur: isFocusable
                    ? () => {
                          setCurrentPoint(null)
                          hideTooltip()
                      }
                    : undefined,
            }
        })

    return (
        <g>
            {mappedPoints.map(point => (
                <DotsItem
                    key={point.id}
                    x={point.x}
                    y={point.y}
                    datum={point.datum}
                    symbol={symbol as any}
                    size={size}
                    color={point.fill}
                    borderWidth={borderWidth}
                    borderColor={point.stroke}
                    label={point.label}
                    labelYOffset={labelYOffset}
                    ariaLabel={point.ariaLabel}
                    ariaLabelledBy={point.ariaLabelledBy}
                    ariaDescribedBy={point.ariaDescribedBy}
                    ariaHidden={point.ariaHidden}
                    ariaDisabled={point.ariaDisabled}
                    isFocusable={isFocusable}
                    onFocus={point.onFocus}
                    onBlur={point.onBlur}
                    testId={`line.point.${point.id}`}
                />
            ))}
        </g>
    )
}

export const Points = memo(NonMemoizedPoints) as typeof NonMemoizedPoints
