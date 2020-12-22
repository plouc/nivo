import * as React from 'react'
import {
    Box,
    Dimensions,
    ModernMotionProps,
    Theme,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'

export interface DatumWithChildren<RawDatum extends DatumWithChildren<RawDatum>> {
    children?: RawDatum[]
}

export interface ComputedDatum<RawDatum extends DatumWithChildren<RawDatum>> {
    id: string | number
    // contain own id plus all ancestor ids
    path: (string | number)[]
    value: number
    percentage: number
    formattedValue: string
    x: number
    y: number
    radius: number
    color: string
    // defined when using patterns or gradients
    fill?: string
    // contains the raw node's data
    data: RawDatum
    depth: number
    height: number
    parent?: ComputedDatum<RawDatum>
}

export type CirclePackLayerId = 'circles' | 'labels'

export interface CirclePackCustomLayerProps<RawDatum extends DatumWithChildren<RawDatum>> {}

export type CirclePackCustomLayer<RawDatum> = React.FC<CirclePackCustomLayerProps<RawDatum>>

export type CirclePackLayer<RawDatum> = CirclePackLayerId | CirclePackCustomLayer<RawDatum>

export interface CirclePackSvgProps<RawDatum extends DatumWithChildren<RawDatum>>
    extends Dimensions {
    data: RawDatum

    id: PropertyAccessor<RawDatum, string | number>
    value: PropertyAccessor<RawDatum, number>
    valueFormat?: ValueFormat<number>

    padding: number
    margin: Box

    layers: CirclePackLayer<RawDatum>[]

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>>
    // if specified, will determine the node's color
    // according to its parent
    childColor: InheritedColorConfig<ComputedDatum<RawDatum>>

    isInteractive: boolean

    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']

    role: string
}
