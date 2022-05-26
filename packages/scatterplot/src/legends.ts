import {
    ScatterPlotDataProps,
    ScatterPlotDatum,
    ScatterPlotLegendDatum,
    ScatterPlotRawSerie,
} from './types'
import { OrdinalColorScale } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export const getBaseLegendData = <RawDatum extends ScatterPlotDatum>({
    data,
    getLegendLabel,
    getColor,
}: {
    data: ScatterPlotDataProps<RawDatum>['data']
    getColor: OrdinalColorScale<{ serieId: string | number }>
    getLegendLabel: (datum: ScatterPlotRawSerie<RawDatum>) => string
}): ScatterPlotLegendDatum[] =>
    data.map(d => {
        return {
            id: d.id,
            label: getLegendLabel(d),
            color: getColor({ serieId: d.id }),
        }
    })

export const computeLegendData = ({
    legend,
    baseLegendData,
    hiddenIds,
    getColor,
}: {
    legend: LegendProps
    baseLegendData: ScatterPlotLegendDatum[]
    hiddenIds: string[]
    getColor: OrdinalColorScale<{ serieId: string | number }>
}): ScatterPlotLegendDatum[] => {
    // attempt to use legend items specified in the legend spec
    // otherwise default to displaying info on all series (from baseLegendData)
    const data = legend.data ?? baseLegendData
    return data.map(d => {
        const hidden = hiddenIds.includes(String(d.id))
        const color = hidden ? '#000' : getColor({ serieId: d.id }) ?? d.color
        return { id: d.id, label: String(d.label), color, hidden }
    })
}
