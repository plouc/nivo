import { InheritedColorConfig } from '@nivo/colors'

// @ts-ignore
export interface ArcLabelsProps<RawDatum, Datum> {
    // string | LabelAccessorFunction<RawDatum>
    arcLabel: any
    arcLabelsRadiusOffset: number
    arcLabelsSkipAngle: number
    arcLabelsTextColor: InheritedColorConfig<Datum>
}
