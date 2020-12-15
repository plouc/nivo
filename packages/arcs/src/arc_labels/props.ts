import { PropertyAccessor } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { ArcLabelComponent } from './ArcLabelsLayer'
import { DatumWithArcAndColor } from '../types'

export interface ArcLabelsProps<Datum extends DatumWithArcAndColor> {
    arcLabel: PropertyAccessor<Datum, string>
    arcLabelsRadiusOffset: number
    arcLabelsSkipAngle: number
    arcLabelsTextColor: InheritedColorConfig<Datum>
    component: ArcLabelComponent<Datum>
}
