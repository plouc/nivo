import { InheritedColorConfig } from '@nivo/colors'
import { PropertyAccessor } from '@nivo/core'
import { DatumWithRectAndColor } from '../types'
import { RectLabelComponent } from './RectLabelsLayer'

export interface RectLabelsProps<Datum extends DatumWithRectAndColor> {
    rectLabel: PropertyAccessor<Datum, string>
    rectLabelsOffsetX: number
    rectLabelsOffsetY: number
    rectLabelsSkipWidth: number
    rectLabelsSkipHeight: number
    rectLabelsTextColor: InheritedColorConfig<Datum>
    rectLabelsComponent: RectLabelComponent<Datum>
}
