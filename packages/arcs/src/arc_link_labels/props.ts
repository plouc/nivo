import { InheritedColorConfig } from '@nivo/colors'

// @ts-ignore
export interface ArcLinkLabelsProps<RawDatum, Datum> {
    // string | LabelAccessorFunction<RawDatum>
    arcLinkLabel: any
    arcLinkLabelsSkipAngle: number
    arcLinkLabelsTextOffset: number
    arcLinkLabelsTextColor: InheritedColorConfig<Datum>
    arcLinkLabelsOffset: number
    arcLinkLabelsDiagonalLength: number
    arcLinkLabelsStraightLength: number
    arcLinkLabelsThickness: number
    arcLinkLabelsColor: InheritedColorConfig<Datum>
}
