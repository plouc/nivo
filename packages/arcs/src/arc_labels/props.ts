import { InheritedColorConfig } from '@nivo/colors'
import { ArcLabelComponent } from './ArcLabelsLayer'
import { DatumWithArcAndColor } from '../types'

export interface ArcLabelsProps<Datum extends DatumWithArcAndColor> {
    // @todo fix label accessor
    // string | LabelAccessorFunction<Datum['data']>
    arcLabel: any
    arcLabelsRadiusOffset: number
    arcLabelsSkipAngle: number
    arcLabelsTextColor: InheritedColorConfig<Datum>
    component: ArcLabelComponent<Datum>
}
