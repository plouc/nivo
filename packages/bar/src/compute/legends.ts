import {
    BarDatum,
    BarIndex,
    BarLegendProps,
    BarSvgProps,
    BarsWithHidden,
    LegendData,
    LegendLabelDatum,
} from '../types'
import { getPropertyAccessor } from '@nivo/core'
import uniqBy from 'lodash/uniqBy.js'

export const getLegendDataForKeys = <RawDatum extends BarDatum>(
    bars: BarsWithHidden<RawDatum>,
    layout: NonNullable<BarSvgProps<RawDatum>['layout']>,
    direction: BarLegendProps['direction'],
    groupMode: NonNullable<BarSvgProps<RawDatum>['groupMode']>,
    reverse: boolean,
    getLegendLabel: (datum: LegendLabelDatum<RawDatum>) => string
): LegendData[] => {
    const data = uniqBy(
        bars.map(bar => ({
            id: bar.data.id,
            label: getLegendLabel(bar.data),
            hidden: bar.data.hidden,
            color: bar.color ?? '#000',
        })),
        ({ id }) => id
    )

    if (
        (layout === 'vertical' &&
            groupMode === 'stacked' &&
            direction === 'column' &&
            reverse !== true) ||
        (layout === 'horizontal' && groupMode === 'stacked' && reverse === true)
    ) {
        data.reverse()
    }

    return data
}

export const getLegendDataForIndexes = <D extends BarDatum = BarDatum, I extends BarIndex = string>(
    bars: BarsWithHidden<D, I>,
    layout: NonNullable<BarSvgProps<D, I>['layout']>,
    getLegendLabel: (datum: LegendLabelDatum<D, I>) => string
): LegendData[] => {
    const data = uniqBy(
        bars.map(bar => ({
            id: bar.data.indexValue ?? '',
            label: getLegendLabel(bar.data),
            hidden: bar.data.hidden,
            color: bar.color ?? '#000',
        })),
        ({ id }) => id
    )

    if (layout === 'horizontal') {
        data.reverse()
    }

    return data
}

export const getLegendData = <D extends BarDatum = BarDatum, I extends BarIndex = string>({
    bars,
    direction,
    from,
    groupMode,
    layout,
    legendLabel,
    reverse,
}: Pick<Required<BarSvgProps<D, I>>, 'layout' | 'groupMode'> & {
    bars: BarsWithHidden<D, I>
    direction: BarLegendProps['direction']
    from: BarLegendProps['dataFrom']
    legendLabel: BarSvgProps<D, I>['legendLabel']
    reverse: boolean
}) => {
    const getLegendLabel = getPropertyAccessor(
        legendLabel ?? (from === 'indexes' ? 'indexValue' : 'id')
    )

    if (from === 'indexes') {
        return getLegendDataForIndexes<D>(bars, layout, getLegendLabel)
    }

    return getLegendDataForKeys<D>(bars, layout, direction, groupMode, reverse, getLegendLabel)
}
