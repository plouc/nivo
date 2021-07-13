import { PropertyAccessor } from '@bitbloom/nivo-core'
import { InheritedColorConfig } from '@bitbloom/nivo-colors'
import { ArcLabelComponent } from './ArcLabelsLayer'
import { DatumWithArcAndColor } from '../types'

export interface ArcLabelsProps<Datum extends DatumWithArcAndColor> {
    arcLabel: PropertyAccessor<Datum, string>
    arcLabelsRadiusOffset: number
    arcLabelsSkipAngle: number
    arcLabelsTextColor: InheritedColorConfig<Datum>
    arcLabelsComponent: ArcLabelComponent<Datum>
}
