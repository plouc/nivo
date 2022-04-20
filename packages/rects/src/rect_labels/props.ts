import { InheritedColorConfig } from '@nivo/colors'
import { PropertyAccessor } from '@nivo/core'
import { DatumWithRectAndColor } from '../types'
import { RectLabelComponent } from './RectLabelsLayer'

export interface RectLabelsProps<TDatum extends DatumWithRectAndColor> {
    rectLabel: PropertyAccessor<TDatum, string>
    rectLabelsComponent: RectLabelComponent<TDatum>
    rectLabelsTextColor: InheritedColorConfig<TDatum>
}
