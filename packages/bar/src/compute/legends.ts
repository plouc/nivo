import { BarDatum, BarLegendProps, BarSvgProps, BarsWithHidden, LegendLabelDatum } from '../types'
import { getPropertyAccessor } from '@nivo/core'
import { uniqBy } from 'lodash'

export const getLegendDataForKeys = <RawDatum extends BarDatum>(
    bars: BarsWithHidden<RawDatum>,
    layout: NonNullable<BarSvgProps<RawDatum>['layout']>,
    direction: BarLegendProps['direction'],
    groupMode: NonNullable<BarSvgProps<RawDatum>['groupMode']>,
    reverse: boolean,
    getLegendLabel: (datum: LegendLabelDatum<RawDatum>) => string
) => {
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

export const getLegendDataForIndexes = <RawDatum extends BarDatum>(
    bars: BarsWithHidden<RawDatum>,
    layout: NonNullable<BarSvgProps<RawDatum>['layout']>,
    getLegendLabel: (datum: LegendLabelDatum<RawDatum>) => string
) => {
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

export const getLegendData = <RawDatum extends BarDatum>({
    bars,
    direction,
    from,
    groupMode,
    layout,
    legendLabel,
    reverse,
}: Pick<Required<BarSvgProps<RawDatum>>, 'layout' | 'groupMode' | 'reverse'> & {
    bars: BarsWithHidden<RawDatum>
    direction: BarLegendProps['direction']
    from: BarLegendProps['dataFrom']
    legendLabel: BarSvgProps<RawDatum>['legendLabel']
}) => {
    const getLegendLabel = getPropertyAccessor(
        legendLabel ?? (from === 'indexes' ? 'indexValue' : 'id')
    )

    if (from === 'indexes') {
        return getLegendDataForIndexes(bars, layout, getLegendLabel)
    }

    return getLegendDataForKeys(bars, layout, direction, groupMode, reverse, getLegendLabel)
}
