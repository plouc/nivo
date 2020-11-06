import * as React from 'react'
import { Box, Dimensions, Theme, Colors, ModernMotionProps } from '@nivo/core'
import { ScaleLinear } from 'd3-scale'
import { AnimatedValue } from 'react-spring'

export type DatumId = string
export type DatumValue = number

export type WithDatumId<R> = R & { id: DatumId }

type Point = {
    x: number
    y: number
}

export interface DefaultRawDatum {
    id: DatumId
    title?: React.ReactNode
    ranges: number[]
    measures: number[]
    markers?: number[]
}

export type EnhancedDatum = DefaultRawDatum & {
    scale: ScaleLinear<number, number, never>
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

export type MouseEventHandler<R, T> = (datum: R, event: React.MouseEvent<T>) => void

export interface DataProps<T> {
    data: T[]
}

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

export type BulletSvgProps = DataProps<DefaultRawDatum> &
    Partial<CommonBulletProps> &
    BulletHandlers &
    ModernMotionProps

type BulletMouseEvent<E> = (event: React.MouseEvent<E, MouseEvent>) => void

export type BulletRectComputedRect = Point &
    Dimensions & {
        data: ComputedRangeDatum
    }

export type BulletRectAnimatedProps = Point & Dimensions & Pick<ComputedRangeDatum, 'color'>

export type BulletRectsItemProps = Point &
    Dimensions & {
        animatedProps: AnimatedValue<BulletRectAnimatedProps>
        index: number
        color: string
        data: {
            v0: number
            v1: number
        }
        onMouseEnter: BulletMouseEvent<SVGRectElement>
        onMouseMove: BulletMouseEvent<SVGRectElement>
        onMouseLeave: BulletMouseEvent<SVGRectElement>
        onClick: BulletMouseEvent<SVGRectElement>
    }

export type BulletMarkersItemProps = Point & {
    animatedProps: AnimatedValue<PositionWithColor>
    size: number
    rotation: number
    color: string
    data: {
        index: number
        value: number
        color: string
    }
    onMouseEnter: BulletMouseEvent<SVGLineElement>
    onMouseMove: BulletMouseEvent<SVGLineElement>
    onMouseLeave: BulletMouseEvent<SVGLineElement>
    onClick: BulletMouseEvent<SVGLineElement>
}

export type BulletRectsProps = Pick<CommonBulletProps, 'layout' | 'reverse'> &
    Dimensions &
    Point & {
        animatedProps?: AnimatedValue<{
            measuresY: number
            transform: string
        }>
        scale: ScaleLinear<number, number, never>
        data: ComputedRangeDatum[]
        component: CommonBulletProps['rangeComponent']
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
    }

export type TooltipHandlers<Element> = {
    hideTooltip: () => void
    showTooltip: (content: React.ReactNode, event: React.MouseEvent<Element, MouseEvent>) => void
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
    TooltipHandlers<unknown> &
    BulletHandlers &
    EnhancedDatum &
    ModernMotionProps &
    Point & {
        measureHeight: number
        markerHeight: number
    }
