import { InheritedColorConfig } from '@nivo/colors'
import { ArcLinkLabelComponent } from './ArcLinkLabelsLayer'
import { DatumWithArcAndColor } from '../types'

export interface ArcLinkLabelsProps<Datum extends DatumWithArcAndColor> {
    // string | LabelAccessorFunction<Datum['data']>
    arcLinkLabel: any
    arcLinkLabelsSkipAngle: number
    arcLinkLabelsTextOffset: number
    arcLinkLabelsTextColor: InheritedColorConfig<Datum>
    arcLinkLabelsOffset: number
    arcLinkLabelsDiagonalLength: number
    arcLinkLabelsStraightLength: number
    arcLinkLabelsThickness: number
    arcLinkLabelsColor: InheritedColorConfig<Datum>
    component: ArcLinkLabelComponent<Datum>
}
