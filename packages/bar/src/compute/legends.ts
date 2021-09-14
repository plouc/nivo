import { BarDatum, BarLegendProps, BarSvgProps, BarsWithHidden } from '../types'
import { uniqBy } from 'lodash'

export const getLegendDataForKeys = <RawDatum>(
    bars: BarsWithHidden<RawDatum>,
    layout: 'horizontal' | 'vertical',
    direction: 'column' | 'row',
    //@ts-ignore
    legendLabel,
    groupMode: 'grouped' | 'stacked',
    reverse: boolean
) => {
    const data = uniqBy(
        bars.map(bar => ({
            id: bar.data.id,
            // TODO: Add label accessor to make the following work:
            // label: bar.data.label || bar.data.id,
            label: legendLabel(bar.data),
            hidden: bar.data.hidden,
            color: bar.color,
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

export const getLegendDataForIndexes = <RawDatum>(bars: BarsWithHidden<RawDatum>) => {
    return uniqBy(
        bars.map(bar => ({
            id: bar.data.indexValue ?? '',
            // TODO: Add label accessor to make the following work:
            // label: bar.data.label || bar.data.indexValue,
            label: bar.data.indexValue ?? '',
            hidden: bar.data.hidden,
            color: bar.color,
        })),
        ({ id }) => id
    )
}

export const getLegendData = <RawDatum extends BarDatum>({
    from,
    bars,
    layout,
    direction,
    // @ts-ignore
    legendLabel,
    groupMode,
    reverse,
}: Pick<Required<BarSvgProps<RawDatum>>, 'layout' | 'groupMode' | 'reverse'> & {
    bars: BarsWithHidden<RawDatum>
    direction: BarLegendProps['direction']
    from: BarLegendProps['dataFrom']
}) => {
    if (from === 'indexes') {
        return getLegendDataForIndexes(bars)
    }

    return getLegendDataForKeys(bars, layout, direction, legendLabel, groupMode, reverse)
}
