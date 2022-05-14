import { BoxPlotDatum, BoxPlotCommonProps, ComputedBoxPlotSummary, LegendData } from '../types'
import { getPropertyAccessor } from '@nivo/core'
import { uniqBy } from 'lodash'

export const getLegendData = <RawDatum extends BoxPlotDatum>({
    boxPlots,
    dataFrom,
    legendLabel,
}: {
    boxPlots: ComputedBoxPlotSummary[]
    dataFrom: BoxPlotCommonProps<RawDatum>['colorBy']
    legendLabel: BoxPlotCommonProps<RawDatum>['legendLabel']
}) => {
    const getLegendLabel = getPropertyAccessor(legendLabel ?? dataFrom)
    return uniqBy(
        boxPlots.map(
            boxPlot =>
                // id & label are redundant below, but needed for ts in @nivo/legends
                ({
                    id: getLegendLabel(boxPlot?.data),
                    label: getLegendLabel(boxPlot?.data),
                    color: boxPlot?.color,
                } as LegendData)
        ),
        ({ id }) => id
    )
}
