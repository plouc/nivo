import {
    BoxPlotDatum,
    BoxPlotLegendProps,
    BoxPlotSvgProps,
    ComputedBoxPlotSummary,
    LegendData,
} from '../types'
import { getPropertyAccessor } from '@nivo/core'
import { uniqBy } from 'lodash'

export const getLegendData = <RawDatum extends BoxPlotDatum>({
    boxPlots,
    dataFrom,
    direction,
    legendLabel,
}: {
    boxPlots: ComputedBoxPlotSummary[]
    dataFrom: BoxPlotLegendProps['dataFrom']
    direction: string
    legendLabel: BoxPlotSvgProps<RawDatum>['legendLabel']
}) => {
    const legendFrom = dataFrom === 'subGroups' ? 'subGroup' : 'group'
    const getLegendLabel = getPropertyAccessor(legendLabel ?? legendFrom)
    const getFromId = typeof dataFrom === 'function' ? dataFrom : getPropertyAccessor(legendFrom)
    return uniqBy(
        boxPlots.map(
            boxPlot =>
                ({
                    id: getFromId(boxPlot.data),
                    color: boxPlot?.color,
                    direction,
                    label: getLegendLabel(boxPlot?.data),
                } as LegendData)
        ),
        ({ id }) => id
    )
}
