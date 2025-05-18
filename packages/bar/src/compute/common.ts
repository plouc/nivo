import { ScaleBandSpec, ScaleBand, computeScale } from '@nivo/scales'
import { commonDefaultProps } from '../defaults'
import { BarCommonProps, BarDatum } from '../types'

/**
 * Generates indexed scale.
 */
export const getIndexScale = <D extends BarDatum>(
    data: readonly D[],
    getIndex: (datum: D) => string,
    padding: number,
    indexScale: ScaleBandSpec,
    size: number,
    axis: 'x' | 'y'
) => {
    return (
        computeScale(
            indexScale,
            { all: data.map(getIndex), min: 0, max: 0 },
            size,
            axis
        ) as ScaleBand<string>
    ).padding(padding)
}

/**
 * This method ensures all the provided keys exist in the entire series.
 */
export const normalizeData = <D extends BarDatum>(data: readonly D[], keys: readonly string[]) =>
    data.map(
        item =>
            ({
                ...keys.reduce<Record<string, unknown>>((acc, key) => {
                    acc[key] = null
                    return acc
                }, {}),
                ...item,
            }) as D
    )

export const filterNullValues = <D extends BarDatum>(data: D) =>
    Object.keys(data).reduce<Record<string, unknown>>((acc, key) => {
        if (data[key]) {
            acc[key] = data[key]
        }
        return acc
    }, {}) as Exclude<D, null | undefined | false | '' | 0>

export const coerceValue = <T>(value: T) => [value, Number(value)] as const

export type BarLabelLayout = {
    labelX: number
    labelY: number
    textAnchor: 'start' | 'middle' | 'end'
}

/**
 * Compute the label position and alignment based on a given position and offset.
 */
export function useComputeLabelLayout<D extends BarDatum>(
    layout: BarCommonProps<D>['layout'] = commonDefaultProps.layout,
    reverse: BarCommonProps<D>['reverse'] = commonDefaultProps.reverse,
    labelPosition: BarCommonProps<D>['labelPosition'] = commonDefaultProps.labelPosition,
    labelOffset: BarCommonProps<D>['labelOffset'] = commonDefaultProps.labelOffset
): (width: number, height: number) => BarLabelLayout {
    return (width: number, height: number) => {
        // If the chart is reversed, we want to make sure the offset is also reversed
        const computedLabelOffset = labelOffset * (reverse ? -1 : 1)

        if (layout === 'horizontal') {
            let x = width / 2
            if (labelPosition === 'start') {
                x = reverse ? width : 0
            } else if (labelPosition === 'end') {
                x = reverse ? 0 : width
            }
            return {
                labelX: x + computedLabelOffset,
                labelY: height / 2,
                textAnchor: labelPosition === 'middle' ? 'middle' : reverse ? 'end' : 'start',
            }
        } else {
            let y = height / 2
            if (labelPosition === 'start') {
                y = reverse ? 0 : height
            } else if (labelPosition === 'end') {
                y = reverse ? height : 0
            }
            return {
                labelX: width / 2,
                labelY: y - computedLabelOffset,
                textAnchor: 'middle',
            }
        }
    }
}
