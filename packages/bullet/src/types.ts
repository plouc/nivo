import * as React from 'react'
import { Box, Dimensions, Theme, Colors, ModernMotionProps } from '@nivo/core'
import { ScaleLinear } from 'd3-scale'
import { SpringValues } from 'react-spring'

export type DatumId = string | number
export type DatumValue = number

export type WithDatumId<R> = R & { id: DatumId }

type Point = {
    x: number
    y: number
}

export interface Datum {
    id: DatumId
    title?: React.ReactNode
    ranges: number[]
    measures: number[]
    markers?: number[]
}

export type EnhancedDatum = Datum & {
    scale: ScaleLinear<number, number, never> & { type: 'linear' }
}

export interface ComputedRangeDatum {
    index: number
    v0: number
    v1: number
    color: string
}

export interface ComputedMarkersDatum {
    index: number
    value: number
    color: string
}

export type MouseEventHandler<D, T> = (datum: D, event: React.MouseEvent<T>) => void

export type CommonBulletProps = Dimensions & {
    margin: Box

    layout: 'horizontal' | 'vertical'
    reverse: boolean
    spacing: number

    titlePosition: 'before' | 'after'
    titleAlign: 'start' | 'middle' | 'end'
    titleOffsetX: number
    titleOffsetY: number
    titleRotation: number

    rangeComponent: React.ComponentType<BulletRectsItemProps>
    rangeColors: Colors

    measureComponent: React.ComponentType<BulletRectsItemProps>
    measureColors: Colors
    measureSize: number

    markerComponent: React.ComponentType<BulletMarkersItemProps>
    markerColors: Colors
    markerSize: number

    axisPosition: 'before' | 'after'

    theme: Theme

    role: string
}

export type BulletHandlers = {
    onRangeClick?: MouseEventHandler<WithDatumId<ComputedRangeDatum>, SVGRectElement>
    onMeasureClick?: MouseEventHandler<WithDatumId<ComputedRangeDatum>, SVGRectElement>
    onMarkerClick?: MouseEventHandler<WithDatumId<ComputedMarkersDatum>, SVGLineElement>
}

export type BulletSvgProps = Partial<CommonBulletProps> &
    Dimensions &
    BulletHandlers &
    ModernMotionProps & {
        data: Datum[]
    }

type MouseEventWithDatum<D, Element> = (
    datum: D,
    event: React.MouseEvent<Element, MouseEvent>
) => void

export type BulletRectComputedRect = Point &
    Dimensions & {
        data: ComputedRangeDatum
    }

export type BulletRectAnimatedProps = Point & Dimensions & Pick<ComputedRangeDatum, 'color'>

export type BulletRectsItemProps = Pick<
    BulletRectsProps,
    'onMouseEnter' | 'onMouseLeave' | 'onClick'
> &
    Point &
    Dimensions & {
        animatedProps: SpringValues<BulletRectAnimatedProps>
        index: number
        color: string
        data: ComputedRangeDatum
        onMouseMove: BulletRectsProps['onMouseEnter']
    }

export type BulletMarkersItemProps = Pick<
    BulletMarkersProps,
    'onMouseEnter' | 'onMouseLeave' | 'onClick'
> &
    Point & {
        animatedProps: SpringValues<PositionWithColor>
        size: number
        rotation: number
        color: string
        data: {
            index: number
            value: number
            color: string
        }
        onMouseMove: BulletMarkersProps['onMouseEnter']
    }

export type BulletRectsProps = Pick<CommonBulletProps, 'layout' | 'reverse'> &
    Dimensions &
    Point & {
        animatedProps?: SpringValues<{
            measuresY: number
            transform: string
        }>
        scale: ScaleLinear<number, number, never>
        data: ComputedRangeDatum[]
        component: CommonBulletProps['rangeComponent']
        onMouseEnter: MouseEventWithDatum<ComputedRangeDatum, SVGRectElement>
        onMouseLeave: MouseEventWithDatum<ComputedRangeDatum, SVGRectElement>
        onClick: MouseEventWithDatum<ComputedRangeDatum, SVGRectElement>
    }

export type Position = Point & {
    size: number
    rotation: number
}

export type MarkerWithPosition = ComputedMarkersDatum & {
    position: Position
}

export type PositionWithColor = {
    color: string
    transform: string
    x: number
    y1: number
    y2: number
}

export type BulletMarkersProps = Pick<CommonBulletProps, 'layout' | 'reverse'> &
    Pick<Dimensions, 'height'> & {
        scale: ScaleLinear<number, number, never>
        markerSize: number
        markers: ComputedMarkersDatum[]
        component: CommonBulletProps['markerComponent']
        onMouseEnter: MouseEventWithDatum<ComputedMarkersDatum, SVGLineElement>
        onMouseLeave: MouseEventWithDatum<ComputedMarkersDatum, SVGLineElement>
        onClick: MouseEventWithDatum<ComputedMarkersDatum, SVGLineElement>
    }

export type BulletItemProps = Omit<
    CommonBulletProps,
    | 'outerWidth'
    | 'outerHeight'
    | 'margin'
    | 'spacing'
    | 'role'
    | 'measureSize'
    | 'markerSize'
    | 'theme'
> &
    BulletHandlers &
    EnhancedDatum &
    ModernMotionProps &
    Point & {
        measureHeight: number
        markerHeight: number
    }
