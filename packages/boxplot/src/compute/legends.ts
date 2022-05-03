import { BoxPlotDatum, BoxPlotSvgProps } from '../types'
import { getPropertyAccessor } from '@nivo/core'

export const getLegendData = <RawDatum extends BoxPlotDatum>({
    data,
    direction,
    legendLabel,
}: {
    data: any[]
    direction: string
    legendLabel: BoxPlotSvgProps<RawDatum>['legendLabel']
}) => {
    const getLegendLabel = getPropertyAccessor(legendLabel ?? 'id')
    return data.map(datum => ({
        ...datum,
        direction,
        label: getLegendLabel(datum),
    }))
}
