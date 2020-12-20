import * as React from 'react'
import {
    Box,
    Dimensions,
    ModernMotionProps,
    Theme,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'

export interface DatumWithChildren<RawDatum extends DatumWithChildren<RawDatum>> {
    children?: RawDatum[]
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

    margin: Box

    layers: CirclePackLayer<RawDatum>[]

    theme: Theme

    isInteractive: boolean

    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']

    role: string
}
