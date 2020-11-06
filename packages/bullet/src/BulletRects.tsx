import React from 'react'
import { useTransition, animated } from 'react-spring'
// @ts-ignore
import { useMotionConfig } from '@nivo/core'
// @ts-ignore
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { computeRects } from './compute'
import {
    BulletRectsProps,
    ComputedRangeDatum,
    BulletRectComputedRect,
    BulletRectAnimatedProps,
} from './types'

type MouseEventWithDatum = (
    datum: ComputedRangeDatum,
    event: React.MouseEvent<SVGRectElement, MouseEvent>
) => void

type EventHandlers = Record<'onMouseEnter' | 'onMouseLeave' | 'onClick', MouseEventWithDatum>

export const BulletRects = ({
    animatedProps,
    data,
    layout,
    y,
    component,
    reverse,
    scale,
    height,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: BulletRectsProps & EventHandlers) => {
    const rects = computeRects({
        data,
        layout,
        reverse,
        scale,
        height,
    })

    const getTransform = (value: number) =>
        `translate(${layout === 'horizontal' ? 0 : value},${layout === 'horizontal' ? value : 0})`

    const transform = animatedProps?.measuresY.interpolate(getTransform) ?? getTransform(y)

    const { animate, config: springConfig } = useMotionConfig()
    const transitions = useTransition<BulletRectComputedRect, BulletRectAnimatedProps>(
        rects,
        rects.map(rect => `${rect.data.index}`),
        {
            enter: (rect: BulletRectComputedRect) => ({
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
                color: rect.data.color,
            }),
            update: (rect: BulletRectComputedRect) => ({
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
                color: rect.data.color,
            }),
            config: springConfig,
            immediate: !animate,
        } as any
    )

    return (
        <animated.g transform={transform}>
            {transitions.map(({ item: rect, props, key }) =>
                React.createElement(component, {
                    key,
                    index: Number(key),
                    animatedProps: props,
                    data: rect.data,
                    x: props.x.getValue(),
                    y: props.y.getValue(),
                    width: props.width.interpolate(value => Math.max(value, 0)).getValue(),
                    height: props.height.interpolate(value => Math.max(value, 0)).getValue(),
                    color: props.color.getValue(),
                    onMouseEnter: event => onMouseEnter(rect.data, event),
                    onMouseMove: event => onMouseEnter(rect.data, event),
                    onMouseLeave: event => onMouseLeave(rect.data, event),
                    onClick: event => onClick(rect.data, event),
                })
            )}
        </animated.g>
    )
}
