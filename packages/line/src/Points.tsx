import { memo } from 'react'
// @ts-ignore
import { getLabelGenerator } from '@nivo/core'
import { DotsItem } from '@nivo/core'
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
    ariaLabel: LineSvgPropsWithDefaults<Series>['pointAriaLabel']
    ariaLabelledBy: LineSvgPropsWithDefaults<Series>['pointAriaLabelledBy']
    ariaDescribedBy: LineSvgPropsWithDefaults<Series>['pointAriaDescribedBy']
    ariaHidden: LineSvgPropsWithDefaults<Series>['pointAriaHidden']
    ariaDisabled: LineSvgPropsWithDefaults<Series>['pointAriaDisabled']
}) => {
    const getLabel = getLabelGenerator(label)

    /**
     * We reverse the `points` array so that points from the lower lines in stacked lines
     * graph are drawn on top. See https://github.com/plouc/nivo/issues/1051.
     */
    const mappedPoints = points
        .slice(0)
        .reverse()
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
                />
            ))}
        </g>
    )
}

export const Points = memo(NonMemoizedPoints) as typeof NonMemoizedPoints
